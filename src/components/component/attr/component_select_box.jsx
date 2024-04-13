// 导入 React 库
import React from 'react';
// 导入自定义的 select_box 模块
import { SelectBox } from '../../page/attr/select_box/select_box';
// 导入自定义的 dispatcher 模块
import Dispatcher from '@/system/tools/dispatcher.js';


/**
 * @class {ComponentSelectBox} 内容面板属性控制器类
 * @author eric
 * @version 1.0
 * @date 2020-02-21
 */

export default class ComponentSelectBox extends SelectBox{
  constructor(node, container) {
    super(node, container);
  }

  prev() {
    let _minWidth = 760,
        _btnHeight = 30 * 2,
        _domComponent = window.public.dom.querySelector(`#${this.node.current.id}`),
        _componentWidth = _domComponent.offsetWidth,
        _componentHeight = _domComponent.offsetHeight; //控件宽度小于规定的最小宽度时，或者组件高度小于按钮的高度*2时，不显示添加按钮


    if (_componentWidth <= _minWidth || _componentHeight <= _btnHeight) {
      return null;
    }

    return React.createElement("div", {
      className: "componentAddStyle"
    }, React.createElement("div", {
      onMouseDown: this.addStyle.bind(this, "top"),
      onMouseMove: e => e.stopPropagation(),
      className: "componentAddTop"
    }, React.createElement("span", {
      className: "info"
    }, "\u4E0A\u90E8\u6DFB\u52A0\u7EC4\u4EF6")), React.createElement("div", {
      onMouseDown: this.addStyle.bind(this, "bottom"),
      onMouseMove: e => e.stopPropagation(),
      className: "componentAddBottom"
    }, React.createElement("span", {
      className: "info"
    }, "\u4E0B\u90E8\u6DFB\u52A0\u7EC4\u4EF6")));
  }
  /**
   * @method {addStyle} 快速切换
   * @author eric
   * @version 1.0
   * @date 2020-02-21
   */


  addStyle(dir, e) {
    e.stopPropagation();
    const {
      node: {
        current: {
          id
        },
        parent = {}
      }
    } = this;
    let ediToolbtn = document.querySelector("#ediToolbtn"),
        componentLibrary = ediToolbtn.querySelector(".componentLibrary"),
        toolbarContent = document.querySelector("#edit-toolbar-content");
    let fnName = `${parent.id}_get`,
        index = 0;
    const {
      component: {
        components
      }
    } = Dispatcher.dispatch(fnName); //获取控件父级数据
    //获取当前控件在父级的位置，

    for (let i = 0; i < components.length; i++) {
      if (components[i].id == id) {
        if (dir == "top") {
          index = i;
        } else {
          index = i + 1;
        }
      }
    }

    let add = `${parent.id}_${index}`;
    toolbarContent.setAttribute("data-add", add);
    componentLibrary && componentLibrary.click(); // const promise = import("../attr/componentLibrary/component_library_controler");
    // promise.then(module => {
    //     module.ComponentLibraryControler 
    //     &&
    //     module.ComponentLibraryControler.componentLibrary({
    //         initialData:{
    //             type:dir,id,pid:parent.id
    //         }
    //     }) 
    // })  
  }

}

//# sourceURL=webpack:///./components/component/attr/component_select_box.js?