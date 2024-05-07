
import React from 'react';
import Util from '@/components/page/util/util';
import Component from '../components/component';

function s49() {
  var _this$props$context;

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
          link
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

  return React.createElement(Util.linkDecorator, {
    id: id,
    className: `${id}A btn3 btnAnati  btnbox btnCont ${hoverAnimationClass} ${formBtn}`,
    link: Util.setLinkUrl(context.link, link),
    type: "html"
  }, React.createElement(Component.script, {
    id: id,
    document_data: document_data
  }), React.createElement(Component.icon, {
    id: id,
    icon: icon
  }));
}

export { s49 }
