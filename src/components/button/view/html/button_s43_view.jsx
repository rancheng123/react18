
import React from 'react';
import Util from '@/components/page/util/util';
import Component from '../components/component';

function s43() {
  var _this$props$context, _ref, _ref2, _ref3, _ref4;

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
          dataSource
        }
      }
    }
  } = this;
  let context = (_this$props$context = this.props.context) !== null && _this$props$context !== void 0 ? _this$props$context : {}; //link数据存在，并且传过来的数据中有id时

  if (link && context.id) {
    let functionalLinkType = link.functionalLinkType; //功能链接的类型为加入购物车或者询盘时，把商品id赋值给shopid  

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
  //   className: `${id}A btn btnbox btnCont minWidth ${hoverAnimationClass} ${formBtn}`,
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
  // }, text), React.createElement(Component.icon, {
  //   id: id,
  //   icon: icon
  // })));

  return (
    <Util.linkDecorator
      id={id}
      className={`${id}A btn btnbox btnCont minWidth ${hoverAnimationClass} ${formBtn}`}
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
          data-source={
            (dataSource === null || dataSource === void 0 ? void 0 : dataSource.companyField) || null
          }
          data-companylabeltext={
            (dataSource === null || dataSource === void 0 ? void 0 : dataSource.companyLabelText) || null
          }
          data-defaultvalue={
            (dataSource === null || dataSource === void 0 ? void 0 : dataSource.companyDefaultValue) || null
          }
          data-sign={
            (dataSource === null || dataSource === void 0 ? void 0 : dataSource.sign) || null
          }
        >
          {text}
        </span>
        <Component.icon id={id} icon={icon} />
      </div>
    </Util.linkDecorator>
  )
}

export { s43 }