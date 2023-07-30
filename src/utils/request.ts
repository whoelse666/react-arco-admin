import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Modal, Message } from '@arco-design/web-react';

const service = axios.create({
  // baseURL: 'http://localhost:3000/',
  timeout: 5000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 获取本地存储的token，若存在附加在请求头上
    const token = localStorage.getItem('token');
    if (token) {
      // 在这里附加令牌
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    console.log('err-' + error); // for debug

    // 处理 HTTP 网络错误
    let message = '';
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = error.response?.data?.message || 'token失效，请重新登录';
        // 这里可以触发退出的 action
        Modal.confirm({
          title: '没有权限',
          content: message,
          okText: '去登录',
          cancelText: '取消',
          onOk: () => {
            // 清除过期令牌
            localStorage.removeItem('token');
            localStorage.removeItem('userStatus');

            // 去登录页面
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
