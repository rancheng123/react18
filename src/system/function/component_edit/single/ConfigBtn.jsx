import React from 'react'

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
 */
// const getBtnType = (name) => {
//     const index = ['setting', 'design', 'custom', 'animation', 'manage','collection', 'basic', 'hiding', 'quote','leftarr','rightarr','close'].findIndex(item => item == name);
//     return (index === -1) ? 'edit' : name;
// }

/**
 * @description: hover经过按钮组结构 
 * @param {type} 
 * @return: void
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
  return React.createElement("div", {
    className: cls,
    style: style
  }, React.createElement("span", {
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
      return React.createElement("li", _extends({
        className: `text${select ? ' on' : ''}`,
        id: id + '-' + type
      }, evt), window.public.lang[name]);

    case 'switchs':
      return React.createElement("li", _extends({
        id: id + '-' + type
      }, evt, {
        className: 'switchs',
        "data-title": window.public.lang[name]
      }), React.createElement("div", {
        className: "arrow"
      }, "<"), React.createElement("div", {
        className: "tips"
      }, "1"), React.createElement("div", {
        className: "arrow"
      }, ">"));

    default:
      return React.createElement("li", _extends({
        className: `icon${select ? ' on' : ''}`,
        id: id + '-' + type
      }, evt, {
        className: `${className !== null && className !== void 0 ? className : 'edit'}Ico tipbpx`,
        "data-title": window.public.lang[name]
      }), React.createElement("i", null), React.createElement("em", null));
  }
};


export default {
  defaultBtns,
  ConfigBtnWaper,
  ConfigButton,
}