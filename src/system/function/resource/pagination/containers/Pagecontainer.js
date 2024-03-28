__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Pagecomponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Pagecomponent */ "./system/function/resource/pagination/components/Pagecomponent.js");
/**
 * Created By brand On 2018/2/2
 */



class Pagecontainer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super();
    let _totalPage = props.data.totalPages;
    let _page = props.data.page;
    this.state = {
      dataList: [],
      pageConfig: {
        totalPage: _totalPage,
        _pagenum: _page
      }
    };
    this.getCurrentPage = this.getCurrentPage.bind(props.controler);
  }

  componentWillReceiveProps(newProps) {
    let _totalPage = newProps.data.totalPages;
    let _page = newProps.data.page;

    let _state = this.state || {};

    if (_totalPage || _page) {
      this.setState({
        pageConfig: {
          totalPage: _totalPage,
          _pagenum: _page
        }
      });
    }
  }

  getCurrentPage(currentPage) {
    let _state = this.state || {};

    _state.page = currentPage;
    this.getResourceList(_state).then(data => {
      if (data) {
        this.setState({
          page: currentPage,
          [`${_state.resourceType}List`]: data.list
        });
      }
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.state.dataList), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Pagecomponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
      pageConfig: this.state.pageConfig,
      pageCallbackFn: this.getCurrentPage
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Pagecontainer);

//# sourceURL=webpack:///./system/function/resource/pagination/containers/Pagecontainer.js?