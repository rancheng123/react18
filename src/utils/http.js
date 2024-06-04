import axios from "axios";
import { fetchToken } from '@/store/module/userStore'
import store from "../store";

const http = axios.create({
    baseURL: "https://member.chukouplus.com/",
    timeout: 3000000,
});
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
    // 如果token过期,调用获取token方法
    // store.dispatch(fetchToken())

    console.log('响应数据', response);

    if (response.data.code === 200 && response.data.msg === 'success') {
        return Promise.resolve(response.data)
    }
}, (error) => {
    console.log(error)
    Promise.reject(error)
})

export default http