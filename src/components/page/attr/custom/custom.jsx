
// 导入 React 库
import React from "react";

/**
 * @class {Custom} 样式切换视图类
 * @author sxt
 * @version 1.0
 * @date 2020-2-6
 */
export default class Custom {
  constructor(controler) {
    /**@property controler 样式控制器实例 */
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
   * @date 2020-2-6
   * @author sxt
   * @return {object} 待渲染的组件对象
   */


  render() {
    let state = this.state || {};
    return React.createElement("div", {
      className: "pc-basic-setting"
    }, React.createElement("div", {
      className: "pc-interact-box"
    }, React.createElement("div", {
      className: "pcInteractive"
    }, React.createElement("ul", {
      className: "pcSetUpActive"
    }, state.tabs.map((e, i) => {
      return React.createElement("li", {
        key: i,
        className: state.currentTab == e.id ? "on" : "",
        onClick: this.controler.clickTabs.bind(this.controler, e.id)
      }, React.createElement("a", null, e.name));
    }))), React.createElement("div", {
      className: "pcStyleContent"
    }, React.createElement("div", {
      className: "imgTopic"
    }, React.createElement("div", {
      className: "imgTopic",
      style: {
        height: "426px",
        overflowY: "auto"
      }
    }, React.createElement("div", {
      className: "imgThemeStyle listThemeStyle"
    }, React.createElement("ul", {
      id: state.currentTab
    }, this.listHtml())))))));
  }
  /**
   * @method listHtml 样式选择列表
   * @author sxt
   */


  listHtml() {
    let state = this.state || {},
        skin = state.skin;
    let list = state.group[state.currentTab] || [];
    return list.map((e, i) => {
      let className = e.skin.split(".").slice(2, 4).join("-");
      return React.createElement("li", {
        className: e.skin == skin ? `${e.skinStyle} selected` : e.skinStyle,
        onClick: this.controler.selected.bind(this.controler, e.skin),
        key: e.skin
      }, e.skin == skin ? React.createElement("p", {
        className: "conSelecte"
      }, "✔") : null, !e.videoPath ? null : React.createElement("div", {
        className: "desVideo",
        onMouseEnter: e => e.currentTarget.querySelector("video").play(),
        onMouseLeave: e => {
          const _video = e.currentTarget.querySelector("video");

          _video.currentTime = 0, _video.pause();
        }
      }, React.createElement("video", {
        src: `/desktop/Public/images/video/${videoPath}`,
        onError: e => e.target.dataset.play = "false",
        loop: true
      })));
    });
  }

}
