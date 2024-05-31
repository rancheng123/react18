
// 导入React库
import React from 'react';

// 导入其他模块
import Widget from '@/system/widgets/widget.js';
import Layer from '@/system/widgets/layer.js';

//弹出下拉

const ComboBoxData = prop => {
  return React.createElement("div", {
    className: prop.className
  }, React.createElement("div", {
    className: "seLectBtn onSelect"
  }, React.createElement("font", null, window.public.lang[prop.title]), React.createElement("p", {
    onClick: prop.click
  }, React.createElement("span", {
    className: "wpComboBoxDataText"
  }, prop.dataName || window.public.lang["pleaseChoose"]), React.createElement("i", {
    className: "iconfont iconBor"
  }, "\uE650")), React.createElement("div", {
    className: "dateLibrary textConPanl  dataComboBox",
    style: prop.isShow ? {
      "display": "block"
    } : {
      "display": "none"
    }
  }, React.createElement("ul", {
    className: "dataComList"
  }, prop.setList.map((e, i) => {
    let _class = "dataComList_" + (e.layer || 1);

    if (prop.dataId == e.id) {
      _class = _class + " on ";
    }

    return React.createElement("li", {
      "data-value": e[prop.name],
      key: e.id,
      title: e[prop.name],
      className: _class,
      onClick: prop.select.bind(null, e),
      "data-id": e.id
    }, React.createElement("span", null, e[prop.name]));
  })))));
};
/**
 * @class Classify 分类页面结构类
 */


class Classify {
  constructor(controler) {
    /**@property controler seo控制器实例 */
    this.controler = controler;
    let innerHeight = window.innerHeight; //计算上部显示位置,用于修复小屏下显示不开的问题 

    this.top = innerHeight - 474 - 80 + "px";
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} state 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }
  /**
   * @method render 视图入口方法
   * @return {object} 组件结构
   */


  render() {
    let state = this.state || {};
    return React.createElement(Layer.open, {
      titles: [window.public.lang["addClassify"]],
      offset: ['300px', `${this.top}`],
      area: ["345px", "474px"],
      skin: "em-function-seo",
      ensure: this.controler.ensure.bind(this.controler),
      close: true
    }, React.createElement("div", {
      className: "addPageClassify"
    }, React.createElement("div", null, React.createElement("ul", {
      className: "pcConAttDesign"
    }, React.createElement("li", {
      className: "pcAttList"
    }, this.classifyName()), React.createElement("li", {
      className: "pcAttList"
    }, this.classifyType()), React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.ComboBoxData, {
      title: "setClassifyLink",
      isShow: state.showClassify,
      setList: state.classifyList || [],
      name: "catname",
      className: "dataClassifyList",
      click: this.controler.clickClassifyList.bind(this.controler),
      select: this.controler.selectClassifyList.bind(this.controler),
      dataName: state.catName,
      dataId: state.catId
    })), React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.ComboBoxData, {
      title: "setNavLink",
      isShow: state.showPage,
      setList: state.pageList,
      name: "name",
      className: "dataContentList",
      click: this.controler.clickPageList.bind(this.controler),
      select: this.controler.selectPageList.bind(this.controler),
      dataName: state.pageName,
      dataId: state.pageId
    }))))));
  } //分类名称结构


  classifyName() {
    return React.createElement(Widget.Input, {
      title: "classifyName",
      id: "classifyName",
      readonly: false,
      placeholder: window.public.lang["classifyName"],
      value: this.state.label,
      change: this.controler.changeCatName.bind(this.controler)
    });
  } //分类类型结构


  classifyType() {
    let state = this.state || {},
      catType = state.catType || "product";
    return React.createElement(Widget.Radio, {
      title: "type",
      id: "",
      list: [{
        name: "product",
        value: "product"
      }, {
        name: "content",
        value: "content"
      }],
      value: catType,
      change: this.controler.selectType.bind(this.controler)
    });
  }

}

export default Classify;