// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s37", function() { return s37; });
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");
// /* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/component */ "./components/button/view/components/component.js");

import React from 'react';
import Util from '@/components/page/util/util';
import Component from '../components/component';

function s37() {
  var _this$props$context;

  let {
    state: {
      component: {
        id,
        formBtn = ""
      },
      data: {
        document_data,
        document_data: {
          icon = {},
          hoverAnimationClass = '',
          label,
          link,
          class_data,
          dataSource
        }
      }
    }
  } = this; // formBtn用于给表单提交按钮加类名

  let context = (_this$props$context = this.props.context) !== null && _this$props$context !== void 0 ? _this$props$context : {}; //link数据存在，并且传过来的数据中有id时

  if (link && context.id) {
    let functionalLinkType = link.functionalLinkType; //功能链接的类型为加入购物车或者询盘时，把商品id赋值给shopid  sxt 2020-12-17

    if (functionalLinkType == "addMoreShopCart" || functionalLinkType == "inquiryMoreShopCart") {
      link.shopid = '{$vo.id}';
    }
  }

  let text = "";

  if (!Util.source) {
    if (dataSource && (dataSource.sign || dataSource.companyField == "publish_time" || dataSource.companyField == "add_time" || dataSource.companyField == "edit_time" || dataSource.companyField == "online_time" || dataSource.companyField == "offline_time")) {
      text = Util.timeTypeCont(id, document_data, 'label', context);
    } else {
      text = Util.getComponentText(id, document_data, 'label', context);
    }
  } else {
    text = Util.getComponentText(id, document_data, 'label', context);
  }

  return React.createElement(Util.linkDecorator, {
    id: id,
    className: `${id}A btn btnbox btnCont minWidth ${hoverAnimationClass} ${formBtn}`,
    link: Util.setLinkUrl(context.link, link),
    type: "html"
  }, React.createElement(Component.script, {
    id: id,
    document_data: document_data
  }), React.createElement("div", {
    className: `${id}TextBox  textBox`
  }, React.createElement(Component.icon, {
    id: id,
    icon: icon
  }), React.createElement("span", {
    className: `${id}Te btnText`
  }, text)));
}

export { s37 }