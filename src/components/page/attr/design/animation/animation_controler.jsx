
import React from 'react';
import { createRoot } from 'react-dom/client';
import Dispatcher from '@/system/tools/dispatcher';
import Animation from './animation';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class AnimationControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Link} view 初始化 view 实例*/

    this.view = new Animation(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  /**
  * @static text 创建文本属性
  * @param {object} opts 参数列表
  * @param {string} opts.selector css选择器
  * @param {object} opts.element 节点对象
  */
  static animation(opts = {}) {
    const {
      group,
      node,
      element,
      prefix
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      // ReactDOM.render(React.createElement(AnimationControler, {
      //   id: node.current.id,
      //   node: node,
      //   prefix: prefix,
      //   group: group
      // }), element);

      if (opts.allShow) {
        return (
          <AnimationControler
            id={node.current.id}
            node={node}
            prefix={prefix}
            group={group}
          />
        )
      } else {
        const root = createRoot(element)
        root.render(
          <AnimationControler
            id={node.current.id}
            node={node}
            prefix={prefix}
            group={group}
          />
        );
      }
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
    const fnName = `${this.props.id}_get`;
    const {
      data: {
        document_data
      },
      component: {
        skin
      }
    } = Dispatcher.dispatch(fnName);
    this.state = {
      ...document_data,
      ...{
        tab: this.props.prefix,
        skin: skin
      }
    };
    this.state.list = AnimationControler.LIST;
  }
  /**
   * @method selectTab 起换选项
   * @param {string} tab 切换的项 
   */


  selectTab(tab) {
    this.setState({
      tab: tab
    });
  }
  /**
   * @method set 设置样式数据
   * @param {string} key 键值
   * @param {string} value 属性值
   */


  set(key, value) {
    this.setState({
      [key]: value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, value]
    });

    if (key == 'hoverAnimationClass' && value != '' && (this.state.hoverduration == "0" || !this.state.hoverduration)) {
      this.setState({
        "hoverduration": "0.5"
      });
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`document_data.hoverduration`, "0.5"]
      });
      Dispatcher.dispatch(`${this.props.id}_set`, {
        args: [`theme_data.style.hoverduration`, "0.5"]
      });
    }
  }

  setDuration(key, event) {
    let value = event.target.value;
    this.setState({
      [key]: value
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, value]
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`theme_data.style.${key}`, value]
    });
  }
  /**
   * @method range 滑块拖拽方法
   * @param {string} key 键值
   * @param {event} event 事件对象
   */


  range(key, event) {
    this.set(key, Number(event.target.value || 0));
  }
  /**
   * @method change 单选、下拉值修改时执行方法
   * @date 2019-11-7
   * @author wyq
   * @param {string} key 键值
   * @param {event} event 事件对象
   */


  change(key, event) {
    this.set(key, event.target.value);
  }

}

_defineProperty(AnimationControler, "LIST", ["animationEffect", "duration"]);

export { AnimationControler }