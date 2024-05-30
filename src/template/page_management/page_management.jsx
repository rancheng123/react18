
import React from 'react';
import Widget from '@/system/widgets/widget';
import Layer from '@/system/widgets/layer';


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
  return React.createElement("span", {
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
    return React.createElement(Layer.open, {
      titles: [window.public.lang["managePage"]],
      area: ['300px', 'auto'],
      offset: ['100px', '60px'],
      close: true
    }, React.createElement("div", {
      className: "aniCon pageConMain"
    }, this.tabButtons(), React.createElement("div", {
      className: "aniNav"
    }, React.createElement("div", {
      id: "pageSet"
    }), isMove ? React.createElement("div", {
      style: {
        position: 'relative'
      },
      className: "conMain",
      id: "dragConMain",
      onClick: this.controler.closeNew.bind(this.controler)
    }, this.listHtml(menuList), isDrag ? React.createElement(DragElement, _extends({
      name: state.original.label
    }, dragElement)) : null) : React.createElement("div", {
      className: "conMain",
      id: "dragConMain",
      onClick: this.controler.closeNew.bind(this.controler)
    }, this.listHtml(menuList)), this.addPageHtml(), this.getPageAddHtml(), React.createElement("div", {
      onClick: this.controler.clickMask.bind(this.controler),
      style: {
        display: state.setBlock || "none"
      },
      id: "pageMask"
    }, this.getSetHtml()), React.createElement("div", {
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
    return React.createElement("div", {
      className: "ediConPanl pageType",
      style: _style
    }, React.createElement("div", {
      className: "conSetUp"
    }, React.createElement("ul", null, React.createElement("li", {
      onClick: this.controler.addPage.bind(this.controler)
    }, React.createElement("p", null, React.createElement("i", null), React.createElement("span", null, window.public.lang["page"]), React.createElement("span", null, window.public.lang["addPagePrompt"]))), React.createElement("li", {
      onClick: this.controler.addPageLink.bind(this.controler)
    }, React.createElement("p", null, React.createElement("i", null), React.createElement("span", null, window.public.lang["link"]), React.createElement("span", null, window.public.lang["addLinkPrompt"]))), React.createElement("li", {
      onClick: this.controler.pageAddCat.bind(this.controler, "add")
    }, React.createElement("p", null, React.createElement("i", null), React.createElement("span", null, window.public.lang["addClassify"]), React.createElement("span", null, window.public.lang["addClassifyPrompt"]))))));
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
    return React.createElement("div", {
      className: "ediConPanl pageSetUp",
      style: _style
    }, React.createElement("div", {
      className: "conSetUp"
    }, tab == "menu" || tab == "template" ? React.createElement("ul", null, React.createElement("li", {
      onClick: this.controler.pageSetUp.bind(this.controler)
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, "\uE600"), React.createElement("span", null, window.public.lang["setting"]))), pageType == "CatLink" ? React.createElement("li", {
      onClick: this.controler.pageAddCat.bind(this.controler, "CatLink")
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, "\uE641"), React.createElement("span", null, window.public.lang["changeClassify"]))) : null, pageType == "JumpLink" ? React.createElement("li", {
      onClick: this.controler.showLink.bind(this.controler)
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, "\uE609"), React.createElement("span", null, window.public.lang["changeLink"]))) : null, React.createElement("li", {
      onClick: this.controler.pageChangeName.bind(this.controler, currentData.pid)
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, "\uE6E3"), React.createElement("span", null, window.public.lang["rename"]))), pageType != "CatLink" && pageType != "Search" && pageType != "PageLabel" && pageType != "ShoppingCart" ? React.createElement("li", {
      onClick: this.controler.pageCopy.bind(this.controler)
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, "\uE61A"), React.createElement("span", null, window.public.lang["copy"]))) : null, pageType != "Search" && pageType != "PageLabel" && pageType != "NewsContent" && pageType != "ProductContent" && pageType != "ShoppingCart" ? React.createElement("li", {
      onClick: this.controler.pageShow.bind(this.controler)
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, isVisible ? "" : ""), React.createElement("span", null, isVisible ? window.public.lang["show"] : window.public.lang["hide"]))) : null, pageType != "Search" && pageType != "PageLabel" && pageType != "ShoppingCart" && pageType != "ClassiFication" ? React.createElement("li", {
      onClick: this.controler.pageSetDelete.bind(this.controler)
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, "\uE601"), React.createElement("span", null, window.public.lang["delete"]))) : null, pageData.isTrans ? React.createElement("li", {
      onClick: this.controler.pageTranslate.bind(this.controler)
    }, React.createElement("p", null, React.createElement("i", {
      className: "yiyingbaoicon"
    }, "\uE62F"), React.createElement("span", null, window.public.lang["translation"]))) : null, layer == 1 || layer == 2 ? React.createElement("li", {
      onClick: this.controler.childPageAdd.bind(this.controler)
    }, React.createElement("p", null, React.createElement("i", {
      className: "yiyingbaoicon"
    }, "\uE6E2"), React.createElement("span", null, window.public.lang["addPage"]))) : null, pageType == "CatLink" && pageType == "CatLink" ? null : React.createElement("li", {
      onClick: this.controler.history.bind(this.controler)
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, "\uE600"), React.createElement("span", null, "\u5386\u53F2\u8BB0\u5F55")))) : null, tab == "lightbox" ? React.createElement("ul", null, React.createElement("li", {
      onClick: this.controler.pageChangeName.bind(this.controler, currentData.pid)
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, "\uE6E3"), React.createElement("span", null, window.public.lang["rename"]))), React.createElement("li", {
      onClick: this.controler.lightboxDelete.bind(this.controler)
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, "\uE601"), React.createElement("span", null, window.public.lang["delete"])))) : null, tab == "delete" ? React.createElement("ul", null, React.createElement("li", {
      onClick: this.controler.pageReduction.bind(this.controler, currentData.pid)
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, "\uE6E3"), React.createElement("span", null, window.public.lang["reduction"]))), React.createElement("li", {
      onClick: this.controler.pageShredFile.bind(this.controler, currentData.pid)
    }, React.createElement("p", null, React.createElement("i", {
      className: "iconfont"
    }, "\uE601"), React.createElement("span", null, window.public.lang["shredFile"])))) : null));
  } //添加页面按钮结构


  addPageHtml() {
    let _state = this.state || {},
      tab = _state.tab || "menu";

    if (tab == "menu") {
      return React.createElement("div", {
        className: "addPage"
      }, React.createElement("div", {
        className: "addPageBtn"
      }, React.createElement("button", {
        name: "description",
        onClick: this.controler.pageAddShow.bind(this.controler),
        type: "button",
        className: "em-button-ensure"
      }, React.createElement("i", null, "+  "), window.public.lang["addPage"])));
    } //类型为弹出层时，显示清除结构


    if (tab == "lightbox") {
      return React.createElement("div", {
        className: "addPage"
      }, React.createElement("div", {
        className: "addPageBtn"
      }, React.createElement("button", {
        name: "description",
        onClick: this.controler.lightboxClose.bind(this.controler),
        type: "button",
        className: "em-button-ensure"
      }, React.createElement("i", null, "X  "), window.public.lang["closeLightbox"])));
    }

    if (tab == "delete") {
      return React.createElement("div", {
        className: "addPage"
      }, React.createElement("div", {
        className: "addPageBtn"
      }, React.createElement("button", {
        name: "description",
        onClick: this.controler.deletePageAll.bind(this.controler),
        type: "button",
        className: "em-button-ensure"
      }, React.createElement("i", null), window.public.lang["emptyTrash"])));
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
    return React.createElement("ul", {
      className: "layer-tabs"
    }, arr.map(e => {
      return React.createElement("li", {
        title: window.public.lang[e.name],
        key: e.value,
        onClick: this.controler.setTab.bind(this.controler, e.value),
        className: e.value == state.tab ? "on" : null
      }, e.src ? React.createElement("span", {
        className: "tabFont"
      }, React.createElement("font", null, React.createElement("img", {
        src: e.src
      }))) : window.public.lang[e.name]);
    }));
  } //内页文本提示结构 


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

    return React.createElement("span", {
      className: "pageMenuTitle"
    }, React.createElement("span", {
      title: prop.label
    }, prop.label), spanHelp ? React.createElement("span", {
      className: "pageTypeHelp"
    }, spanHelp) : null, prop.is_home ? React.createElement("i", {
      className: "iconfont"
    }, "") : null, prop.isVisible ? React.createElement("i", {
      className: "iconfont"
    }, "") : null, React.createElement("i", {
      className: _typeClass
    }, _typeIcon));
  } //列表结构


  listHtml(list) {
    let state = this.state || {},
      currentData = state.currentData || {},
      expand = state.expand || [];
    return React.createElement("ul", {
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

        return React.createElement("li", _extends({}, attr, {
          key: i
        }), React.createElement("div", attr));
      } else {
        attr = {
          "data-plac": 0,
          "data-element": 1,
          "data-id": item.pid
        };
      }

      let _pageIcon = e.icon || {}; //类型为弹出层时，事件都不同，改结构了


      if (state.tab == "lightbox") {
        return React.createElement("li", {
          key: e.pid,
          "data-id": e.pid
        }, React.createElement("div", {
          className: "pageMenuItem " + `${state.lightboxId == e.pid ? "selected" : ""}`
        }, React.createElement("div", {
          className: state.lightboxNameId == e.pid ? "hide" : "show"
        }, React.createElement("i", {
          className: "yiyingbaoicon  iconStyle"
        }, ""), React.createElement("div", {
          className: "dragBox",
          onClick: this.controler.lightboxClick.bind(this.controler, e)
        }, React.createElement("span", {
          className: "pageMenuTitle"
        }, React.createElement("span", {
          title: e.label
        }, e.label))), React.createElement("div", {
          className: "pageQuActions"
        }, React.createElement("div", null, React.createElement("div", {
          className: "pageActions"
        }, React.createElement("div", {
          className: "selectedCon",
          onClick: this.controler.singleSetShow.bind(this.controler, e)
        }, React.createElement("i", {
          className: "iconfont"
        }, "\uE67C")))))), state.lightboxNameId == e.pid ? this.pageChangeNameHtml(e.label) : null));
      }

      return React.createElement("li", _extends({}, attr, {
        key: e.id,
        "data-id": e.pid
      }), e.child ? React.createElement("span", {
        className: "expander",
        onClick: this.controler.setExpand.bind(this.controler, e.pid)
      }, React.createElement("i", null, expand.includes(e.pid) ? "+" : "-")) : null, React.createElement("div", _extends({}, attr, {
        className: "pageMenuItem " + `${state.currentPageId == e.pid ? "selected" : ""}`
      }), React.createElement("div", {
        className: state.pageNameId == e.pid ? "hide" : "show"
      }, !_pageIcon.iconSrc ? React.createElement("i", {
        className: "yiyingbaoicon  iconStyle",
        onClick: e.pageType != "bindCat" ? this.controler.changeIcon.bind(this.controler, e) : null
      }, _pageIcon.iconName || "") : null, _pageIcon.iconSrc ? React.createElement("img", {
        src: _pageIcon.iconSrc,
        onClick: e.pageType != "bindCat" ? this.controler.changeIcon.bind(this.controler, e) : null
      }) : null, React.createElement("div", {
        className: "dragBox",
        onMouseDown: e.pageType != "bindCat" ? this.controler.dragStart.bind(this.controler) : null
      }, this.iconHtml(e)), e.pageType != "bindCat" ? React.createElement("div", {
        className: "pageQuActions"
      }, React.createElement("div", null, React.createElement("div", {
        className: "pageActions"
      }, React.createElement("div", {
        className: "selectedCon",
        onClick: this.controler.singleSetShow.bind(this.controler, e)
      }, React.createElement("i", {
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

    return React.createElement("div", {
      className: "pControlText"
    }, React.createElement("input", {
      className: "pContText",
      value: label,
      type: "text",
      autoFocus: true,
      onChange: this.controler.pageChangeInput.bind(this.controler),
      onBlur: this.controler.pageNameBlur.bind(this.controler)
    }), React.createElement("button", {
      className: "pContBtn "
    }, React.createElement("div", {
      className: "pBtnCon"
    }, React.createElement("span", {
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
