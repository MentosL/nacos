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

package com.alibaba.nacos.core.distributed.raft;

import com.alibaba.nacos.common.model.RestResult;
import com.alibaba.nacos.common.utils.ByteUtils;
import com.alibaba.nacos.common.utils.ConvertUtils;
import com.alibaba.nacos.common.utils.LoggerUtils;
import com.alibaba.nacos.common.utils.ThreadUtils;
import com.alibaba.nacos.consistency.LogProcessor;
import com.alibaba.nacos.consistency.SerializeFactory;
import com.alibaba.nacos.consistency.Serializer;
import com.alibaba.nacos.consistency.cp.LogProcessor4CP;
import com.alibaba.nacos.consistency.entity.GetRequest;
import com.alibaba.nacos.consistency.entity.GetResponse;
import com.alibaba.nacos.consistency.entity.Log;
import com.alibaba.nacos.consistency.exception.ConsistencyException;
import com.alibaba.nacos.core.distributed.raft.exception.DuplicateRaftGroupException;
import com.alibaba.nacos.core.distributed.raft.exception.JRaftException;
import com.alibaba.nacos.core.distributed.raft.exception.NoLeaderException;
import com.alibaba.nacos.core.distributed.raft.exception.NoSuchRaftGroupException;
import com.alibaba.nacos.core.distributed.raft.processor.NacosAsyncProcessor;
import com.alibaba.nacos.core.distributed.raft.utils.BytesHolder;
import com.alibaba.nacos.core.distributed.raft.utils.FailoverClosure;
import com.alibaba.nacos.core.distributed.raft.utils.FailoverClosureImpl;
import com.alibaba.nacos.core.distributed.raft.utils.JRaftConstants;
import com.alibaba.nacos.core.distributed.raft.utils.JRaftLogOperation;
import com.alibaba.nacos.core.distributed.raft.utils.JRaftUtils;
import com.alibaba.nacos.core.distributed.raft.utils.RaftExecutor;
import com.alibaba.nacos.core.distributed.raft.utils.RaftOptionsBuilder;
import com.alibaba.nacos.core.distributed.raft.utils.RetryRunner;
import com.alibaba.nacos.core.notify.NotifyCenter;
import com.alibaba.nacos.core.utils.ApplicationUtils;
import com.alibaba.nacos.core.utils.Loggers;
import com.alipay.sofa.jraft.CliService;
import com.alipay.sofa.jraft.Node;
import com.alipay.sofa.jraft.RaftGroupService;
import com.alipay.sofa.jraft.RaftServiceFactory;
import com.alipay.sofa.jraft.RouteTable;
import com.alipay.sofa.jraft.Status;
import com.alipay.sofa.jraft.closure.ReadIndexClosure;
import com.alipay.sofa.jraft.conf.Configuration;
import com.alipay.sofa.jraft.entity.PeerId;
import com.alipay.sofa.jraft.entity.Task;
import com.alipay.sofa.jraft.error.RaftError;
import com.alipay.sofa.jraft.option.CliOptions;
import com.alipay.sofa.jraft.option.NodeOptions;
import com.alipay.sofa.jraft.option.RaftOptions;
import com.alipay.sofa.jraft.rpc.InvokeCallback;
import com.alipay.sofa.jraft.rpc.RaftRpcServerFactory;
import com.alipay.sofa.jraft.rpc.RpcProcessor;
import com.alipay.sofa.jraft.rpc.RpcServer;
import com.alipay.sofa.jraft.rpc.impl.cli.CliClientServiceImpl;
import com.alipay.sofa.jraft.util.BytesUtil;
import com.alipay.sofa.jraft.util.Endpoint;
import org.springframework.util.CollectionUtils;

import java.nio.ByteBuffer;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.function.BiConsumer;

/**
 * JRaft server instance, away from Spring IOC management
 *
 * <p>
 * Why do we need to create a raft group based on the value of LogProcessor group (),
 * that is, each function module has its own state machine. Because each LogProcessor
 * corresponds to a different functional module, such as Nacos's naming module and
 * config module, these two modules are independent of each other and do not affect
 * each other. If we have only one state machine, it is equal to the log of all functional
 * modules The processing is loaded together. Any module that has an exception during
 * the log processing and a long block operation will affect the normal operation of
 * other functional modules.
 * </p>
 *
 * @author <a href="mailto:liaochuntao@live.com">liaochuntao</a>
 */
@SuppressWarnings("all")
public class JRaftServer {

	// Existential life cycle

	private RpcServer rpcServer;
	private CliClientServiceImpl cliClientService;
	private CliService cliService;
	private Map<String, RaftGroupTuple> multiRaftGroup = new ConcurrentHashMap<>();

	// Ordinary member variable

	private volatile boolean isStarted = false;
	private volatile boolean isShutdown = false;
	private Configuration conf;

	private RpcProcessor userProcessor;
	private NodeOptions nodeOptions;
	private Serializer serializer;
	private Collection<LogProcessor4CP> processors = Collections
			.synchronizedSet(new HashSet<>());

	private String selfIp;
	private int selfPort;

	private RaftConfig raftConfig;
	private PeerId localPeerId;
	private int failoverRetries;
	private int rpcRequestTimeoutMs;

	public JRaftServer(final int failoverRetries) {
		this.failoverRetries = failoverRetries;
		this.conf = new Configuration();
	}

	public void setFailoverRetries(int failoverRetries) {
		this.failoverRetries = failoverRetries;
	}

	void init(RaftConfig config) {
		this.raftConfig = config;
		this.serializer = SerializeFactory.getDefault();
		Loggers.RAFT.info("Initializes the Raft protocol, raft-config info : {}", config);
		RaftExecutor.init(config);

		final String self = config.getSelfMember();
		String[] info = self.split(":");
		selfIp = info[0];
		selfPort = Integer.parseInt(info[1]);
		localPeerId = PeerId.parsePeer(self);
		nodeOptions = new NodeOptions();

		// Set the election timeout time. The default is 5 seconds.
		int electionTimeout = Math.max(ConvertUtils
						.toInt(config.getVal(RaftSysConstants.RAFT_ELECTION_TIMEOUT_MS),
								RaftSysConstants.DEFAULT_ELECTION_TIMEOUT),
				RaftSysConstants.DEFAULT_ELECTION_TIMEOUT);

		rpcRequestTimeoutMs = ConvertUtils
				.toInt(raftConfig.getVal(RaftSysConstants.RAFT_RPC_REQUEST_TIMEOUT_MS),
						RaftSysConstants.DEFAULT_RAFT_RPC_REQUEST_TIMEOUT_MS);

		nodeOptions.setElectionTimeoutMs(electionTimeout);
		RaftOptions raftOptions = RaftOptionsBuilder.initRaftOptions(raftConfig);
		nodeOptions.setRaftOptions(raftOptions);

		CliOptions cliOptions = new CliOptions();

		this.cliClientService = new CliClientServiceImpl();
		this.cliClientService.init(cliOptions);
		this.cliService = RaftServiceFactory.createAndInitCliService(cliOptions);
	}

	synchronized void start() {

		if (!isStarted) {

			Loggers.RAFT.info("========= The raft protocol is starting... =========");

			try {
				// init raft group node
				com.alipay.sofa.jraft.NodeManager raftNodeManager = com.alipay.sofa.jraft.NodeManager
						.getInstance();
				for (String address : raftConfig.getMembers()) {
					PeerId peerId = PeerId.parsePeer(address);
					conf.addPeer(peerId);
					raftNodeManager.addAddress(peerId.getEndpoint());
				}
				nodeOptions.setInitialConf(conf);

				rpcServer = RaftRpcServerFactory.createRaftRpcServer(new Endpoint(localPeerId.getIp(), localPeerId.getPort()),
						RaftExecutor.getRaftCoreExecutor(),
						RaftExecutor.getRaftCliServiceExecutor());
				rpcServer.registerProcessor(new NacosAsyncProcessor(this, failoverRetries));

				if (!this.rpcServer.init(null)) {
					Loggers.RAFT.error("Fail to init [RpcServer].");
					throw new RuntimeException("Fail to init [RpcServer].");
				}

				// Initialize multi raft group service framework
				isStarted = true;
				createMultiRaftGroup(processors);
				Loggers.RAFT
						.info("========= The raft protocol start finished... =========");
			}
			catch (Exception e) {
				Loggers.RAFT.error("raft protocol start failure, error : {}", e);
				throw new JRaftException(e);
			}
		}
	}

	synchronized void createMultiRaftGroup(Collection<LogProcessor4CP> processors) {
		// There is no reason why the LogProcessor cannot be processed because of the synchronization
		if (!this.isStarted) {
			this.processors.addAll(processors);
			return;
		}

		final String parentPath = Paths
				.get(ApplicationUtils.getNacosHome(), "data/protocol/raft").toString();

		for (LogProcessor4CP processor : processors) {
			final String groupName = processor.group();
			if (multiRaftGroup.containsKey(groupName)) {
				throw new DuplicateRaftGroupException(groupName);
			}

			// Ensure that each Raft Group has its own configuration and NodeOptions
			Configuration configuration = conf.copy();
			NodeOptions copy = nodeOptions.copy();

			JRaftUtils.initDirectory(parentPath, groupName, copy);

			if (!registerSelfToCluster(groupName, localPeerId, configuration)) {
				// If the registration fails, you need to remove yourself first and then
				// turn on the repeat registration logic
				configuration.removePeer(localPeerId);
				RaftExecutor.executeByCommon(() -> {
					Configuration c = configuration.copy();
					c.addPeer(localPeerId);
					for ( ; ; ) {
						if (registerSelfToCluster(groupName, localPeerId, c)) {
							break;
						}
						ThreadUtils.sleep(1000L);
					}
				});
			}

			// Here, the LogProcessor is passed into StateMachine, and when the StateMachine
			// triggers onApply, the onApply of the LogProcessor is actually called
			NacosStateMachine machine = new NacosStateMachine(this, processor);


			copy.setFsm(machine);
			copy.setInitialConf(configuration);

			// Set snapshot interval, default 1800 seconds
			int doSnapshotInterval = ConvertUtils.toInt(raftConfig
							.getVal(RaftSysConstants.RAFT_SNAPSHOT_INTERVAL_SECS),
					RaftSysConstants.DEFAULT_RAFT_SNAPSHOT_INTERVAL_SECS);

			// If the business module does not implement a snapshot processor, cancel the snapshot
			doSnapshotInterval = CollectionUtils
					.isEmpty(processor.loadSnapshotOperate()) ? 0 : doSnapshotInterval;

			copy.setSnapshotIntervalSecs(doSnapshotInterval);
			Loggers.RAFT.info("create raft group : {}", groupName);
			RaftGroupService raftGroupService = new RaftGroupService(groupName,
					localPeerId, copy, rpcServer, true);

			// Because RpcServer has been started before, it is not allowed to start again here
			Node node = raftGroupService.start(false);
			machine.setNode(node);
			RouteTable.getInstance().updateConfiguration(groupName, configuration);

			// Turn on the leader auto refresh for this group
			Random random = new Random();
			long period = nodeOptions.getElectionTimeoutMs() + random.nextInt(5 * 1000);
			RaftExecutor.scheduleRaftMemberRefreshJob(() -> refreshRouteTable(groupName),
					period, period, TimeUnit.MILLISECONDS);
			multiRaftGroup.put(groupName,
					new RaftGroupTuple(node, processor, raftGroupService, machine));
		}
	}

	GetResponse get(final GetRequest request, final int failoverRetries) {
		final String group = request.getGroup();
		CompletableFuture<GetResponse> future = new CompletableFuture<>();
		final RaftGroupTuple tuple = findTupleByGroup(group);
		if (Objects.isNull(tuple)) {
			future.completeExceptionally(new NoSuchRaftGroupException(group));
			return future.join();
		}
		final Node node = tuple.node;
		node.readIndex(BytesUtil.EMPTY_BYTES, new ReadIndexClosure() {
			@Override
			public void run(Status status, long index, byte[] reqCtx) {
				if (status.isOk()) {
					try {
						GetResponse response = tuple.processor.getData(request);
						future.complete(response);
					}
					catch (Throwable t) {
						future.completeExceptionally(t);
					}
					return;
				}
				future.completeExceptionally(
						new ConsistencyException(status.getErrorMsg()));
			}
		});
		try {
			return future.get(rpcRequestTimeoutMs, TimeUnit.MILLISECONDS);
		}
		catch (TimeoutException e) {
			// run raft read
			readThrouthRaftLog(request, future);
			try {
				return future.get(rpcRequestTimeoutMs, TimeUnit.MILLISECONDS);
			}
			catch (Throwable ex) {
				throw new ConsistencyException("Data acquisition failed", e);
			}
		}
		catch (Throwable e) {
			throw new ConsistencyException("Data acquisition failed", e);
		}
	}

	public void readThrouthRaftLog(final GetRequest request,
			final CompletableFuture<GetResponse> future) {

		Log readLog = Log.newBuilder().setGroup(request.getGroup())
				.setData(request.getData())
				.putExtendInfo(JRaftConstants.JRAFT_EXTEND_INFO_KEY,
						JRaftLogOperation.READ_OPERATION).build();
		CompletableFuture<byte[]> f = new CompletableFuture<byte[]>();
		commit(readLog, f, failoverRetries)
				.whenComplete(new BiConsumer<byte[], Throwable>() {
					@Override
					public void accept(byte[] result, Throwable throwable) {
						if (Objects.nonNull(throwable)) {
							future.completeExceptionally(
									new ConsistencyException(throwable));
							return;
						}
						try {
							GetResponse r = null;
							if (ByteUtils.isNotEmpty(result)) {
								r = GetResponse.parseFrom(result);
							}
							else {
								r = GetResponse.newBuilder().build();
							}
							future.complete(r);
						}
						catch (Throwable ex) {
							future.completeExceptionally(ex);
						}
					}
				});
	}

	public <T> CompletableFuture<T> commit(Log data, final CompletableFuture<T> future,
			final int retryLeft) {
		LoggerUtils.printIfDebugEnabled(Loggers.RAFT, "data requested this time : {}", data);
		final String group = data.getGroup();
		final RaftGroupTuple tuple = findTupleByGroup(group);
		if (tuple == null) {
			future.completeExceptionally(new IllegalArgumentException(
					"No corresponding Raft Group found : " + group));
			return future;
		}
		RetryRunner runner = () -> commit(data, future, retryLeft - 1);
		FailoverClosureImpl closure = new FailoverClosureImpl(future, retryLeft, runner);

		final Node node = tuple.node;
		if (node.isLeader()) {
			// The leader node directly applies this request
			applyOperation(node, data, closure);
		}
		else {
			// Forward to Leader for request processing
			invokeToLeader(node.getGroupId(), data, rpcRequestTimeoutMs, closure);
		}
		return future;
	}

	boolean registerSelfToCluster(String groupId, PeerId selfIp, Configuration conf) {
		PeerId leader = new PeerId();
		for (int i = 0; i < 5; i ++) {
			Status status = cliService.getLeader(groupId, conf, leader);
			if (status.isOk()) {
				break;
			}
			Loggers.RAFT.warn("get leader failed : {}", status);
		}

		// This means that this is a new cluster, following the normal initialization logic
		if (leader.isEmpty()) {
			return true;
		}

		for (int i = 0; i < 5; i ++) {
			Status status = cliService.addPeer(groupId, conf, selfIp);
			if (status.isOk()) {
				Loggers.RAFT.info("reigister self to cluster success");
				return true;
			} else {
				Loggers.RAFT.error("register self to cluster has error : {}", status);
				ThreadUtils.sleep(1000L);
			}
		}

		return false;
	}

	protected PeerId getLeader(final String raftGroupId) {
		final PeerId leader = new PeerId();
		final Configuration conf = findNodeByGroup(raftGroupId).getOptions()
				.getInitialConf();
		try {
			final Status st = cliService.getLeader(raftGroupId, conf, leader);
			if (st.isOk()) {
				return leader;
			}
			Loggers.RAFT.error("get Leader has failed : {}", st);
		}
		catch (final Throwable t) {
			Loggers.RAFT.error("get Leader has error : {}", t);
		}
		return null;
	}

	synchronized void shutdown() {

		if (isShutdown) {
			return;
		}

		isShutdown = true;

		try {
			Loggers.RAFT
					.info("========= The raft protocol is starting to close =========");

			RouteTable instance = RouteTable.getInstance();

			for (Map.Entry<String, RaftGroupTuple> entry : multiRaftGroup.entrySet()) {
				final RaftGroupTuple tuple = entry.getValue();
				final String groupId = entry.getKey();

				final Configuration conf = instance.getConfiguration(groupId);

				cliService.removePeer(groupId, conf, localPeerId);

				tuple.node.shutdown();
				tuple.raftGroupService.shutdown();
			}

			cliService.shutdown();
			cliClientService.shutdown();

			Loggers.RAFT.info("========= The raft protocol has been closed =========");
		}
		catch (Throwable t) {
			Loggers.RAFT
					.error("There was an error in the raft protocol shutdown, error : {}",
							t);
		}
	}

	public void applyOperation(Node node, Log data, FailoverClosure closure) {
		final Task task = new Task();
		task.setDone(new NacosClosure(data, status -> {
			NacosClosure.NStatus nStatus = (NacosClosure.NStatus) status;
			if (Objects.nonNull(nStatus.getThrowable())) {
				closure.setThrowable(nStatus.getThrowable());
			}
			else {
				closure.setData(nStatus.getResult());
			}
			closure.run(nStatus);
		}));
		task.setData(ByteBuffer.wrap(data.toByteArray()));
		node.apply(task);
	}

	private void invokeToLeader(final String group, final Log request,
			final int timeoutMillis, FailoverClosure closure) {
		try {
			final Endpoint leaderIp = Optional.ofNullable(getLeader(group))
					.orElseThrow(() -> new NoLeaderException(group)).getEndpoint();
			final BytesHolder holder = BytesHolder.create(request.toByteArray());
			cliClientService.getRpcClient()
					.invokeAsync(leaderIp, holder, new InvokeCallback() {
						@Override
						public void complete(Object o, Throwable ex) {

							if (Objects.nonNull(ex)) {
								closure.setThrowable(ex);
								closure.run(new Status(RaftError.UNKNOWN, ex.getMessage()));
							}

							RestResult result = (RestResult) o;
							if (result.ok()) {
								closure.setData(result.getData());
								closure.run(Status.OK());
							}
							else {
								ex = (Throwable) result.getData();
								closure.setThrowable(ex);
								closure.run(
										new Status(RaftError.UNKNOWN, ex.getMessage()));
							}
						}

						@Override
						public Executor executor() {
							return RaftExecutor.getRaftCliServiceExecutor();
						}
					}, timeoutMillis);
		}
		catch (Exception e) {
			closure.setThrowable(e);
			closure.run(new Status(RaftError.UNKNOWN, e.getMessage()));
		}
	}

	void refreshRouteTable(String group) {
		if (isShutdown) {
			return;
		}

		final String groupName = group;
		Status status = null;
		try {
			RouteTable instance = RouteTable.getInstance();
			Configuration oldConf = instance.getConfiguration(groupName);
			String oldLeader = Optional.ofNullable(instance.selectLeader(groupName)).orElse(PeerId.emptyPeer()).getEndpoint().toString();
			status = instance.refreshConfiguration(this.cliClientService, groupName,
					rpcRequestTimeoutMs);

			if (status.isOk()) {
				Configuration conf = instance.getConfiguration(groupName);
				String leader = instance.selectLeader(groupName).getEndpoint().toString();
				NacosStateMachine machine = findTupleByGroup(groupName).machine;

				if (!Objects.equals(oldLeader, leader) || !Objects.equals(oldConf, conf)) {
					NotifyCenter.publishEvent(RaftEvent.builder()
							.leader(leader)
							.groupId(groupName)
							.term(machine.getTerm())
							.raftClusterInfo(JRaftUtils.toStrings(conf.getPeers()))
							.build());
				}

			}
			else {
				Loggers.RAFT
						.error("Fail to refresh route configuration for group : {}, status is : {}",
								groupName, status);
			}
		}
		catch (Exception e) {
			Loggers.RAFT
					.error("Fail to refresh route configuration for group : {}, error is : {}",
							groupName, e);
		}
	}

	public RaftGroupTuple findTupleByGroup(final String group) {
		RaftGroupTuple tuple = multiRaftGroup.get(group);
		return tuple;
	}

	public Node findNodeByGroup(final String group) {
		final RaftGroupTuple tuple = multiRaftGroup.get(group);
		if (Objects.nonNull(tuple)) {
			return tuple.node;
		}
		return null;
	}

	Map<String, RaftGroupTuple> getMultiRaftGroup() {
		return multiRaftGroup;
	}

	CliService getCliService() {
		return cliService;
	}

	public static class RaftGroupTuple {

		private final LogProcessor processor;
		private final Node node;
		private final RaftGroupService raftGroupService;
		private final NacosStateMachine machine;

		public RaftGroupTuple(Node node, LogProcessor processor,
				RaftGroupService raftGroupService, NacosStateMachine machine) {
			this.node = node;
			this.processor = processor;
			this.raftGroupService = raftGroupService;
			this.machine = machine;
		}

		public Node getNode() {
			return node;
		}

		public LogProcessor getProcessor() {
			return processor;
		}

		public RaftGroupService getRaftGroupService() {
			return raftGroupService;
		}
	}

}
