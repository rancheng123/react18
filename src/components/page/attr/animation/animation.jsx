// 导入 React 库
import React from "react";
// 导入 widget 模块
import Widget from "@/system/widgets/widget";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



export default class Animation {
  constructor(controler) {
    _defineProperty(this, "list", () => {
      return [{
        name: "noAnimation",
        value: "无动画"
      }, {
        name: "rebound",
        value: "左侧滑入"
      }, {
        name: "slide",
        value: "右侧滑入"
      }, {
        name: "fadeIn",
        value: "淡入"
      }, {
        name: "open",
        value: "中心放大"
      }, {
        name: "screwing",
        value: "旋转进入"
      }, {
        name: "flyInto",
        value: "右侧飞入"
      }, {
        name: "toChangeInto",
        value: "转入"
      }, {
        name: "arcSpinIn",
        value: "电弧旋入"
      }, {
        name: "inhalation",
        value: "吸入"
      }, {
        name: "foldBack",
        value: "折叠打开"
      }, {
        name: "flip",
        value: "翻转"
      }, {
        name: "reveal",
        value: "揭示 "
      }, {
        name: "topslide",
        value: "上部滑入"
      }, {
        name: "bottomslide",
        value: "底部滑入"
      }];
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
   * @author sxt
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
    return setting ? React.createElement("div", null, React.createElement("button", {
      className: "contorlBtn returnBtn",
      onClick: () => this.controler.setting(false)
    }, React.createElement("i", null, "<"), React.createElement("font", {
      id: "animationClose"
    }, "\u8FD4\u56DE")), React.createElement("hr", {
      className: "hr-short"
    }), React.createElement("div", {
      className: "aniSty"
    }, React.createElement("span", null, React.createElement("i", {
      "data-name": name
    })), React.createElement("span", null, value), React.createElement("label", {
      className: "stopBtn",
      onClick: this.controler.animationPlay
    }, React.createElement("p", {
      className: "aa"
    }))), React.createElement("hr", {
      className: "hr-short"
    }), React.createElement("ul", {
      className: "pcConAttDesign"
    }, React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.Range, {
      title: "duration",
      max: 10,
      value: duration,
      change: e => this.controler.setRange("duration", e)
    })), React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.Range, {
      title: "delay",
      max: 10,
      value: delay,
      change: e => this.controler.setRange("delay", e)
    })))) : React.createElement("div", {
      className: "aniStyles conMain aniCon"
    }, React.createElement("div", {
      className: " scrollContent"
    }, React.createElement("div", null, React.createElement("ul", null, this.list().map((v, i) => React.createElement("li", {
      className: on == i ? 'on' : '',
      key: `ani_${i}`,
      onClick: () => this.controler.toggleClass(v, i)
    }, React.createElement("p", null, React.createElement("i", {
      "data-name": v.name,
      "data-value": v.value
    })), React.createElement("h5", null, v.value)))))), React.createElement("div", {
      id: "scrollbar"
    }, React.createElement("div", {
      "data-scrolltop": "0"
    })), React.createElement("div", {
      className: "panlBottom"
    }, React.createElement("button", {
      className: `contorlBtn  ${on > 0 ? '' : 'noSelection'}`,
      onClick: () => this.controler.setting(true)
    }, React.createElement("font", null, "\u8BBE\u7F6E"))));
  }

}
