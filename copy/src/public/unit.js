/**
 * @function remTransitionPx  rem转换为px
 * @date 2020-05-12
 * @author wyq
 * @param {number} value 值
 * @return 转换后的值 
 */
function remTransitionPx(value){ return value * 10; }
/**
 * @function pxTransitionRem 像素转换为rem
 * @date 2020-05-12
 * @author wyq
 * @param {number} value 值
 * @return 转换后的值 
 */
function pxTransitionRem(value){ return value / 10; }
/**
 * @function perCentTransitionPx  百分比转换为px
 * @date 2020-05-21
 * @author wyq
 * @param {number} value 百分比值
 * @return 转换后的值 
 */
function perCentTransitionPx(value,ukey){
    const width = ukey != 'lineHeightUnit' ? getWidth() : getFontSize();
    //宽度是否为大于零的数
    if(width)
    {
        const num = width * (value / 100);
        //如果是整数直接返回，不是整数，保留小数点后两位
        return Number.isInteger(num) ? num : Number(num.toFixed(2))
    }

    return 0; 
}
/**
 * @function pxTransitionPerCent 像素转换百分比
 * @date 2020-05-21
 * @author wyq
 * @param {number} value 像素值
 * @return 转换后的值 
 */
function pxTransitionPerCent(value,ukey){
    const width = ukey != 'lineHeightUnit' ? getWidth() : getFontSize();
    
    return width ? Number((value / width * 100).toFixed(2)) : 0;
}
/**
 * @function getElement 获取元素节点
 * @date 2020-05-28
 * @author wyq
 * @return {object} 指定的元素节点
 */
function getElement(){
    //选择器存在则获取元素节点
    if(Unit.selector)
    {   //如果存在变量，则对变量进行替换
        if(Unit.selector.indexOf('[id]') != -1)
        {
            const index = Unit.selector.indexOf(" ");

            const id = Unit.selector.substring(1,index)
           
            Unit.selector = Unit.selector.replace(/\[id\]/g,id);
        }
        //返回元素
        return window.public.dom.querySelector(Unit.selector);
    }

    return null;
    
}
/**
 * @function getWidth 获取宽度
 * @date 2020-05-21
 * @author wyq
 * @return 宽度值
 */
function getWidth(){
    const element = getElement();
    //节点存在，获取节点宽度
    if(element)
    {    //获取控件样式数据
        const styleList = getComputedStyle(element.parentNode) || {};
        //样式列表存在，获取宽度
        if(styleList)
        {
            const {width = 0,paddingLeft = 0,paddingRight = 0} = styleList;
            //返回计算后的宽度值
            return parseFloat(width) - (parseFloat(paddingLeft) + parseFloat(paddingRight))
        }        
    }

    return 0;
}
/**
 * @function getFontSize 获取字体大小
 * @date 2020-05-21
 * @author wyq
 * @return 字体大小值 
 */
function getFontSize(){
    const element = getElement();
    //节点存在，获取节点样式
    if(element)
    {
        const styleList = getComputedStyle(element,null);
        //样式列表存在，返回字体大小
        if(styleList){ return parseInt(styleList.fontSize); }
    }

    return 0;
}
/**
 * @instance Unit 单位实例
 * @date 2020-05-12
 * @author wyq
 */
export const Unit = {
    /**@property selector 选择器*/
    selector:'',
    /**
     * @method px 把其它单位的值转换为像素值
     * @date 2020-05-12
     * @author wyq
     * @param {number} value 值
     * @param {string} unit 原始单位类型
     * @return {number} 转换后的像素值 
     */
    px(value,unit,ukey){
      //单位为rem，执行rem转换为px
      if(unit == 'rem'){ return remTransitionPx(value); }
      //单位为%，执行%转换为px
      if(unit == '%'){ return perCentTransitionPx(value,ukey); }
      //单位为em，执行em转换为px  
      if(unit == 'em'){ return remTransitionPx(value); }
    },
    /**
     * @method rem 把其它单位的值转换为rem值
     * @date 2020-05-12
     * @author wyq
     * @param {number} value 值 
     * @param {string} unit 原始单位类型
     * @return {number} 转换后的rem值
     */
    rem(value,unit){
        //单位为em，执行em转换为px 
        if(unit == 'em'){ value = remTransitionPx(value); }
        //单位为%，执行em转换为px 
        if(unit == '%'){ value = perCentTransitionPx(value); }
        //把像素值转换为rem
        return pxTransitionRem(value);
    },
    /**
     * @method em 把其它单位的值转换为em值
     * @date 2020-05-12
     * @author wyq
     * @param {number} value 值
     * @param {string} unit 原始单位类型
     * @return {number} 转换后的em值
     */
    em(value,unit){
        //单位为rem，执行rem转换为px 
        if(unit == 'rem'){ value = remTransitionPx(value); }
        //单位为%，执行%转换为px 
        if(unit == '%'){ value = perCentTransitionPx(value); } 
        //把像素值转换为em
        return pxTransitionRem(value);
    }
}
 /**
  * @method % 把其它单位的值转换为%值
  * @date 2020-05-12
  * @author wyq
  * @param {number} value 值
  * @param {string} unit 原始单位类型
  * @return {number} 转换后的%值
  */
Unit['%'] = function(value,unit,ukey){
    //单位为rem，执行rem转换为px
    if(unit == 'rem'){ value = remTransitionPx(value); }
    //单位为em，执行em转换为px 
    if(unit == 'em'){ value = remTransitionPx(value); }
    //把像素值转换为%
    return pxTransitionPerCent(value,ukey);
}