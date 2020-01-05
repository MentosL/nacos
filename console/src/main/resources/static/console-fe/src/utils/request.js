import axios from 'axios';
import qs from 'qs';
import { Message } from '@alifd/next';
// import { SUCCESS_RESULT_CODE } from '../constants';

const API_GENERAL_ERROR_MESSAGE = 'Request error, please try again later!';

const request = () => {
  const instance = axios.create();

  instance.interceptors.request.use(
    function(config) {
      if (['post', 'put'].includes(config.method)) {
        config.data = qs.stringify(config.data);
        config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => {
      const { success, resultCode, resultMessage = API_GENERAL_ERROR_MESSAGE } = response.data;
      // if (!success && resultCode !== SUCCESS_RESULT_CODE) {
      //   Message.error(resultMessage);
      //   return Promise.reject(new Error(resultMessage));
      // }
      return response.data;
    },
    error => {
      if (error.response) {
        const { data, status } = error.response;
        Message.error(data && typeof data === 'string' ? data : `HTTP ERROR: ${status}`);
      } else {
        Message.error(API_GENERAL_ERROR_MESSAGE);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default request();
