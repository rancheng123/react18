
import React from 'react';
import ReactDOM from 'react-dom';

// 导入其他模块
import Levelnav from './levelnav';
import Dispatcher from '@/system/tools/dispatcher';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * @class {LevelnavControler} 次级展开控制器类
 */
class LevelnavControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Link} view 初始化 view 实例*/

    this.view = new Levelnav(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  static levelnav(opts) {
    const {
      group,
      node,
      element,
      prefix
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      const LevelnavControler = this;
      let list = this.LIST;

      if (group) {
        list = window.public.configure(this.LIST, group);
      }

      ReactDOM.render(React.createElement(LevelnavControler, {
        id: opts.id || node.current.id,
        node: node,
        prefix: prefix,
        list: list
      }), element);
    }
  }

  render() {
    // return React.createElement(this.view.render, null);
    return <this.view.render />
  }

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
      this.state = {
        ...this.state,
        ...theme_data.style
      };
    }
  }

}

_defineProperty(LevelnavControler, "LIST", []);


export { LevelnavControler }