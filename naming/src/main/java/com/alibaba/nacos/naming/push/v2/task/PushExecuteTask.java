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

package com.alibaba.nacos.naming.push.v2.task;

import com.alibaba.nacos.api.naming.pojo.ServiceInfo;
import com.alibaba.nacos.common.task.AbstractExecuteTask;
import com.alibaba.nacos.common.utils.StringUtils;
import com.alibaba.nacos.naming.core.v2.pojo.Service;
import com.alibaba.nacos.naming.misc.Loggers;
import com.alibaba.nacos.naming.pojo.Subscriber;
import com.alibaba.nacos.naming.utils.ServiceUtil;

/**
 * Nacos naming push execute task.
 *
 * @author xiweng.yy
 */
public class PushExecuteTask extends AbstractExecuteTask {
    
    private final Service service;
    
    private final PushDelayTaskExecuteEngine delayTaskEngine;
    
    public PushExecuteTask(Service service, PushDelayTaskExecuteEngine delayTaskEngine) {
        this.service = service;
        this.delayTaskEngine = delayTaskEngine;
    }
    
    @Override
    public void run() {
        try {
            ServiceInfo serviceInfo = delayTaskEngine.getServiceStorage().getPushData(service);
            serviceInfo = ServiceUtil.filterInstances(serviceInfo, StringUtils.EMPTY, true);
            for (String each : delayTaskEngine.getIndexesManager().getAllClientsSubscribeService(service)) {
                Subscriber subscriber = delayTaskEngine.getClientManager().getClient(each).getSubscriber(service);
                delayTaskEngine.getPushExecuteService().doPush(each, subscriber, serviceInfo);
            }
        } catch (Exception e) {
            Loggers.PUSH.error("Push task for service" + service.getGroupedServiceName() + " execute failed ", e);
            delayTaskEngine.addTask(service, new PushDelayTask(service, 1000L));
        }
    }
}
