/*
 * Copyright 1999-2020 Alibaba Group Holding Ltd.
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
// source: nacos_grpc_service.proto

package com.alibaba.nacos.api.grpc;

/**
 * Protobuf type {@code GrpcMetadata}
 */
public final class GrpcMetadata extends com.google.protobuf.GeneratedMessageV3 implements
        // @@protoc_insertion_point(message_implements:GrpcMetadata)
        GrpcMetadataOrBuilder {
  
  // Use GrpcMetadata.newBuilder() to construct.
  private GrpcMetadata(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  
  private GrpcMetadata() {
    name_ = "";
    clientIp_ = "";
    connectionId_ = "";
    version_ = "";
  }
  
  @Override
  public final com.google.protobuf.UnknownFieldSet getUnknownFields() {
    return com.google.protobuf.UnknownFieldSet.getDefaultInstance();
  }
  
  private GrpcMetadata(com.google.protobuf.CodedInputStream input,
          com.google.protobuf.ExtensionRegistryLite extensionRegistry)
          throws com.google.protobuf.InvalidProtocolBufferException {
    this();
    int mutable_bitField0_ = 0;
    try {
      boolean done = false;
      while (!done) {
        int tag = input.readTag();
        switch (tag) {
          case 0:
            done = true;
            break;
          default: {
            if (!input.skipField(tag)) {
              done = true;
            }
            break;
          }
          case 10: {
            String s = input.readStringRequireUtf8();
            
            name_ = s;
            break;
          }
          case 18: {
            String s = input.readStringRequireUtf8();
            
            clientIp_ = s;
            break;
          }
          case 26: {
            String s = input.readStringRequireUtf8();
            
            connectionId_ = s;
            break;
          }
          case 34: {
            com.google.protobuf.Timestamp.Builder subBuilder = null;
            if (createTime_ != null) {
              subBuilder = createTime_.toBuilder();
            }
            createTime_ = input.readMessage(com.google.protobuf.Timestamp.parser(), extensionRegistry);
            if (subBuilder != null) {
              subBuilder.mergeFrom(createTime_);
              createTime_ = subBuilder.buildPartial();
            }
            
            break;
          }
          case 42: {
            String s = input.readStringRequireUtf8();
            
            version_ = s;
            break;
          }
          case 50: {
            if (!((mutable_bitField0_ & 0x00000020) == 0x00000020)) {
              labels_ = com.google.protobuf.MapField.newMapField(LabelsDefaultEntryHolder.defaultEntry);
              mutable_bitField0_ |= 0x00000020;
            }
            com.google.protobuf.MapEntry<String, String> labels__ = input
                    .readMessage(LabelsDefaultEntryHolder.defaultEntry.getParserForType(), extensionRegistry);
            labels_.getMutableMap().put(labels__.getKey(), labels__.getValue());
            break;
          }
        }
      }
    } catch (com.google.protobuf.InvalidProtocolBufferException e) {
      throw e.setUnfinishedMessage(this);
    } catch (java.io.IOException e) {
      throw new com.google.protobuf.InvalidProtocolBufferException(e).setUnfinishedMessage(this);
    } finally {
      makeExtensionsImmutable();
    }
  }
  
  public static final com.google.protobuf.Descriptors.Descriptor getDescriptor() {
    return NacosGrpcService.internal_static_GrpcMetadata_descriptor;
  }
  
  @SuppressWarnings({"rawtypes"})
  protected com.google.protobuf.MapField internalGetMapField(int number) {
    switch (number) {
      case 6:
        return internalGetLabels();
      default:
        throw new RuntimeException("Invalid map field number: " + number);
    }
  }
  
  protected FieldAccessorTable internalGetFieldAccessorTable() {
    return NacosGrpcService.internal_static_GrpcMetadata_fieldAccessorTable
            .ensureFieldAccessorsInitialized(GrpcMetadata.class, GrpcMetadata.Builder.class);
  }
  
  private int bitField0_;
  
  public static final int NAME_FIELD_NUMBER = 1;
  
  private volatile Object name_;
  
  /**
   * <code>string name = 1;</code>
   */
  public String getName() {
    Object ref = name_;
    if (ref instanceof String) {
      return (String) ref;
    } else {
      com.google.protobuf.ByteString bs = (com.google.protobuf.ByteString) ref;
      String s = bs.toStringUtf8();
      name_ = s;
      return s;
    }
  }
  
  /**
   * <code>string name = 1;</code>
   */
  public com.google.protobuf.ByteString getNameBytes() {
    Object ref = name_;
    if (ref instanceof String) {
      com.google.protobuf.ByteString b = com.google.protobuf.ByteString.copyFromUtf8((String) ref);
      name_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
  }
  
  public static final int CLIENT_IP_FIELD_NUMBER = 2;
  
  private volatile Object clientIp_;
  
  /**
   * <code>string client_ip = 2;</code>
   */
  public String getClientIp() {
    Object ref = clientIp_;
    if (ref instanceof String) {
      return (String) ref;
    } else {
      com.google.protobuf.ByteString bs = (com.google.protobuf.ByteString) ref;
      String s = bs.toStringUtf8();
      clientIp_ = s;
      return s;
    }
  }
  
  /**
   * <code>string client_ip = 2;</code>
   */
  public com.google.protobuf.ByteString getClientIpBytes() {
    Object ref = clientIp_;
    if (ref instanceof String) {
      com.google.protobuf.ByteString b = com.google.protobuf.ByteString.copyFromUtf8((String) ref);
      clientIp_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
  }
  
  public static final int CONNECTION_ID_FIELD_NUMBER = 3;
  
  private volatile Object connectionId_;
  
  /**
   * <code>string connection_id = 3;</code>
   */
  public String getConnectionId() {
    Object ref = connectionId_;
    if (ref instanceof String) {
      return (String) ref;
    } else {
      com.google.protobuf.ByteString bs = (com.google.protobuf.ByteString) ref;
      String s = bs.toStringUtf8();
      connectionId_ = s;
      return s;
    }
  }
  
  /**
   * <code>string connection_id = 3;</code>
   */
  public com.google.protobuf.ByteString getConnectionIdBytes() {
    Object ref = connectionId_;
    if (ref instanceof String) {
      com.google.protobuf.ByteString b = com.google.protobuf.ByteString.copyFromUtf8((String) ref);
      connectionId_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
  }
  
  public static final int CREATE_TIME_FIELD_NUMBER = 4;
  
  private com.google.protobuf.Timestamp createTime_;
  
  /**
   * <code>.google.protobuf.Timestamp create_time = 4;</code>
   */
  public boolean hasCreateTime() {
    return createTime_ != null;
  }
  
  /**
   * <code>.google.protobuf.Timestamp create_time = 4;</code>
   */
  public com.google.protobuf.Timestamp getCreateTime() {
    return createTime_ == null ? com.google.protobuf.Timestamp.getDefaultInstance() : createTime_;
  }
  
  /**
   * <code>.google.protobuf.Timestamp create_time = 4;</code>
   */
  public com.google.protobuf.TimestampOrBuilder getCreateTimeOrBuilder() {
    return getCreateTime();
  }
  
  public static final int VERSION_FIELD_NUMBER = 5;
  
  private volatile Object version_;
  
  /**
   * <code>string version = 5;</code>
   */
  public String getVersion() {
    Object ref = version_;
    if (ref instanceof String) {
      return (String) ref;
    } else {
      com.google.protobuf.ByteString bs = (com.google.protobuf.ByteString) ref;
      String s = bs.toStringUtf8();
      version_ = s;
      return s;
    }
  }
  
  /**
   * <code>string version = 5;</code>
   */
  public com.google.protobuf.ByteString getVersionBytes() {
    Object ref = version_;
    if (ref instanceof String) {
      com.google.protobuf.ByteString b = com.google.protobuf.ByteString.copyFromUtf8((String) ref);
      version_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
  }
  
  public static final int LABELS_FIELD_NUMBER = 6;
  
  private static final class LabelsDefaultEntryHolder {
    
    static final com.google.protobuf.MapEntry<String, String> defaultEntry = com.google.protobuf.MapEntry.<String, String>newDefaultInstance(
                NacosGrpcService.internal_static_GrpcMetadata_LabelsEntry_descriptor,
            com.google.protobuf.WireFormat.FieldType.STRING, "", com.google.protobuf.WireFormat.FieldType.STRING, "");
  }
  
  private com.google.protobuf.MapField<String, String> labels_;
  
  private com.google.protobuf.MapField<String, String> internalGetLabels() {
    if (labels_ == null) {
      return com.google.protobuf.MapField.emptyMapField(LabelsDefaultEntryHolder.defaultEntry);
    }
    return labels_;
  }
  
  public int getLabelsCount() {
    return internalGetLabels().getMap().size();
  }
  
  /**
   * <code>map&lt;string, string&gt; labels = 6;</code>
   */
  
  public boolean containsLabels(String key) {
    if (key == null) {
      throw new NullPointerException();
    }
    return internalGetLabels().getMap().containsKey(key);
  }
  
  /**
   * Use {@link #getLabelsMap()} instead.
   */
  @Deprecated
  public java.util.Map<String, String> getLabels() {
    return getLabelsMap();
  }
  
  /**
   * <code>map&lt;string, string&gt; labels = 6;</code>
   */
  
  public java.util.Map<String, String> getLabelsMap() {
    return internalGetLabels().getMap();
  }
  
  /**
   * <code>map&lt;string, string&gt; labels = 6;</code>
   */
  
  public String getLabelsOrDefault(String key, String defaultValue) {
    if (key == null) {
      throw new NullPointerException();
    }
    java.util.Map<String, String> map = internalGetLabels().getMap();
    return map.containsKey(key) ? map.get(key) : defaultValue;
  }
  
  /**
   * <code>map&lt;string, string&gt; labels = 6;</code>
   */
  
  public String getLabelsOrThrow(String key) {
    if (key == null) {
      throw new NullPointerException();
    }
    java.util.Map<String, String> map = internalGetLabels().getMap();
    if (!map.containsKey(key)) {
      throw new IllegalArgumentException();
    }
    return map.get(key);
  }
  
  private byte memoizedIsInitialized = -1;
  
  public final boolean isInitialized() {
    byte isInitialized = memoizedIsInitialized;
    if (isInitialized == 1) {
      return true;
    }
    if (isInitialized == 0) {
      return false;
    }
    
    memoizedIsInitialized = 1;
    return true;
  }
  
  public void writeTo(com.google.protobuf.CodedOutputStream output) throws java.io.IOException {
    if (!getNameBytes().isEmpty()) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 1, name_);
    }
    if (!getClientIpBytes().isEmpty()) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 2, clientIp_);
    }
    if (!getConnectionIdBytes().isEmpty()) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 3, connectionId_);
    }
    if (createTime_ != null) {
      output.writeMessage(4, getCreateTime());
    }
    if (!getVersionBytes().isEmpty()) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 5, version_);
    }
    com.google.protobuf.GeneratedMessageV3
            .serializeStringMapTo(output, internalGetLabels(), LabelsDefaultEntryHolder.defaultEntry, 6);
  }
  
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) {
      return size;
    }
    
    size = 0;
    if (!getNameBytes().isEmpty()) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(1, name_);
    }
    if (!getClientIpBytes().isEmpty()) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(2, clientIp_);
    }
    if (!getConnectionIdBytes().isEmpty()) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(3, connectionId_);
    }
    if (createTime_ != null) {
      size += com.google.protobuf.CodedOutputStream.computeMessageSize(4, getCreateTime());
    }
    if (!getVersionBytes().isEmpty()) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(5, version_);
    }
    for (java.util.Map.Entry<String, String> entry : internalGetLabels().getMap().entrySet()) {
      com.google.protobuf.MapEntry<String, String> labels__ = LabelsDefaultEntryHolder.defaultEntry.newBuilderForType()
              .setKey(entry.getKey()).setValue(entry.getValue()).build();
      size += com.google.protobuf.CodedOutputStream.computeMessageSize(6, labels__);
    }
    memoizedSize = size;
    return size;
  }
  
  private static final long serialVersionUID = 0L;
  
  @Override
  public boolean equals(final Object obj) {
    if (obj == this) {
      return true;
    }
    if (!(obj instanceof GrpcMetadata)) {
      return super.equals(obj);
    }
    GrpcMetadata other = (GrpcMetadata) obj;
    
    boolean result = true;
    result = result && getName().equals(other.getName());
    result = result && getClientIp().equals(other.getClientIp());
    result = result && getConnectionId().equals(other.getConnectionId());
    result = result && (hasCreateTime() == other.hasCreateTime());
    if (hasCreateTime()) {
      result = result && getCreateTime().equals(other.getCreateTime());
    }
    result = result && getVersion().equals(other.getVersion());
    result = result && internalGetLabels().equals(other.internalGetLabels());
    return result;
  }
  
  @Override
  public int hashCode() {
    if (memoizedHashCode != 0) {
      return memoizedHashCode;
    }
    int hash = 41;
    hash = (19 * hash) + getDescriptor().hashCode();
    hash = (37 * hash) + NAME_FIELD_NUMBER;
    hash = (53 * hash) + getName().hashCode();
    hash = (37 * hash) + CLIENT_IP_FIELD_NUMBER;
    hash = (53 * hash) + getClientIp().hashCode();
    hash = (37 * hash) + CONNECTION_ID_FIELD_NUMBER;
    hash = (53 * hash) + getConnectionId().hashCode();
    if (hasCreateTime()) {
      hash = (37 * hash) + CREATE_TIME_FIELD_NUMBER;
      hash = (53 * hash) + getCreateTime().hashCode();
    }
    hash = (37 * hash) + VERSION_FIELD_NUMBER;
    hash = (53 * hash) + getVersion().hashCode();
    if (!internalGetLabels().getMap().isEmpty()) {
      hash = (37 * hash) + LABELS_FIELD_NUMBER;
      hash = (53 * hash) + internalGetLabels().hashCode();
    }
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }
  
  public static GrpcMetadata parseFrom(java.nio.ByteBuffer data)
          throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  
  public static GrpcMetadata parseFrom(java.nio.ByteBuffer data,
          com.google.protobuf.ExtensionRegistryLite extensionRegistry)
          throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  
  public static GrpcMetadata parseFrom(com.google.protobuf.ByteString data)
          throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  
  public static GrpcMetadata parseFrom(com.google.protobuf.ByteString data,
          com.google.protobuf.ExtensionRegistryLite extensionRegistry)
          throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  
  public static GrpcMetadata parseFrom(byte[] data) throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  
  public static GrpcMetadata parseFrom(byte[] data, com.google.protobuf.ExtensionRegistryLite extensionRegistry)
          throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  
  public static GrpcMetadata parseFrom(java.io.InputStream input) throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3.parseWithIOException(PARSER, input);
  }
  
  public static GrpcMetadata parseFrom(java.io.InputStream input,
          com.google.protobuf.ExtensionRegistryLite extensionRegistry) throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3.parseWithIOException(PARSER, input, extensionRegistry);
  }
  
  public static GrpcMetadata parseDelimitedFrom(java.io.InputStream input) throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3.parseDelimitedWithIOException(PARSER, input);
  }
  
  public static GrpcMetadata parseDelimitedFrom(java.io.InputStream input,
          com.google.protobuf.ExtensionRegistryLite extensionRegistry) throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3.parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  
  public static GrpcMetadata parseFrom(com.google.protobuf.CodedInputStream input) throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3.parseWithIOException(PARSER, input);
  }
  
  public static GrpcMetadata parseFrom(com.google.protobuf.CodedInputStream input,
          com.google.protobuf.ExtensionRegistryLite extensionRegistry) throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3.parseWithIOException(PARSER, input, extensionRegistry);
  }
  
  public Builder newBuilderForType() {
    return newBuilder();
  }
  
  public static Builder newBuilder() {
    return DEFAULT_INSTANCE.toBuilder();
  }
  
  public static Builder newBuilder(GrpcMetadata prototype) {
    return DEFAULT_INSTANCE.toBuilder().mergeFrom(prototype);
  }
  
  public Builder toBuilder() {
    return this == DEFAULT_INSTANCE ? new Builder() : new Builder().mergeFrom(this);
  }
  
  @Override
  protected Builder newBuilderForType(BuilderParent parent) {
    Builder builder = new Builder(parent);
    return builder;
  }
  
  /**
   * Protobuf type {@code GrpcMetadata}
   */
  public static final class Builder extends com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
          // @@protoc_insertion_point(builder_implements:GrpcMetadata)
          GrpcMetadataOrBuilder {
    
    public static final com.google.protobuf.Descriptors.Descriptor getDescriptor() {
      return NacosGrpcService.internal_static_GrpcMetadata_descriptor;
    }
    
    @SuppressWarnings({"rawtypes"})
    protected com.google.protobuf.MapField internalGetMapField(int number) {
      switch (number) {
        case 6:
          return internalGetLabels();
        default:
          throw new RuntimeException("Invalid map field number: " + number);
      }
    }
    
    @SuppressWarnings({"rawtypes"})
    protected com.google.protobuf.MapField internalGetMutableMapField(int number) {
      switch (number) {
        case 6:
          return internalGetMutableLabels();
        default:
          throw new RuntimeException("Invalid map field number: " + number);
      }
    }
    
    protected FieldAccessorTable internalGetFieldAccessorTable() {
      return NacosGrpcService.internal_static_GrpcMetadata_fieldAccessorTable
              .ensureFieldAccessorsInitialized(GrpcMetadata.class, GrpcMetadata.Builder.class);
    }
    
    // Construct using com.alibaba.nacos.api.grpc.GrpcMetadata.newBuilder()
    private Builder() {
      maybeForceBuilderInitialization();
    }
    
    private Builder(BuilderParent parent) {
      super(parent);
      maybeForceBuilderInitialization();
    }
    
    private void maybeForceBuilderInitialization() {
      if (com.google.protobuf.GeneratedMessageV3.alwaysUseFieldBuilders) {
      }
    }
    
    public Builder clear() {
      super.clear();
      name_ = "";
      
      clientIp_ = "";
      
      connectionId_ = "";
      
      if (createTimeBuilder_ == null) {
        createTime_ = null;
      } else {
        createTime_ = null;
        createTimeBuilder_ = null;
      }
      version_ = "";
      
      internalGetMutableLabels().clear();
      return this;
    }
    
    public com.google.protobuf.Descriptors.Descriptor getDescriptorForType() {
      return NacosGrpcService.internal_static_GrpcMetadata_descriptor;
    }
    
    public GrpcMetadata getDefaultInstanceForType() {
      return GrpcMetadata.getDefaultInstance();
    }
    
    public GrpcMetadata build() {
      GrpcMetadata result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }
    
    public GrpcMetadata buildPartial() {
      GrpcMetadata result = new GrpcMetadata(this);
      int from_bitField0_ = bitField0_;
      int to_bitField0_ = 0;
      result.name_ = name_;
      result.clientIp_ = clientIp_;
      result.connectionId_ = connectionId_;
      if (createTimeBuilder_ == null) {
        result.createTime_ = createTime_;
      } else {
        result.createTime_ = createTimeBuilder_.build();
      }
      result.version_ = version_;
      result.labels_ = internalGetLabels();
      result.labels_.makeImmutable();
      result.bitField0_ = to_bitField0_;
      onBuilt();
      return result;
    }
    
    public Builder clone() {
      return (Builder) super.clone();
    }
    
    public Builder setField(com.google.protobuf.Descriptors.FieldDescriptor field, Object value) {
      return (Builder) super.setField(field, value);
    }
    
    public Builder clearField(com.google.protobuf.Descriptors.FieldDescriptor field) {
      return (Builder) super.clearField(field);
    }
    
    public Builder clearOneof(com.google.protobuf.Descriptors.OneofDescriptor oneof) {
      return (Builder) super.clearOneof(oneof);
    }
    
    public Builder setRepeatedField(com.google.protobuf.Descriptors.FieldDescriptor field, int index, Object value) {
      return (Builder) super.setRepeatedField(field, index, value);
    }
    
    public Builder addRepeatedField(com.google.protobuf.Descriptors.FieldDescriptor field, Object value) {
      return (Builder) super.addRepeatedField(field, value);
    }
    
    public Builder mergeFrom(com.google.protobuf.Message other) {
      if (other instanceof GrpcMetadata) {
        return mergeFrom((GrpcMetadata) other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }
    
    public Builder mergeFrom(GrpcMetadata other) {
      if (other == GrpcMetadata.getDefaultInstance()) {
        return this;
      }
      if (!other.getName().isEmpty()) {
        name_ = other.name_;
        onChanged();
      }
      if (!other.getClientIp().isEmpty()) {
        clientIp_ = other.clientIp_;
        onChanged();
      }
      if (!other.getConnectionId().isEmpty()) {
        connectionId_ = other.connectionId_;
        onChanged();
      }
      if (other.hasCreateTime()) {
        mergeCreateTime(other.getCreateTime());
      }
      if (!other.getVersion().isEmpty()) {
        version_ = other.version_;
        onChanged();
      }
      internalGetMutableLabels().mergeFrom(other.internalGetLabels());
      onChanged();
      return this;
    }
    
    public final boolean isInitialized() {
      return true;
    }
    
    public Builder mergeFrom(com.google.protobuf.CodedInputStream input,
            com.google.protobuf.ExtensionRegistryLite extensionRegistry) throws java.io.IOException {
      GrpcMetadata parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (GrpcMetadata) e.getUnfinishedMessage();
        throw e.unwrapIOException();
      } finally {
        if (parsedMessage != null) {
          mergeFrom(parsedMessage);
        }
      }
      return this;
    }
    
    private int bitField0_;
    
    private Object name_ = "";
    
    /**
     * <code>string name = 1;</code>
     */
    public String getName() {
      Object ref = name_;
      if (!(ref instanceof String)) {
        com.google.protobuf.ByteString bs = (com.google.protobuf.ByteString) ref;
        String s = bs.toStringUtf8();
        name_ = s;
        return s;
      } else {
        return (String) ref;
      }
    }
    
    /**
     * <code>string name = 1;</code>
     */
    public com.google.protobuf.ByteString getNameBytes() {
      Object ref = name_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = com.google.protobuf.ByteString.copyFromUtf8((String) ref);
        name_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }
    
    /**
     * <code>string name = 1;</code>
     */
    public Builder setName(String value) {
      if (value == null) {
        throw new NullPointerException();
      }
      
      name_ = value;
      onChanged();
      return this;
    }
    
    /**
     * <code>string name = 1;</code>
     */
    public Builder clearName() {
      
      name_ = getDefaultInstance().getName();
      onChanged();
      return this;
    }
    
    /**
     * <code>string name = 1;</code>
     */
    public Builder setNameBytes(com.google.protobuf.ByteString value) {
      if (value == null) {
        throw new NullPointerException();
      }
      checkByteStringIsUtf8(value);
      
      name_ = value;
      onChanged();
      return this;
    }
    
    private Object clientIp_ = "";
    
    /**
     * <code>string client_ip = 2;</code>
     */
    public String getClientIp() {
      Object ref = clientIp_;
      if (!(ref instanceof String)) {
        com.google.protobuf.ByteString bs = (com.google.protobuf.ByteString) ref;
        String s = bs.toStringUtf8();
        clientIp_ = s;
        return s;
      } else {
        return (String) ref;
      }
    }
    
    /**
     * <code>string client_ip = 2;</code>
     */
    public com.google.protobuf.ByteString getClientIpBytes() {
      Object ref = clientIp_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = com.google.protobuf.ByteString.copyFromUtf8((String) ref);
        clientIp_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }
    
    /**
     * <code>string client_ip = 2;</code>
     */
    public Builder setClientIp(String value) {
      if (value == null) {
        throw new NullPointerException();
      }
      
      clientIp_ = value;
      onChanged();
      return this;
    }
    
    /**
     * <code>string client_ip = 2;</code>
     */
    public Builder clearClientIp() {
      
      clientIp_ = getDefaultInstance().getClientIp();
      onChanged();
      return this;
    }
    
    /**
     * <code>string client_ip = 2;</code>
     */
    public Builder setClientIpBytes(com.google.protobuf.ByteString value) {
      if (value == null) {
        throw new NullPointerException();
      }
      checkByteStringIsUtf8(value);
      
      clientIp_ = value;
      onChanged();
      return this;
    }
    
    private Object connectionId_ = "";
    
    /**
     * <code>string connection_id = 3;</code>
     */
    public String getConnectionId() {
      Object ref = connectionId_;
      if (!(ref instanceof String)) {
        com.google.protobuf.ByteString bs = (com.google.protobuf.ByteString) ref;
        String s = bs.toStringUtf8();
        connectionId_ = s;
        return s;
      } else {
        return (String) ref;
      }
    }
    
    /**
     * <code>string connection_id = 3;</code>
     */
    public com.google.protobuf.ByteString getConnectionIdBytes() {
      Object ref = connectionId_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = com.google.protobuf.ByteString.copyFromUtf8((String) ref);
        connectionId_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }
    
    /**
     * <code>string connection_id = 3;</code>
     */
    public Builder setConnectionId(String value) {
      if (value == null) {
        throw new NullPointerException();
      }
      
      connectionId_ = value;
      onChanged();
      return this;
    }
    
    /**
     * <code>string connection_id = 3;</code>
     */
    public Builder clearConnectionId() {
      
      connectionId_ = getDefaultInstance().getConnectionId();
      onChanged();
      return this;
    }
    
    /**
     * <code>string connection_id = 3;</code>
     */
    public Builder setConnectionIdBytes(com.google.protobuf.ByteString value) {
      if (value == null) {
        throw new NullPointerException();
      }
      checkByteStringIsUtf8(value);
      
      connectionId_ = value;
      onChanged();
      return this;
    }
    
    private com.google.protobuf.Timestamp createTime_ = null;
    
    private com.google.protobuf.SingleFieldBuilderV3<com.google.protobuf.Timestamp, com.google.protobuf.Timestamp.Builder, com.google.protobuf.TimestampOrBuilder> createTimeBuilder_;
    
    /**
     * <code>.google.protobuf.Timestamp create_time = 4;</code>
     */
    public boolean hasCreateTime() {
      return createTimeBuilder_ != null || createTime_ != null;
    }
    
    /**
     * <code>.google.protobuf.Timestamp create_time = 4;</code>
     */
    public com.google.protobuf.Timestamp getCreateTime() {
      if (createTimeBuilder_ == null) {
        return createTime_ == null ? com.google.protobuf.Timestamp.getDefaultInstance() : createTime_;
      } else {
        return createTimeBuilder_.getMessage();
      }
    }
    
    /**
     * <code>.google.protobuf.Timestamp create_time = 4;</code>
     */
    public Builder setCreateTime(com.google.protobuf.Timestamp value) {
      if (createTimeBuilder_ == null) {
        if (value == null) {
          throw new NullPointerException();
        }
        createTime_ = value;
        onChanged();
      } else {
        createTimeBuilder_.setMessage(value);
      }
      
      return this;
    }
    
    /**
     * <code>.google.protobuf.Timestamp create_time = 4;</code>
     */
    public Builder setCreateTime(com.google.protobuf.Timestamp.Builder builderForValue) {
      if (createTimeBuilder_ == null) {
        createTime_ = builderForValue.build();
        onChanged();
      } else {
        createTimeBuilder_.setMessage(builderForValue.build());
      }
      
      return this;
    }
    
    /**
     * <code>.google.protobuf.Timestamp create_time = 4;</code>
     */
    public Builder mergeCreateTime(com.google.protobuf.Timestamp value) {
      if (createTimeBuilder_ == null) {
        if (createTime_ != null) {
          createTime_ = com.google.protobuf.Timestamp.newBuilder(createTime_).mergeFrom(value).buildPartial();
        } else {
          createTime_ = value;
        }
        onChanged();
      } else {
        createTimeBuilder_.mergeFrom(value);
      }
      
      return this;
    }
    
    /**
     * <code>.google.protobuf.Timestamp create_time = 4;</code>
     */
    public Builder clearCreateTime() {
      if (createTimeBuilder_ == null) {
        createTime_ = null;
        onChanged();
      } else {
        createTime_ = null;
        createTimeBuilder_ = null;
      }
      
      return this;
    }
    
    /**
     * <code>.google.protobuf.Timestamp create_time = 4;</code>
     */
    public com.google.protobuf.Timestamp.Builder getCreateTimeBuilder() {
      
      onChanged();
      return getCreateTimeFieldBuilder().getBuilder();
    }
    
    /**
     * <code>.google.protobuf.Timestamp create_time = 4;</code>
     */
    public com.google.protobuf.TimestampOrBuilder getCreateTimeOrBuilder() {
      if (createTimeBuilder_ != null) {
        return createTimeBuilder_.getMessageOrBuilder();
      } else {
        return createTime_ == null ? com.google.protobuf.Timestamp.getDefaultInstance() : createTime_;
      }
    }
    
    /**
     * <code>.google.protobuf.Timestamp create_time = 4;</code>
     */
    private com.google.protobuf.SingleFieldBuilderV3<com.google.protobuf.Timestamp, com.google.protobuf.Timestamp.Builder, com.google.protobuf.TimestampOrBuilder> getCreateTimeFieldBuilder() {
      if (createTimeBuilder_ == null) {
        createTimeBuilder_ = new com.google.protobuf.SingleFieldBuilderV3<com.google.protobuf.Timestamp, com.google.protobuf.Timestamp.Builder, com.google.protobuf.TimestampOrBuilder>(
                getCreateTime(), getParentForChildren(), isClean());
        createTime_ = null;
      }
      return createTimeBuilder_;
    }
    
    private Object version_ = "";
    
    /**
     * <code>string version = 5;</code>
     */
    public String getVersion() {
      Object ref = version_;
      if (!(ref instanceof String)) {
        com.google.protobuf.ByteString bs = (com.google.protobuf.ByteString) ref;
        String s = bs.toStringUtf8();
        version_ = s;
        return s;
      } else {
        return (String) ref;
      }
    }
    
    /**
     * <code>string version = 5;</code>
     */
    public com.google.protobuf.ByteString getVersionBytes() {
      Object ref = version_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = com.google.protobuf.ByteString.copyFromUtf8((String) ref);
        version_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }
    
    /**
     * <code>string version = 5;</code>
     */
    public Builder setVersion(String value) {
      if (value == null) {
        throw new NullPointerException();
      }
      
      version_ = value;
      onChanged();
      return this;
    }
    
    /**
     * <code>string version = 5;</code>
     */
    public Builder clearVersion() {
      
      version_ = getDefaultInstance().getVersion();
      onChanged();
      return this;
    }
    
    /**
     * <code>string version = 5;</code>
     */
    public Builder setVersionBytes(com.google.protobuf.ByteString value) {
      if (value == null) {
        throw new NullPointerException();
      }
      checkByteStringIsUtf8(value);
      
      version_ = value;
      onChanged();
      return this;
    }
    
    private com.google.protobuf.MapField<String, String> labels_;
    
    private com.google.protobuf.MapField<String, String> internalGetLabels() {
      if (labels_ == null) {
        return com.google.protobuf.MapField.emptyMapField(LabelsDefaultEntryHolder.defaultEntry);
      }
      return labels_;
    }
    
    private com.google.protobuf.MapField<String, String> internalGetMutableLabels() {
      onChanged();
      ;
      if (labels_ == null) {
        labels_ = com.google.protobuf.MapField.newMapField(LabelsDefaultEntryHolder.defaultEntry);
      }
      if (!labels_.isMutable()) {
        labels_ = labels_.copy();
      }
      return labels_;
    }
    
    public int getLabelsCount() {
      return internalGetLabels().getMap().size();
    }
    
    /**
     * <code>map&lt;string, string&gt; labels = 6;</code>
     */
    
    public boolean containsLabels(String key) {
      if (key == null) {
        throw new NullPointerException();
      }
      return internalGetLabels().getMap().containsKey(key);
    }
    
    /**
     * Use {@link #getLabelsMap()} instead.
     */
    @Deprecated
    public java.util.Map<String, String> getLabels() {
      return getLabelsMap();
    }
    
    /**
     * <code>map&lt;string, string&gt; labels = 6;</code>
     */
    
    public java.util.Map<String, String> getLabelsMap() {
      return internalGetLabels().getMap();
    }
    
    /**
     * <code>map&lt;string, string&gt; labels = 6;</code>
     */
    
    public String getLabelsOrDefault(String key, String defaultValue) {
      if (key == null) {
        throw new NullPointerException();
      }
      java.util.Map<String, String> map = internalGetLabels().getMap();
      return map.containsKey(key) ? map.get(key) : defaultValue;
    }
    
    /**
     * <code>map&lt;string, string&gt; labels = 6;</code>
     */
    
    public String getLabelsOrThrow(String key) {
      if (key == null) {
        throw new NullPointerException();
      }
      java.util.Map<String, String> map = internalGetLabels().getMap();
      if (!map.containsKey(key)) {
        throw new IllegalArgumentException();
      }
      return map.get(key);
    }
    
    public Builder clearLabels() {
      internalGetMutableLabels().getMutableMap().clear();
      return this;
    }
    
    /**
     * <code>map&lt;string, string&gt; labels = 6;</code>
     */
    
    public Builder removeLabels(String key) {
      if (key == null) {
        throw new NullPointerException();
      }
      internalGetMutableLabels().getMutableMap().remove(key);
      return this;
    }
    
    /**
     * Use alternate mutation accessors instead.
     */
    @Deprecated
    public java.util.Map<String, String> getMutableLabels() {
      return internalGetMutableLabels().getMutableMap();
    }
    
    /**
     * <code>map&lt;string, string&gt; labels = 6;</code>
     */
    public Builder putLabels(String key, String value) {
      if (key == null) {
        throw new NullPointerException();
      }
      if (value == null) {
        throw new NullPointerException();
      }
      internalGetMutableLabels().getMutableMap().put(key, value);
      return this;
    }
    
    /**
     * <code>map&lt;string, string&gt; labels = 6;</code>
     */
    
    public Builder putAllLabels(java.util.Map<String, String> values) {
      internalGetMutableLabels().getMutableMap().putAll(values);
      return this;
    }
    
    public final Builder setUnknownFields(final com.google.protobuf.UnknownFieldSet unknownFields) {
      return this;
    }
    
    public final Builder mergeUnknownFields(final com.google.protobuf.UnknownFieldSet unknownFields) {
      return this;
    }
    
    // @@protoc_insertion_point(builder_scope:GrpcMetadata)
  }
  
  // @@protoc_insertion_point(class_scope:GrpcMetadata)
  private static final GrpcMetadata DEFAULT_INSTANCE;
  
  static {
    DEFAULT_INSTANCE = new GrpcMetadata();
  }
  
  public static GrpcMetadata getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }
  
  private static final com.google.protobuf.Parser<GrpcMetadata> PARSER = new com.google.protobuf.AbstractParser<GrpcMetadata>() {
    public GrpcMetadata parsePartialFrom(com.google.protobuf.CodedInputStream input,
            com.google.protobuf.ExtensionRegistryLite extensionRegistry)
            throws com.google.protobuf.InvalidProtocolBufferException {
      return new GrpcMetadata(input, extensionRegistry);
    }
  };
  
  public static com.google.protobuf.Parser<GrpcMetadata> parser() {
    return PARSER;
  }
  
  @Override
  public com.google.protobuf.Parser<GrpcMetadata> getParserForType() {
    return PARSER;
  }
  
  public GrpcMetadata getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}

