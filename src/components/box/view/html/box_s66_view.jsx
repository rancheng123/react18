import React from 'react'
import Util from '@/components/page/util/util'

export default function s66() {
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
  let {
    showMode
  } = document_data;

  const Dom = (
    <div 
      id={id}
      className={`${id} ${id}boxCont  boxCont`}
    >
      {
        theme_data.background && (
          <div
            className='rowListBg lazyload'
            data-src={Util.imagePath(theme_data.background)}
            data-webp={theme_data.isWebp === false ? '' : Util.webp(Util.imagePath(theme_data.background))}
          ></div>
        )
      }
      <div className={`${id}Box  ${showMode}`}>
        {
          Util.children({components, context, clone})
        }
      </div>
      <div className="rBoxStyle_lArrow  rBoxStyle_lArrow1"></div>
    </div>
  )

  return Dom
  
  // return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  //   id: id,
  //   className: `${id} ${id}boxCont  boxCont`
  // }, theme_data.background ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  //   className: "rowListBg lazyload",
  //   "data-src": util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath(theme_data.background),
  //   "data-webp": theme_data.isWebp === false ? "" : util__WEBPACK_IMPORTED_MODULE_1__["Util"].webp(util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath(theme_data.background))
  // }) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  //   className: `${id}Box  ${showMode}`
  // }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(util__WEBPACK_IMPORTED_MODULE_1__["Util"].children, {
  //   components: components,
  //   context: context,
  //   clone: clone
  // })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  //   className: "rBoxStyle_lArrow  rBoxStyle_lArrow1"
  // }));
}
