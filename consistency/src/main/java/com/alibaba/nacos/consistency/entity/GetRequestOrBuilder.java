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

// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: Data.proto

package com.alibaba.nacos.consistency.entity;

public interface GetRequestOrBuilder extends
    // @@protoc_insertion_point(interface_extends:GetRequest)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>string group = 1;</code>
   */
  String getGroup();
  /**
   * <code>string group = 1;</code>
   */
  com.google.protobuf.ByteString
      getGroupBytes();

  /**
   * <code>bytes data = 2;</code>
   */
  com.google.protobuf.ByteString getData();

  /**
   * <code>map&lt;string, string&gt; extendInfo = 3;</code>
   */
  int getExtendInfoCount();
  /**
   * <code>map&lt;string, string&gt; extendInfo = 3;</code>
   */
  boolean containsExtendInfo(String key);
  /**
   * Use {@link #getExtendInfoMap()} instead.
   */
  @Deprecated
  java.util.Map<String, String>
  getExtendInfo();
  /**
   * <code>map&lt;string, string&gt; extendInfo = 3;</code>
   */
  java.util.Map<String, String>
  getExtendInfoMap();
  /**
   * <code>map&lt;string, string&gt; extendInfo = 3;</code>
   */

  String getExtendInfoOrDefault(String key, String defaultValue);
  /**
   * <code>map&lt;string, string&gt; extendInfo = 3;</code>
   */

  String getExtendInfoOrThrow(String key);
}
