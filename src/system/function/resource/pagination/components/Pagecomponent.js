__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Pagecomponent_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagecomponent.css */ "./system/function/resource/pagination/components/Pagecomponent.css");
/* harmony import */ var _Pagecomponent_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Pagecomponent_css__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Created By brand On 2018/2/2
 */



class Pagecomponent extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      //当前页码
      groupCount: 5,
      //页码分组，显示7个页码，其余用省略号显示
      startPage: 1,
      //分组开始页码
      totalPage: 1 //总页数

    };
    this.createPage = this.createPage.bind(this);
  }

  componentDidMount() {
    this.setState({
      totalPage: this.props.pageConfig.totalPage,
      currentPage: this.props.pageConfig._pagenum
    });
    this.props.pageCallbackFn(this.state.currentPage);
  }

  componentWillReceiveProps(newProps) {
    let _totalPage = newProps.pageConfig.totalPage;
    let _page = newProps.pageConfig._pagenum;

    let _state = this.state || {};

    if (_totalPage && _totalPage != _state.totalPage) {
      this.setState({
        totalPage: _totalPage
      });
    }

    if (_page && _page != _state.currentPage) {
      this.setState({
        currentPage: _page
      });
    }
  }

  createPage() {
    //const {totalPage} = this.props.pageConfig;
    const {
      currentPage,
      groupCount,
      startPage,
      totalPage
    } = this.state;
    let pages = []; //上一页

    pages.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: currentPage === 1 ? "nomore" : null,
      onClick: this.prePageHandeler.bind(this),
      key: 0
    }, "\u4E0A\u4E00\u9875"));

    if (totalPage <= 10) {
      /*总页码小于等于10时，全部显示出来*/
      for (let i = 1; i <= totalPage; i++) {
        pages.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: i,
          onClick: this.pageClick.bind(this, i),
          className: currentPage === i ? "activePage" : null
        }, i));
      }
    } else {
      /*总页码大于10时，部分显示*/
      //第一页
      pages.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: currentPage === 1 ? "activePage" : null,
        key: 1,
        onClick: this.pageClick.bind(this, 1)
      }, "1"));
      let pageLength = 0;

      if (groupCount + startPage > totalPage) {
        pageLength = totalPage;
      } else {
        pageLength = groupCount + startPage;
      } //前面省略号(当当前页码比分组的页码大时显示省略号)


      if (currentPage >= groupCount) {
        pages.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "",
          key: -1
        }, "\xB7\xB7\xB7"));
      } //非第一页和最后一页显示


      for (let i = startPage; i < pageLength; i++) {
        if (i <= totalPage - 1 && i > 1) {
          pages.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
            className: currentPage === i ? "activePage" : null,
            key: i,
            onClick: this.pageClick.bind(this, i)
          }, i));
        }
      } //后面省略号


      if (totalPage - startPage >= groupCount + 1) {
        pages.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "",
          key: -2
        }, "\xB7\xB7\xB7"));
      } //最后一页


      pages.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: currentPage === totalPage ? "activePage" : null,
        key: totalPage,
        onClick: this.pageClick.bind(this, totalPage)
      }, totalPage));
    } //下一页


    pages.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: currentPage === totalPage ? "nomore" : null,
      onClick: this.nextPageHandeler.bind(this),
      key: totalPage + 1
    }, "\u4E0B\u4E00\u9875"));
    return pages;
  } //页码点击


  pageClick(currentPage) {
    const {
      groupCount
    } = this.state;
    const getCurrentPage = this.props.pageCallbackFn; //当 当前页码 大于 分组的页码 时，使 当前页 前面 显示 两个页码

    if (currentPage >= groupCount) {
      this.setState({
        startPage: currentPage - 2
      });
    }

    if (currentPage < groupCount) {
      this.setState({
        startPage: 1
      });
    } //第一页时重新设置分组的起始页


    if (currentPage === 1) {
      this.setState({
        startPage: 1
      });
    }

    this.setState({
      currentPage
    }); //将当前页码返回父组件

    getCurrentPage(currentPage);
  } //上一页事件


  prePageHandeler() {
    let {
      currentPage
    } = this.state;

    if (--currentPage === 0) {
      return false;
    }

    this.pageClick(currentPage);
  } //下一页事件


  nextPageHandeler() {
    let {
      currentPage,
      totalPage
    } = this.state; // const {totalPage} = this.props.pageConfig;

    if (++currentPage > totalPage) {
      return false;
    }

    this.pageClick(currentPage);
  }

  render() {
    const pageList = this.createPage();
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "page-container"
    }, pageList);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Pagecomponent);

//# sourceURL=webpack:///./system/function/resource/pagination/components/Pagecomponent.js?