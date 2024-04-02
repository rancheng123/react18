__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");


/**
 * @function Component 一行多列结构类
 * @date 2019-11-13
 * @author wyq
 * @return 一行多列结构
 */

function Component() {
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
  } = this;
  const {
    background
  } = theme_data !== null && theme_data !== void 0 ? theme_data : {};
  let navigationSlide = null;
  console.log(navigationSlide);
  navigationSlide = this.state.component['navigation-slide'];
  const name = document_data.name; //对class进行处理，解决class优化后的兼容问题  2020-08-03 wyq

  if (typeof name == 'string') {
    document_data.name = name.replace(/(_[0-9a-z]{1})[a-z]+/g, "$1");
  } //组件开启浮动属性 sxt 2020-2-22


  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: id,
    navigationSlide: navigationSlide == 'true' ? 'true' : "",
    "data-fixed": document_data.isFloat || null,
    "data-ismask": document_data.ismask || null,
    className: `${id} row_line ${util__WEBPACK_IMPORTED_MODULE_1__["Util"].source ? '' : 'editColumn'}`
  }, background && (background.type || 'BackgroundColor') != 'BackgroundColor' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "rowListBg" + (background.type == 'Image' ? ' lazyload' : ''),
    "data-src": background.type == 'Image' ? util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath(background) : null,
    "data-webp": theme_data.isWebp === false ? "" : util__WEBPACK_IMPORTED_MODULE_1__["Util"].webp(util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath(background))
  }, background.type == 'video' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("video", {
    src: background.uri,
    width: "100%",
    playsInline: "playsinline",
    autoPlay: "autoplay",
    muted: "muted",
    loop: true
  }) : null) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].children, {
    components: components,
    context: context,
    clone: clone
  }));
}

//# sourceURL=webpack:///./components/component/view/html/row.js?