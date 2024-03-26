__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageHistoryControler", function() { return PageHistoryControler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
/* harmony import */ var _page_history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page_history */ "./ui/page_management/history/page_history.js");
/* harmony import */ var layer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! layer */ "./system/widgets/layer.js");





class PageHistoryControler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {space} view 初始化 view 实例*/

    this.view = new _page_history__WEBPACK_IMPORTED_MODULE_3__["PageHistory"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  static pageManagement() {
    const element = document.querySelector('#page-management');
    react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PageHistoryControler, null), element);
  }
  /**
      * @method  render 挂载组件方法
      * @author sxt
      */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.view.render, null);
  }
  /**
      * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
      * @author wyq
      */


  init() {
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    const {
      pid
    } = this.props;
    let newData = {
      sid: pageData.siteId,
      pid,
      module: 'page'
    };
    return fetch("/desktop/index.php/Edit/DBLog/index", {
      method: 'POST',
      headers: {},
      body: JSON.stringify(newData)
    }).then(response => response.json()).then(data => {
      this.setState({
        data: data.msg
      });
    });
  }
  /**
   * @description: 页面数据还原
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-01-08 16:02:24
   */


  pageDataReductionHandle(id) {
    fetch("/desktop/index.php/Edit/DBLog/recoveryDbLog", {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        id
      })
    }).then(response => response.json()).then(data => {
      if (!data.suc) {
        document.getElementById('pageSet').querySelector('.layer-close').click();
        window.public.reload();
      } else {
        alert(data.msg);
      }
    });
  }
  /**
   * @description: 页面数据还原提示
   * @param {id} 页面日志id
   * @return: void
   * @author: Eric
   * @Date: 2020-01-08 15:07:28
   */


  pageDataReduction(id) {
    layer__WEBPACK_IMPORTED_MODULE_4__["Layer"].alert({
      area: ["420px", "225px"],
      skin: "",
      close: true,
      cancel: true,
      ensure: this.pageDataReductionHandle.bind(this, id),
      content: '确定要还原页面数据吗?'
    });
  }

}

//# sourceURL=webpack:///./ui/page_management/history/page_history_controler.js?