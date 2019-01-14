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
package com.alibaba.nacos.naming.misc;

/**
 * All switch entries for naming.
 *
 * @author <a href="mailto:zpf.073@gmail.com">nkorange</a>
 */
public class SwitchEntry {

    public static final String BATCH = "batch";
    public static final String DISTRO_THRESHOLD = "distroThreshold";
    public static final String ENABLE_ALL_DOM_NAME_CACHE = "enableAllDomNameCache";
    public static final String INCREMENTAL_LIST = "incrementalList";
    public static final String HEALTH_CHECK_WHITLE_LIST = "healthCheckWhiteList";
    public static final String CLIENT_BEAT_INTERVAL = "clientBeatInterval";
    public static final String PUSH_VERSION = "pushVersion";
    public static final String CLIENT_JAVA = "java";
    public static final String CLIENT_C = "c";
    public static final String CLIENT_GO = "go";
    public static final String CLIENT_PYTHON = "python";
    public static final String CLIENT_TENGINE = "python";
    public static final String TRAFFIC_SCHEDULING_VERSION = "trafficSchedulingVersion";
    public static final String PUSH_CACHE_MILLIS = "pushCacheMillis";
    public static final String DEFAULT_CACHE_MILLIS = "defaultCacheMillis";
    public static final String MASTERS = "masters";
    public static final String DISTRO = "distro";
    public static final String CHECK = "check";
    public static final String DEFAULT_HEALTH_CHECK_MODE = "defaultHealthCheckMode";
    public static final String DOM_STATUS_SYNC_PERIOD = "domStatusSynchronizationPeriodMillis";
    public static final String SERVER_STATUS_SYNC_PERIOD = "serverStatusSynchronizationPeriodMillis";
    public static final String HEALTH_CHECK_TIMES = "healthCheckTimes";
    public static final String DISABLE_ADD_IP = "disableAddIP";
    public static final String ENABLE_CACHE = "enableCache";
    public static final String SEND_BEAT_ONLY = "sendBeatOnly";
    public static final String LIMITED_URL_MAP = "limitedUrlMap";
    public static final String ENABLE_STANDALONE = "enableStandalone";
    public static final int MIN_PUSH_CACHE_TIME_MIILIS = 10000;
    public static final int MIN_CACHE_TIME_MIILIS = 1000;
    public static final int MIN_DOM_SYNC_TIME_MIILIS = 5000;
    public static final int MIN_SERVER_SYNC_TIME_MIILIS = 15000;

    public static final String ACTION_ADD = "add";
    public static final String ACTION_REPLACE = "replace";
    public static final String ACTION_VIEW = "view";
    public static final String ACTION_DELETE = "delete";
    public static final String ACTION_UPDATE = "update";
    public static final String ACTION_CLEAN = "clean";
    public static final String ACTION_OVERVIEW = "overview";

    public static final String PARAM_JSON = "json";
}
