// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util.jsx';

/**
 * @function Component 一行多列结构类
 * @date 2019-11-13
 * @author wyq
 * @return 一行多列结构
 */

function Component() {
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
    },
    props: {
      context,
      clone
    }
  } = this;
  const {
    background
  } = theme_data !== null && theme_data !== void 0 ? theme_data : {};
  const name = document_data.name; //对class进行处理，解决class优化后的兼容问题  2020-08-03 wyq

  if (typeof name == 'string') {
    document_data.name = name.replace(/(_[0-9a-z]{1})[a-z]+/g, "$1");
  } //组件开启浮动属性 sxt 2020-2-22


  return React.createElement("div", {
    id: id,
    "data-fixed": document_data.isFloat || null,
    "data-ismask": document_data.ismask || null,
    className: `${id} relative componentsBox ${Util.source ? '' : 'editColumn'}`
  }, background && (background.type || 'BackgroundColor') != 'BackgroundColor' ? React.createElement("div", {
    className: "rowListBg" + (background.type == 'Image' ? ' lazyload' : ''),
    "data-src": background.type == 'Image' ? Util.imagePath(background) : null,
    "data-webp": theme_data.isWebp === false ? null : background.type == 'Image' ? Util.webp(Util.imagePath(background)) : null
  }, background.type == 'video' ? React.createElement("video", {
    src: background.uri,
    width: "100%",
    autoPlay: "autoplay",
    playsInline: "playsinline",
    muted: "muted",
    loop: true
  }) : null) : null, React.createElement("div", {
    className: `rowList ${id}rL ${document_data.name}`
  }, React.createElement(Util.children, {
    components: components,
    context: context,
    clone: clone
  })));
}

export default Component