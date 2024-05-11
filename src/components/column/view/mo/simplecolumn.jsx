import React from 'react';
import Util from '@/components/page/util/util';
// import { D } from 'dist/static/index-YB5XjPBq';

export default function Column() {
  var _theme_data$backgroun, _theme_data$backgroun2;

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
  let hidName = ''; //hidden等于1,返回null

  if (document_data.hidden == 1) {
    hidName = ' hidden';
    if (unedit) return null;
  }
  const lcs = `${id}row_col rowcol${hidName} ${className}`
  const Dom = (
    <div
      id={id}
      className={lcs}
    >
      {
        theme_data.background && (
          <div data-src={Util.imagePath({
            ...theme_data.background,
            uri: (_theme_data$backgroun = theme_data.background.mouri) !== null && _theme_data$backgroun !== void 0 ? _theme_data$backgroun : theme_data.background.uri
          })}
            data-webp={theme_data.isWebp === false ? null : Util.webp(Util.imagePath({
              ...theme_data.background,
              uri: (_theme_data$backgroun2 = theme_data.background.mouri) !== null && _theme_data$backgroun2 !== void 0 ? _theme_data$backgroun2 : theme_data.background.uri
            }))}
            className="rowListBg lazyload"
          ></div>
        )
      }
      {
        child ? (
          <Util.children
            components={components}
            context={context}
            clone={clone}
          />
        ) : (
          unedit && <button>可拖入控件到此位置</button>
        )
      }
    </div>
  )

  return Dom

  // return React.createElement("div", {
  //   id: id,
  //   className: `${id}row_col rowcol${hidName} ${className}`
  // }, theme_data.background ? React.createElement("div", {
  //   "data-src": Util.imagePath({
  //     ...theme_data.background,
  //     uri: (_theme_data$backgroun = theme_data.background.mouri) !== null && _theme_data$backgroun !== void 0 ? _theme_data$backgroun : theme_data.background.uri
  //   }),
  //   "data-webp": theme_data.isWebp === false ? null : Util.webp(Util.imagePath({
  //     ...theme_data.background,
  //     uri: (_theme_data$backgroun2 = theme_data.background.mouri) !== null && _theme_data$backgroun2 !== void 0 ? _theme_data$backgroun2 : theme_data.background.uri
  //   })),
  //   className: "rowListBg lazyload"
  // }) : null, child ? React.createElement(Util.children, {
  //   components: components,
  //   context: context,
  //   clone: clone
  // }) : unedit ? null : React.createElement("button", null, "\u53EF\u62D6\u5165\u63A7\u4EF6\u5230\u6B64\u4F4D\u7F6E"));
}
