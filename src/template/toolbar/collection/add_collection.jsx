// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCollection", function() { return AddCollection; });
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! layer */ "./system/widgets/layer.js");
// /* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");


// 导入 React 库
import React from 'react';

// 导入 layer 模块
import Layer from '@/system/widgets/layer';

// 导入 widget 模块
import Widget from '@/system/widgets/widget';

/**
 * @class {Collection} 收藏视图类
 * @author sxt 
 * @date  2020-2-12
 */

export default class AddCollection {
  constructor(controler) {
    /**@property controler WidgetLibrary控制器实例 */
    this.controler = controler;
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} props 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }
  /**
      * @method render 挂载组件方法
      * @date 2019-09-25
      * @author sxt
      * @return {object} 待渲染的组件对象
      */


  render() {
    let state = this.state;
    return React.createElement(Layer.open, {
      titles: [window.public.lang["collection"]],
      area: ["360px", "200px"],
      shade: [0.8, "#000000"],
      skin: "em-collection-add",
      close: true,
      draggable: true,
      cancel: true,
      ensure: this.controler.ensure.bind(this.controler)
    }, React.createElement("ul", {
      className: "pcConAttDesign"
    }, React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.Input, {
      title: "collectionName",
      id: "collectionName",
      readonly: false,
      placeholder: state.placeholder,
      value: this.state.collectionText || "",
      change: this.controler.changText.bind(this.controler, "collectionText")
    }))));
  }

}

//# sourceURL=webpack:///./ui/toolbar/collection/add_collection.js?