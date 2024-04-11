
import React from "react"; // 导入 React 模块
import ReactDOM from "react-dom"; // 导入 ReactDOM 模块
import Dispatcher from "@/system/tools/dispatcher"; // 导入 dispatcher 模块

/**
 * @class {ItemManageControler} 列表项管里控制器类
 * @author wyq
 * @version 1.0
 * @date 2019-11-19
 */

export default class ItemManageControler extends React.Component {
  constructor(props) {
    super(props);
    /**@property {array} 项管里中要显示的项 */

    this.items = [];
    /**@property {number} 最大项数 */

    this.max = 10;
    /**@property {number} 最低项数 */

    this.min = 1;
    /**@property {boolean} 是否开启拖拽 */

    this.draggable = true;
    /**@property {String} 是否显示添加按钮 */

    this.isAdd = true; //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
  }
  /**
   * @static border 边框渲染
   * @author sxt 
   * @date 2019-09-30
   * @param {object} opts 参数列表
   * @param {object} opts.element 节点对象
   */


  static manage(opts) {
    const {
      list,
      node,
      element,
      config
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      const ItemManageControler = this;
      ReactDOM.render(React.createElement(ItemManageControler, {
        id: node.current.id,
        config: config,
        node: node,
        list: list
      }), element);
    }
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-09-30
   * @author sxt
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
      component,
      data: {
        document_data: {
          items
        }
      }
    } = Dispatcher.dispatch(fnName);
    this.items = items.map(e => {
      const {
        data: {
          document_data
        }
      } = Dispatcher.dispatch("getData", {
        value: component
      });
      const doc_data = JSON.parse(JSON.stringify(document_data[e]));
      return {
        component: {
          id: e,
          name: doc_data.label
        },
        document_data: doc_data
      };
    });
    this.state = {
      current: this.items[0],
      list: this.props.list
    };
  }

  get data() {
    return null;
  }
  /**
   * @method add 新增项
   * @date 2019-11-23
   * @author wyq
   */


  add() {
    if (this.items.length > this.max) {
      return false;
    }

    const newid = window.public.createId();
    const doc_data = this.data,
          pdoc_data = this.data;
    Dispatcher.dispatch('addData', {
      args: [this.props.id, `document_data.${newid}.items`, pdoc_data]
    });
    this.items.push({
      component: {
        id: newid
      },
      document_data: doc_data
    });
    this.setState({
      isadd: newid
    });
  }
  /**
   * @method remove 删除项
   * @date 2019-11-23
   * @author wyq
   * @param {object} item 要删除的项 
   * @param {event} event 事件对象 
   */


  remove(item, event) {
    if (this.items.length <= this.min) {
      return false;
    }

    const {
      component: {
        id: pid
      }
    } = item;
    const index = this.items.findIndex(e => pid == e.component.id);
    Dispatcher.dispatch(`removeData`, {
      args: [this.props.id, `document_data.${pid}.items`]
    });
    this.items.splice(index, 1);
    this.state.current.component.id != pid ? this.setState({
      isremove: pid
    }) : this.setState({
      current: this.items[0]
    }); //阻止事件冒泡

    event.stopPropagation();
  }
  /**
   * @method switchTab 切换选项
   * @param {object} item 要切换的项 
   * @param {event} event 事件对象 
   */


  switchTab(item, event) {
    this.setState({
      current: item
    });
  }
  /**
   * @method hidden 显示隐藏项
   * @date 2019-12-31
   * @author wyq
   * @param {object} item 项数据 
   */


  hidden(item) {
    const id = this.props.id,
          itemId = item.component.id;
    let {
      document_data: {
        hidden
      }
    } = item; //点击时hidden等于零 则表示需要显示。等于一，表示隐藏

    hidden = hidden == 0 ? 1 : 0;
    item.document_data.hidden = hidden;
    this.setState({
      hidden: hidden
    });
    Dispatcher.dispatch(`${id}_set`, {
      args: [`items.${itemId}.hidden`, hidden]
    });
  }
  /**
   * @method dragStart 拖拽开始执行方法
   * @author wyq
   * @param {event} e
   */


  dragStart(id, event) {
    const index = this.items.findIndex(e => e.component.id == id); //记录拖拽控件的初始索引   

    this.initIndex = index;
    event.dataTransfer.setData("text", "123"); //判断当前拖拽项是否是当前项，不是则切换为当前项
    //if(uid != cid){ this.tabShow.call(this.single,items[this.initIndex],e); }
  }
  /**
   * @method dragOver 拖拽到可放置目标时处罚
   * @author wyq
   * @param {event} e 
   */


  dragOver(id, e) {
    //获取当前位置处目标的索引
    const index = this.items.findIndex(e => e.component.id == id);
    const current = this.items.splice(this.initIndex, 1)[0]; //替换拖拽目标到当前目标位置

    this.items.splice(index, 0, current); //渲染属性面板

    this.setState({
      draggable: id
    }); //记录初始索引

    this.initIndex = index;
  }
  /**
   * @method dragEnd 拖拽结束执行方法
   * @author wyq
   * @param {event} e 事件对象
   */


  dragEnd(e) {
    const id = this.props.id;
    const items = this.items.map(e => e.component.id); //渲染控件结构

    Dispatcher.dispatch(`${id}_set`, {
      args: [`document_data.items`, items]
    });
  }

}
