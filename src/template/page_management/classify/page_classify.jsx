__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Classify", function() { return Classify; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");
/* harmony import */ var layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! layer */ "./system/widgets/layer.js");


 //弹出下拉

const ComboBoxData = prop => {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: prop.className
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "seLectBtn onSelect"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("font", null, window.public.lang[prop.title]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    onClick: prop.click
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "wpComboBoxDataText"
  }, prop.dataName || window.public.lang["pleaseChoose"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "iconfont iconBor"
  }, "\uE650")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dateLibrary textConPanl  dataComboBox",
    style: prop.isShow ? {
      "display": "block"
    } : {
      "display": "none"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "dataComList"
  }, prop.setList.map((e, i) => {
    let _class = "dataComList_" + (e.layer || 1);

    if (prop.dataId == e.id) {
      _class = _class + " on ";
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      "data-value": e[prop.name],
      key: e.id,
      title: e[prop.name],
      className: _class,
      onClick: prop.select.bind(null, e),
      "data-id": e.id
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, e[prop.name]));
  })))));
};
/**
 * @class Classify 分类页面结构类
 * @author  
 */


class Classify {
  constructor(controler) {
    /**@property controler seo控制器实例 */
    this.controler = controler;
    let innerHeight = window.innerHeight; //计算上部显示位置,用于修复小屏下显示不开的问题 sxt 2020-2-5

    this.top = innerHeight - 474 - 80 + "px";
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
    let state = this.state || {};
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(layer__WEBPACK_IMPORTED_MODULE_2__["Layer"].open, {
      titles: [window.public.lang["addClassify"]],
      offset: ['300px', `${this.top}`],
      area: ["345px", "474px"],
      skin: "em-function-seo",
      ensure: this.controler.ensure.bind(this.controler),
      close: true
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "addPageClassify"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "pcConAttDesign"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, this.classifyName()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, this.classifyType()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ComboBoxData, {
      title: "setClassifyLink",
      isShow: state.showClassify,
      setList: state.classifyList || [],
      name: "catname",
      className: "dataClassifyList",
      click: this.controler.clickClassifyList.bind(this.controler),
      select: this.controler.selectClassifyList.bind(this.controler),
      dataName: state.catName,
      dataId: state.catId
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ComboBoxData, {
      title: "setNavLink",
      isShow: state.showPage,
      setList: state.pageList,
      name: "name",
      className: "dataContentList",
      click: this.controler.clickPageList.bind(this.controler),
      select: this.controler.selectPageList.bind(this.controler),
      dataName: state.pageName,
      dataId: state.pageId
    }))))));
  } //分类名称结构


  classifyName() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Input, {
      title: "classifyName",
      id: "classifyName",
      readonly: false,
      placeholder: window.public.lang["classifyName"],
      value: this.state.label,
      change: this.controler.changeCatName.bind(this.controler)
    });
  } //分类类型结构


  classifyType() {
    let state = this.state || {},
        catType = state.catType || "product";
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Radio, {
      title: "type",
      id: "",
      list: [{
        name: "product",
        value: "product"
      }, {
        name: "content",
        value: "content"
      }],
      value: catType,
      change: this.controler.selectType.bind(this.controler)
    });
  }

}

//# sourceURL=webpack:///./ui/page_management/classify/page_classify.js?