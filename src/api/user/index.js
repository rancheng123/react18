import http from '@/utils/http'

// 获取token接口
export const getTokenAPI = (query) => {
    return http({
        url: 'translate/getToken',
        method: 'get',
        params: query
    })
}

