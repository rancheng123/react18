// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util';

export const Footer = function () {
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
    }
  } = this,
        background = theme_data.background;
  let page = this.props.page,
      footerClass = "";

  if (page && Util.source) {
    let pageId = page.structure.id,
        footerShow = page.data.document_data[pageId].footerShow;

    if (footerShow == false) {
      footerClass = " mofootPadbtm";
    }
  }

  return React.createElement("footer", {
    id: id,
    className: `auto-margin${footerClass}`,
    "data-float": document_data.isFloat || null
  }, background ? React.createElement("div", {
    className: "rowListBg lazyload",
    "data-src": Util.imagePath(background),
    "data-webp":Util.webp(Util.imagePath(background))
  }, background.type == 'video' ? React.createElement("video", {
    src: background.uri,
    width: "100%",
    autoPlay: "autoplay",
    playsinline: "playsinline",
    muted: "muted",
    loop: true
  }) : null) : null, React.createElement(Util.children, {
    components: components
  }));
}

  