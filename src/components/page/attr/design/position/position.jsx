
// 导入React库
import React from 'react';


/**
 * @class {Position} 定位视图类
 * @author wyq
 * @version 1.0
 * @date 2019-11-14
 */

export default class Position {
  constructor(controler) {
    /**@property controler header控制器实例 */
    this.controler = controler;
    /** @proeprty position 存放属性可设置的方向值 */

    this.positions = ['top', 'right', 'bottom', 'left']; //margin绑定this

    this.margin = this.margin.bind(this); //padding绑定this

    this.padding = this.padding.bind(this); //unit 绑定this，实现伪继承

    this.unit = this.props.publicAttr.unit.bind(this);
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} props 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-11-14
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    // return React.createElement("div", {
    //   className: "em-position-propertyNew"
    // }, this.props.group.margin ? React.createElement("ul", {
    //   className: "em-position-marginNew"
    // }, React.createElement("li", {
    //   className: "em-marginNew"
    // }, `${window.public.lang.margin}-margin`), React.createElement(this.margin, null)) : null, this.props.group.padding ? React.createElement("ul", {
    //   className: "em-position-paddingNew"
    // }, React.createElement("li", {
    //   className: "em-paddingNew"
    // }, `${window.public.lang.padding}-padding`), React.createElement(this.padding, null)) : null);

    return (
      <div className="em-position-propertyNew">
        {this.props.group.margin ? (
          <ul className="em-position-marginNew">
            <li className="em-marginNew">{`${window.public.lang.margin}`}</li>
            <this.margin />
          </ul>
        ) : null}
        {this.props.group.padding ? (
          <ul className="em-position-paddingNew">
            <li className="em-paddingNew">{`${window.public.lang.padding}`}</li>
            <this.padding />
          </ul>
        ) : null}
      </div>
    )
  }
  /**
   * @method margin 外边距结构
   * @date 2019-11-14
   * @author wyq
   * @return {object} 外边距结构
   */


  margin() {
    return this.positions.map((e, i) => {
      const one = e.charAt(0);
      const key = `margin${e.replace(one, one.toUpperCase())}`; //如果margin包含某一项则表示要删除这一项

      if (String(this.props.group.margin).indexOf(e) != -1) {
        return null;
      }

      return React.createElement("li", {
        className: `em-margin${i}New`,
        key: i
      }, React.createElement(this.unit, {
        title: `position-${e}`,
        id: `margin-${e}`,
        sname: key,
        uname: key + 'Unit',
        disabled: this.props.disableUnit,
        change: this.controler[key].bind(this.controler),
        blur: this.controler.blur.bind(this.controler, key) // 新增失去焦点事件 lw 2021-4-22 

      }));
    });
  }
  /**
   * @method padding 内边距结构
   * @date 2019-11-14
   * @author wyq
   * @return {object} 内边距结构
   */


  padding() {
    return this.positions.map((e, i) => {
      const one = e.charAt(0);
      const key = `padding${e.replace(one, one.toUpperCase())}`; //如果padding包含某一项则表示要删除这一项

      if (String(this.props.group.padding).indexOf(e) != -1) {
        return null;
      }

      return React.createElement("li", {
        className: `em-padding${i}New`,
        key: i
      }, React.createElement(this.unit, {
        title: `position-${e}`,
        id: `padding-${e}`,
        sname: key,
        uname: key + 'Unit',
        disabled: this.props.disableUnit,
        selected: this.controler.selected.bind(this.controler, key),
        change: this.controler[key].bind(this.controler)
      }));
    });
  }

}
