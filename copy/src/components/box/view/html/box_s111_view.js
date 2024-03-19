import React from 'react';
import util from '../../../page/util/util.js'

function s111() {
  const {
    state: {
      component: {
        id,
        components
      }
    },
    props: {
      context: {
        index,
        data,
        unuseId
      }
    }
  } = this;
  const unedit = util.source != undefined;
  let className = "";

  if (!util.source && !components.length) {
    className = 'box-m-height';
    let child = components[0];
    return React.createElement("div", {
      id: id,
      "data-a": util.source,
      "data-b": components.length
    }, React.createElement("div", {
      className: `${className}`
    }, child ? React.createElement(util.children, {
      components: components,
      context: { ...data,
        unuseId
      },
      clone: true
    }) : unedit ? null : React.createElement("button", null, "\u53EF\u62D6\u5165\u63A7\u4EF6\u5230\u6B64\u4F4D\u7F6E")));
  } else {
    return components.map((e, i) => React.createElement(util.component, {
      key: e.id,
      component: e,
      clone: index != 0 ? true : false,
      context: { ...data,
        unuseId
      }
    }));
  }
}

export default s111;

//# sourceURL=webpack:///./components/box/view/html/box_s111_view.js?