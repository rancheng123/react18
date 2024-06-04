import http from '@/utils/http'

// 获取翻译列表接口
export const getlangListAPI = () => {
    return http({
        url: 'translate/langList',
        method: 'get',
    })
}

// 获取语种列表接口
export const getcustomerLangListtAPI = () => {
    return http({
        url: 'translate/customerLangList',
        method: 'get',
    })
}

