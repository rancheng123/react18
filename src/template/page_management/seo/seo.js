__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Seo", function() { return Seo; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);



/**
 * @class Seo Seo结构类
 * @author sxt
 */

class Seo {
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
  /**
   * @method render 视图入口方法
   * @author sxt
   * @return {object} 组件结构
   */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "picMian pageSEO galteCon",
      style: {
        display: "block"
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "pcConAttDesign"
    }, this.state.group.map(e => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: e,
        className: "pcAttList"
      }, this[e]());
    })));
  }
  /**
   *@method title 标题
   *@author sxt 
   *@date 2020-4-27
   *@return {object} 标题结构 
   */


  title() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Input, {
      title: "pageTitle",
      id: "pageTitle",
      maxlength: "255",
      value: this.state.title || "",
      placeholder: "Title: " + window.public.lang["pageTitlePrompt"],
      change: this.controler.setSeoInfo.bind(this.controler, "title")
    });
  }
  /**
   * @method keyword 关键字
   * @author sxt 
   * @date 2020-4-27
   * @return {object} 关键字结构
   */


  keyword() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Input, {
      title: "keyword",
      id: "keyword",
      value: this.state.keywords || "",
      placeholder: "Keywords: " + window.public.lang["keywordPrompt"],
      change: this.controler.setSeoInfo.bind(this.controler, "keywords")
    });
  }
  /**
   * @method description 描述
   * @author sxt 
   * @date 2020-4-27
   * @return {object} 描述结构
   */


  description() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Textarea, {
      title: "descriptionSeo",
      id: "descriptionSeo",
      maxlength: "500",
      value: this.state.description,
      placeholder: "Description: " + window.public.lang["descriptionPrompt"],
      change: this.controler.setSeoInfo.bind(this.controler, "description")
    });
  }
  /**
   * @method staticURI url
   * @author sxt 
   * @date 2020-4-27
   * @return {object} url结构
   */


  staticURI() {
    if (/Search|PageLabel|NewsContent|ProductContent|ShoppingCart/.test(this.state.pageType)) {
      return null;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "imgteCon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
      className: "pcConAttTitle "
    }, window.public.lang["staticFileName"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcConAttCon staticUrlPar"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        color: "#ccc"
      }
    }, "http://www.../"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      style: {
        width: "50%",
        margin: "0 10px"
      },
      type: "text",
      value: this.state.url_name || "",
      placeholder: window.public.lang["skipPrompt"],
      onChange: this.controler.setSeoInfo.bind(this.controler, "url_name")
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        color: "#ccc"
      }
    }, ".html")));
  }
  /**
   * @method visitFrequency 访问pinlv
   * @author sxt 
   * @date 2020-4-27
   * @return {object} 访问频率结构
   */


  visitFrequency() {
    const value = this.state.visitFrequency || "pleaseChoose"; // selected = {value != e ? null : "selected"}

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "imgteCon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "imgDescribe"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
      className: "pcConAttTitle "
    }, window.public.lang["visitFrequency"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcConAttCon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "pcSelectStyle",
      value: value,
      onChange: this.controler.setSeoInfo.bind(this.controler, "visitFrequency")
    }, ["pleaseChoose", "never", "hourly", "daily", "weekly", "monthly", "yearly", "always"].map(e => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: e,
        value: e != "pleaseChoose" ? e : ""
      }, window.public.lang[e]);
    })))));
  }
  /**
   * @method chooseWeight 选择权重
   * @author wyq
   * @return {object} 选择权重结构
   */


  chooseWeight() {
    const value = this.state.weight; //selected = {value != e ? null : "selected"}

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "imgteCon "
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "imgDescribe"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
      className: "pcConAttTitle "
    }, window.public.lang["chooseWeight"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcConAttCon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "pcSelectStyle",
      value: value,
      onChange: this.controler.setSeoInfo.bind(this.controler, "weight")
    }, ["pleaseChoose", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"].map(e => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: e,
        value: e != "pleaseChoose" ? e : ""
      }, e != "pleaseChoose" ? e : window.public.lang[e]);
    })))));
  }
  /**
   *@method weightType 页面权重链接
   *@author sxt
   *@date 2020-4-7
   *@return {object} 页面权重链接
   */


  weightType() {
    const value = this.state.link_type || "default"; //selected = {value != e ? null : "selected"} 

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "imgteCon weightType"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "imgDescribe"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
      className: "pcConAttTitle "
    }, window.public.lang["weightType"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcConAttCon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "pcSelectStyle",
      value: value,
      onChange: this.controler.setWeightType.bind(this.controler, "link_type")
    }, ["default", "page", "customLink"].map(e => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: e,
        value: e
      }, window.public.lang[e]);
    })))));
  }
  /**
   *@method customLink 自定义链接
   *@author sxt
   *@date 2020-4-7
   *@return {object} 自定义链接结构
   */


  customLink() {
    let link_type = this.state.link_type;

    if (link_type == "customLink") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Input, {
        title: "customLink",
        id: "customLink",
        skin: "authorityselect",
        value: this.state.canonical_point || "",
        placeholder: window.public.lang["customLinkPrompt"],
        change: this.controler.setCustomLink.bind(this.controler, "canonical_point")
      });
    }
  }
  /**
   *@method urlRule url规则 
   *@author sxt
   *@date 2020-4-7
   *@return {object} url规则结构
   */


  urlRule() {
    if (this.state.pageType == "PageLink") {
      const value = this.state.custom_rule_id || "";
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "imgteCon urlRule"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "imgDescribe"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "pcConAttTitle "
      }, window.public.lang["urlRule"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pcConAttCon"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "pcSelectStyle",
        value: value,
        onChange: this.controler.setSeoInfo.bind(this.controler, "custom_rule_id")
      }, this.state.urlList.map(e => {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          key: e.id,
          value: e.id
        }, e.title);
      })))));
    }
  }
  /**
   *@method pageLink 页面链接
   *@author sxt
   *@date 2020-4-7
   *@return {object} 页面链接结构
   */


  pageLink() {
    let link_type = this.state.link_type;

    if (link_type == "page") {
      const value = this.state.canonical_point || ""; //selected = {value != e.id ? null : "selected"}

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "imgteCon authorityselect"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "imgDescribe"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "pcConAttTitle "
      }, window.public.lang["page"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pcConAttCon"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "pcSelectStyle",
        value: value,
        onChange: this.controler.setSeoInfo.bind(this.controler, "canonical_point")
      }, this.state.pageList.map(e => {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          key: e.id,
          value: e.id
        }, e.name);
      })))));
    }
  }
  /**
   * @method chooseImage 选择图片
   * @author wyq
   * @return {object} 选择图片结构
   */


  chooseImage() {
    var _this$state$seoImgLis;

    let seoImgList = (_this$state$seoImgLis = this.state.seoImgList) !== null && _this$state$seoImgLis !== void 0 ? _this$state$seoImgLis : []; //如果数组小于3，则默认给数组填充一个空，来展示新增图片按钮

    if (seoImgList.length < 3) {
      seoImgList = seoImgList.concat("");
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "seo-site-image"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
      className: "pcConAttTitle"
    }, "\u7F29\u7565\u56FE:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcConAttCon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
      className: "seo-site-image-list"
    }, seoImgList.map((e, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "seo-site-image-edit",
        key: e || "seo",
        style: {
          backgroundImage: e ? `url(${e})` : null
        },
        onClick: this.controler.showImageGallery.bind(this.controler, i)
      }, e ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.controler.deleteImage.bind(this.controler, i)
      }, "\xD7") : null);
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "helpPtext"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, " \u6CE8\uFF1A\u6700\u591A\u9009\u62E93\u5F20\u7F29\u7565\u56FE\u3002"))));
  }

}

//# sourceURL=webpack:///./ui/page_management/seo/seo.js?