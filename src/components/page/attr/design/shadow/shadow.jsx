
import React from 'react';
import Widget from '@/system/widgets/widget';

/**
 * @class {Radius} 圆角视图类
 */

export default class Shadow {
  constructor(controler) {
    /**@property controler 边框控制器实例 */
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
    // return React.createElement("div", {
    //   className: "pcTextBox"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, this.state.isShadow ? this.props.list.map((e, i) => React.createElement("li", {
    //   key: i,
    //   className: "pcAttList"
    // }, this[e] && this[e]())) : React.createElement("li", {
    //   className: "pcAttList"
    // }, this.isShadow())));

    return (
      <div className="pcTextBox">
        <ul className="pcConAttDesign">
          {this.state.isShadow ? this.props.list.map((e, i) => (
            <li key={i} className="pcAttList">
              {this[e] && this[e]()}
            </li>
          )) : (
            <li className="pcAttList">
              {this.isShadow()}
            </li>
          )}
        </ul>
      </div>
    )
  }
  /**
  * @method direction 阴影方向属性
  * @return {object} 阴影方向属性结构
  */


  direction() {
    // return React.createElement("div", null, React.createElement("h5", {
    //   className: "pcConAttTitle"
    // }, window.public.lang["direction"]), React.createElement("div", {
    //   className: "pcConAttCon"
    // }, React.createElement("div", {
    //   className: "pcConDir"
    // }, React.createElement("div", {
    //   className: "pcCircle",
    //   style: {
    //     transform: "rotate(" + this.state.deg + "deg)"
    //   },
    //   onMouseDown: this.controler.start.bind(this.controler)
    // }, React.createElement("div", {
    //   className: "pcCirCenter"
    // }), React.createElement("div", {
    //   className: "pcCirKnob"
    // })), React.createElement("input", {
    //   type: "number",
    //   className: "slider-number-input",
    //   placeholder: "0",
    //   value: this.state.deg,
    //   onChange: this.controler.range.bind(this.controler, "deg")
    // }))));


    return (
      <div>
        <h5 className="pcConAttTitle">{window.public.lang["direction"]}</h5>
        <div className="pcConAttCon">
          <div className="pcConDir">
            <div
              className="pcCircle"
              style={{ transform: `rotate(${this.state.deg}deg)` }}
              onMouseDown={this.controler.start.bind(this.controler)}
            >
              <div className="pcCirCenter" />
              <div className="pcCirKnob" />
            </div>
            <input
              type="number"
              className="slider-number-input"
              placeholder="0"
              value={this.state.deg}
              onChange={this.controler.range.bind(this.controler, "deg")}
            />
          </div>
        </div>
      </div>
    )
  }
  /**
   * @method distance 阴影距离属性
   * @return {object} 阴影距离属性结构 
   */


  distance() {
    // return React.createElement(Widget.Range, {
    //   title: "distance",
    //   id: "distance",
    //   unit: "px",
    //   max: 50,
    //   value: this.state.distance,
    //   change: this.controler.range.bind(this.controler, "distance")
    // });
    return (
      <Widget.Range
        title="distance"
        id="distance"
        unit="px"
        max={50}
        value={this.state.distance}
        change={this.controler.range.bind(this.controler, "distance")}
      />
    )
  }
  /**
   * @method size 阴影大小属性
   * @return {object} 阴影属性结构
   */


  size() {
    // return React.createElement(Widget.Range, {
    //   title: "size",
    //   id: "size",
    //   unit: "px",
    //   max: 50,
    //   value: this.state.size,
    //   change: this.controler.range.bind(this.controler, "size")
    // });

    return (
      <Widget.Range
        title="size"
        id="size"
        unit="px"
        max={50}
        value={this.state.size}
        change={this.controler.range.bind(this.controler, "size")}
      />
    )
  }
  /**
   * @method vague 阴影模糊属性
   * @return {object} 阴影模糊属性结构
   */


  vague() {
    // return React.createElement(Widget.Range, {
    //   title: "vague",
    //   id: "vague",
    //   unit: "px",
    //   max: 50,
    //   value: this.state.vague,
    //   change: this.controler.range.bind(this.controler, "vague")
    // });

    return (
      <Widget.Range
        title="vague"
        id="vague"
        unit="px"
        max={50}
        value={this.state.vague}
        change={this.controler.range.bind(this.controler, "vague")}
      />
    )
  }
  /**
   * @method color 阴影颜色属性
   * @return {object} 阴影颜色属性结构
   */


  color() {
    // return React.createElement(Widget.ColorPicker, {
    //   id: "shadowColor",
    //   title: "shadowColor",
    //   color: this.state.color,
    //   change: this.controler.set.bind(this.controler, "color")
    // });
    return (
      <Widget.ColorPicker
        id="shadowColor"
        title="shadowColor"
        color={this.state.color}
        change={this.controler.set.bind(this.controler, "color")}
      />
    )
  }
  /**
   * @method isShadow 是否启用阴影
   * @return {object} 阴影结构
   */


  isShadow() {
    // return React.createElement(Widget.OnOff, {
    //   title: "openShadow",
    //   checked: this.state.isShadow,
    //   change: this.controler.isShadow.bind(this.controler)
    // });
    return (
      <Widget.OnOff
        title="openShadow"
        checked={this.state.isShadow}
        change={this.controler.isShadow.bind(this.controler)}
      />
    )
  }

}


