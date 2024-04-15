
import React from 'react';
import ReactDOM from 'react-dom';

// 导入dispatcher模块
import Dispatcher from '@/system/tools/dispatcher.js';

// 导入Space模块
import Space from './space';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * @class {SpaceControler} 间距控制器类
 * @author wyq
 * @version 1.0
 * @date 2020-05-18
 */

class SpaceControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Space} view 初始化 view 实例*/

    this.view = new Space(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**@static LIST 属性列表 */


  /**
   * @static space 间距渲染
   * @author wyq 
   * @date 2020-05-18
   * @param {object} opts 参数列表
   * @param {object} opts.element 节点对象
   * @param {object} opts.group 属性配置项
   * @param {object} opts.node 控件对象
   * @param {string} opts.prefix 拼接前缀
   * @param {PublicAttribute} opts.publicAttr 共用属性实例
   * @param {boolean} opts.disableUnit 禁止选择单位
   */
  static space(opts) {
    const {
      group,
      node,
      element,
      prefix,
      publicAttr,
      disableUnit
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      const SpaceControler = this;
      let list = this.LIST;

      if (group) {
        list = window.public.configure(this.LIST, group);
      }

      ReactDOM.render(React.createElement(SpaceControler, {
        id: node.current.id,
        prefix: prefix,
        node: node,
        list: list,
        publicAttr: publicAttr,
        disableUnit: disableUnit
      }), element);
    }
  }
  /**
   * @method render 挂载组件方法
   * @date 2020-05-18
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    return React.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @date 2020-05-18
   * @author wyq
   */


  init() {
    const key = `${this.props.id}_get`;
    const {
      data: {
        theme_data,
        document_data = {}
      }
    } = Dispatcher.dispatch(key); //赋空状态对象

    this.state = document_data; //theme_data数据存在并且存在style数据，则与state合并

    if (theme_data && theme_data.style) {
      this.state = { ...this.state,
        ...theme_data.style
      };
    }
  }
  /**
   * @method range 拖拽滑块触发回到函数
   * @date 2020-05-18
   * @author wyq
   * @param {string} key 属性键值 
   * @param {object} event 事件对象 
   */


  range(key, event) {
    var _event$target$value;

    const value = Number((_event$target$value = event.target.value) !== null && _event$target$value !== void 0 ? _event$target$value : 0);
    this.setState({
      [key]: value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.style.${key}`, value]
    });
  }

}

_defineProperty(SpaceControler, "LIST", ['columnSpace', 'rowSpace', 'innerspacing']);

export { SpaceControler }