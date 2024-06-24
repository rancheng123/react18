// 导入模块
import React from "react";
import Component from "../components/component";

/**
 * @method hBasMenu 导航父级结构
 * @return {object} 导航父级结构
 */

export function s85() {
  const {
    state: {
      component: { id },
      data: {
        document_data: { },
        theme_data: {
          style: { column },
        },
      },
    },
  } = this;
  let columnClass = column ? "menuItemEqual" : "menuItemUnequal";
  // return React.createElement(Component.box, {
  //   id: id,
  //   className: "menubox"
  // }, React.createElement(Component.menuUl, {
  //   state: this.state,
  //   type: "mo"
  // }));
  return (
    <Component.box id={id} className="menubox">
      <Component.menuUl state={this.state} type="mo" />
    </Component.box>
  );
}
