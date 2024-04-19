// 导入 React 模块
import React from "react";

/**
 * @instance {Component} 控件公用HTML视图实例
 * @author wyq
 * @version 1.0
 * @date 2019-10-18
 */

const Component = {
  /**
   * @method box 控件外层包裹结构
   * @date 2019-11-4
   * @author wyq
   * @param {object} props 参数对象
   * @param {string} porps.id 控件id
   * @param {object} props.children 控件子节点集合 
   * @return {object} 控件外层包裹结构
   */
  box({
    id,
    children,
    className,
    source,
    mohidden,
    editHidden
  }) {
    const _className = ' mask-waper';
    return React.createElement("div", {
      id: id,
      className: className
    }, children);
  },

  //详情的结构增加class，用于图片放大使用 
  getDetailClass(companyField) {
    if (companyField && companyField.indexOf("detailed_info") != -1) {
      return `enlarge_detailed_info`;
    } else {
      return "";
    }
  }

};


export default Component
