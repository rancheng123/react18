// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util';

export const Content = function () {
  const {
    state: {
      component: {
        id,
        components
      }
    }
  } = this;
  return (
    <div id={id} className='container auto-margin'>
      <Util.children  components={components} />
    </div>
  )
  // return React.createElement("div", {
  //   id: id,
  //   className: "container auto-margin"
  // }, React.createElement(Util.children, {
  //   components: components
  // }));
}

