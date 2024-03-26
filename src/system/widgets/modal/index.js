// __webpack_require__.r(__webpack_exports__);
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var rc_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rc-dialog */ "./node_modules/rc-dialog/es/index.js");
// /* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "./system/widgets/modal/index.css");
// /* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_2__);
// function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// 导入 React 库
import React from 'react';
import './index.css';

let mousePosition = null;

const getClickPosition = e => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY
  };
  setTimeout(() => {
    mousePosition = null;
  }, 100);
}; // 只有点击事件支持从鼠标位置动画展开


if (window.document.documentElement) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}
/**
 * className 类名
 * style 样式
 * zIndex 层级
 * bodyStyle 内容样式
 * maskStyle 蒙层样式
 * visible 显示隐藏
 * animation 动画
 * title 标题
 * footer 底部
 * closable 关闭按钮
 * mask 蒙层
 * maskClosable 蒙层可关闭
 * onClose 关闭回调
 * afterClose 关闭前回调
 * onOk 确认回调
 * getContainer 挂载容器
 * closeIcon 关闭icon
 */


const Modal = props => {
  const {
    prefixCls,
    onOk,
    onCancel,
    footer,
    visible,
    wrapClassName,
    // centered,
    getContainer,
    closeIcon,
    focusTriggerAfterClose = true,
    ...restProps
  } = props;
  const closeIconToRender = React.createElement("span", {
    className: `giimal-modal-close-x`
  }, React.createElement("i", {
    className: "pageiconfont"
  }));
  return React.createElement(rc_dialog__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({}, restProps, {
    prefixCls: "giimal-modal",
    wrapClassName: wrapClassName,
    footer: footer || null,
    visible: visible,
    mousePosition: mousePosition,
    onClose: onCancel,
    onOk: onOk,
    closeIcon: closeIconToRender,
    focusTriggerAfterClose: focusTriggerAfterClose
  }));
};

Modal.defaultProps = {
  width: 520,
  visible: false
};
export default Modal;
// /* harmony default export */ __webpack_exports__["default"] = (Modal);

//# sourceURL=webpack:///./system/widgets/modal/index.js?