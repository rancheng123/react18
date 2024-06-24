// 导入 React 模块
import React from "react";
// 导入 Util 模块
import Util from "@/components/page/util/util.jsx";
// 导入 "../components/component" 模块
import Component from "../components/component";
export function s63() {
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
    }); //传过来的打开方式为图片放大时，走传过来的类型（只有列表开启放大会传过来）

    if (context.openListLink == "imgBig") {
        effect = "imgBig";
    } //effect=="imgBig" 是图片放大的结构 


    if (context && context.parentType && !dataSource_alt) {
        arr.alt = "";
    }

    if (dataSource_alt) {
        arr.alt = alt || "";
    }

    if (dataSource_title) {
        arr.title = title || "";
    } //传递数据存在，并且selectionContent为自定义时，此时要显示图片的标题和描述 


    if (context && context.selectionContent == "custom") {
        arr.title = context.title || "";
        arr.alt = context.description || "";
    }

    // return React.createElement(Component.box, {
    //     id: id,
    //     context: context
    // }, React.createElement(Component.script, {
    //     id: id,
    //     document_data: document_data
    // }), effect == "imgBig" ? React.createElement(Component.enlargeImage, {
    //     state: this.state,
    //     props: this.props
    // }) : React.createElement(Util.linkDecorator, {
    //     link: Util.setLinkUrl(context.link, link),
    //     type: "html",
    //     className: `hoverImg hoverImg2 Imgbox clearfix ${hoverAnimationHoverClass}`
    // }, React.createElement(Component.image, {
    //     className: `${id}Img img`,
    //     state: this.state || {},
    //     context: context
    // }), React.createElement("div", {
    //     className: "p-more"
    // }, React.createElement("div", {
    //     className: "imgHref"
    // }, React.createElement("div", {
    //     className: "title"
    // }, arr.title), React.createElement("div", {
    //     className: "alt"
    // }, arr.alt), React.createElement("span", {
    //     className: "hrefIcon"
    // }, React.createElement("img", {
    //     src: "//img.bjyyb.net/images/icon_09.png"
    // }))))));

    return (
        <Component.box id={id} context={context}>
            <Component.script
                id={id}
                document_data={document_data}
            />
            {effect === "imgBig" ? (
                <Component.enlargeImage
                    state={this.state}
                    props={this.props}
                />
            ) : (
                <Util.linkDecorator
                    link={Util.setLinkUrl(context.link, link)}
                    type="html"
                    className={`hoverImg hoverImg2 Imgbox clearfix ${hoverAnimationHoverClass}`}
                >
                    <Component.image
                        className={`${id}Img img`}
                        state={this.state || {}}
                        context={context}
                    />
                    <div className="p-more">
                        <div className="imgHref">
                            <div className="title">{arr.title}</div>
                            <div className="alt">{arr.alt}</div>
                            <span className="hrefIcon">
                                <img src="//img.bjyyb.net/images/icon_09.png" />
                            </span>
                        </div>
                    </div>
                </Util.linkDecorator>
            )}
        </Component.box>
    )
}

