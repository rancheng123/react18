import React from 'react'
import ReactDOM from 'react-dom'
import Dispatcher from '@/system/tools/dispatcher';
import { Radius } from './radius'
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class {RadiusControler} 圆角控制器类
 * @author wyq
 * @version 1.0
 * @date 2019-11-8
 */

class RadiusControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Radius} view 初始化 view 实例*/

    // this.view = new Radius(this); //给view 入口方法绑定this

    // this.view.render = this.view.render.bind(this.view);
    this.LIST = ["TopLeft", "TopRight", "BottomRight", "BottomLeft"]
  }
  /**@static LIST 属性列表 */


  /**
   * @static radius 圆角渲染
   * @author wyq 
   * @date 2019-11-8
   * @param {object} opts 参数列表
   * @param {object} opts.element 节点对象
   */
  static radius(opts) {
    const {
      group,
      node,
      element,
      prefix
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      let list = this.LIST;

      if (group) {
        list = window.public.configure(this.LIST, group);
      }

      ReactDOM.render(React.createElement(RadiusControler, {
        id: opts.id || node.current.id,
        node: node,
        prefix: prefix,
        list: list
      }), element);
    }
  }
  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */

  render() {
    return <Radius state={this.state} {...this.props} value={this.value.bind(this)} locking={this.locking.bind(this)} />
  }

  
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @date 2019-11-7
   * @author wyq
   */


  init() {
    const fnName = `${this.props.id}_get`;
    const {
      data: {
        theme_data
      }
    } = Dispatcher.dispatch(fnName); //theme_data数据存在并且存在style数据，则与state合并

    if (theme_data && theme_data.style) {
      const key = `${this.props.prefix}borRadius`;
      const values = (theme_data.style[key] || theme_data.style.borRadius || '0px').match(/[0-9]+/g);
      this.state = values.length == 1 ? {
        values: new Array(4).fill(values[0], 0, 4),
        isLocking: true
      } : {
        values: values,
        isLocking: false
      };
    } else {
      this.state = {
        values: [0, 0, 0, 0],
        isLocking: true
      };
    }
  }
  /**
   * @method set 设置控件数据中的圆角值
   * @date 2020-02-06
   * @author wyq
   * @param {array} values 存放圆角值的数组
   * @param {number} value 要设置的圆角值
   * @param {boolean} locking 标识圆角状态：锁定与不锁定
   * @param {number} i 索引
   */


  set(values, value, locking, i) {
    //判断是否锁定
    if (locking) {
      //填充数组
      values.fill(value, 0, 4), value = `${value}px`;
    } else {
      i != undefined && values.splice(i, 1, value);
      value = `${values.join("px ")}px`;
    } //更改数据


    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.style.${this.props.prefix}borRadius`, value]
    });
  }
  /**
   * @method value 修改圆角的值
   * @date 2019-11-7
   * @author wyq
   * @param {number} i 索引 
   * @param {event} event 事件对象
   */


  value(i, event) {
    let value = Number(event.target.value);
    this.setState(state => {
      //设置值
      this.set(state.values, value, state.isLocking, i);
      return {
        values: state.values
      };
    });
  }
  /**
   * @method locking 开启关闭锁定
   * @date 2019-11-8
   * @author wyq
   * @param {event} event 事件对象 
   */


  locking(event) {
    const checked = event.target.checked;
    this.setState(state => {
      //设置值
      this.set(state.values, state.values[0], checked);
      return {
        isLocking: checked,
        values: state.values
      };
    });
  }

}

_defineProperty(RadiusControler, "LIST", ["TopLeft", "TopRight", "BottomRight", "BottomLeft"]);

export { RadiusControler }

//# sourceURL=webpack:///./components/page/attr/design/radius/radius_controler.js?