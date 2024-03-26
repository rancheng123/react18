__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toolbar", function() { return Toolbar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");



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

function Toolbar(props) {
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
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "toolCon",
    className: Tabs ? '' : 'tool-no-nav'
  }, Tabs ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "toolFont"
  }, Tabs) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "toolAdd"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "toolAddTit"
  }, title ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, title) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    onClick: help
  }, "?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    onClick: Toolbar.close,
    id: "panel-close"
  }, "\xD7"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "toolText"
  }, Content), isbtn ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "panlBottom"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "contorlBtn",
    onClick: click
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("font", null, btnTitle))) : null), Anchor);
}
/**
 * @function close 关闭面板
 * @date 2010-10-16
 * @author wyq
 */

Toolbar.close = function () {
  const content = document.querySelector("#edit-toolbar-content");
  dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch("hideToolbars");
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.unmountComponentAtNode(content);
};

//# sourceURL=webpack:///./ui/toolbar/toolbar.js?