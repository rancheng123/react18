
// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util';

export function Column() {
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
  } = this,
        child = components[0],
        len = components.length;
  const unedit = Util.source != undefined;
  const className = child && child.type != 'Placeholder' || unedit || len > 1 ? '' : 'col-m-height';
  let hidName = ''; //hidden等于1,返回null 2020-12-15 by wyq

  if (document_data.hidden == 1) {
    hidName = ' hidden';
    if (unedit) return null;
  }

  const Dom = (
    <div className={`${id}row_col rowcol${hidName} ${className}`}>
      {
        theme_data.background && (
          <div
            className='rowListBg lazyload'
            data-src={Util.imagePath(theme_data.background)}
            data-webp={theme_data.isWebp === false ? null : Util.webp(Util.imagePath(theme_data.background))}
          ></div>
        )
      }
      {
        child ? (<Util.children components={components} context={context} clone={clone} />) : (
          unedit && <button>可拖入控件到此位置</button>
        )
      }
    </div>
  )

  return Dom;

  // return React.createElement("div", {
  //   id: id,
  //   className: `${id}row_col rowcol${hidName} ${className}`
  // }, theme_data.background ? React.createElement("div", {
  //   className: "rowListBg lazyload",
  //   "data-src": Util.imagePath(theme_data.background),
  //   "data-webp": theme_data.isWebp === false ? null : Util.webp(Util.imagePath(theme_data.background))
  // }) : null, child ? React.createElement(Util.children, {
  //   components: components,
  //   context: context,
  //   clone: clone
  // }) : unedit ? null : React.createElement("button", null, "\u53EF\u62D6\u5165\u63A7\u4EF6\u5230\u6B64\u4F4D\u7F6E"));
}

 