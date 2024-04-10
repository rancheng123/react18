import React from 'react';
import Util from '@/components/page/util/util';

export default function s64() {
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
  let {
    isFloat,
    showMode
  } = document_data;
  const className = child && child.type != 'Placeholder' || unedit || len > 1 ? '' : 'box-m-height';
  const Dom = (
    <div 
      id={id}
      className={`${id}boxCont  boxCont ${showMode}`}
      data-float={isFloat || null}
    >
      {
        theme_data.background && (
          <div 
            className='rowListBg lazyload'
            data-src={Util.imagePath(theme_data.background)}
            data-webp={theme_data.isWebp === false ? "" : Util.webp(Util.imagePath(theme_data.background))}
            ></div>
        )
      }
      <div className={`${id}Box boxContent ${className}`}>
        {
          child ? <div>{Util.children({components, context, clone})}</div> : unedit ? null : <button>可将控件拖拽至此处</button>
        }
      </div>
    </div>
  )
  return Dom
  // return React.createElement("div", {
  //   id: id,
  //   className: `${id}boxCont  boxCont ${showMode}`,
  //   "data-float": isFloat || null
  // }, theme_data.background ? React.createElement("div", {
  //   className: "rowListBg lazyload",
  //   "data-src": Util.imagePath(theme_data.background),
  //   "data-webp": theme_data.isWebp === false ? "" : Util.webp(Util.imagePath(theme_data.background))
  // }) : null, React.createElement("div", {
  //   className: `${id}Box boxContent ${className}`
  // }, child ? React.createElement(Util.children, {
  //   components: components,
  //   context: context,
  //   clone: clone
  // }) : unedit ? null : React.createElement("button", null, "\u53EF\u62D6\u5165\u63A7\u4EF6\u5230\u6B64\u4F4D\u7F6E")));
}
