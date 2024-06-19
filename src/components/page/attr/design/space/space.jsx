
// 导入React库
import React from 'react';

// 导入widget模块
import Widget from '@/system/widgets/widget';

/**
 * @class {Space} 间距视图类
 */
export default class Space {
  constructor(controler) {
    /**@property controler 间距控制器实例 */
    this.controler = controler; //unit 绑定this，实现伪继承

    this.unit = this.props.publicAttr.unit.bind(this);
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
    // return React.createElement("ul", {
    //   className: "design-space"
    // }, this.props.list.map((e, i) => React.createElement("li", {
    //   className: "pcAttList",
    //   key: i
    // }, this[e] && this[e]())));
    return (
      <ul className="design-space">
        {this.props.list.map((e, i) => (
          <li className="pcAttList" key={i}>
            {this[e] ? this[e]() : null}
          </li>
        ))}
      </ul>
    )
  }
  /**
   * @method columnSpace 列间距
   * @return {object} 列间距结构
   */


  columnSpace() {
    // return React.createElement(this.unit, {
    //   id: "columnSpace",
    //   title: "columnSpace",
    //   sname: "colspacing",
    //   uname: "colspacingUnit",
    //   disabled: this.props.disableUnit
    // });
    return (
      <this.unit
        id="columnSpace"
        title="columnSpace"
        sname="colspacing"
        uname="colspacingUnit"
        disabled={this.props.disableUnit}
      />
    )
  }
  /**
   * @method rowSpace 行间距
   * @return {object} 行间距结构
   */


  rowSpace() {
    return React.createElement(this.unit, {
      id: "rowSpace",
      title: "rowSpace",
      sname: "rowspacing",
      uname: "rowspacingUnit",
      disabled: this.props.disableUnit
    });
  }
  /**
   * @method innerspacing 内间距
   * @return {object} 内间距结构
   */


  innerspacing() {
    var _this$state$key;

    const name = "innerSpace";
    const key = this.props.prefix + name;
    // return React.createElement(Widget.Range, {
    //   id: "innerspacing",
    //   title: "innerspacing",
    //   unit: "px",
    //   min: 0,
    //   max: 30,
    //   value: (_this$state$key = this.state[key]) !== null && _this$state$key !== void 0 ? _this$state$key : this.state[name],
    //   change: this.controler.range.bind(this.controler, key)
    // });

    return (
      <Widget.Range
        id="innerspacing"
        title="innerspacing"
        unit="px"
        min={0}
        max={30}
        value={
          this.state[key] !== null && this.state[key] !== undefined
            ? this.state[key]
            : this.state[name]
        }
        change={this.controler.range.bind(this.controler, key)}
      />
    )
  }
  /**
  * @method paddingBtm 上下内间距结构
  * @return {object} 上下内间距结构
  */


  paddingBtm() {
    // return React.createElement(this.unit, {
    //   id: "paddingBtm",
    //   title: "paddingBtm",
    //   sname: "paddingBtm",
    //   uname: "paddingBtmUnit",
    //   disabled: this.props.disableUnit
    // });
    return (
      <this.unit
        id="paddingBtm"
        title="paddingBtm"
        sname="paddingBtm"
        uname="paddingBtmUnit"
        disabled={this.props.disableUnit}
      />
    )
  }
  /**
   * @method paddingRit 左右内间距结构
   * @return {object} 左右内间距结构
   */


  paddingRit() {
    // return React.createElement(this.unit, {
    //   id: "paddingRit",
    //   title: "paddingRit",
    //   sname: "paddingRit",
    //   uname: "paddingRitUnit",
    //   disabled: this.props.disableUnit
    // });
    return (
      <this.unit
        id="paddingRit"
        title="paddingRit"
        sname="paddingRit"
        uname="paddingRitUnit"
        disabled={this.props.disableUnit}
      />
    )
  }

}
