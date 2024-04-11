__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuBasic", function() { return MenuBasic; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var basic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! basic */ "./components/page/attr/basic/basic.js");
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");



/** 
* MenuBasic 导航设置结构 
* 
* 导航设置结构。
* @author      sxt 作者 
* @version     1.0 版本号
* @date     	2019-12-27 16-50
*/

class MenuBasic extends basic__WEBPACK_IMPORTED_MODULE_1__["Basic"] {
  constructor(controler) {
    super();
    /**@property controler 边框控制器实例 */

    this.controler = controler;
  }
  /**
   * @method render 组件渲染方法
   * @date 2019-11-11
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    let state = this.state || {},
        groupList = state.groupList || [],
        tabs = state.tabs;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pc-basic-setting"
    }, tabs ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "pcSetUpActive"
    }, tabs.map((e, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: i,
        className: state.currentTab == e ? "on" : "",
        onClick: this.controler.clickTabs.bind(this.controler, e)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, window.public.lang[e]));
    })) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "pcConAttDesign"
    }, groupList.map(e => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: e,
      className: "pcAttList"
    }, this[e] && this[e]()))));
  }
  /**
   * @method  openScreen 开启通屏
   * @author sxt
   * @date 2019-12-27 16:50
   * @return {object} 开启通屏结构
   */


  openScreen() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
      title: "openScreen",
      id: "",
      list: [{
        name: "openTurn",
        value: "true"
      }, {
        name: "closeOff",
        value: "false"
      }],
      value: this.state.screen,
      change: this.controler.setScreen.bind(this.controler, "screen")
    });
  }
  /**
   * @method  sortColumns 栏目排序
   * @author sxt
   * @date 2019-12-27 16:50
   * @return {object} 栏目排序结构
   */


  sortColumns() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
      title: "sortColumns",
      id: "",
      list: [{
        name: "positive",
        value: "positive"
      }, {
        name: "inverted",
        value: "inverted"
      }],
      value: this.state.sort,
      change: this.controler.radioHandler.bind(this.controler, "sort")
    });
  }
  /**
  * @method  twoLevelNavigation 次级导航
  * @author sxt
  * @date 2019-12-27 16:50
  * @return {object} 开启次级导航
  */


  twoLevelNavigation() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
      title: "twoLevelNavigation",
      id: "",
      list: [{
        name: "openTurn",
        value: "true"
      }, {
        name: "closeOff",
        value: "false"
      }],
      value: this.state.twoNav,
      change: this.controler.setTwoNav.bind(this.controler, "twoNav")
    });
  }
  /**
   * @method  dropdownIcon 一级下拉图标
   * @author sxt
   * @date 2019-12-27 16:50
   * @return {object} 开启通屏结构
   */


  dropdownIcon() {
    let twoNav = this.state.twoNav;

    if (twoNav) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
        title: "dropdownIcon",
        id: "",
        list: [{
          name: "openTurn",
          value: "true"
        }, {
          name: "closeOff",
          value: "false"
        }],
        value: this.state.dropdownIcon,
        change: this.controler.setDropdownIcon.bind(this.controler, "dropdownIcon")
      });
    }
  }
  /**
   * @method  levelNavShow 次级导航显示层级
   * @author sxt
   * @date 2019-12-30 11:23
   * @return {object} 开启次级导航
   */


  levelNavShow() {
    let dataSource = this.state.dataSource || {},
        twoNav = this.state.twoNav;

    if (twoNav) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
        title: "sisplaySeveralLevels",
        id: "",
        list: [{
          name: "whole",
          value: "0"
        }, {
          name: "twoLevel",
          value: "2"
        }, {
          name: "threeLevel",
          value: "3"
        }, {
          name: "fourLevel",
          value: "4"
        }],
        value: dataSource.level || "0",
        change: this.controler.setTwoLevelNav.bind(this.controler, "level")
      });
    }
  }
  /**
   * @method  selectionContentSet 内容来源
   * @author sxt
   * @date 2019-12-27 16:50
   * @return {object} 内容来源属性结构
   */


  selectionContentSet() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
      title: "selectionContent",
      id: "",
      list: [{
        name: "custom",
        value: "custom"
      }, {
        name: "databaseData",
        value: "databaseData"
      }],
      value: this.state.selectionContent || "custom",
      change: this.controler.setContent.bind(this.controler)
    });
  }
  /**
   * @method  linkTarget 链接打开方式
   * @author sxt
   * @date 2019-12-27 16:50
   * @return {object} 链接打开方式结构
   */


  linkTarget() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
      title: "openMode",
      value: this.state.target || "_self",
      change: this.controler.radioHandler.bind(this.controler, "target"),
      id: "openMode",
      list: [{
        name: "self",
        value: "_self"
      }, {
        name: "blank",
        value: "_blank"
      }]
    });
  }
  /**
   * @method  anchorSet 开启锚点设置
   * @author sxt
   * @date 2019-12-27 16:50
   * @return {object} 开启锚点设置结构
   */


  anchorSet() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
      title: "anchor",
      id: "",
      list: [{
        name: "openTurn",
        value: "true"
      }, {
        name: "closeOff",
        value: "false"
      }],
      value: this.state.anchor || false,
      change: this.controler.setAnchor.bind(this.controler, "anchor")
    });
  }
  /**
   * @method  dataContent 弹出数据源面板
   * @author sxt
   * @date 2019-12-27 16:50
   * @return {object} 弹出数据源面板
   */


  dataContent() {
    const {
      dataSource = {},
      label,
      selectionContent
    } = this.state || {};
    let _value = window.public.lang["menu"];

    if (dataSource.sourceType) {
      _value = dataSource.sourceText || window.public.lang["menu"];
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].ShowInfo, {
      title: "dataSources",
      id: "",
      value: _value,
      click: this.controler.showDataSource.bind(this.controler)
    });
  }
  /**
   * @method  button 弹出二级导航属性面板
   * @author sxt
   * @date 2019-12-27 16:50
   * @return {object} 弹出二级导航属性面板
   */


  button() {
    let twoNav = this.state.twoNav;

    if (twoNav) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Button, {
        title: "twoLevelNavSet",
        btnName: window.public.lang["clickSet"],
        click: this.controler.showPanel.bind(this.controler)
      });
    }
  }
  /**
  * @method  anchorSet 展开动画
  * @author lby
  * @date 2020-04-21
  * @return {object} 向左展开还是向右展开
  */


  anAnimation() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
      title: "anAnimation",
      id: "",
      list: [{
        name: "downWard",
        value: "downWard"
      }, {
        name: "rightWard",
        value: "rightWard"
      }],
      value: this.state.anAnimation || "downWard",
      change: this.controler.setDirection.bind(this.controler, "anAnimation")
    });
  }
  /**
  * @method  anchorSet 导航下拉是通过鼠标移入还是点击
  * @author lby
  * @date 2020-04-22
  * @return {object} 鼠标移入   鼠标点击
  */


  anDropDown() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
      title: "anDropDown",
      id: "",
      list: [{
        name: "onclick",
        value: "onclick"
      }, {
        name: "onmouseover",
        value: "onmouseover"
      }],
      value: this.state.anDropDown || "onmouseover",
      change: this.controler.setMouseEvent.bind(this.controler, "anDropDown")
    });
  }
  /**
   * @method  pageIcon 页面图标
   * @author sxt
   * @date 2021-3-18
   * @return {object} 开启页面图标结构
   */


  pageIcon() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
      title: "pageIcon",
      id: "pageIcon",
      help: "pageIconHelp",
      list: [{
        name: "openTurn",
        value: "true"
      }, {
        name: "closeOff",
        value: "false"
      }],
      value: this.state.pageIcon || false,
      change: this.controler.setPageIcon.bind(this.controler, "pageIcon")
    });
  }
  /**
   * @method  overflowPart 导航溢出部分显示还是隐藏属性   
   * @author lby
   * @date 2020-04-27
   * @return {object}   textShow溢出隐藏  lineFeed溢出换行
   */


  overflowPart() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_2__["Widget"].Radio, {
      title: "overflowPart",
      id: "",
      list: [{
        name: "textShow",
        value: "textShow"
      }, {
        name: "lineFeed",
        value: "lineFeed"
      }],
      value: this.state.overflowPart || "textShow",
      change: this.controler.setOverFlowPart.bind(this.controler, "overflowPart")
    });
  }
  /**
   * @method align 对齐方式
   * @date 2020-06-11
   * @author wyq
   * @return {object} 对齐结构
   */


  align() {
    let twoNav = this.state.twoNav;

    if (twoNav) {
      return super.align({
        title: 'secondaryAlign'
      });
    }
  }

}

//# sourceURL=webpack:///./components/menu/attr/basic/menu_basic.js?