// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util';
// 导入自定义的组件模块
import Component from '../components/component.jsx';


export function s411() {
  /**
   * @method basicPanel 基本侧导航样式 使用皮肤名称
   * @date 2020-3-4
   * @author sxt
   * @return {object} 基本侧导航样式HTML结构
   */
  const {
    state: {
      component: {
        id
      },
      data: {
        menu_data: {
          menuList = []
        },
        document_data: {
          target = "_self",
          icon = {}
        }
      }
    }
  } = this;
  let parClass = "editPanel"; //此class用于，编辑页面显示panel，sxt 2020-3-4

  if (Util.source) {
    parClass = '';
  }

  if (this.state.hidden == true || Util.source) {
    return React.createElement("div", {
      id: id,
      className: `${parClass} panelLeftshow`
    }, React.createElement("div", {
      className: "sideBasicPanel"
    }, React.createElement("div", {
      className: "panel-header"
    }, React.createElement("div", {
      className: "modal-close"
    }, React.createElement("div", {
      role: "button",
      className: "TAR items-start navbar-trigger"
    }, "\u2715"))), React.createElement("div", {
      className: "moMenubox"
    }, React.createElement("ul", {
      id: "moMainnav",
      className: `${id}Ul mainNav`
    }, React.createElement(Component.menuLi, {
      state: this.state,
      tabtype: "mo",
      type: "html"
    })))), React.createElement("div", {
      className: "opc"
    }));
  } else {
    return null;
  }
}

