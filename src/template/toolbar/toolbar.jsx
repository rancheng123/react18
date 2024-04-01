// 导入 React 库
// import React from "react";
// 导入 ReactDom 库
import {createRoot} from "react-dom/client";
// 导入 dispatcher 模块
import Dispatcher from "../../system/tools/dispatcher";

/**
 * @function Toolbar 工具栏面板组件
 * @date 2019-08-23
 * @author wyq
 * @param {object} props 参数列表
 * @param {string} props.title 名称
 * @param {array} props.children 子元素  包含tabs content anchor，tabs anchor为可选项
 * @param {boolean} props.isbtn 是否显示按钮
 * @param {string} [props.btnTitle] 按钮名称
 * @param {function} props.help 点击帮助触发
 * @param {function} props.click 点击按钮触发
 * @return {object} 工具栏面板组件
 */

export default function Toolbar(props) {
  const { children, title, isbtn, click, btnTitle, help ,root} = props;
  let Tabs = null,
    Content = null,
    Anchor = null;
  Array.isArray(children)
    ? ([Tabs, Content, Anchor] = children)
    : (Content = children);
  // return React.createElement("div", {
  //   id: "toolCon",
  //   className: Tabs ? '' : 'tool-no-nav'
  // }, Tabs ? React.createElement("div", {
  //   className: "toolFont"
  // }, Tabs) : null, React.createElement("div", {
  //   className: "toolAdd"
  // }, React.createElement("div", {
  //   className: "toolAddTit"
  // }, title ? React.createElement("h4", null, title) : null, React.createElement("span", null, React.createElement("i", {
  //   onClick: help
  // }, "?"), React.createElement("i", {
  //   onClick: Toolbar.close,
  //   id: "panel-close"
  // }, "\xD7"))), React.createElement("div", {
  //   id: "toolText"
  // }, Content), isbtn ? React.createElement("div", {
  //   className: "panlBottom"
  // }, React.createElement("button", {
  //   className: "contorlBtn",
  //   onClick: click
  // }, React.createElement("font", null, btnTitle))) : null), Anchor);

  return (
    <div id="toolCon" className={Tabs ? "" : "tool-no-nav"}>
      {Tabs ? <div className="toolFont">{Tabs}</div> : null}
      <div className="toolAdd">
        <div className="toolAddTit">
          {title ? <h4>{title}</h4> : null}
          <span>
            <i onClick={help}>?</i>
            <i onClick={()=>Toolbar.close(root)} id="panel-close">
              ×
            </i>
          </span>
        </div>
        <div id="toolText">{Content}</div>
        {isbtn ? (
          <div className="panlBottom">
            <button className="contorlBtn" onClick={click}>
              <font>{btnTitle}</font>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
/**
 * @function close 关闭面板
 * @date 2010-10-16
 * @author wyq
 */

Toolbar.close = function (root) {
  const content = document.querySelector("#edit-toolbar-content");
  Dispatcher.dispatch("hideToolbars");

  // 原有卸载组件方法
  // ReactDom.unmountComponentAtNode(content);
  // 新卸载组件方法
  root ? root.unmount() : createRoot(content).unmount()
};

//# sourceURL=webpack:///./ui/toolbar/toolbar.js?
