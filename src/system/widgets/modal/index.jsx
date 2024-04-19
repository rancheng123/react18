
// import React from 'react'
import RcDialog from 'rc-dialog';
import './index.css'

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
  const closeIconToRender = (
    <span className={`giimal-modal-close-x`}>
      <i className="pageiconfont"></i>
    </span>
  )
  // React.createElement("span", {
  //   className: `giimal-modal-close-x`
  // }, React.createElement("i", {
  //   className: "pageiconfont"
  // }));
  const RcDialogProps = Object.assign({}, restProps, {
    prefixCls: prefixCls,
    onClose: onCancel,
    onCancel: onCancel,
    onOk: onOk,
    footer: footer,
    visible: visible,
    wrapClassName: wrapClassName,
    closeIcon: closeIcon,
    getContainer: getContainer
  });
  return <RcDialog {...RcDialogProps} />
  // return React.createElement(RcDialog, _extends({}, restProps, {
  //   prefixCls: "giimal-modal",
  //   wrapClassName: wrapClassName,
  //   footer: footer || null,
  //   visible: visible,
  //   mousePosition: mousePosition,
  //   onClose: onCancel,
  //   onOk: onOk,
  //   closeIcon: closeIconToRender,
  //   focusTriggerAfterClose: focusTriggerAfterClose
  // }));
};

Modal.defaultProps = {
  width: 520,
  visible: false
};

export default Modal;