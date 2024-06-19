/** 
* @param {string}  url
* @return {string} url 所选参数的value
*/
export function getQueryParam(url) {
    const pop = new URL(url);
    const searchParams = pop.searchParams;
    // 创建空对象存储参数
    let obj = {};
    for (const [key, value] of searchParams) {
        obj[key] = value;
    }

    // 通过 ? 分割获取后面的参数字符串
    // let urlStr = url.split('?')[1] || ''
    // // 创建空对象存储参数
    // let obj = {};
    // // 再通过 & 将每一个参数单独分割出来
    // let paramsArr = urlStr.split('&')
    // for (let i = 0, len = paramsArr.length; i < len; i++) {
    //     // 再通过 = 将每一个参数分割为 key:value 的形式
    //     let arr = paramsArr[i].split('=')
    //     obj[arr[0]] = arr[1];
    // }
    return obj
}

/** 
* @return {string} 浏览器选择当前语言
*/
export function getLan() {
    try {
        return getQueryParam(window.location.href)['lan'] ? decodeURIComponent(getQueryParam(window.location.href)['lan']) : ''
    } catch(err) {
        return ''
    }
}

// 当前语种
export const lan = getLan() ? getLan() : '';

/** 
 * 返回当前语种对应的数据
* @param {object} data  数据
* @param {string} key   默认显示的数据key
* @return {string} 浏览器选择当前语言对应的数据没有则返回默认数据
*/
export function getLanTranslateData(data, key) {
    return lan && data.language && data.language[lan] ? data.language[lan] : data[key]
}

