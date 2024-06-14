import http from '@/utils/http'


// 获取页面数据
export const getTemplateDataAPI = (query) => {
    return http({
        url: 'template/info',
        method: 'get',
        params: query
    })
}

// 保存页面数据
export const postTemplateDataAPI = (data) => {
    return http({
        url: 'template/submit',
        method: 'post',
        data
    })
}