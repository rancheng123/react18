
// 导入 React 模块
import React from "react";
// 导入 Util 模块
import Util from "@/components/page/util/util.jsx";
// 导入 "../components/component" 模块
import Component from "../components/component";

export function s57() {
    var _this$props$context;

    let {
        state: {
            component: {
                id
            },
            data: {
                document_data,
                document_data: {
                    link,
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
        className: `imgHoverAn Imgbox clearfix ${hoverAnimationClass}`
    }, React.createElement(Component.image, {
        className: `${id}Img img`,
        state: this.state || {},
        context: context
    })));
}
