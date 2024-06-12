/** 
* @param {string}  url
* @return {string} url 所选参数的value
*/
export function getQueryParam(url) {
    // 通过 ? 分割获取后面的参数字符串
    let urlStr = url.split('?')[1] || ''
    // 创建空对象存储参数
    let obj = {};
    // 再通过 & 将每一个参数单独分割出来
    let paramsArr = urlStr.split('&')
    for (let i = 0, len = paramsArr.length; i < len; i++) {
        // 再通过 = 将每一个参数分割为 key:value 的形式
        let arr = paramsArr[i].split('=')
        obj[arr[0]] = arr[1];
    }
    return obj
}

/** 
* @return {string} 浏览器选择当前语言
*/
export function getLan() {
    return getQueryParam(window.location.href)['lan'] ? decodeURIComponent(getQueryParam(window.location.href)['lan']) : ''
}
