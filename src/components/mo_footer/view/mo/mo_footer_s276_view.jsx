// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util';
// 导入自定义的组件模块
import Component from '../components/component.jsx';

export const s276 = function () {
  const {
    state: {
      component: {
        id
      },
      data: {
        items,
        document_data,
        document_data: {
          fixedPosition
        }
      },
      headHiding
    }
  } = this;
  let page = this.props.page,
      hidden = true;

  if (page) {
    let pageId = page.structure.id;
    hidden = headHiding !== null && headHiding !== void 0 ? headHiding : page.data.document_data[pageId].footerShow;

    if (hidden == false) {
      hidden = false;
    } else {
      hidden = true;
    }
  }

  if (hidden == true && Util.source) {
    return null;
  }

  return React.createElement("footer", {
    id: id,
    className: `mo_gradient_footer ${hidden == true ? Util.source ? "" : "mask" : ""}`,
    "data-float": fixedPosition || null
  }, Component.items({
    id: id,
    items: document_data.items,
    data: items
  }));
}