__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Info", function() { return Info; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");


/**
 * @class {Info} Company视图类
 * @author wyq
 * @version 1.0
 * @date 2019-12-3
 */

class Info {
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
    const {
      props: {
        initialData
      },
      state = {}
    } = this;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "pcConAttDesign"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, this.labelText()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, this.subText()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, this.hideFromMenu()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, this.pageHome()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, this.bindClassify()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList autobindBox"
    }, this.classifyList()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList autobindBox"
    }, this.showClassifyList()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList autobindBox"
    }, this.displayContent()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList autobindBox"
    }, this.showPageList()));
  }
  /**
  * @method labelText输入框   changText更改文本 
  * @author sxt
  * @param {object} 更改按钮文本内容
  */


  labelText() {
    let state = this.state || {};
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Input, {
      title: "pageName",
      id: "pageName",
      value: state.label,
      change: this.controler.changText.bind(this.controler, "label")
    });
  }

  subText() {
    let state = this.state || {};
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Input, {
      title: "subTitle",
      id: "subTitle",
      value: state.subTitle,
      change: this.controler.changText.bind(this.controler, "subTitle")
    });
  }
  /**
  * @method  hideFromMenu 显示隐藏
  * @author sxt
  * @return {object} 内容来源属性结构
  */


  hideFromMenu() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Radio, {
      title: "hideFromMenu",
      id: "",
      list: [{
        name: "openTurn",
        value: "true"
      }, {
        name: "closeOff",
        value: "false"
      }],
      value: this.state.isVisible,
      change: this.controler.setRadio.bind(this.controler, "isVisible")
    });
  }
  /**
  * @method  hideFromMenu 显示隐藏
  * @author sxt
  * @return {object} 内容来源属性结构
  */


  pageHome() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Radio, {
      title: "homepage",
      id: "",
      list: [{
        name: "openTurn",
        value: "true"
      }, {
        name: "closeOff",
        value: "false"
      }],
      value: this.state.is_home,
      change: this.controler.setRadio.bind(this.controler, "is_home")
    });
  }
  /**
  * @method  bindClassify 自动绑定分类
  * @author sxt
  * @return {object} bindClassify属性结构
  */


  bindClassify() {
    let {
      pageType
    } = this.state || {};

    if (pageType == "CatLink") {
      return null;
    } //页面类型为分类时，不显示自动绑定的结构 sxt 2021-4-29


    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Radio, {
      title: "bindClassify",
      id: "bindClassify",
      list: [{
        name: "openTurn",
        value: "true"
      }, {
        name: "closeOff",
        value: "false"
      }],
      value: this.state.bindClassify,
      change: this.controler.setBindClassify.bind(this.controler, "bindClassify")
    });
  }
  /**
  * @method  bindClassify 分类类型设置
  * @author sxt
  * @return {object} bindClassify属性结构
  */


  classifyList() {
    let {
      pageType
    } = this.state || {};

    if (pageType == "CatLink") {
      return null;
    } //页面类型为分类时，不显示自动绑定的结构 sxt 2021-4-29


    let catType = this.state.catType;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Radio, {
      title: "classifyList",
      id: "classifyList",
      list: [{
        name: "product",
        value: "goods"
      }, {
        name: "content",
        value: "content"
      }],
      value: catType,
      change: this.controler.setClassifyType.bind(this.controler, "catType")
    });
  }
  /**
  * @method  displayContent 分类展示内容设置
  * @author sxt
  * @return {object} bindClassify属性结构
  */


  displayContent() {
    let {
      pageType
    } = this.state || {};

    if (pageType == "CatLink") {
      return null;
    } //页面类型为分类时，不显示自动绑定的结构 sxt 2021-4-29


    let bindClassify = this.state.bindClassify;

    if (bindClassify == true) {
      let displayContent = this.state.displayContent || "classifyDisplay";
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Radio, {
        title: "displayContent",
        id: "displayContent",
        list: [{
          name: "classify",
          value: "classifyDisplay"
        }, {
          name: "whole",
          value: "whole"
        }],
        value: displayContent,
        change: this.controler.setContent.bind(this.controler, "displayContent")
      });
    }
  }
  /**
  * @method  showClassifyList 分类具体列表设置
  * @author sxt
  * @date 2020-9-14
  * @return {object} 分类具体列表设置结构
  */


  showClassifyList() {
    const {
      state = {}
    } = this;

    if (state.pageType == "CatLink") {
      return null;
    } //页面类型为分类时，不显示自动绑定的结构 sxt 2021-4-29


    let bindClassify = state.bindClassify;

    if (bindClassify == true) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ComboBoxData, {
        title: "setClassifyLink",
        isShow: state.showClassify,
        setList: state.classifyList || [],
        name: "catname",
        className: "dataClassifyList",
        click: this.controler.clickClassifyList.bind(this.controler),
        select: this.controler.selectClassifyList.bind(this.controler),
        dataName: state.catName,
        dataId: state.catId
      });
    }
  }
  /**
  * @method  showClassifyList 模版页面设置
  * @author sxt
   * @date 2020-9-14
  * @return {object} 模版页面设置结构
  */


  showPageList() {
    const {
      state = {}
    } = this;

    if (state.pageType == "CatLink") {
      return null;
    } //页面类型为分类时，不显示自动绑定的结构 sxt 2021-4-29


    let bindClassify = state.bindClassify;

    if (bindClassify == true) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ComboBoxData, {
        title: "setNavLink",
        isShow: state.showPage,
        setList: state.pageList,
        name: "name",
        className: "dataContentList",
        click: this.controler.clickPageList.bind(this.controler),
        select: this.controler.selectPageList.bind(this.controler),
        dataName: state.pageName,
        dataId: state.pageId
      });
    }
  }

}

//# sourceURL=webpack:///./ui/page_management/nav_info/nav_info.js?