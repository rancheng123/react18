
import React from 'react';
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
  let hidName = ''; //hidden等于1,返回null 

  if (document_data.hidden == 1) {
    hidName = ' hidden';
    if (unedit) return null;
  }

  // return React.createElement("div", {
  //   id: id,
  //   className: `${id}cL col${hidName} ${className}`
  // }, theme_data.background ? React.createElement("div", {
  //   className: "rowListBg lazyload",
  //   "data-src": Util.imagePath(theme_data.background),
  //   "data-webp": Util.webp(Util.imagePath(theme_data.background))
  // }) : null, React.createElement("div", {
  //   className: `${id}cB col-box boxSiz ${className}`
  // }, child ? React.createElement(Util.children, {
  //   components: components,
  //   context: context,
  //   clone: clone
  // }) : unedit ? null : React.createElement("button", null, "\u53EF\u62D6\u5165\u63A7\u4EF6\u5230\u6B64\u4F4D\u7F6E")));

  return (
    <div id={id} className={`${id}cL col${hidName} ${className}`}>
      {theme_data.background && (
        <div className="rowListBg lazyload"
          data-src={Util.imagePath(theme_data.background)}
          data-webp={Util.webp(Util.imagePath(theme_data.background))}
        />
      )}
      <div className={`${id}cB col-box boxSiz ${className}`}>
        {child ? (
          <Util.children
            components={components}
            context={context}
            clone={clone}
          />
        ) : unedit ? null : (
          <button>\u53EF\u62D6\u5165\u63A7\u4EF6\u5230\u6B64\u4F4D\u7F6E</button>
        )}
      </div>
    </div>
  )
}
