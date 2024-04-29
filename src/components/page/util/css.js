
import componentsManager from '@/components/components_manager'


/**
 * @function cssParser css解析器
 * @param {object} component 控件结构数据
 * @param {object} themeData 控件样式数据
 * @param {string} type 结构类型 html amp mip 
 * @return {string} 解析后的css 
 */
export default async function cssParser(component, themeData, type) {
  var _component$componentT;
  const module = await componentsManager((_component$componentT = component.componentType) !== null && _component$componentT !== void 0 ? _component$componentT : 'document');

  if (module && themeData) {
    const {
      skin = "",
      style = {},
      css = '',
      background = {}
    } = themeData;
    const data = Object.assign({}, style, background, component.layout);
    const cssStr = css ? css.replace(/(^|})(\.|#|\d)/g, `$1#${component.id} $2`) : ''; //获取视图类

    const csses = await module.getStyle(humpJoin(skin.split(".")[1], '_'), type); //csses 与 data 同时存在执行if

    if (csses && data) {
      var _ref, _csses$skin$replace;

      //取皮肤样式
      const css = ((_ref = (_csses$skin$replace = csses[skin.replace(/\.[0-9]+$/, "")]) !== null && _csses$skin$replace !== void 0 ? _csses$skin$replace : csses.public) !== null && _ref !== void 0 ? _ref : {}).css;

      if (css) {
        return cssProduce(component.id, css, data) + cssStr;
      }
    }

    return cssStr;
  }

  return '';
}


/**
 * @function cssMediaProduce  css媒体查询生成器
 * @param {string} id  控件id
 * @param {object} media  存放媒体查询样式的对象
 * @param {object} style  存放样式值得对象
 * @return {string} 生成后的媒体查询css
 */
function cssMediaProduce(id, media, style) {
  let mediaStr = ""; //循环媒体查询对象

  for (let item in media) {
    const cssStr = cssProduce(id, media[item], style); //替换媒体查询中的变量

    /\[\w+\]/.test(item) && (item = item.replace(/\[(\w+)\]/, (e, k) => style[k]));

    if (cssStr) {
      mediaStr += `${item}{${cssStr}}`;
    }
  }

  return mediaStr;
}


/**
 * @function cssReplace 替换css
 * @param {string} id 控件id 
 * @param {object} css 存放css样式得的对象
 * @param {string} item 对象中的键值
 * @param {object} style 存放样式值得对象
 * @return {string} 替换后的css
 */
function cssReplace(id, css, item, style) {
  const csses = css.split(";"),
    cssName = item.indexOf("%") != -1 ? item.replace(/%{1}/g, id) : item;
  let cssList = [];

  for (let i = 0, len = csses.length; i < len; i++) {
    //把css的变量替换为具体值    
    const value = getCssValue(csses[i], style); //判断css样式是否有值，无值则过滤掉 如果left|right值为零，则不过滤

    (/^(left|right|top|bottom):\s?\d+%?$/.test(value) || !/(^\s*[-a-z]*:?(url\(\))?\s*(px|%|r?em)?\s*$)|(:\s?(00?(%|px|r?em)?\s?){1,4}(!important)?$)/g.test(value)) && !/^\s*[-a-z]*:(!important|(s|px|%|r?em))/g.test(value) && cssList.push(value);
  }

  const cssValue = cssList.length ? cssList.join(";") + ';' : '';
  return !/^\s*$/.test(cssValue) ? `${cssName}{${cssValue}}` : "";
}


/**
 * @function getCssValue 获取样式值
 * @param {string} css 样式数据
 * @param {object} style 存放样式值得数据
 * @return {string} 样式值 
 */
function getCssValue(css, style) {
  //样式值处理函数
  const valueHanlder = (t, u) => {
    var _style$key;

    let key = u,
      defaultValue;

    if (/\?|\|/.test(u)) {
      [key, defaultValue] = u.split(/\s?[?|]+\s?/);
    }

    let value = (_style$key = style[key]) !== null && _style$key !== void 0 ? _style$key : defaultValue; //类型为非html且样式不是边距的话,去除样式变量中的mo前缀

    if (/margin|padding/.test(css) == false && value == undefined) {
      var _style$key$substring;

      value = (_style$key$substring = style[key.substring(2)]) !== null && _style$key$substring !== void 0 ? _style$key$substring : defaultValue;
    } //如果值存在，则返回拼接后的样式值 0或undefined 都认为为假 calc中出现*0或/0情况也算作是假


    if (value != undefined && !/calc\([^/]+((\/|\*){1}\s0\s?)+\)/.test(value)) {
      return value;
    } //如果是margin或者padding样式，并且键不为单位发，对空值返回零


    return /(margin|padding):/.test(css) && key.indexOf('Unit') == -1 ? 0 : "";
  };

  return css.replace(/\[([^\[\]]+)\]/g, valueHanlder);
}


/**
 * @function cssProduce css生成器
 * @param {string} id 控件id
 * @param {object} css 存放css样式得的对象
 * @param {object} style 存放样式值得对象
 * @param {string} type 结构类型 html amp mip 
 * @retrun {string} 生成后的css
 */
function cssProduce(id, css, style) {
  let cssStr = "";

  for (let item in css) {
    //键值是否为public
    if (/public/.test(item)) {
      cssStr = cssStr + cssProduce(id, css[item], style);
    } //键值是否媒体查询
    else if (item == 'media') {
      cssStr = cssStr + cssMediaProduce(id, css[item], style);
    } else {
      cssStr = cssStr + cssReplace(id, css[item], item, style);
    }
  }

  return cssStr;
}
