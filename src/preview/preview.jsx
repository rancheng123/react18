__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Preview", function() { return Preview; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class Preview {
  constructor(controler) {
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

  selectList(prop) {
    let {
      list,
      value,
      key,
      condition
    } = prop;
    return list.map((e, i) => {
      if (condition) {
        let splitW = e.value.indexOf("x") && e.value.split("x")[0] || 1920;

        if (splitW > condition) {
          return null;
        }
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        "data-value": e.value,
        key: e.value,
        onClick: this.controler.select.bind(this.controler, key, e.value),
        className: value == e.value ? "on" : null
      }, e.name);
    });
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-08-16
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    let {
      domainName,
      resolvingPowerList,
      screenTypeList,
      rateShow,
      rateValue,
      websiteShow,
      websiteValue,
      codeShow,
      winWidth,
      winHeight,
      defWidth,
      clientHeight,
      codeImg
    } = this.state;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.controler.clickClose.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "PreviewBox"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "previewcont"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcpreview"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.controler.showFn.bind(this.controler, "rateShow")
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null), "PC\u7AD9\u5206\u8FA8\u7387", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\u25BC")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `previewDown ${rateShow ? "" : "hidden"}`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "PC\u7AD9\u5206\u8FA8\u7387"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, this.selectList({
      list: resolvingPowerList,
      value: rateValue,
      key: "rate",
      condition: defWidth
    })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "numcont"
    }, rateValue), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mopreview"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.controler.showFn.bind(this.controler, "websiteShow")
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null), "\u79FB\u52A8\u7AD9\u7C7B\u578B", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\u25BC")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `previewDown ${websiteShow ? "" : "hidden"}`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "\u79FB\u52A8\u7AD9\u7C7B\u578B"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, this.selectList({
      list: screenTypeList,
      value: rateValue,
      key: "website"
    })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "scanmobile",
      style: {
        marginLeft: "10px",
        cursor: "pointer"
      },
      onClick: this.controler.showFn.bind(this.controler, "codeShow")
    }, "\u624B\u673A\u4E8C\u7EF4\u7801\u626B\u63CF\u9884\u89C8", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `previewDown ${codeShow ? "" : "hidden"}`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: codeImg
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "\u89E6\u5C4F\u7AD9")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "previewExit"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "deleteBtn",
      style: {
        cursor: "pointer"
      },
      onClick: this.controler.previewClose.bind(this.controler)
    }, "\xD7"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcview",
      style: {
        height: clientHeight,
        width: winWidth
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
      width: "100%",
      height: "100%",
      src: domainName,
      sandbox: "allow-popups allow-popups-to-escape-sandbox allow-forms allow-same-origin allow-scripts allow-top-navigation allow-modals",
      frameBorder: "0",
      id: "previewIframe"
    }))));
  }

}

//# sourceURL=webpack:///./preview/preview.js?