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
package com.alibaba.nacos.config.server.auth;

import com.alibaba.nacos.config.server.model.Page;
import com.alibaba.nacos.config.server.model.User;
import com.alibaba.nacos.config.server.service.PersistService;
import com.alibaba.nacos.config.server.service.transaction.DatabaseOperate;
import com.alibaba.nacos.config.server.service.transaction.SqlContextUtils;
import com.alibaba.nacos.config.server.utils.PaginationHelper;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.alibaba.nacos.config.server.service.RowMapperManager.USER_ROW_MAPPER;

/**
 * User CRUD service
 *
 * @author nkorange
 * @since 1.2.0
 */
@Service
public class UserPersistService extends PersistService {

    @Autowired
    private DatabaseOperate databaseOperate;

    public void createUser(String username, String password) {
        String sql = "INSERT into users (username, password, enabled) VALUES (?, ?, ?)";

        try {
            SqlContextUtils.addSqlContext(sql, username, password, true);
            databaseOperate.updateAuto();
        } finally {
            SqlContextUtils.cleanCurrentSqlContext();
        }
    }

    public void deleteUser(String username) {
        String sql = "DELETE from users WHERE username=?";
        try {
            SqlContextUtils.addSqlContext(sql, username);
            databaseOperate.updateAuto();
        } finally {
            SqlContextUtils.cleanCurrentSqlContext();
        }
    }

    public void updateUserPassword(String username, String password) {
        try {
            SqlContextUtils.addSqlContext(
                    "UPDATE users SET password = ? WHERE username=?",
                    password, username);
            databaseOperate.updateAuto();
        } finally {
            SqlContextUtils.cleanCurrentSqlContext();
        }
    }

    public User findUserByUsername(String username) {
        String sql = "SELECT username,password FROM users WHERE username=? ";
        return databaseOperate.queryOne(sql, new Object[]{username}, USER_ROW_MAPPER);
    }

    public Page<User> getUsers(int pageNo, int pageSize) {

        PaginationHelper<User> helper = new PaginationHelper<>();

        String sqlCountRows = "select count(*) from users where ";
        String sqlFetchRows
                = "select username,password from users where ";

        String where = " 1=1 ";
        Page<User> pageInfo = helper.fetchPage(databaseOperate, sqlCountRows
                        + where, sqlFetchRows + where, new ArrayList<String>().toArray(), pageNo,
                pageSize, USER_ROW_MAPPER);
        if (pageInfo == null) {
            pageInfo = new Page<>();
            pageInfo.setTotalCount(0);
            pageInfo.setPageItems(new ArrayList<>());
        }
        return pageInfo;
    }

}
