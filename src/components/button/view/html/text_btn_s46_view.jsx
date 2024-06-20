// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s46", function() { return s46; });
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");
// /* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/component */ "./components/button/view/components/component.js");

import React from 'react';
import Util from '@/components/page/util/util';
import Component from '../components/component';

function s46() {
  var _this$props$context, _ref, _ref2, _ref3, _ref4;

  const {
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
          dataSource
        }
      }
    }
  } = this;
  const context = (_this$props$context = this.props.context) !== null && _this$props$context !== void 0 ? _this$props$context : {}; //link数据存在，并且传过来的数据中有id时

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

  // return React.createElement(Util.linkDecorator, {
  //   id: id,
  //   className: `${id}A btn2 minWidth btnbox btnCont ${hoverAnimationClass} ${formBtn}`,
  //   link: Util.setLinkUrl(context.link, link),
  //   type: "html"
  // }, React.createElement(Component.script, {
  //   id: id,
  //   document_data: document_data
  // }), React.createElement("div", {
  //   className: `${id}TextBox  textBox`
  // }, React.createElement("span", {
  //   className: `${id}Te btnText`,
  //   "data-source": (_ref = dataSource === null || dataSource === void 0 ? void 0 : dataSource.companyField) !== null && _ref !== void 0 ? _ref : null,
  //   "data-companylabeltext": (_ref2 = dataSource === null || dataSource === void 0 ? void 0 : dataSource.companyLabelText) !== null && _ref2 !== void 0 ? _ref2 : null,
  //   "data-defaultvalue": (_ref3 = dataSource === null || dataSource === void 0 ? void 0 : dataSource.companyDefaultValue) !== null && _ref3 !== void 0 ? _ref3 : null,
  //   "data-sign": (_ref4 = dataSource === null || dataSource === void 0 ? void 0 : dataSource.sign) !== null && _ref4 !== void 0 ? _ref4 : null
  // }, text)));

  return (
    <Util.linkDecorator
      id={id}
      className={`${id}A btn2 minWidth btnbox btnCont ${hoverAnimationClass} ${formBtn}`}
      link={Util.setLinkUrl(context.link, link)}
      type="html"
    >
      <Component.script
        id={id}
        document_data={document_data}
      />
      <div className={`${id}TextBox  textBox`}>
        <span
          className={`${id}Te btnText`}
          dataSource={(_ref = dataSource === null || dataSource === void 0 ? void 0 : dataSource.companyField) !== null && _ref !== void 0 ? _ref : null}
          dataCompanylabeltext={(_ref2 = dataSource === null || dataSource === void 0 ? void 0 : dataSource.companyLabelText) !== null && _ref2 !== void 0 ? _ref2 : null}
          dataDefaultvalue={(_ref3 = dataSource === null || dataSource === void 0 ? void 0 : dataSource.companyDefaultValue) !== null && _ref3 !== void 0 ? _ref3 : null}
          dataSign={(_ref4 = dataSource === null || dataSource === void 0 ? void 0 : dataSource.sign) !== null && _ref4 !== void 0 ? _ref4 : null}
        >
          {text}
        </span>
      </div>
    </Util.linkDecorator >
  )
}


export { s46 }