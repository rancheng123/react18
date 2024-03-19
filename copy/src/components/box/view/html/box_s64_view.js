import React from 'react';
import util from '../../../page/util/util.js'


function s64() {
  const {
    state: {
      component: {
        id,
        components
      },
      data: {
        document_data = {},
        theme_data = {}
      }
    },
    props: {
      context,
      clone
    }
  } = this,
        child = components[0],
        len = components.length;
  const unedit = util.source != undefined;
  let {
    isFloat
  } = document_data;
  const className = child && child.type != 'Placeholder' || unedit || len > 1 ? '' : 'box-m-height';
  return React.createElement("div", {
    id: id,
    className: `${id}boxCont  boxCont`,
    "data-float": isFloat || null
  }, theme_data.background ? React.createElement("div", {
    className: "rowListBg lazyload",
    "data-src": util.imagePath(theme_data.background),
    "data-webp": theme_data.isWebp === false ? "" : util.webp(util.imagePath(theme_data.background))
  }) : null, React.createElement("div", {
    className: `${id}Box boxContent ${className}`
  }, child ? React.createElement(util.children, {
    components: components,
    context: context,
    clone: clone
  }) : unedit ? null : React.createElement("button", null, "\u53EF\u62D6\u5165\u63A7\u4EF6\u5230\u6B64\u4F4D\u7F6E")));
}

export default s64;

//# sourceURL=webpack:///./components/box/view/html/box_s64_view.js?