
// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util';


/**
 * @function Flipper 翻屏组件结构
 * @date 2020-07-30
 * @author wyq
 * @return {object} 翻屏组件结构
 */

export default function Flipper() {
  const {
    state: {
      component: {
        id,
        componentType,
        components
      },
      data: {
        document_data
      }
    }
  } = this;
  return React.createElement("div", {
    id: id,
    className: "flipper",
    "data-type": componentType,
    "data-mode": "flipper",
    "data-duration": document_data.duration || null
  }, React.createElement(Util.children, {
    components: components
  }));
}
