import axios from "axios";
import { getTokenAPI } from "@/api/user";
import { setToken } from '@/store/module/userStore'
import store from "../store";

const http = axios.create({
    // baseURL: "https://member.chukouplus.com/",
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3000000,
});

// 是否正在刷新token
let isRefresh = false
// 存储请求列表
let requestList = []

http.interceptors.request.use(config => {

    const token = JSON.parse(localStorage.getItem('token')) || {}
    // 设置token
    config.headers.Authorization = token?.value || '';

    return config
}, (error) => {
    console.log(error)
    Promise.reject(error)
})

http.interceptors.response.use(response => {
    if (response.data && response.data.code === 403) {
        if (!isRefresh) {
            isRefresh = true
            // 定义查询参数对象
            // 英文参数
            // client_id: 'reanod_api_001',
            // client_secret: 'B5035688FE885568A0365C0928A50698',
            const queryParams = {
                // 中文参数
                client_id: 'reanod_api_002',
                client_secret: 'B5035688D66F823SSDF546AA12385WE5',
            };
            getTokenAPI(queryParams).then(res => {
                // 获取新的token
                const newToken = res.data.token
                // 添加新的token
                response.config.headers.Authorization = newToken
                const obj = {
                    expiration: res.data.expires_in,
                    value: newToken,
                }
                // 派发保存token数据
                store.dispatch(setToken(obj))
                // token 刷新后将数组里的请求队列方法重新执行
                requestList.forEach(fn => fn(newToken))
                // 重新请求完清空
                requestList = []
                // 刷新状态
                isRefresh = false
                // 重新请求
                return http(response.config)
            }).catch(err => {
                return Promise.reject(err)
            }).finally(() => {
                isRefresh = false
            })
        } else {
            return new Promise(resolve => {
                requestList.push((newToken) => {
                    response.config.headers.Authorization = newToken
                    resolve(http(response.config))
                })
            })
        }
    }
    console.log('响应数据', response);


    return Promise.resolve(response.data)
}, (error) => {
    throw error;
})

export default http