__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateResource", function() { return TemplateResource; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resource */ "./system/function/resource/resource.js");
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");



/**
 * @class {Resource} 图片资源库面板视图类
 * @author sxt 
 * @version 1.0
 * @data 2019-9-4
 */

class TemplateResource extends _resource__WEBPACK_IMPORTED_MODULE_1__["Resource"] {
  /**@property controler 图片资源控件制器实例 */
  constructor(controler) {
    super(controler);
    this.title = "模版资源";
    this.area = ["1000px", "auto"]; //this.controler=controler;
  }
  /**
   * @method render 图片资源组件方法
   * @date 2019-9-4
   * @author sxt 
   * @return {object} 图片资源结构
   */
  //pageData.base+"/Edit/Images/userUpload/sid/"+pageData.siteId


  render(prop) {
    let _state = this.state || {};

    var picType = _state.type,
        _imgCate = '',
        _picIdx = '';

    if (picType == "wholeClassify") {
      //条件满足时将赋值 lw 2021-3-8
      _imgCate = "industry";
      _picIdx = _state.industry;
    } else {
      _imgCate = "language";
      _picIdx = _state.language;
    }

    let _html = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "sysNav"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "sysCon"
    }, this.imgNavList()), this.inputSearch()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "sysPic wholeClassify"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "picMina"
    }, picType == "wholeClassify" || picType == "languageClassify" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "picCon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "picNav pNav1"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, window.public.lang['type'] + " :"), this.imageType(picType, _imgCate, _picIdx))) : "", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "imgSelect",
      className: "picImg imgEdit"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "demopicImg"
    }, this.imgSelectList())))));

    return super.render(_html);
  }
  /**
   * @method imgSelectList 图片列表结构
   * @author sxt 
   * @return {Object}  图片列表结构
   */


  imgSelectList() {
    let _state = this.state || {},
        _type = _state.type || "wholeClassify",
        _selectList = _state.templateList || [];

    if (_selectList.length >= 1) {
      return _selectList.map((e, i) => {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          onClick: this.controler.selectImg.bind(this.controler, e),
          "data-url": e.url,
          "data-id": e.id,
          key: e.id
        }, e.recommend ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "picTempNew"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: "http://j.bjyyb.net/images/new.png"
        })) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          style: {
            width: "100%",
            height: "100%"
          },
          src: e.picname
        }), e.log == 1 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "Imgtemp"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: "http://j.bjyyb.net/images/check1.png"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "btn btned"
        }, window.public.lang["used"])) : null, e.log >= 2 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "Imgtemp"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: "http://j.bjyyb.net/images/checked.png"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "btn btned"
        }, window.public.lang["inUse"])) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "opc"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "picTempBox"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: "picTempButton"
        }, window.public.lang["selectThisTemplate"]), e.previewurl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          onClick: this.controler.previewBtn.bind(this.controler, e.previewurl),
          className: "picTempPreview"
        }, window.public.lang["preview"]) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: "w"
        }, window.public.lang["numbering"], "\uFF1A", e.templatename), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, window.public.lang["designer"], "\uFF1A", e.designer), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: "w"
        }, window.public.lang["applicableIndustry"], "\uFF1A", e.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, window.public.lang["usage"], "\uFF1A", e.attention)));
      });
    } else {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, window.public.lang["noContent"]));
    }
  }
  /**
   * @method imgNavList 分类项切换结构
   * @author sxt 
   * @return {Object}  分类项切换结构
   */


  imgNavList() {
    let _state = this.state || {},
        _type = _state.type || "wholeClassify";

    return this.controler.tabs.map((e, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        onClick: this.controler.setTab.bind(this.controler, "type", e),
        className: _type == e ? "on" : "",
        key: e
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: e
      }, window.public.lang[e]));
    });
  }
  /**
  * @method inputSearch 模板搜索结构
  * @return {Object}  
  * @author wh
  * @date 2022-8-1
  * */


  inputSearch() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "search-box"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: "pcInputTextStyle input-search",
      id: "search",
      type: "text",
      placeholder: window.public.lang["templateSearch"],
      value: this.state.key,
      onChange: this.controler.inputChange.bind(this.controler, "key")
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      class: "c7p080BIc layer-close yiyingbaoicon icon-search",
      onClick: this.controler.search.bind(this.controler)
    }, "\uE696"));
  }
  /**
  * @method imageType 获取图片类型分类选项
  * @return {Object}  图片类型分类选项结构
  * @author lw 
  * @date 2021-3-8
  * */


  imageType(type, cate, idx) {
    var _typelist = "",
        _idx = idx || 0;

    if (type == "wholeClassify") {
      //模板分类为全部分类时 从pagedata全局变量中取值 lw 2021-3-8
      _typelist = pageData.Temp.industry;
    }

    if (type == "languageClassify") {
      //模板分类为语言分类时赋值 lw
      _typelist = pageData.Temp.languagers;
    }

    var _all = {
      id: "0",
      name: window.public.lang["whole"]
    };

    if (_typelist[0].id != "0") {
      //给数组第一项添加全部类型选项 lw
      _typelist.unshift(_all);
    }

    let _str = _typelist.map((e, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: _idx == e.id ? "on" : "",
        key: i,
        onClick: this.controler.change.bind(this.controler, cate, e.id)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#!",
        id: e.id
      }, e.name));
    });

    return _str;
  }
  /**
   * @method imageSpec 获取图片规格分类选项
   * @param {Object} n 属性组件的this
   * @param {String} type 当前分类选项类型
   * @param {Number} cate 当前选项id
   * @return {Object}  图片类型分类选项结构
   * */


  imageSpec() {
    let _state = this.state || {},
        _type = _state.type || "wholeClassify";

    if (_type == "wholeClassify") {
      // let _type=pageData.ImagesGallery.spec,
      //     _spec=_state.spec||0,
      //     _all={id:"0",name:window.public.lang["whole"]};
      // if(_type[0].id!="0"){
      //     _type.unshift(_all);
      // }
      let _spec = _state.spec || 0;

      let spec = [{
        id: "0",
        name: "全部"
      }, {
        id: "12",
        name: "其他"
      }, {
        id: "13",
        name: "2:1"
      }, {
        id: 14,
        name: "3:2"
      }];

      let _str = spec.map((e, i) => {
        let _id = e.id;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: _spec == e.id ? "on" : "",
          key: `${e.id}spec`,
          onClick: this.controler.change.bind(this.controler, "spec", e.id)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "javascript:;",
          id: e.id
        }, e.name));
      });

      return _str;
    }
  }

}

//# sourceURL=webpack:///./system/function/resource/template/template_resource.js?