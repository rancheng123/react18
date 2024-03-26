// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toolbar", function() { return Toolbar; });
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
// /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
// /* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");

// 导入 React 库
import React from 'react';
// 导入 ReactDOM 库
import ReactDOM from 'react-dom';
// 导入 dispatcher 模块
import Dispatcher from '../../system/tools/dispatcher';


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
  const {
    children,
    title,
    isbtn,
    click,
    btnTitle,
    help
  } = props;
  let Tabs = null,
      Content = null,
      Anchor = null;
  Array.isArray(children) ? [Tabs, Content, Anchor] = children : Content = children;
  return React.createElement("div", {
    id: "toolCon",
    className: Tabs ? '' : 'tool-no-nav'
  }, Tabs ? React.createElement("div", {
    className: "toolFont"
  }, Tabs) : null, React.createElement("div", {
    className: "toolAdd"
  }, React.createElement("div", {
    className: "toolAddTit"
  }, title ? React.createElement("h4", null, title) : null, React.createElement("span", null, React.createElement("i", {
    onClick: help
  }, "?"), React.createElement("i", {
    onClick: Toolbar.close,
    id: "panel-close"
  }, "\xD7"))), React.createElement("div", {
    id: "toolText"
  }, Content), isbtn ? React.createElement("div", {
    className: "panlBottom"
  }, React.createElement("button", {
    className: "contorlBtn",
    onClick: click
  }, React.createElement("font", null, btnTitle))) : null), Anchor);
}
/**
 * @function close 关闭面板
 * @date 2010-10-16
 * @author wyq
 */

Toolbar.close = function () {
  const content = document.querySelector("#edit-toolbar-content");
  Dispatcher.dispatch("hideToolbars");
  ReactDOM.a.unmountComponentAtNode(content);
};

//# sourceURL=webpack:///./ui/toolbar/toolbar.js?