
import React from 'react';
import Widget from '@/system/widgets/widget';

/**
 * @class {Border} 边框视图类
 * @author wyq
 * @version 1.0
 * @date 2019-10-30
 */

export default class Border {
  constructor(controler) {
    /**@property controler 边框控制器实例 */
    this.controler = controler;
    this.clear = this.clear.bind(this);
    this.style = this.style.bind(this);
    this.color = this.color.bind(this);
    this.width = this.width.bind(this);
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
    return React.createElement("div", {
      className: "pcBorderBox"
    }, React.createElement(this.clear, null), this.props.list.map(e => {
      const className = e.replace("der", "");
      return React.createElement("ul", {
        className: "borderStyleUl",
        key: e
      }, React.createElement("li", null, React.createElement("div", {
        className: `borderDiv ${className}div`
      })), React.createElement("li", null, React.createElement(this.style, {
        name: className
      })), React.createElement("li", null, React.createElement(this.color, {
        name: className
      })), React.createElement("li", null, React.createElement(this.width, {
        name: className
      })));
    }));
  }

  clear() {
    const clear = this.controler.clear.bind(this.controler);
    return React.createElement("ul", {
      className: "borderStyleUl"
    }, React.createElement("li", {
      className: "borderDiv",
      onClick: clear
    }), React.createElement("li", null, window.public.lang["resetBorder"]));
  }
  /**
   * @method borderColor 边框颜色结构
   * @date 2019-10-30 
   * @author wyq
   * @param {object} prop 属性对象
   * @param {string} prop.name 边框名称
   * @return {object} 边框颜色结构
   */


  color(prop) {
    const key = this.props.prefix + prop.name;
    return React.createElement(Widget.ColorPicker, {
      id: key,
      basic: true,
      color: this.state[`${key}Color`] || this.state[`${prop.name}Color`] || 'rgba(0,0,0)',
      change: this.controler.set.bind(this.controler, "Color", key)
    });
  }
  /**
   * @method borderColor 边框宽度结构
   * @date 2019-10-30 
   * @author wyq
   * @param {object} prop 属性对象
   * @param {string} prop.name 边框名称
   * @return {object} 边框宽度结构
   */


  width(prop) {
    const key = this.props.prefix + prop.name;
    let defBorder = this.state[`${key}Width`];
    let borderWidth = defBorder || this.state[`${prop.name}Width`] || 0; //当前的border宽度设置为0时，不再读取默认的border宽度  sxt 2021-1-13

    if (defBorder === 0) {
      borderWidth = 0;
    }

    return React.createElement(Widget.Range, {
      id: key,
      max: 50,
      basic: true,
      unit: "px",
      value: borderWidth,
      change: this.controler.set.bind(this.controler, "Width", key, '')
    });
  }
  /**
   * @method borderStyle 边框样式结构
   * @date 2019-10-30 
   * @author wyq
   * @param {object} prop 属性对象
   * @param {string} prop.name 边框名称
   * @return {object} 边框样式结构
   */


  style(prop) {
    const lang = window.public.lang;
    const key = this.props.prefix + prop.name;
    return React.createElement(Widget.Select, {
      id: key,
      basic: true,
      value: this.state[`${key}Style`] || this.state[`${prop.name}Style`],
      list: [{
        name: lang.solid,
        value: "solid"
      }, {
        name: lang.dashed,
        value: "dashed"
      }, {
        name: lang.dotted,
        value: "dotted"
      }],
      change: this.controler.set.bind(this.controler, "Style", key, '')
    });
  }

}
