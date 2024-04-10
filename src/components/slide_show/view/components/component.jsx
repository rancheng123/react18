
// 导入 React 库
import React from 'react';

/**
 * @instance {Component} 控件公用HTML视图实例
 * @author wyq
 * @version 1.0
 * @date 2019-10-18
 */

const Component = {
  /**
   * 
   * @param {*} props 
   */
  box(props) {
    return React.createElement("div", {
      id: props.id
    }, props.children);
  },

  /**
   * 
   */
  icon() {
    return React.createElement("i", null);
  },

  /**
   * @method arrow 三角结构
   * @date 2020-11-13
   * @author wyq
   * @param {object} param0 参数对象
   * @param {boolean} param0.useSwitchArrow 是否使用三角
   * @param {string} param0.arrowUri1 左三角图
   * @param {string} param0.arrowUri2 右三角图
   * @return {object} 三角结构  
   */
  arrow({
    useSwitchArrow,
    arrowUri1,
    arrowUri2,
    lefticon,
    righticon,
    newIcon
  }) {
    //是否使用切换三角
    if (useSwitchArrow) {
      //老幻灯片走图片结构，新的走图标结构  wh 2022-9-7
      return newIcon ? React.createElement("div", {
        className: "advanced-arrow"
      }, React.createElement("div", {
        className: "left-arrow left-icon"
      }, React.createElement("i", {
        className: "yiyingbaoicon icon"
      }, (lefticon === null || lefticon === void 0 ? void 0 : lefticon.iconName) || '')), React.createElement("div", {
        className: "right-arrow right-icon"
      }, React.createElement("i", {
        className: "yiyingbaoicon icon"
      }, (righticon === null || righticon === void 0 ? void 0 : righticon.iconName) || ''))) : React.createElement("div", {
        className: "advanced-arrow"
      }, React.createElement("img", {
        src: arrowUri1,
        className: "left-arrow"
      }), React.createElement("img", {
        src: arrowUri2,
        className: "right-arrow"
      }));
    }

    return null;
  },

  /**
   * @method buttons 按钮结构 
   * @date 2020-11-13
   * @author wyq
   * @param {object} param0 参数对象
   * @param {boolean} param0.useSwitchButton 是否使用按钮
   * @param {object} param0.components 组件结构
   * @param {number} param0.index 当前项索引
   * @return {object} 按钮结构
   */
  //以从后台传过来的numberbtn状态为标准，为true的话渲染数字,为false的话则不渲染  2020/12/23 lw
  buttons({
    useSwitchButton,
    components,
    index,
    numberbtn
  }) {
    var numberbtns = numberbtn == true ? 'numberBBtn' : ''; //是否使用按钮

    if (useSwitchButton) {
      return React.createElement("div", {
        className: `advanced-btn ${numberbtns}`
      }, components.map((e, i) => {
        return React.createElement("button", {
          className: i != index ? "" : "slideActive",
          "data-index": i
        }, numberbtn == true ? i + 1 : '');
      }));
    }

    return null;
  }

};

export default Component