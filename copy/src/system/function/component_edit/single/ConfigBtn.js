__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultBtns", function() { return defaultBtns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigBtnWaper", function() { return ConfigBtnWaper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigButton", function() { return ConfigButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


const defaultBtns = {
  'pc': [{
    "name": "collection",
    "type": "collection"
  }, {
    "name": "hide",
    "type": "hiding"
  }],
  'mo': [{
    "name": "hide",
    "type": "hiding"
  }]
};
/**
 * @description: 通过导航按钮类型获取响应的class名
 * @param {type} 
 * @return: void
 * @author: Eric
 * @Date: 2020-03-13 16:38:47
 */
// const getBtnType = (name) => {
//     const index = ['setting', 'design', 'custom', 'animation', 'manage','collection', 'basic', 'hiding', 'quote','leftarr','rightarr','close'].findIndex(item => item == name);
//     return (index === -1) ? 'edit' : name;
// }

/**
 * @description: hover经过按钮组结构 
 * @param {type} 
 * @return: void
 * @author: Eric
 * @Date: 2020-03-10 14:13:10
 */

const ConfigBtnWaper = ({
  style,
  name,
  children,
  fixedWidth,
  index
}) => {
  const cls = index === 0 || typeof index == 'undefined' ? 'functionBox' : 'functionBox cellfunction';
  const scss = fixedWidth ? {
    width: fixedWidth
  } : {
    padding: "0 15px"
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: cls,
    style: style
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "controlName",
    style: scss
  }, name), children);
};

const ConfigButton = ({
  id,
  type,
  name,
  click,
  mousedown,
  select,
  className
}) => {
  const evt = click ? {
    onClick: click
  } : {
    onMouseDown: mousedown
  };

  switch (type) {
    case 'default':
    case 'currentHover':
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", _extends({
        className: `text${select ? ' on' : ''}`,
        id: id + '-' + type
      }, evt), window.public.lang[name]);

    case 'switchs':
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", _extends({
        id: id + '-' + type
      }, evt, {
        className: 'switchs',
        "data-title": window.public.lang[name]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "arrow"
      }, "<"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tips"
      }, "1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "arrow"
      }, ">"));

    default:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", _extends({
        className: `icon${select ? ' on' : ''}`,
        id: id + '-' + type
      }, evt, {
        className: `${className !== null && className !== void 0 ? className : 'edit'}Ico tipbpx`,
        "data-title": window.public.lang[name]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null));
  }
};



//# sourceURL=webpack:///./system/function/component_edit/single/ConfigBtn.js?