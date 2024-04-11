
// 导入模块
import React from "react";
import Component from "../components/component";

/**
 * @method hBasMenu 导航父级结构
 * @date 2019-12-30 
 * @author sxt
 * @return {object} 导航父级结构
 */

export function s85() {
  const {
    state: {
      component: {
        id
      },
      data: {
        document_data: {},
        theme_data: {
          style: {
            column
          }
        }
      }
    }
  } = this;
  let columnClass = column ? "menuItemEqual" : "menuItemUnequal";
  return React.createElement(Component.box, {
    id: id,
    className: "menubox"
  }, React.createElement(Component.menuUl, {
    state: this.state
  }));
}
