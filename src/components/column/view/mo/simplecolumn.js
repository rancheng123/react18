__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Column", function () { return Column; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");


function Column() {
  var _theme_data$backgroun, _theme_data$backgroun2;

  const {
    state: {
      component: {
        id,
        components
      },
      data: {
        document_data = {},
        theme_data = {}
      }
    },
    props: {
      context,
      clone
    }
  } = this,
    child = components[0],
    len = components.length;
  const unedit = util__WEBPACK_IMPORTED_MODULE_1__["Util"].source != undefined;
  const className = child && child.type != 'Placeholder' || unedit || len > 1 ? '' : 'col-m-height';
  let hidName = ''; //hidden等于1,返回null 2020-12-15 by wyq

  if (document_data.hidden == 1) {
    hidName = ' hidden';
    if (unedit) return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: id,
    className: `${id}row_col rowcol${hidName} ${className}`
  }, theme_data.background ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "data-src": util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
      ...theme_data.background,
      uri: (_theme_data$backgroun = theme_data.background.mouri) !== null && _theme_data$backgroun !== void 0 ? _theme_data$backgroun : theme_data.background.uri
    }),
    "data-webp": theme_data.isWebp === false ? null : util__WEBPACK_IMPORTED_MODULE_1__["Util"].webp(util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
      ...theme_data.background,
      uri: (_theme_data$backgroun2 = theme_data.background.mouri) !== null && _theme_data$backgroun2 !== void 0 ? _theme_data$backgroun2 : theme_data.background.uri
    })),
    className: "rowListBg lazyload"
  }) : null, child ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].children, {
    components: components,
    context: context,
    clone: clone
  }) : unedit ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "\u53EF\u62D6\u5165\u63A7\u4EF6\u5230\u6B64\u4F4D\u7F6E"));
}
