import {ResponseResult} from "@/api/common/type";
import axios from "axios";
import {ElMessage} from "element-plus";
import useUserStore from "@/store/modules/user";


//创建axios实例
let request = axios.create({
    baseURL: import.meta.env.VITE_GLOB_API_URL,
    timeout: 5000
})


request.interceptors.request.use((config) => {
    let useStore = useUserStore();
    if (useStore.token) {
        config.headers.Authorization = useStore.token
        console.log(config);
    }
    return config;
})

request.interceptors.response.use((response) => {
    // 假设后端返回的数据结构为 { code, data, message }
    if (isResponseResult(response.data)){
        const {code, message, data} = response.data;
        // 返回 ResponseResult 实例
        return new ResponseResult(code, message, data);
    } else{
        return response.data;
    }
}, (rejected) => {
    //处理网络错误
    let msg = '';
    console.error(rejected);
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


function isResponseResult(obj: any): obj is { code: number; data: any; message: string } {
    return (
        obj &&
        typeof obj === 'object' &&
        typeof obj.code === 'number' &&
        'data' in obj &&
        typeof obj.message === 'string'
    );
}
export {request}




