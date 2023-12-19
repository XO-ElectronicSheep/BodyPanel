
import axios from "axios"; // API封装  对axios进行封装
// 创建一个axioas实例 instance
const instance = axios.create({
    baseURL: "http://124.220.23.104:3002",
    timeout: 5000,
});
//添加请求拦截器，会在发起请求之前执行相应的需求
instance.interceptors.request.use(
    function (config) {
        let token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        /* console.log(config) */
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

//添加响应拦截器，会在返回数据后先执行相应的需求 一般用于进行请求错误处理
instance.interceptors.response.use(
    function (response) {
        let { code } = response.data;
        if (code === 401) {
            //token失效
            localStorage.clear()
            window.location.reload() //页面刷新
        }
        return response;
    },
    function (error) {
        console.log("res-err", error);
        // let {code} = error
        // if (code === 'ERR_NETWORK'){
        //   alert('网络错误')
        // }
        return Promise.reject(error);
    }
);
export default instance;