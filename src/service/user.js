import axios from './axios'
// 添加请求信息  _login为封装之后的post请求 data 为请求中携带的参数


// 登录
export function login(params) {
    return axios.post('/user/login', params);
}