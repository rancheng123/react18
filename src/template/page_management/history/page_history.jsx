__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageHistory", function() { return PageHistory; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");
/* harmony import */ var layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! layer */ "./system/widgets/layer.js");



/**
 * @class HistoryRecord 页面历史操作记录
 * @author  
 */

class PageHistory {
  constructor(controler) {
    /**@property controler seo控制器实例 */
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
  /**
   * @method render 视图入口方法
   * @author sxt
   * @return {object} 组件结构
   */


  render() {
    const {
      data
    } = this.state;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(layer__WEBPACK_IMPORTED_MODULE_2__["Layer"].open, {
      titles: [window.public.lang["histotyRecord"]],
      offset: ['300px', '0px'],
      area: ["345px", "474px"],
      skin: "em-function-seo",
      ensure: false,
      close: true
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "histoty-record"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, this.histotyRecord(data))));
  }

  histotyRecord(list) {
    return list.map(({
      id,
      description
    }) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: id
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, description), "\xA0|\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "javascript:void(0)",
        onClick: this.controler.pageDataReduction.bind(this.controler, id)
      }, "\u8FD8\u539F"));
    });
  }

}

//# sourceURL=webpack:///./ui/page_management/history/page_history.js?