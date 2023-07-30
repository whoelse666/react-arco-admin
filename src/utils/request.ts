import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Modal, Message } from '@arco-design/web-react';
const service = axios.create({
  // baseURL: 'http://localhost:3000/',
  timeout: 5000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    console.log('err===' + error);
    let message = '';
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = error.response?.data?.message || 'token失效，请重新登录';
        Modal.confirm({
          title: '没有权限',
          content: message,
          okText: '去登录',
          cancelText: '取消',
          onOk: () => {
            // 清除过期令牌
            localStorage.removeItem('token');
            localStorage.removeItem('userStatus');
            window.location.href = '/login';
          },
        });
        break;
      case 403:
        message = error.response?.data?.message || '拒绝访问';
        break;
      case 404:
        message = error.response?.data?.message || '请求地址错误';
        break;
      case 500:
        message = error.response?.data?.message || '服务器故障';
        break;
      default:
        message = error.response?.data?.message || '网络连接故障';
    }
    Message.error(message);
    return Promise.reject(error);
  }
);

export default service;
