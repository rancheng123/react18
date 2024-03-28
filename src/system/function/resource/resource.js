__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Resource", function() { return Resource; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! layer */ "./system/widgets/layer.js");
/* harmony import */ var _pagination_containers_Pagecontainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pagination/containers/Pagecontainer */ "./system/function/resource/pagination/containers/Pagecontainer.js");




/**
 * @class {Resource} 资源库面板视图类
 * @author sxt 
 * @version 1.0
 * @data 2019-9-4
 */

class Resource {
  /**@property controler 资源库控制器实例 */
  constructor(controler) {
    this.controler = controler;
    this.title = this.controler.title || "资源库";
    this.area = this.controler.area || ["1000px", "auto"];
    this.cancel = this.controler.cancel || false;
    this.ensure = this.controler.ensure || false;
    this.draggable = this.controler.draggable || false;
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
   * @method render 挂载组件方法
   * @date 2019-9-4
   * @author sxt 
   * @return {object} 待渲染的组件对象
   */
  //click={this.controler.getResourceList}


  render(child) {
    let _state = this.state || {};

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(layer__WEBPACK_IMPORTED_MODULE_2__["Layer"].open, {
      titles: [this.title],
      area: this.area,
      close: true,
      draggable: this.draggable,
      skin: "em-function-resource",
      cancel: this.cancel,
      ensure: this.ensure
    }, child, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "message_page_box"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "message_page"
    }, _state.totalPages ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pagination_containers_Pagecontainer__WEBPACK_IMPORTED_MODULE_3__["default"], {
      controler: this.controler,
      data: _state
    }) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "sysBot"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, window.public.lang["instructionsForUse"]))));
  }

}

//# sourceURL=webpack:///./system/function/resource/resource.js?