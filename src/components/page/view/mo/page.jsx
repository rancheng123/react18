// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '../../util/util';

/**
 * @class {Page} 页面视图类
 * @author wyq
 * @version 1.0
 * @date 2019-09-18
 */

export default class Page {
  constructor() {
    this.style = this.style.bind(this);
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-09-21
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    let {
      state: {
        hidden,
        component: {
          documentType,
          children
        },
        data
      },
      props: {
        pages
      }
    } = this;
    let components = children.concat([]),
        pid = Util.pid,
        page = pages[pid];

    if (hidden == undefined) {
      hidden = page.data.document_data[pid].hidden;
    }

    if (/top/.test(hidden)) {
      components.splice(0, 1);
    }

    if (/bottom/.test(hidden)) {
      components.splice(3, 1);
    }

    if (/all/.test(hidden)) {
      components.splice(0, 1);
      components.splice(2, 1);
    }

    for (var i = 0; i < components.length; i++) {
      // 遍历并查找类型为panel且皮肤相对应的 条件满足的话 将该项放到数组首位 lw 2021-26
      var typeNav = components[i];

      if (typeNav.componentType == "em-Panel" && typeNav.skin == "panel.panel.s415.520") {
        var navArray = components.splice(i, 1);
        components.splice(0, 1, navArray[0]);
      }
    }

    return React.createElement("div", {
      id: documentType
    }, React.createElement(this.style, {
      pid: pid
    }), React.createElement("div", {
      className: "document-bg"
    }), React.createElement(Util.children, {
      components: components,
      data: data,
      page: page
    }));
  }
  /**
   * @method style 页面样式
   * @date 202-02-12
   * @author wyq
   * @param {object} props 参数对象
   * @param {string} props.pid 页面id
   * @return {object} 样式结构
   */


  style(props) {
    const {
      state: {
        component: {
          documentType: id
        },
        data: {
          design_data
        }
      }
    } = this; //判断design_data数据是否存在

    if (design_data) {
      const background = design_data[props.pid]; //判断是否存在对应background数据

      if (background) {
        const {
          bgColor,
          uri,
          imgQuality = '',
          positionMode = '',
          posVal,
          attachment,
          opacity
        } = background;
        return React.createElement("style", {
          id: `${id}_style`
        }, `.${id}-bg{
                                    ${bgColor ? `background-color:${bgColor};` : ''}
                                    ${uri ? `background:url(${uri + imgQuality}) ${positionMode};` : ''}
                                    ${posVal ? `background-position:${posVal};` : ''}
                                    ${attachment ? `background-attachment:${attachment};` : ''}
                                    ${opacity ? `opacity:${opacity};` : ''}
                               }`);
      }

      return null;
    }

    return null;
  }

}
