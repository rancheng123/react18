__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutControler", function() { return LayoutControler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page_layout */ "./ui/page_management/page_layout/page_layout.js");
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");




/**
 * @class {CompanyControler} Company变量控制器类
 * @author wyq
 * @version 1.0
 * @date 2019-12-3
 */

class LayoutControler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {DataSource} view 初始化 view 实例*/

    this.view = new _page_layout__WEBPACK_IMPORTED_MODULE_2__["Layout"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-08-17
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @data 2019-12-03
   * @author wyq
   */


  init() {
    const {
      props: {
        initialData,
        data = {}
      }
    } = this;
    this.state = initialData; //{initialData:initialData};
  }
  /**
   * @method  changText 设置按钮文本
   * @date 2019-11-9
   * @author sxt
   * @param {string} key 数据名称
   * @param {event} e 事件对象
   */


  pageSetLayout(value, e) {
    //const _value = e.target.value;
    this.putState({
      "hidden": value
    });
    let getPageData = dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch("getPageData"),
        //当前页面数据
    id = getPageData.component.id;
    dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`${id}_set`, {
      args: [`document_data.hidden`, value]
    }); // Dispatcher.dispatch(`document_set`,{
    //     args:[`document_data.${id}.hidden`,value]
    // })

    let random = Math.floor(Math.random() * 10);
    dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch(`document_set`, {
      value: {
        hidden: value,
        len: value.length + random
      }
    });
  }

}

//# sourceURL=webpack:///./ui/page_management/page_layout/page_layout_controler.js?