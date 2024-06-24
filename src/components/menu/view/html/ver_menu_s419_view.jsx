// 导入模块
import React from "react";
import Component from "../components/component";

/**
 * @method hBasMenu 竖导航结构
 * @return {object} 导航父级结构
 */

export function s419() {
  var anyway = "rightWard";
  const {
    state: {
      component: { id },
      data: {
        document_data: { anAnimation = "downWard", anDropDown = "onmouseover" },
        theme_data: {
          style: { column },
        },
      },
    },
  } = this;
  let columnClass = column ? "menuItemEqual" : "menuItemUnequal";

  if (anAnimation == "downWard") {
    anyway = "downWard";
  }

  // return React.createElement(
  //   Component.box,
  //   {
  //     id: id,
  //     className: "menubox",
  //   },
  //   React.createElement(
  //     "nav",
  //     {
  //       className: "nav",
  //     },
  //     React.createElement(
  //       "ul",
  //       {
  //         "data-position": `${anyway}`,
  //         "data-mouse": `${anDropDown}`,
  //         className: `${id}Ul verticalNav verticalArrmenu  ${columnClass}`,
  //       },
  //       Component.menuLiVertical("pc", this.state)
  //     )
  //   )
  // );

  return (
    <Component.box id={id} className="menubox">
      <nav className="nav">
        <ul
          data-position={anyway}
          data-mouse={anDropDown}
          className={`${id}Ul verticalNav verticalArrmenu ${columnClass}`}
        >
          {Component.menuLiVertical("pc", this.state)}
        </ul>
      </nav>
    </Component.box>
  )
}
