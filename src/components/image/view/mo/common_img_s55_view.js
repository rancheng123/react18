__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s55", function() { return s55; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");
/* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/component */ "./components/image/view/components/component.js");



function s55() {
    var _this$props$context;

    let {
        state: {
            component: {
                id
            },
            data: {
                document_data,
                document_data: {
                    uri,
                    link,
                    alt = null,
                    title = null,
                    dataRetain,
                    quality,
                    effect,
                    hoverAnimationClass = ""
                }
            }
        }
    } = this;
    const context = (_this$props$context = this.props.context) !== null && _this$props$context !== void 0 ? _this$props$context : {}; //传过来的打开方式为图片放大时，走传过来的类型（只有列表开启放大会传过来）sxt 2020-11-12

    if (context.openListLink == "imgBig") {
        effect = "imgBig";
    } //effect=="imgBig" 是图片放大的结构 sxt 2020-1-16 14:47


    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_component__WEBPACK_IMPORTED_MODULE_2__["Component"].box, {
        id: id,
        context: context
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_component__WEBPACK_IMPORTED_MODULE_2__["Component"].script, {
        id: id,
        document_data: document_data
    }), effect == "imgBig" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_component__WEBPACK_IMPORTED_MODULE_2__["Component"].enlargeImage, {
        state: this.state,
        props: this.props
    }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].linkDecorator, {
        link: util__WEBPACK_IMPORTED_MODULE_1__["Util"].setLinkUrl(context.link, link),
        type: "html",
        className: `imgHoverAn Imgbox clearfix ${hoverAnimationClass}`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_component__WEBPACK_IMPORTED_MODULE_2__["Component"].image, {
        className: `${id}Img img`,
        state: this.state || {},
        context: context
    })));
}

//# sourceURL=webpack:///./components/image/view/html/common_img_s55_view.js?