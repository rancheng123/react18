__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");


/**
 * @class {Layout} Company视图类
 * @author wyq
 * @version 1.0
 * @date 2019-12-3
 */

class Layout {
  constructor(controler) {
    /**@property controler dataSource控制器实例 */
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
   * @date 2019-08-17
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    //const {props:{initialData,data:{list}},state={}} = this;
    let state = this.state || {},
        hidden = state.hidden || "default";
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "pageLayoutMln"
    }, [{
      title: "standardLayout",
      desc: "StandardLayoutPrompt",
      value: "default"
    }, {
      className: " noTop",
      title: "topLayout",
      desc: "topLayoutPrompt",
      value: "top"
    }, {
      className: " noBot",
      title: "botLayout",
      desc: "botLayoutPrompt",
      value: "bottom"
    }, {
      className: " noTopBot",
      title: "noLayout",
      desc: "noLayoutPrompt",
      value: "all"
    }].map(({
      className = "",
      title,
      desc,
      value = ""
    }) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: title
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "imgteCon",
        onClick: this.controler.pageSetLayout.bind(this.controler, value)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tabSelect" + (value != hidden ? "" : " on")
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "pageMidd" + className
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pageLeft"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, window.public.lang[title]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "opacityCoLab"
      }, window.public.lang[desc]))), value != "all" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
        className: "hr-short"
      }) : "");
    }));
  }

}

//# sourceURL=webpack:///./ui/page_management/page_layout/page_layout.js?