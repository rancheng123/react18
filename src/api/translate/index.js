import http from '@/utils/http'
import axios from 'axios'

const CancelToken = axios.CancelToken
let translateAllAPICancel = CancelToken.source()

// 取消整体翻译接口
export const cancelTranslateAllAPI = () => {
    translateAllAPICancel.cancel()
    translateAllAPICancel = CancelToken.source()
}



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

// 单个控件翻译提交接口
export const translateAPI = (data) => {
    return http({
        url: 'translate/submit',
        method: 'post',
        data
    })
}


// 整体翻译提交接口
export const translateAllAPI = (data) => {
    return http({
        url: 'translate/batchSubmit',
        method: 'post',
        data,
        cancelToken: translateAllAPICancel.token,
    })
}
