
import React from 'react';
import Util from '@/components/page/util/util';
import Component from '../components/component';

function s47() {
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
          label,
          hoverAnimationClass = '',
          link,
          dataSource
        }
      }
    }
  } = this; // formBtn用于给表单提交按钮加类名

  const context = (_this$props$context = this.props.context) !== null && _this$props$context !== void 0 ? _this$props$context : {}; //link数据存在，并且传过来的数据中有id时

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

  return React.createElement(Util.linkDecorator, {
    id: id,
    className: `${id}A btn2 minWidth btnbox btnCont ${hoverAnimationClass} ${formBtn}`,
    link: Util.setLinkUrl(context.link, link),
    type: "html"
  }, React.createElement(Component.script, {
    id: id,
    document_data: document_data
  }), React.createElement("div", {
    className: `${id}TextBox  textBox`
  }, React.createElement("span", {
    className: `${id}Te btnText`
  }, text)));
}

export {s47}