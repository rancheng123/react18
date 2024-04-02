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
  let {
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
  let Background = null;
  let navigationSlide = null;
  console.log(navigationSlide);
  navigationSlide = this.state.component['navigation-slide'];
  const {
    background
  } = theme_data !== null && theme_data !== void 0 ? theme_data : {}; //如果是倒序，进行反转排序

  if (document_data.mosort == 'inverted') {
    components = [].concat(components).reverse();
  } //存在背景数据并且背景类型不是背景色


  if (background && (background.motype || background.type || 'BackgroundColor') != "BackgroundColor") {
    var _background$mouri, _background$mouri2, _background$mouri3;

    const isVideo = background.type == 'video' || background.motype == 'video';
    Background = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "rowListBg" + (isVideo ? '' : ' lazyload'),
      "data-src": isVideo ? null : util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({ ...background,
        uri: (_background$mouri = background.mouri) !== null && _background$mouri !== void 0 ? _background$mouri : background.uri
      }),
      "data-webp": isVideo ? null : theme_data.isWebp === false ? null : util__WEBPACK_IMPORTED_MODULE_1__["Util"].webp(util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({ ...background,
        uri: (_background$mouri2 = background.mouri) !== null && _background$mouri2 !== void 0 ? _background$mouri2 : background.uri
      }))
    }, isVideo ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("video", {
      src: (_background$mouri3 = background.mouri) !== null && _background$mouri3 !== void 0 ? _background$mouri3 : background.uri,
      width: "100%",
      playsInline: "playsinline",
      autoPlay: "autoplay",
      loop: true,
      muted: "muted"
    }) : null);
  } //组件开启浮动属性 sxt 2020-2-22


  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    navigationSlide: navigationSlide == 'true' ? 'true' : "",
    id: id,
    "data-fixed": document_data.isFloat || null,
    className: `${id} row_line ${util__WEBPACK_IMPORTED_MODULE_1__["Util"].source ? '' : 'editColumn'} ${document_data.name}`
  }, Background, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].children, {
    components: components,
    context: context,
    clone: clone
  }));
}

//# sourceURL=webpack:///./components/component/view/mo/row.js?