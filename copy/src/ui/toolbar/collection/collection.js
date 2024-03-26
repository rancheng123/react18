__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collection", function() { return Collection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toolbar */ "./ui/toolbar/toolbar.js");


/**
 * @class {Collection} 收藏视图类
 * @author sxt 
 * @date  2020-2-12
 */

class Collection {
  constructor(controler) {
    /**@property controler WidgetLibrary控制器实例 */
    this.controler = controler;
    this.content = this.content.bind(this);
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
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_toolbar__WEBPACK_IMPORTED_MODULE_1__["Toolbar"], {
      id: this.props.id,
      title: window.public.lang["collection"],
      help: this.controler.help.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.content, null));
  }
  /**
   * @method close 关闭方法
   * @date 2019-12-05
   * @author wyq
   */


  close() {
    _toolbar__WEBPACK_IMPORTED_MODULE_1__["Toolbar"].close();
  }
  /**
      * @method menus 工具库内容项
      * @date 2019-09-25
      * @author sxt
      * @return {object} 工具库内容项结构
      */


  content() {
    //let {controlType} = this.state,{tabs,group} = data.group[controlType];
    let state = this.state || {},
        colists = state.colists;

    if (colists && colists.length) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "toolCollect"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, colists.map((e, i) => {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: e.id,
          "data-id": e.id
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          onMouseDown: this.controler.start.bind(this.controler, e.id)
        }, e.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          onClick: this.controler.deleteList.bind(this.controler, e.id),
          className: "yscIcon yiyingbaoicon"
        }, "\uE808"));
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panlBottom"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "contorlBtn",
        onClick: this.controler.emptyList.bind(this.controler)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("font", null, window.public.lang["emptyAll"]))));
    } else {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "toolCollEmpty"
      });
    }
  }

}

//# sourceURL=webpack:///./ui/toolbar/collection/collection.js?