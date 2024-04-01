__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s35", function() { return s35; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");
/* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/component */ "./components/text/view/components/component.js");



function s35() {
  var _this$props$context;

  let {
    state: {
      data: {
        document_data = {}
      }
    }
  } = this;
  let {
    state: {
      component: {
        id
      },
      data: {
        document_data: {
          link,
          text = "",
          hidden,
          mohidden,
          editHidden,
          dataSource,
          overflowPart = "automatic",
          fontLabel
        }
      }
    }
  } = this;
  const context = (_this$props$context = this.props.context) !== null && _this$props$context !== void 0 ? _this$props$context : {};

  let _daSource = dataSource && dataSource.companyField || null; //数据源存在时，给控件data-source的自定义属性，用于查找数据源 sxt 2020-12-16
  //控件是列表数据源时，并且传过来了列表数据时 获取数据中的内容 sxt 2020-2-28


  if (util__WEBPACK_IMPORTED_MODULE_1__["Util"].source == undefined && dataSource && dataSource.type == "list" && context) {
    text = `${dataSource.companyLabelText}${context[dataSource.companyField]}`;
  } //类型为数据源并且列表数据是自定义时，读取传过来的值 sxt 2020-11-10


  if (dataSource && context && context.selectionContent == "custom") {
    text = context[dataSource.companyField];
  }

  if (!util__WEBPACK_IMPORTED_MODULE_1__["Util"].source) {
    if (dataSource && (dataSource.sign || dataSource.companyField == "publish_time" || dataSource.companyField == "add_time" || dataSource.companyField == "edit_time" || dataSource.companyField == "online_time" || dataSource.companyField == "offline_time")) {
      text = util__WEBPACK_IMPORTED_MODULE_1__["Util"].timeTypeCont(id, document_data, 'text', context);
    } else {
      text = util__WEBPACK_IMPORTED_MODULE_1__["Util"].getComponentText(id, document_data, 'text', context);
    }
  } else {
    text = util__WEBPACK_IMPORTED_MODULE_1__["Util"].getComponentText(id, document_data, 'text', context);
  }

  let _text = text || "",
      textLineP = "textLineP";

  if (!util__WEBPACK_IMPORTED_MODULE_1__["Util"].source) {
    _text = text || "未定义";
  }

  if (fontLabel && fontLabel != "not") {
    textLineP = "";

    let str = _text.replace(/<(h\d)/g, '<span').replace(/<\/(h\d)>/g, '</span>'); //获取并且替换标签为span lw 2021-3-29


    _text = `<${fontLabel} class="textLineP">${str}</${fontLabel}>`;
  }

  let detailIClassenlarge = _components_component__WEBPACK_IMPORTED_MODULE_2__["Component"].getDetailClass && _components_component__WEBPACK_IMPORTED_MODULE_2__["Component"].getDetailClass(_daSource);
  let hiddenClass = "";

  if (hidden) {
    if (util__WEBPACK_IMPORTED_MODULE_1__["Util"].source) {
      return null;
    } else {
      hiddenClass = "hidden";
    }
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].linkDecorator, {
    link: util__WEBPACK_IMPORTED_MODULE_1__["Util"].setLinkUrl(context.link, link),
    type: "html",
    id: id,
    className: `listTxt ${id}A ${overflowPart}  ${hiddenClass} ${detailIClassenlarge}`
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: textLineP ? textLineP : null,
    "data-source": _daSource,
    "data-companyLabelText": dataSource ? dataSource.companyLabelText : null,
    dangerouslySetInnerHTML: {
      __html: _text
    }
  }));
}

//# sourceURL=webpack:///./components/text/view/mo/tex_s35_view.js?