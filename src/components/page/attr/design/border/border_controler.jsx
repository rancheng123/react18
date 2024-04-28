
import React from 'react';
import {createRoot} from 'react-dom/client';
import Dispatcher from '@/system/tools/dispatcher';
import Border from './border'; 

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * @class {BorderControler} 边框控制器类
 */
class BorderControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Border} view 初始化 view 实例*/

    this.view = new Border(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  /**
   * @static border 边框渲染
   * @param {object} opts 参数列表
   * @param {object} opts.element 节点对象
   */
  static border(opts) {
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
      const root = createRoot(element)
      root.render(
        <BorderControler
          id={opts.id || node.current.id}
          node={node}
          prefix={prefix}
          list={list}
        />
      );
    }
  }
  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    return React.createElement(this.view.render, null);
  }


  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @author 
   */
  init() {
    const key = `${this.props.id}_get`;
    const {
      data: {
        theme_data
      }
    } = Dispatcher.dispatch(key);
    this.state = {}; //theme_data数据存在并且存在style数据，则与state合并

    if (theme_data && theme_data.style) {
      this.state = theme_data.style;
    }
  }
  /**
   * @method set 设置样式数据
   * @param {string} key 键值
   * @param {string} value 属性值
   */
  set(type, key, value, event) {
    //判断值是否存在，不存在则进行赋值    
    if (!value) {
      value = event.target.value;

      if (/^\d+$/g.test(value)) {
        value = Number(value || 0);
      }
    }

    const border = {
      [key + 'Width']: this.state[key + 'Width'] || 1,
      [key + 'Style']: this.state[key + 'Style'] || 'solid',
      [key + 'Color']: this.state[key + 'Color'] || '#000000',
      [key + type]: value
    }; //更新面板ui 

    this.setState({ ...border
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.style.`, border]
    });
  }


  /**
   * @method clear 清空边框
   */
  clear() {
    this.setState((state, props) => {
      const {
        prefix,
        list
      } = props;

      for (let i = 0, len = list.length; i < len; i++) {
        const name = prefix + list[i].replace("der", "");
        const width = `${name}Width`,
              style = `${name}Style`,
              color = `${name}Color`;
        delete state[width], delete state[style], delete state[color];
        Dispatcher.dispatch(`${this.props.id}_remove`, {
          value: `theme_data.style.${width}`
        });
        Dispatcher.dispatch(`${this.props.id}_remove`, {
          value: `theme_data.style.${style}`
        });
        Dispatcher.dispatch(`${this.props.id}_remove`, {
          value: `theme_data.style.${color}`
        });
      }

      return state;
    });
  }

}

_defineProperty(BorderControler, "LIST", ["border", "borderTop", "borderRight", "borderBottom", "borderLeft"]);

export {BorderControler}
