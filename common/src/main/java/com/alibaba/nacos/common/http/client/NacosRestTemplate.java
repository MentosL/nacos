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

package com.alibaba.nacos.common.http.client;

import com.alibaba.nacos.common.constant.HttpHeaderConsts;
import com.alibaba.nacos.common.http.param.Header;
import com.alibaba.nacos.common.http.param.MediaType;
import com.alibaba.nacos.common.http.param.Query;
import com.alibaba.nacos.common.model.RequestHttpEntity;
import com.alibaba.nacos.common.model.RestResult;
import com.alibaba.nacos.common.utils.HttpMethod;
import com.alibaba.nacos.common.utils.UriUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Type;
import java.net.URI;
import java.util.Map;

/**
 * NacosRestTemplate, refer to the design of Spring's RestTemplate
 *
 * @author mai.jh
 * @date 2020/5/24
 */
public class NacosRestTemplate implements RestOperations {

    private static final Logger logger = LoggerFactory.getLogger(NacosRestTemplate.class);

    private HttpClientRequest requestClient;

    public NacosRestTemplate(HttpClientRequest requestClient) {
        this.requestClient = requestClient;
    }

    @Override
    public <T> RestResult<T> get(String url, Header header, Query query, Type responseType) throws Exception {
        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.GET, new RequestHttpEntity(header, query), responseExtractor);
    }

    @Override
    public <T> RestResult<T> get(String url, Header header, Map<String, String> paramValues, Type responseType) throws Exception {
        RequestHttpEntity requestHttpEntity = new RequestHttpEntity(header, Query.newInstance().initParams(paramValues));

        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.GET, requestHttpEntity, responseExtractor);
    }

    @Override
    public <T> RestResult<T> getLarge(String url, Header header, Query query, Object body, Type responseType) throws Exception {
        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.GET_LARGE, new RequestHttpEntity(header, query, body), responseExtractor);
    }

    @Override
    public <T> RestResult<T> delete(String url, Header header, Query query, Type responseType) throws Exception {
        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.DELETE, new RequestHttpEntity(header, query), responseExtractor);
    }

    @Override
    public <T> RestResult<T> put(String url, Header header, Query query, Object body, Type responseType) throws Exception {
        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.PUT, new RequestHttpEntity(header, query, body), responseExtractor);
    }

    @Override
    public <T> RestResult<T> putJson(String url, Header header, Map<String, String> paramValues, String body, Type responseType) throws Exception {
        RequestHttpEntity requestHttpEntity = new RequestHttpEntity(
            header,
            Query.newInstance().initParams(paramValues),
            body);

        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.PUT, requestHttpEntity, responseExtractor);
    }

    @Override
    public <T> RestResult<T> putFrom(String url, Header header, Query query, Map<String, String> bodyValues, Type responseType) throws Exception {
        RequestHttpEntity requestHttpEntity = new RequestHttpEntity(
            header.addParam(HttpHeaderConsts.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED), query, bodyValues);
        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.PUT, requestHttpEntity, responseExtractor);
    }

    @Override
    public <T> RestResult<T> putFrom(String url, Header header, Map<String, String> paramValues, Map<String, String> bodyValues, Type responseType) throws Exception {
        RequestHttpEntity requestHttpEntity = new RequestHttpEntity(
            header.addParam(HttpHeaderConsts.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED),
            Query.newInstance().initParams(paramValues),
            bodyValues);

        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.PUT, requestHttpEntity, responseExtractor);
    }

    @Override
    public <T> RestResult<T> post(String url, Header header, Query query, Object body, Type responseType) throws Exception {
        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.POST, new RequestHttpEntity(header, query, body), responseExtractor);
    }

    @Override
    public <T> RestResult<T> postJson(String url, Header header, Map<String, String> paramValues, String body, Type responseType) throws Exception {
        RequestHttpEntity requestHttpEntity = new RequestHttpEntity(
            header,
            Query.newInstance().initParams(paramValues),
            body);

        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.POST, requestHttpEntity, responseExtractor);
    }

    @Override
    public <T> RestResult<T> postFrom(String url, Header header, Query query, Map<String, String> bodyValues, Type responseType) throws Exception {
        RequestHttpEntity requestHttpEntity = new RequestHttpEntity(
            header.addParam(HttpHeaderConsts.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED), query, bodyValues);
        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.POST, requestHttpEntity, responseExtractor);
    }

    @Override
    public <T> RestResult<T> postFrom(String url, Header header, Map<String, String> paramValues, Map<String, String> bodyValues, Type responseType) throws Exception {
        RequestHttpEntity requestHttpEntity = new RequestHttpEntity(
            header.addParam(HttpHeaderConsts.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED),
            Query.newInstance().initParams(paramValues),
            bodyValues);

        ResponseExtractor<RestResult<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.POST, requestHttpEntity, responseExtractor);
    }


    private <T> T execute(String url, String httpMethod, RequestHttpEntity requestEntity,
                          ResponseExtractor<T> responseExtractor) throws Exception {
        URI uri = UriUtils.buildUri(url, requestEntity.getQuery());
        if (logger.isDebugEnabled()) {
            logger.debug("HTTP " + httpMethod + " " + url);
        }
        HttpClientResponse response = null;
        try {
            response = requestClient.execute(uri, httpMethod, requestEntity);
            return responseExtractor.extractData(response);
        } finally {
            if (response != null) {
                response.close();
            }
        }
    }

    private <T> ResponseExtractor<RestResult<T>> responseEntityExtractor(Type responseType) {
        return new ResponseEntityExtractor<>(responseType);
    }


}
