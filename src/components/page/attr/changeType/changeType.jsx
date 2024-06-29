// 导入 widget 模块
import Widget from "@/system/widgets/widget";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import WidgetList from "@/template/toolbar/widget_library/widgetList/index.jsx";
import React from "react";
import WidgetLibraryConfig from "@/config/widget_library_config.js";


export default class ChangeType {
  constructor(controler) {
    _defineProperty(this, "list", () => {
      return [{
        name: "noAnimation",
        value: "无动画",
      },
      {
        name: "bounceIn",
        value: "弹跳进入",
      },
      {
        name: "rebound",
        value: "左侧滑入",
      },
      {
        name: "fadeIn",
        value: "淡入",
      },
      {
        name: "slide",
        value: "右侧淡入",
      },
      {
        name: "open",
        value: "放大进入",
      },
      {
        name: "flyInto",
        value: "飞入",
      },
      {
        name: "inhalation",
        value: "吹入",
      },
      {
        name: "foldBack",
        value: "折叠进入",
      },
      {
        name: "reFlipIn",
        value: "翻转进入",
      },
      {
        name: "reAppearIn",
        value: "显现",
      }, 
      {
        name: "reveal",
        value: "滑入 ",
      }, 
      // {
      //   name: "arcSpinIn",
      //   value: "电弧旋入",
      // }, 
      // {
      //   name: "screwing",
      //   value: "旋转进入",
      // }, 
      // {
      //   name: "toChangeInto",
      //   value: "转入",
      // },
      // {
      //   name: "flip",
      //   value: "翻转",
      // },
      // {
      //   name: "topslide",
      //   value: "上部滑入",
      // }, 
      // {
      //   name: "bottomslide",
      //   value: "底部滑入",
      // }
    ];
    });

    /**@property controler 动画控制器实例 */
    this.controler = controler;
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} state 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }

  /**
   * @method render 组件渲染方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    const {
      setting,
      on,
      className,
      duration,
      delay,
      angle,
      offsetDistance,
      name,
      value
    } = this.state;








    var matched = WidgetLibraryConfig.tabs.find((tab)=>{
      return tab.name === this.props.node.current.absolute.name
    })

    var json = WidgetLibraryConfig.group[matched.id]

    return (
        <div style={{
          width: '318px',
          margin: '0 auto'
        }}>
          <WidgetList
              tabs={json.tabs}
              group={json.group}
              onMouseDown={(skin, event)=>{
                debugger

                //删除当前节点

                //重新渲染选中的节点
              }}
          ></WidgetList>
        </div>
    )
  }

}
