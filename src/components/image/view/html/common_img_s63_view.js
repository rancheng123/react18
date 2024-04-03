// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s63", function() { return s63; });
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");
// /* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/component */ "./components/image/view/components/component.js");



// 导入 React 模块
import React from "react";
// 导入 Util 模块
import Util from "@/components/page/util/util.js";
// 导入 "../components/component" 模块
import Component from "../components/component";
function s63() {
    var _this$props$context;

    const context = (_this$props$context = this.props.context) !== null && _this$props$context !== void 0 ? _this$props$context : {};
    let {
        state: {
            component: {
                id
            },
            data: {
                document_data,
                document_data: {
                    imgArr = context.imgArr,
                    link,
                    alt,
                    title,
                    effect,
                    dataSource_alt,
                    dataSource_title,
                    hoverAnimationHoverClass
                }
            }
        }
    } = this;
    let arr = Component.tags(id, imgArr, {
        alt,
        title
    }); //传过来的打开方式为图片放大时，走传过来的类型（只有列表开启放大会传过来）sxt 2020-11-12

    if (context.openListLink == "imgBig") {
        effect = "imgBig";
    } //effect=="imgBig" 是图片放大的结构 sxt 2020-1-16 14:47


    if (context && context.parentType && !dataSource_alt) {
        arr.alt = "";
    }

    if (dataSource_alt) {
        arr.alt = alt || "";
    }

    if (dataSource_title) {
        arr.title = title || "";
    } //传递数据存在，并且selectionContent为自定义时，此时要显示图片的标题和描述 sxt 2021-1-16


    if (context && context.selectionContent == "custom") {
        arr.title = context.title || "";
        arr.alt = context.description || "";
    }

    return React.createElement(Component.box, {
        id: id,
        context: context
    }, React.createElement(Component.script, {
        id: id,
        document_data: document_data
    }), effect == "imgBig" ? React.createElement(Component.enlargeImage, {
        state: this.state,
        props: this.props
    }) : React.createElement(Util.linkDecorator, {
        link: Util.setLinkUrl(context.link, link),
        type: "html",
        className: `hoverImg hoverImg2 Imgbox clearfix ${hoverAnimationHoverClass}`
    }, React.createElement(Component.image, {
        className: `${id}Img img`,
        state: this.state || {},
        context: context
    }), React.createElement("div", {
        className: "p-more"
    }, React.createElement("div", {
        className: "imgHref"
    }, React.createElement("div", {
        className: "title"
    }, arr.title), React.createElement("div", {
        className: "alt"
    }, arr.alt), React.createElement("span", {
        className: "hrefIcon"
    }, React.createElement("img", {
        src: "//img.bjyyb.net/images/icon_09.png"
    }))))));
}

//# sourceURL=webpack:///./components/image/view/html/common_img_s63_view.js?