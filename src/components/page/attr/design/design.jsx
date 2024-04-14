
// 导入模块
import React, { useState, useEffect } from "react"; // 导入 React 模块
import DesignManager from "./design_manager"; // 导入 DesignManager 变量
import ReactDOM from "react-dom"; // 导入 ReactDOM 模块


/**@private prefix 属性前缀*/

let prefix = "",

  /**@private disableUnit 禁止单位选择*/
  disableUnit = "",

  /**@property tabs 属性项集合 */
  tabs = ["background", "border", "radius", "shadow", "text", "icon", "space", "animation", "hoveranimation", "position", "divider", "levelnav"];
  const iconsList = ['&#xe784','&#xe784','&#xe784','&#xe784','&#xe784','&#xe784','&#xe784','&#xe784','&#xe784','&#xe784','&#xe784','&#xe784'];
/**
 * @instance {Design} 设计实例
 * @author wyq
 * @version 1.0
 * @date 2019-10-30
 */

const Design = {
  /**@property config 属性配置对象 */
  config: null,

  /**@property node 控件数据 */
  node: null,

  /**@property publicAttr 公用属性模块 */
  publicAttr: null,

  /**
   * @method design 插入设计属性模块

   * @param {object} opts 参数对象
   * @param {object} opts.list 配置对象
   * @param {object} opts.node 控件数据
   * @param {object} opts.element 插入到的父级节点
   */
  design(opts) {
    var _opts$prefix;

    const DesignComponent = this.render.bind(this);
    this.config = opts.config, this.group = opts.list;
    this.publicAttr = opts.publicAttr, this.node = opts.node; //设置项禁用所有单位选择属性

    disableUnit = opts.disableUnit;
    prefix = (window.public.type == 'pc' ? '' : 'mo') + ((_opts$prefix = opts.prefix) !== null && _opts$prefix !== void 0 ? _opts$prefix : "");
    tabs = window.public.configure(tabs, this.group);
    // ReactDOM.createRoot(opts.element).render(<DesignComponent />)
    ReactDOM.render(React.createElement(DesignComponent, null), opts.element);
  },

  /**
   * @method render 设计项结构

   * @return {object} 设计项结构
   */
  render() {
    const [tab, selectedTab] = useState(tabs[0]);
    useEffect(() => this.showTab(tab), [tab]);
    return React.createElement("div", {
      className: "pcPagePropertiesCon"
    }, React.createElement("div", {
      className: "pcDesignLeft"
    }, React.createElement("ul", {
      className: "pcPatternUl"
    }, tabs.map((e, i) => {
      return React.createElement("li", {
        key: e,
        className: tab != e ? null : "on",
        onClick: () => selectedTab(e)
      }, React.createElement("i", {
        className: `pc-${e}-icon iconfont`,
        dangerouslySetInnerHTML: {__html: iconsList[i]}
      }));
    }))), React.createElement("div", {
      className: "pcDesignRight",
      id: "pro-design"
    }));
  },

  /**
   * @method showTab 选中当前点击项并显示对应内容

   * @param {object} tab 当前选中项 
   */
  showTab(tab) {
    const content = document.querySelector("#pro-design");
    const param = {
      element: content,
      prefix,
      disableUnit,
      node: this.node,
      config: this.config,
      publicAttr: this.publicAttr
    }; //判断是否有属性项的配置      

    if (this.group.group) {
      param.group = this.group.group[tab];

      if (param.group && param.group.all) {
        var _param$group$skin;

        const skin = this.node.current.skin;
        param.group = (_param$group$skin = param.group[skin]) !== null && _param$group$skin !== void 0 ? _param$group$skin : param.group.all;
      }
    }

    this[tab](param);
  },

  /**
   * @method background 载入背景模块

   * @param {object} opts 参数对象 
   */
  async background(opts) {
    const background = await DesignManager.background("controler");
    background.background(opts);
  },

  /**
   * @method border 载入边框模块

   * @param {object} opts 参数对象 
   */
  async border(opts) {
    const border = await DesignManager.border("controler");
    border.border(opts);
  },

  /**
   * @method radius 载入圆角模块

   * @param {object} opts 参数对象 
   */
  async radius(opts) {
    const radius = await DesignManager.radius("controler");
    radius.radius(opts);
  },

  /**
   * @method shadow 载入阴影模块

   * @param {object} opts 参数对象 
   */
  async shadow(opts) {
    const shadow = await DesignManager.shadow("controler");
    shadow.shadow(opts);
  },

  /**
   * @method text 载入文本模块

   * @param {object} opts 参数对象 
   */
  async text(opts) {
    const text = await DesignManager.text("controler");
    text.text(opts);
  },

  /**
  * @method animation 载入动画模块
  * @date 2019-11-14
  * @author wyq
  * @param {object} opts 参数对象 
  */
  async animation(opts) {
    const animation = await DesignManager.animation("controler");
    animation.animation(opts);
  },

  /**
   * @method hoveranimation 蒙层载入动画模块

   * @param {object} opts 参数对象 
   */
  async hoveranimation(opts) {
    const hoveranimation = await DesignManager.hoveranimation("controler");
    hoveranimation.hoveranimation(opts);
  },

  /**
   * @method icon 载入图标模块

   * @param {object} opts 参数对象 
   */
  async icon(opts) {
    const icon = await DesignManager.icon("controler");
    icon.icon(opts);
  },

  /**
   * @method position 载入定位模块

   * @param {object} opts 参数对象 
   */
  async position(opts) {
    const position = await DesignManager.position("controler");
    position.position(opts);
  },

  /**
   * @method space 载入间距模块
   * @date 2020-05-18
   * @author wyq
   * @param {object} opts 参数列表 
   */
  async space(opts) {
    const space = await DesignManager.space("controler");
    space.space(opts);
  },

  /**
   * @method levelnav 载入事件方法模块

   * @param {object} opts 参数对象 
   */
  async levelnav(opts) {
    const levelnav = await DesignManager.levelnav("controler");
    levelnav.levelnav(opts);
  }

};

export default Design

//# sourceURL=webpack:///./components/page/attr/design/design.js?