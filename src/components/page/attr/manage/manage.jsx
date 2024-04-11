
// 导入模块
import React from "react"; // 导入 React 模块
import Widget from "@/system/widgets/widget"; // 导入 widget 模块

/**
 * @class {Manage} 项管里视图类
 * @author wyq
 * @version 1.0
 * @date 2019-11-19
 */

export default class Manage {
  constructor(controler) {
    /**@property controler 控件编辑控制器实例 */
    this.controler = controler;
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} state 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }

  render() {
    return React.createElement("div", {
      className: "em-manage"
    }, React.createElement("div", {
      className: "em-manage-list"
    }, React.createElement("ul", {
      className: "em-manage-list-ul"
    }, this.tabs()), this.controler.isAdd ? React.createElement("button", {
      className: "em-manage-add",
      onClick: this.controler.add.bind(this.controler)
    }, window.public.lang["add"]) : null), React.createElement("div", {
      className: "em-manage-content"
    }, this.state.list.indexOf('backgroundPanel') == -1 ? this.list() : this.BackgroundPanel()));
  }

  tabs() {
    return this.controler.items.map((e, i) => {
      var _this$controler$nameK, _ref, _document_data$key;

      const {
        component: {
          id,
          type
        },
        document_data = {}
      } = e;
      const key = (_this$controler$nameK = this.controler.nameKey) !== null && _this$controler$nameK !== void 0 ? _this$controler$nameK : 'label';
      return React.createElement("li", {
        key: id,
        className: id != this.state.current.component.id ? '' : 'on',
        onClick: this.controler.switchTab.bind(this.controler, e),
        draggable: this.controler.draggable,
        onDragStart: this.controler.draggable ? this.controler.dragStart.bind(this.controler, id) : null,
        onDragOver: this.controler.draggable ? this.controler.dragOver.bind(this.controler, id) : null,
        onDragEnd: this.controler.draggable ? this.controler.dragEnd.bind(this.controler, id) : null
      }, React.createElement("span", null, (_ref = (_document_data$key = document_data[key]) !== null && _document_data$key !== void 0 ? _document_data$key : window.public.lang[type] + (i + 1)) !== null && _ref !== void 0 ? _ref : ''), this.icon(e));
    });
  }

  list() {
    return React.createElement("ul", {
      className: "pcConAttDesign"
    }, this.state.list.map((e, i) => {
      return React.createElement("li", {
        key: i,
        className: "pcAttList"
      }, typeof e != "object" ? this[e] && this[e]() : this[e.name] && this[e.name](e));
    }));
  }

  icon(item) {
    const {
      hidden
    } = item.document_data || {};
    return React.createElement("em", {
      className: "em-icon"
    }, hidden == undefined && this.controler.isDelete != false ? React.createElement("span", {
      className: "em-Delete",
      onClick: this.controler.remove.bind(this.controler, item)
    }) : null, hidden != undefined ? React.createElement("span", {
      className: hidden == 1 ? 'em_Close' : "em_Open",
      onClick: this.controler.hidden.bind(this.controler, item)
    }) : null);
  }

  button(prop) {
    return React.createElement(Widget.Button, {
      title: prop.title,
      btnName: window.public.lang.clickShowPanel,
      click: this.controler.showPanel.bind(this.controler)
    });
  }
  /**
   * @method anchor 锚点
   * @author wyq
   * @return {object} 锚点
   * @date  2020-08-06
   */


  anchor() {
    return React.createElement(Widget.Radio, {
      title: "anchor",
      id: "anchor",
      list: [{
        name: "openTurn",
        value: "true"
      }, {
        name: "closeOff",
        value: "false"
      }],
      value: this.state.current.document_data.anchor || false,
      change: this.controler.set.bind(this.controler, "anchor")
    });
  }
  /**
   * @method itemName 项名称
   * @date 2020-08-07
   * @author wyq
   * @return {object} 项名称结构
   */


  itemName() {
    const {
      state: {
        current: {
          component,
          document_data = {}
        }
      }
    } = this;
    const {
      id,
      componentType
    } = component;
    return React.createElement(Widget.Input, {
      id: 'itemName' + id,
      title: "itemName",
      value: document_data.componentName,
      placeholder: `${window.public.getName(componentType)}(${id})`,
      change: this.controler.set.bind(this.controler, 'componentName')
    });
  }
  /**
  * @method backgroundPanel 背景按钮结构，用于弹出背景面板
  * @author wyq
   * @date 2020-11-13
  * @return {object} 属性结构 {Public.lang[prop.title]}
  */


  BackgroundPanel() {
    return this.controler.BackgroundPanel();
  }

}
