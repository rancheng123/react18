// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util';
// 导入自定义的组件模块
import Component from '../components/component.jsx';

export function s271() {
  const {
    state: {
      component: {
        id,
        components: [child]
      },
      data: {
        document_data: {
          fixedPosition,
          icon = {},
          link
        },
        theme_data: {
          style = {}
        }
      },
      headHiding
    }
  } = this;
  let page = this.props.page,
      hidden = true;

  if (page) {
    let pageId = page.structure.id;
    hidden = headHiding !== null && headHiding !== void 0 ? headHiding : page.data.document_data[pageId].headerShow;

    if (hidden == false) {
      hidden = false;
    } else {
      hidden = true;
    }
  }

  if (hidden == true && Util.source) {
    return null;
  }

  return React.createElement("header", {
    id: id,
    className: `${hidden == true ? Util.source ? null : "mask" : null}`,
    "data-float": fixedPosition || null
  }, React.createElement("div", {
    id: "right_iconBg_header",
    className: "header_content"
  }, React.createElement(Util.component, {
    component: child
  }), React.createElement(Util.linkDecorator, {
    className: `${id}A right_Menu`,
    link: link,
    type: "html"
  }, React.createElement(Component.icon, {
    id: id,
    icon: icon,
    style: style,
    type: "right"
  }))));
}
