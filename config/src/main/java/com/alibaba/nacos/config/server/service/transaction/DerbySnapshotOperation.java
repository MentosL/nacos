/*
 * Copyright 1999-2018 Alibaba Group Holding Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.alibaba.nacos.config.server.service.transaction;

import com.alibaba.nacos.config.server.service.DataSourceService;
import com.alibaba.nacos.config.server.service.DynamicDataSource;
import com.alibaba.nacos.config.server.service.LocalDataSourceServiceImpl;
import com.alibaba.nacos.config.server.utils.LogUtil;
import com.alibaba.nacos.consistency.snapshot.CallFinally;
import com.alibaba.nacos.consistency.snapshot.LocalFileMeta;
import com.alibaba.nacos.consistency.snapshot.Reader;
import com.alibaba.nacos.consistency.snapshot.SnapshotOperation;
import com.alibaba.nacos.consistency.snapshot.Writer;
import com.alibaba.nacos.core.distributed.raft.utils.RaftExecutor;
import com.alibaba.nacos.core.utils.DiskUtils;
import com.alibaba.nacos.core.utils.ApplicationUtils;
import com.alipay.sofa.jraft.util.CRC64;

import java.io.File;
import java.nio.file.Paths;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.util.Objects;
import java.util.concurrent.Callable;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.zip.Checksum;
import javax.sql.DataSource;

/**
 * @author <a href="mailto:liaochuntao@live.com">liaochuntao</a>
 */
public class DerbySnapshotOperation implements SnapshotOperation {

    private final String backupSql = "CALL SYSCS_UTIL.SYSCS_BACKUP_DATABASE(?)";
    private final String snapshotDir = "derby_data";
    private final String snapshotArchive = "derby_data.zip";
    private final String derbyBaseDir = Paths.get(ApplicationUtils.getNacosHome(), "data", "derby-data").toString();
    private final String restoreDB = "jdbc:derby:" + derbyBaseDir;
    private final ReentrantReadWriteLock.WriteLock writeLock;

    public DerbySnapshotOperation(ReentrantReadWriteLock.WriteLock writeLock) {
        this.writeLock = writeLock;
    }

    @Override
    public void onSnapshotSave(Writer writer, CallFinally callFinally) {
        RaftExecutor.doSnapshot(() -> {
            writeLock.lock();
            try {
                final String writePath = writer.getPath();
                final String parentPath = Paths.get(writePath, snapshotDir).toString();
                DiskUtils.deleteDirectory(parentPath);
                DiskUtils.forceMkdir(parentPath);

                doDerbyBackup(parentPath);

                final String outputFile = Paths.get(writePath, snapshotArchive).toString();
                final Checksum checksum = new CRC64();
                DiskUtils.compress(writePath, snapshotDir, outputFile, checksum);
                DiskUtils.deleteDirectory(parentPath);

                final LocalFileMeta meta = new LocalFileMeta();
                meta.append("checkSum", Long.toHexString(checksum.getValue()));

                callFinally.run(writer.addFile(snapshotArchive, meta), null);
            } catch (Throwable t) {
                LogUtil.fatalLog.error("Fail to compress snapshot, path={}, file list={}, {}.",
                        writer.getPath(), writer.listFiles(), t);
                callFinally.run(false, t);
            } finally {
                writeLock.unlock();
            }
        });
    }

    @Override
    public boolean onSnapshotLoad(Reader reader) {
        final String readerPath = reader.getPath();
        final String sourceFile = Paths.get(readerPath, snapshotArchive).toString();
        writeLock.lock();
        try {
            final Checksum checksum = new CRC64();
            DiskUtils.decompress(sourceFile, readerPath, checksum);

            LocalFileMeta fileMeta = reader.getFileMeta(snapshotArchive);

            if (fileMeta.getFileMeta().containsKey("checkSum")) {
                if (!Objects.equals(Long.toHexString(checksum.getValue()), fileMeta.get("checkSum"))) {
                    throw new IllegalArgumentException("Snapshot checksum failed");
                }
            }

            final String loadPath = Paths.get(readerPath, snapshotDir, "derby-data").toString();
            LogUtil.fatalLog.info("snapshot load from : {}, and copy to : {}", loadPath,
                    derbyBaseDir);

            doDerbyRestoreFromBackup(() -> {
                final File srcDir = new File(loadPath);
                final File destDir = new File(derbyBaseDir);

                DiskUtils.copyDirectory(srcDir, destDir);
                LogUtil.fatalLog.info("Complete database recovery");
                return null;
            });
            DiskUtils.deleteDirectory(loadPath);
            return true;
        } catch (final Throwable t) {
            LogUtil.fatalLog.error("Fail to load snapshot, path={}, file list={}, {}.", readerPath,
                    reader.listFiles(), t);
            return false;
        } finally {
            writeLock.unlock();
        }
    }

    private void doDerbyBackup(String backupDirectory) throws Exception {
        DataSourceService sourceService = DynamicDataSource.getInstance().getDataSource();
        DataSource dataSource = sourceService.getJdbcTemplate().getDataSource();
        try (Connection holder = Objects.requireNonNull(dataSource).getConnection()) {
            CallableStatement cs = holder.prepareCall(backupSql);
            cs.setString(1, backupDirectory);
            cs.execute();
        }
    }

    private void doDerbyRestoreFromBackup(Callable<Void> callable) throws Exception {
        DataSourceService sourceService = DynamicDataSource.getInstance().getDataSource();
        LocalDataSourceServiceImpl localDataSourceService = (LocalDataSourceServiceImpl) sourceService;
        localDataSourceService.restoreDerby(restoreDB, callable);
    }

}
