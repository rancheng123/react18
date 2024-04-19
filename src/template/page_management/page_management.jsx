__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageManagement", function() { return PageManagement; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");
/* harmony import */ var layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! layer */ "./system/widgets/layer.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





const DragElement = ({
  name,
  x,
  y,
  w,
  h,
  onMouseMove
}) => {
  const style = {
    left: x + 'px',
    top: y + 'px',
    width: '270px',
    height: '39px'
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "drag-element",
    "data-element": 0,
    style: style
  }, name);
};

export default class PageManagement {
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

  render() {
    let state = this.state || {},
        menuList = state.menuList || [];
    const {
      isDrag,
      dragElement,
      isMove
    } = state;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(layer__WEBPACK_IMPORTED_MODULE_2__["Layer"].open, {
      titles: [window.public.lang["managePage"]],
      area: ['300px', 'auto'],
      offset: ['100px', '60px'],
      close: true
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "aniCon pageConMain"
    }, this.tabButtons(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "aniNav"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "pageSet"
    }), isMove ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        position: 'relative'
      },
      className: "conMain",
      id: "dragConMain",
      onClick: this.controler.closeNew.bind(this.controler)
    }, this.listHtml(menuList), isDrag ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DragElement, _extends({
      name: state.original.label
    }, dragElement)) : null) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "conMain",
      id: "dragConMain",
      onClick: this.controler.closeNew.bind(this.controler)
    }, this.listHtml(menuList)), this.addPageHtml(), this.getPageAddHtml(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.controler.clickMask.bind(this.controler),
      style: {
        display: state.setBlock || "none"
      },
      id: "pageMask"
    }, this.getSetHtml()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "pageSaveTips"
    }))));
  } //添加页面结构


  getPageAddHtml() {
    let _state = this.state || {};

    let _style = {
      bottom: "0px",
      left: "300px",
      display: _state.addBlock || "none"
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ediConPanl pageType",
      style: _style
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "conSetUp"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.addPage.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["page"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["addPagePrompt"]))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.addPageLink.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["link"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["addLinkPrompt"]))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.pageAddCat.bind(this.controler, "add")
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["addClassify"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["addClassifyPrompt"]))))));
  } //设置功能按钮结构


  getSetHtml() {
    let state = this.state || {},
        currentData = state.currentData || {},
        pageType = currentData.pageType,
        layer = currentData.layer,
        isVisible = currentData.isVisible,
        tab = state.tab;
    let _style = {
      top: state.setTop + "px",
      left: "284px",
      display: state.setBlock || "none",
      minHeight: "0px"
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ediConPanl pageSetUp",
      style: _style
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "conSetUp"
    }, tab == "menu" || tab == "template" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.pageSetUp.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "\uE600"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["setting"]))), pageType == "CatLink" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.pageAddCat.bind(this.controler, "CatLink")
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "\uE641"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["changeClassify"]))) : null, pageType == "JumpLink" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.showLink.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "\uE609"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["changeLink"]))) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.pageChangeName.bind(this.controler, currentData.pid)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "\uE6E3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["rename"]))), pageType != "CatLink" && pageType != "Search" && pageType != "PageLabel" && pageType != "ShoppingCart" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.pageCopy.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "\uE61A"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["copy"]))) : null, pageType != "Search" && pageType != "PageLabel" && pageType != "NewsContent" && pageType != "ProductContent" && pageType != "ShoppingCart" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.pageShow.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, isVisible ? "" : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, isVisible ? window.public.lang["show"] : window.public.lang["hide"]))) : null, pageType != "Search" && pageType != "PageLabel" && pageType != "ShoppingCart" && pageType != "ClassiFication" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.pageSetDelete.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "\uE601"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["delete"]))) : null, pageData.isTrans ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.pageTranslate.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "yiyingbaoicon"
    }, "\uE62F"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["translation"]))) : null, layer == 1 || layer == 2 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.childPageAdd.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "yiyingbaoicon"
    }, "\uE6E2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["addPage"]))) : null, pageType == "CatLink" && pageType == "CatLink" ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.history.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "\uE600"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\u5386\u53F2\u8BB0\u5F55")))) : null, tab == "lightbox" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.pageChangeName.bind(this.controler, currentData.pid)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "\uE6E3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["rename"]))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.lightboxDelete.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "\uE601"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["delete"])))) : null, tab == "delete" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.pageReduction.bind(this.controler, currentData.pid)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "\uE6E3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["reduction"]))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: this.controler.pageShredFile.bind(this.controler, currentData.pid)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "\uE601"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, window.public.lang["shredFile"])))) : null));
  } //添加页面按钮结构


  addPageHtml() {
    let _state = this.state || {},
        tab = _state.tab || "menu";

    if (tab == "menu") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "addPage"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "addPageBtn"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        name: "description",
        onClick: this.controler.pageAddShow.bind(this.controler),
        type: "button",
        className: "em-button-ensure"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "+  "), window.public.lang["addPage"])));
    } //类型为弹出层时，显示清除结构 sxt 2020-7-23


    if (tab == "lightbox") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "addPage"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "addPageBtn"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        name: "description",
        onClick: this.controler.lightboxClose.bind(this.controler),
        type: "button",
        className: "em-button-ensure"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "X  "), window.public.lang["closeLightbox"])));
    }

    if (tab == "delete") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "addPage"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "addPageBtn"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        name: "description",
        onClick: this.controler.deletePageAll.bind(this.controler),
        type: "button",
        className: "em-button-ensure"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null), window.public.lang["emptyTrash"])));
    }
  } //切换项结构


  tabButtons() {
    let state = this.state || {};
    let arr = [{
      name: 'managePage',
      value: 'menu'
    }, {
      name: 'templatePage',
      value: 'template'
    }, {
      name: 'lightbox',
      value: 'lightbox'
    }, {
      name: 'recovery',
      value: 'delete',
      src: "https://img.bjyyb.net/sites/57500/57600/20200927163600536.png"
    }];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "layer-tabs"
    }, arr.map(e => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        title: window.public.lang[e.name],
        key: e.value,
        onClick: this.controler.setTab.bind(this.controler, e.value),
        className: e.value == state.tab ? "on" : null
      }, e.src ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "tabFont"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("font", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: e.src
      }))) : window.public.lang[e.name]);
    }));
  } //内页文本提示结构 sxt 2020-10-19


  spanHelp(pageType) {
    switch (pageType) {
      case "Search":
        return "(搜索页)";
        break;

      case "NewsContent":
        return "(新闻内页)";
        break;

      case "ProductContent":
        return "(产品内页)";
        break;

      case "PageLabel":
        return "(标签页)";
        break;
    }
  } //icon类型结构


  iconHtml(prop) {
    let pageType = prop.pageType;
    let _typeIcon = "",
        //页面类型图标
    _typeClass = "iconfont"; //页面类型图标Class

    let spanHelp = this.spanHelp(pageType);

    if (pageType == "MenuLink") {
      _typeIcon = "";
    } else if (pageType == "PageLink" || pageType == "Search" || pageType == "NewsContent" || pageType == "ProductContent" || pageType == "ShoppingCart" || pageType == "PageLabel") {
      _typeIcon = "";
    } else if (pageType == "CatLink") {
      _typeIcon = "";
    } else if (pageType == "ClassiFication") {
      _typeIcon = "";
      _typeClass = "yiyingbaoicon";
    } else if (pageType == "ListingLink") {
      _typeIcon = "";
      _typeClass = "yiyingbaoicon";
    } else if (pageType == "bindCat") {
      _typeIcon = "";
      _typeClass = "yiyingbaoicon";
    } else if (pageType == "TempLink") {
      _typeIcon = "";
      _typeClass = "yiyingbaoicon";
    } else if (pageType == "JumpLink") {
      _typeIcon = "";
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "pageMenuTitle"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      title: prop.label
    }, prop.label), spanHelp ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "pageTypeHelp"
    }, spanHelp) : null, prop.is_home ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "") : null, prop.isVisible ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "iconfont"
    }, "") : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: _typeClass
    }, _typeIcon));
  } //列表结构


  listHtml(list) {
    let state = this.state || {},
        currentData = state.currentData || {},
        expand = state.expand || [];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      "data-element": "0",
      className: "pageMenu"
    }, list.map((e, i) => {
      let item = e,
          attr;

      if (item.type === 'plac') {
        attr = {
          "data-plac": 1,
          "data-element": 1,
          "data-id": item.pid,
          "className": "plac"
        }; //ele = <li {...attr} key={i}><div {...attr}>{item.parent_id}</div></li>

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", _extends({}, attr, {
          key: i
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", attr));
      } else {
        attr = {
          "data-plac": 0,
          "data-element": 1,
          "data-id": item.pid
        };
      }

      let _pageIcon = e.icon || {}; //类型为弹出层时，事件都不同，改结构了 sxt 2020-7-23


      if (state.tab == "lightbox") {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: e.pid,
          "data-id": e.pid
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "pageMenuItem " + `${state.lightboxId == e.pid ? "selected" : ""}`
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: state.lightboxNameId == e.pid ? "hide" : "show"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "yiyingbaoicon  iconStyle"
        }, ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "dragBox",
          onClick: this.controler.lightboxClick.bind(this.controler, e)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "pageMenuTitle"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          title: e.label
        }, e.label))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "pageQuActions"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "pageActions"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "selectedCon",
          onClick: this.controler.singleSetShow.bind(this.controler, e)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "iconfont"
        }, "\uE67C")))))), state.lightboxNameId == e.pid ? this.pageChangeNameHtml(e.label) : null));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", _extends({}, attr, {
        key: e.id,
        "data-id": e.pid
      }), e.child ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "expander",
        onClick: this.controler.setExpand.bind(this.controler, e.pid)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, expand.includes(e.pid) ? "+" : "-")) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({}, attr, {
        className: "pageMenuItem " + `${state.currentPageId == e.pid ? "selected" : ""}`
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: state.pageNameId == e.pid ? "hide" : "show"
      }, !_pageIcon.iconSrc ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "yiyingbaoicon  iconStyle",
        onClick: e.pageType != "bindCat" ? this.controler.changeIcon.bind(this.controler, e) : null
      }, _pageIcon.iconName || "") : null, _pageIcon.iconSrc ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: _pageIcon.iconSrc,
        onClick: e.pageType != "bindCat" ? this.controler.changeIcon.bind(this.controler, e) : null
      }) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dragBox",
        onMouseDown: e.pageType != "bindCat" ? this.controler.dragStart.bind(this.controler) : null
      }, this.iconHtml(e)), e.pageType != "bindCat" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pageQuActions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pageActions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "selectedCon",
        onClick: this.controler.singleSetShow.bind(this.controler, e)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "iconfont"
      }, "\uE67C"))))) : null), state.pageNameId == e.pid ? this.pageChangeNameHtml() : null), e.child && !expand.includes(e.pid) ? this.listHtml(e.child) : "");
    }));
  } //改名的结构	


  pageChangeNameHtml(value) {
    let state = this.state,
        currentData = state.currentData || {},
        label = currentData.label || "";

    if (value) {
      label = value;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pControlText"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: "pContText",
      value: label,
      type: "text",
      autoFocus: true,
      onChange: this.controler.pageChangeInput.bind(this.controler),
      onBlur: this.controler.pageNameBlur.bind(this.controler)
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "pContBtn "
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pBtnCon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      onClick: this.controler.completeName.bind(this.controler)
    }, window.public.lang["complete"]))));
  }
  /**
  * 即时渲染
  */


  componentDidUpdate() {
    this.setPosition();
  }

  componentDidMount() {
    this.setPosition();
  }

}
