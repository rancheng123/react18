import React from 'react'
import Util from '@/components/page/util/util'

export default function s111() {
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
  const unedit = Util.source != undefined;
  let className = "";

  if (Util.source && !components.length) {
    className = 'box-m-height';
    let child = components[0];
    return (
      <div id={id} data-a={Util.source} data-b={components.length}>
        <div className={className}>
          {
            child ? (
              Util.children({components, context: {...data, unuseId}, clone: true})
            ) : unedit && <button>可将控件拖放到此处</button>
          }
        </div>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        {
          components.map((e, i) => {
            return Util.component(
              {
                key: e.id, 
                component: e, 
                clone: index !== 0 ? true :false,
                context: { ...data, unuseId}
              })
          })
        }
      </React.Fragment>  
    )
  }
  // if (!util__WEBPACK_IMPORTED_MODULE_1__["Util"].source && !components.length) {
  //   className = 'box-m-height';
  //   let child = components[0];
  //   return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  //     id: id,
  //     "data-a": util__WEBPACK_IMPORTED_MODULE_1__["Util"].source,
  //     "data-b": components.length
  //   }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  //     className: `${className}`
  //   }, child ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].children, {
  //     components: components,
  //     context: { ...data,
  //       unuseId
  //     },
  //     clone: true
  //   }) : unedit ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "\u53EF\u62D6\u5165\u63A7\u4EF6\u5230\u6B64\u4F4D\u7F6E")));
  // } else {
  //   return components.map((e, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].component, {
  //     key: e.id,
  //     component: e,
  //     clone: index != 0 ? true : false,
  //     context: { ...data,
  //       unuseId
  //     }
  //   }));
  // }
}
