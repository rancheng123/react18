
// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util.jsx';

/**
    * @function items 侧边格栏单项基本结构
    * @param {Object} prop {state 状态对象 styles 存有a标签的样式信息 layout 存有布局信息}
    * @return {Object} 侧边格栏单项基本结构
    */

function items(newThis) {
  const {
    state: {
      data: {
        document_data = {},
        items = {}
      }
    }
  } = newThis;
  return (document_data.items || []).map((e, i) => {
    let selectd = null;

    if (i == 0) {
      selectd = "selected";
    }

    return (
      <li id={e} key={e}>
        <Util.linkDecorator
          link={items[e].link}
          type='html'
          className={`${selectd} AnchorA`}
        >
          <span className='AnchorSpan' title={items[e].label}></span>
        </Util.linkDecorator>
      </li>
    )

    // return React.createElement("li", {
    //   key: e,
    //   id: e
    // }, React.createElement(Util.linkDecorator, {
    //   link: items[e].link,
    //   type: "html",
    //   className: `${selectd} AnchorA`
    // }, React.createElement("span", {
    //   className: "AnchorSpan",
    //   title: items[e].label
    // })));
  });
}
/**
 * @method AnchorMenu 基本侧边栏 使用皮肤名称
 * @return {object} 基本侧边栏HTML结构
 */


export function s290() {
  const {
    state: {
      component: {
        id,
        layout = {}
      },
      data: {
        document_data: { }
      }
    }
  } = this;
  let className = ""; //位置居左时，赋值class，用于写hover时从左侧出来结构 sxt 2020-1-19 14：36

  if (layout.position_x == "left") {
    className = "sidebarHoverPar";
  }

  return (
    <div
      id={id}
      className='sidebarBox'
      data-position={Util.source ? null : 'highest'}>
      <ul className={`${className} AnchorUl scrollAnchorAuto`}>
        {items(this)}
      </ul>
    </div>
  )
  // return React.createElement("div", {
  //   id: id,
  //   "data-position": Util.source ? null : 'highest',
  //   className: "sidebarBox"
  // }, React.createElement("ul", {
  //   className: `${className} AnchorUl scrollAnchorAuto`
  // }, items(this)));
}
