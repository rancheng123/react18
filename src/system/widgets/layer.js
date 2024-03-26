// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return Layer; });
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
// /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
// /* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ "./system/widgets/modal/index.js");

// 导入 React 库
import {React,useEffect,useState} from 'react';
// 导入 ReactDOM 库
import ReactDOM from 'react-dom';
// 导入 modal 模块
import Modal from './modal/index.js';

/**
 * @function layout 布局处理
 * @date 2019-10-30
 * @author wyq
 * @param {array} area 布局集合
 * @param {array} offset 坐标集合
 * @param {object} 布局对象 
 */

function layout(area, offset) {
  let width = '300px',
      height = '300px';

  if (area) {
    Array.isArray(area) ? (width = area[0], height = area[1]) : width = height = area;
  }

  let left = `calc((100% - ${width}) / 2)`,
      top = `calc((100% - ${height}) / 2)`;

  if (offset) {
    Array.isArray(area) ? (left = offset[0], top = offset[1]) : left = top = offset;
  }

  return {
    left: left,
    top: top,
    width: width,
    height
  };
}
/**
 * @function mousedown 拖拽
 * @date 2019-10-30
 * @author wyq
 * @param {event} event 时间对象 
 */


function mousedown(event) {
  const {
    currentTarget: target,
    clientX,
    clientY
  } = event,
        {
    left,
    top
  } = target.getBoundingClientRect(),
        x = clientX - left,
        y = clientY - top;

  document.onmousemove = function (event) {
    const {
      clientX,
      clientY
    } = event,
          parent = target.parentNode;
    parent.style.left = `${clientX - x}px`;
    parent.style.top = `${clientY - y}px`;
  };

  document.onmouseup = function () {
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
/**
 * @function Header 头部结构
 * @date 2019-10-30
 * @author wyq
 * @param {object} props 参数列表
 * @param {boolean} props.draggable 是否启用拖拽
 * @param {object} props.children 子元素
 * @param {boolean} props.help 是否启用帮助
 * @param {function|boolean} props.close 启用触发或关闭触发回调 
 * @param {object} 头部结构
 */


function Header(props) {
  return React.createElement("header", {
    className: "layer-header",
    onMouseDown: props.draggable ? mousedown : null
  }, props.children, React.createElement("span", {
    className: "layer-right"
  }, props.help ? React.createElement("i", {
    className: "layer-help"
  }, "?") : null, props.close ? React.createElement("i", {
    className: "layer-close yiyingbaoicon",
    onClick: unlayer(props.close)
  }, "\uE697") : null));
}
/**
 * @function Footer 底部结构
 * @date 2019-11-13
 * @author wyq
 * @param {object} props 参数列表
 * @param {array} props.buttons 按钮名称
 * @param {function} props.cancel 取消触发回调
 * @param {function} props.ensure 确认触发回调
 * @return {object} 底部结构 
 */


function Footer(props) {
  if (props.buttons) {
    const [cancelName, ensureName] = props.buttons;
    return React.createElement("footer", {
      className: "em-layer-footer"
    }, props.cancel ? React.createElement("button", {
      className: "em-button-cancel",
      onClick: unlayer(props.cancel)
    }, window.public.lang[cancelName]) : null, props.ensure ? React.createElement("button", {
      className: "em-button-ensure",
      onClick: unlayer(props.ensure)
    }, window.public.lang[ensureName]) : null);
  }

  return null;
}
/**
 * @function unlayer 关闭弹层
 * @date 2019-10-30
 * @author wyq
 * @param {function} callback 回调函数
 * @return {function} 关闭事件函数
 */


function unlayer(callback) {
  return function _unlayer(event) {
    const box = event.currentTarget.closest(".yq-layer");
    let isclose;

    if (typeof callback === "function") {
      isclose = callback();
    } //如果值不为false 则执行卸载面板方法 为false 不执行卸载


    isclose != false && ReactDOM.a.unmountComponentAtNode(box.parentNode);
  };
}
/**
 * @function Mask 遮罩层结构
 * @date 2019-10-30
 * @author wyq
 * @param {object} props 参数列表
 * @param {array|boolean} opts.shade 遮罩 example [0.8,"#000000"]
 * @param {boolean} opts.shadeClose 是否点击遮罩关闭
 * @return {object} 遮罩层结构
 */


function Mask(props) {
  const {
    shade,
    shadeClose
  } = props;

  if (shade && Array.isArray(shade)) {
    return React.createElement("div", {
      id: "yq-layer-modal",
      style: {
        background: shade[1] || "#000000",
        opacity: shade[0] || "0.5"
      },
      onClick: shadeClose ? unlayer(close) : null
    });
  }

  return null;
}
/**
 * @instance Layer 弹层对象
 * @date 2019-11-13
 * @author wyq
 * @version 1.0
 */


export const Layer = {
  /**
   * @method alert 弹出框
   * @date
   * @author 
   * @param {object} opts 参数列表
   * @param {string} opts.content 弹出框的内容 
   * @param {string} opts.icon  一个icon名称，值包含：warn 警告，fail 失败，success 成功
   * @param {string} opts.iconPath 自定义Icon的路径 
   * @param {string|array} opts.area 定义宽高
   * @param {string|array} opts.offset 定义坐标 
   * @param {string} opts.skin 自定义皮肤
   */
  alert(opts = {}) {
    const {
      title = 'prompt',
      area,
      offset,
      help,
      close,
      skin = "",
      content,
      icon,
      iconPath,
      btns = ['', 'ensure'],
      ensure
    } = opts; //提示框结构

    function Alert() {
      const [animate, setAnimate] = Object(useState)(""); //结构渲染完毕触发动画

      Object(useEffect)(() => {
        setTimeout(() => setAnimate("yq-layer-end"), 0);
      }, []);
      return React.createElement("section", {
        className: `${skin || ''} pcModal ${animate} em-alert-layer yq-layer`,
        style: layout(area, offset)
      }, React.createElement(Header, {
        close: close,
        help: help
      }, React.createElement("h4", null, window.public.lang[title])), React.createElement("main", {
        className: "layer-alert-content"
      }, icon || iconPath ? React.createElement("i", null) : null, React.createElement("span", null, content)), React.createElement(Footer, {
        buttons: btns,
        ensure: ensure
      }));
    }

    ReactDOM.a.render(React.createElement(Alert, null), document.querySelector('#info-prompt'));
  },

  /**
   * @method confirm 询问框
   * @date
   * @author
   * @param {object} opts 参数列表
   * @param {string} opts.title 询问框标题
   * @param {string} opts.content 询问框提示内容
   * @param {string|array} opts.area 定义宽高
   * @param {string|array} opts.offset 定义坐标 
   * @param {array} opts.btns 指定按钮名称
   * @param {string} opts.btnAlign 按钮排列
   * @param {string} opts.skin 自定义皮肤
   * @param {function} opts.cancel 取消触发回调
   * @param {function} opts.ensure 确定触发回调
   */
  confirm(opts = {}) {
    const {
      title,
      area,
      offset,
      help,
      close,
      skin = "",
      content,
      btns = ['cancel', 'ensure'],
      ensure = true,
      cancel
    } = opts; //询问框结构

    function Confirm() {
      const [animate, setAnimate] = Object(useState)(""); //结构渲染完毕触发动画

      Object(useEffect)(() => {
        setTimeout(() => setAnimate("yq-layer-end"), 0);
      }, []);
      return React.createElement("section", {
        className: `${skin || ''} pcModal em-confirm-layer ${animate} yq-layer`,
        style: layout(area, offset)
      }, React.createElement(Header, {
        close: close,
        help: help
      }, React.createElement("h4", null, title)), React.createElement("main", {
        className: "layer-confrim-content"
      }, content), React.createElement(Footer, {
        buttons: btns,
        cancel: cancel,
        ensure: ensure
      }));
    }

    ReactDOM.a.render(React.createElement(Confirm, null), document.querySelector('#info-prompt'));
  },

  /**
   * @method open 面板弹框
   * @date 2019-10-30
   * @author wyq
   * @param {array} opts.titles 标题，不传不显示标题。example ["提示","id:333"]
   * @param {string|array} opts.area 定义宽高
   * @param {string|array} opts.offset 定义坐标 
   * @param {array|boolean} opts.shade 遮罩 example [0.8,"#000000"]
   * @param {boolean} opts.draggable 是否启用拖拽
   * @param {boolean} opts.shadeClose 是否点击遮罩关闭
   * @param {object} opts.children 任意html组件
   * @param {string} opts.skin 自定义皮肤
   * @param {array} opts.buttons 按钮名称
   * @param {function | boolean} opts.close 关闭触发回调或启用关闭
   * @param {function | boolean} opts.ensure 确认触发回调或显示确定按钮
   * @param {function | boolean} opts.cancel 取消触发回调或显示取消按钮
   * @param {function} opts.help 点击帮助出发回调
   */
  open(opts = {}) {
    const [animate, setAnimate] = Object(useState)(""); //结构渲染完毕触发动画

    Object(useEffect)(() => {
      setTimeout(() => setAnimate("yq-layer-end"), 0);
    }, []);
    return React.createElement("section", {
      className: `${opts.skin || ''} pcModal em-open-layer ${animate} yq-layer`,
      style: layout(opts.area, opts.offset)
    }, React.createElement(Header, {
      close: opts.close,
      help: opts.help,
      draggable: opts.draggable
    }, opts.titles[0] ? React.createElement("h4", {
      className: "layer-title-one"
    }, opts.titles[0]) : null, opts.titles[1] ? React.createElement("span", {
      className: "layer-title-two"
    }, opts.titles[1]) : null), React.createElement("main", null, opts.children), opts.ensure || opts.cancel ? React.createElement(Footer, {
      buttons: opts.buttons || ["cancel", "ensure"],
      ensure: opts.ensure,
      cancel: opts.cancel
    }) : null, React.createElement(Mask, {
      shade: opts.shade,
      shadeClose: opts.shadeClose,
      close: opts.close
    }));
  },

  /**
   * @method open 面板弹框
   * @date 2019-10-30
   * @author wyq
   * @param {string} opts.id 唯一标识
   * @param {string|array} opts.area 定义宽高
   * @param {string|array} opts.offset 定义坐标 
   * @param {string} opts.tab 默认选中项
   * @param {array} opts.tabs 显示项
   * @param {array|boolean} opts.shade 遮罩 example [0.8,"#000000"]
   * @param {boolean} opts.draggable 是否启用拖拽
   * @param {boolean} opts.shadeClose 是否点击遮罩关闭
   * @param {string} opts.skin 自定义皮肤
   * @param {function} opts.change 选项切换时触发回调
   * @param {function} opts.close 关闭触发回调
   */
  tab(opts = {}) {
    const [animate, setAnimate] = Object(useState)(""); //结构渲染完毕触发动画

    Object(useEffect)(() => {
      setTimeout(() => setAnimate("yq-layer-end"), 0);
    }, []);
    const [tab, selectedTab] = Object(useState)(opts.tab); //面板结构渲染完毕且属性类型不同时执行方法

    if (opts.change) {
      Object(useEffect)(() => {
        opts.change(tab);
      }, [tab]);
    }

    return React.createElement("section", {
      className: `${opts.skin || ''} pcModal em-tab-layer ${animate} yq-layer`,
      style: layout(opts.area, opts.offset)
    }, React.createElement(Header, {
      close: opts.close,
      draggable: opts.draggable
    }, React.createElement("ul", {
      className: "layer-tabs"
    }, opts.tabs.map(e => {
      const {
        type,
        name,
        hidden
      } = e; //hidden不等于false，则表示显示项，等于false不显示

      if (hidden != false) {
        return React.createElement("li", {
          className: tab != type ? null : "on",
          key: type,
          onClick: () => selectedTab(type)
        }, window.public.lang[name]);
      } //如果选项隐藏返回空


      return null;
    }))), React.createElement("main", {
      id: opts.id,
      className: "layer-content"
    }), React.createElement(Mask, {
      shade: opts.shade,
      shadeClose: opts.shadeClose,
      close: opts.close
    }));
  },

  // 弹框，类似于antd 的模态框
  Modal: Modal
};

//# sourceURL=webpack:///./system/widgets/layer.js?