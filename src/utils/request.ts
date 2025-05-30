
import axios from "axios";
import {ElMessage} from "element-plus";
//创建axios实例
let request = axios.create({
    baseURL: import.meta.env.VITE_GLOB_API_URL,
    timeout: 5000
})

request.interceptors.response.use((response) => {
    return response.data;
}, (rejected) => {
    //处理网络错误
    let msg = '';
    let status = rejected.response.status;

    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";
    }
    ElMessage({
        type: "error",
        message: msg
    })
    return Promise.reject(rejected)
})

export { request }




