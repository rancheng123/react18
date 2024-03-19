import { Location } from './location.js';
import { Unit } from './unit.js'
import { Console } from './console.js';
/**
 * @method join 把驼峰命名的字符串中的单词按照指定标识拼接起来,且首字母变为小写
 * @date 2019-11-1
 * @author wyq
 * @param {string} str 
 * @param {string} sign 
 * @return {string} 拼接后的字符串
 */
window.humpJoin = function (str, sign) {
    //字符串不为undefined或null或'',连接符不为undefined或null或''
    if (str && sign) {   //回调函数
        const lamda = (o, one, i) => {
            const char = i == 0 ? '' : sign;

            return `${char}${one.toLowerCase()}`
        };
        //返回替换后的字符
        return str.replace(/([A-Z]{1})/g, lamda);
    }

    return '';
}
/**
 * @module {public} 公用模块
 * @author wyq
 * @version 1.0
 * @date 2019-10-30
 */
window.public = {
    /**@property {Window} win 框架页window对象，在 main.js 中进行赋值*/
    win: null,
    /**@property {Document} win 框架页document对象，在 main.js 中进行赋值*/
    dom: null,
    /**@property {number} minWidth 页面最小宽度 */
    minWidth: 980,
    /**@property {string} type 页面编辑类型 pc | mo */
    type: 'pc',
    /**@property {Loaction} location 存储location的实例，用于操作hash */
    location: Location,
    /**@property {string} pageName 页面名称 */
    pageName: null,
    editState: '',
    /**@property {Unit} Unit 存储Unit的实例，用于操作单位转换 */
    unit: Unit,
    /**@property {Console} Console 存储Console的实例，用于调试打印信息 */
    console: Console,
    /**@property {Resources} Resources 存储Resources的实例,用于管理资源 */
    get resources() { return import('https://img.bjyyb.net/antd/dev_resource_library.js') },
    /**@property {Ckeditor}  Ckeditor 存储Ckeditor的实例，富文本编辑器*/
    get ckeditor() { return import('../plugin/ckeditor/ckeditor.js') },
    /**
     * @method configure 处理配置
     * @date 2019-08-24
     * @author wyq
     * @param {array} items 要操作的属性列表 
     * @param {object} config 配置项 
     * @returns {array} 处理成功后的配置
     */
    configure(items, config = {}) {

        if (Array.isArray(items)) {   //只导入某个属性
            if (config.include) { items = config.include.split("|"); }
            //排除属性
            if (config.exclude) {
                items = items.filter(e => config.exclude.indexOf(e) == -1);
            }
        }

        return items;
    },
    /**
   * @method createId 创建唯一id
   * @date 2019-09-17
   * @author wyq
   * @param {string} prefix 用于区分控件类型的前缀
   * @param {number} len 生成id的长度
   * @return 一个唯一的id字符串
   */
    createId(prefix = "c", len = 6) {
        const sourceData = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];

        let value = '';
        //循环生成字符
        for (let i = 0; i < len; i++) {
            value = value + sourceData[Math.floor(Math.random() * 62)];
        }

        return prefix + value;
    },
    /**
     * @method getName 获取控件名称
     * @date 2019-10-29
     * @author wyq
     * @param {string} type 控件类型
     * @return {string} 控件的名称 
     */
    getName(type) {
        const regxp = /-?([a-zA-z]+)$/;

        const name = type.match(regxp)[1];

        return name ? this.lang[name.toLowerCase()] : "";
    },
    //获取传入日期格式获取真实时间方法，要挪到公用里去
    dateFormat(pattern, time, lang, opts = {}) {
        const _date = new Date(Number(time) * 1000 || new Date().getTime()); //获取日期对象

        if (!lang) {
            const _dateTime = _date.toLocaleString().split(" "), //分隔本地化的日期字符串
                _d = _dateTime[0].split(/\/|-/), //分隔年月日部分 
                _t = _dateTime[1].split(":");  //分隔时间部分

            const _data = { y: _d[0], M: _d[1], d: _d[2], h: _t[0], m: _t[1], s: _t[2] } //把年月日时间通过指定的键存储起来

            return pattern.replace(/[yMdhms]?/g, (r, n, p) => _data[r] ? _data[r] < 10 ? ("0" + _data[r]) : _data[r] : ""); //通过替换日期表达式返回指定格式的日期字符串
        }
        else {
            const _dateHash = { y: "year", M: "month", d: "day", h: "hour", m: "minute", s: "second", short: "short", writAll: "long", fill: "2-digit" };

            let _format = {};

            pattern.split(" ").forEach(e => { _format[_dateHash[e]] = _dateHash[opts[e]] || "numeric"; })

            return _date.toLocaleString(lang, _format);
        }
    },
    /**
     * @method extends 让一个子模块继承一个父级模块
     * @date 2019-11-26
     * @author wyq
     * @param {object} child 子级对象
     * @param {object} parent 父级对像 
     */
    extends(child, parent) {
        //判断child和parent知否存在
        if (child && parent) {
            parent = Object.create(parent);

            return Object.assign(parent, child);
        }

        return null
    },
    /**
 * @method fetch 装饰原生fetch请求方法，增加更新token行为
 * @date 2021-03-23
 * @author wyq
 * @param {string} url 请求路径
 * @param {object} opts 参数对象
 * @param {string} opts.method 请求方式
 * @param {object} [opts.headers] 请求头信息
 * @param {object} opts.body 请求内容
 * @param {string} opts.body.method 后端调用方法名
 * @param {object} opts.body.params 请求参数
 * @return {promise} promise对象
 */
    fetchRpc(url, opts) {
        let webToken = pageData.webToken;
        return fetch(url, {
            method: opts.method,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Accept-Language-Id": "zh-CN",
                "webtoken": webToken,
                ...(opts.headers || {})
            },
            body: JSON.stringify({ "jsonrpc": 2, "id": window.public.createId('request_'), ...opts.body })
        })
            //解析数据
            .then(response =>
                response.status == 200
                    ?
                    response.json()
                    :
                    { error: { message: '', data: { code: response.status } } }
            )
            //返回数据
            .then(data =>
                opts.useRpc != false //是否使用rpc标准返回相应数据
                    ?
                    data.error == undefined ? { suc: 0, data: data.result ?? data } : { suc: -1, msg: data.error.message, code: data.error.data && data.error.data.code }
                    :
                    data
            )
            //抛出异常
            .catch(error => (console.error(error.message), { suc: -1, msg: error.message, code: 0 }));
    },
    /**
    * @method reload 框架页面刷新方法
    * @date 2020-1-8  16：41
    * @author  sxt
    */
    reload() {
        let iframe = document.getElementById("iframe");
        iframe.contentWindow.location.reload(true);
    }
}