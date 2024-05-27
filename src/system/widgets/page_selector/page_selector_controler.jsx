
import React from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '@/system/tools/dispatcher';
import Page from './page_selector';

/**
 * @class {PageControler} 页面控制器类
 */
class PageControler extends React.Component {
  constructor(props) {
    super(props);
    /**@property {number} num 页面总数量*/

    this.mum = 0; //绑定this

    this.each = this.each.bind(this); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Border} view 初始化 view 实例*/

    this.view = new Page(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**
   * @static page 页面渲染
   * @param {object} opts 参数列表
   * @param {object} opts.element 节点对象
   * @param {object} opts.data 背景数据
   * @param {string} opts.id 控件或页面id
   * @param {boolean} opts.isEnsure 是否显示确认按钮
   * @param {object} opts.values 默认数据
   * @param {function} opts.ensure 点击确认处理方法
   * @param {function} opts.selected 选中处理方法
   * @param {function} opts.selectedAll 全选处理方法
   * @param {boolean} opts.isBackground 是否显示背景
   */


  static pageSelector(opts) {
    ReactDOM.render(React.createElement(PageControler, {
      element: opts.element,
      data: opts.data,
      id: opts.id,
      isEnsure: opts.isEnsure,
      values: opts.values,
      ensure: opts.ensure,
      selected: opts.selected,
      selectedAll: opts.selectedAll,
      isBackground: opts.isBackground
    }), opts.element);
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
   */


  init() {
    var _this$props$values;

    const data = Dispatcher.dispatch('document_get');
    const {
      data: {
        document_data: {
          MAIN_MENU = {}
        }
      }
    } = data; //获取页面数据

    this.pageList = JSON.parse(JSON.stringify([...(MAIN_MENU.items || []), ...(MAIN_MENU.tempitems || [])]));
    this.state = (_this$props$values = this.props.values) !== null && _this$props$values !== void 0 ? _this$props$values : {
      pages: [],
      names: [],
      all: false
    };
  }
  /**
   * @method componentDidMount 组件渲染完毕后执行，整个生命周期内只执行一次
   */


  componentDidMount() {
    const {
      state: {
        pages,
        all
      }
    } = this; //全选为true，且存储的id列表为空数组，执行

    if (all && pages.length == 0) {
      const list = document.querySelectorAll('#page-menu-list input:not(:disabled)'); //获取页面id

      this.state.pages = [...list].map(e => {
        //名称数组存在则向其中push名称
        if (this.state.names) {
          const span = e.parentNode.nextElementSibling;
          this.state.names.push(span.textContent);
        }

        return e.value;
      });
    }
  }
  /**
   * @method each 递归循环页面项
   * @return {object} 页面结构
   */


  each() {
    let num = 0;

    const _each = items => {
      let list = []; //循环页面项

      for (let i = 0, len = items.length; i < len; i++) {
        const item = items[i]; //判断页面类型，只显示正常页面
        // if(/JumpLink|CatLink/.test(item.pageType) == false)
        // {

        const checkedLink = /JumpLink|CatLink/.test(item.pageType) == true;
        const disabled = item.pid == this.props.id;

        if (disabled == false) {
          num = num + 1;
        }

        list.push(React.createElement(this.view.pageItem, {
          key: i,
          name: item.label,
          data: this.props.isBackground ? this.props.data[item.pid] || {} : null,
          id: item.pid,
          disabled: disabled,
          checkedLink: checkedLink
        }, item.child && item.child.length ? _each(item.child) : null));
      } // }


      this.num = num;
      return list;
    };

    return _each(this.pageList);
  }
  /**
   * @method selected 选中复选框触发方法
   * @param {string} id 页面id
   * @param {event} event 事件对象
   */


  selected(name, id, event) {
    const checked = event.target.checked;
    let {
      state: {
        pages,
        names
      }
    } = this,
      index = pages.indexOf(id); //选中框选中并且pages中不包含此页面

    if (checked && index == -1) {
      //追加页面
      pages.push(id), names.push(name); //存在处理方法，执行处理方法

      this.props.selected && this.props.selected(id, checked); //更新ui

      this.setState({
        pages,
        names,
        all: pages.length != this.num ? false : true
      });
    } else if (checked == false && index > -1) {
      //选中框不选中并且pages中包含此页面,删除此页面
      pages.splice(index, 1), names.splice(index, 1); //存在处理方法，执行处理方法

      this.props.selected && this.props.selected(id, checked); //更新ui

      this.setState({
        pages,
        names,
        all: pages.length != this.num ? false : true
      });
    }
  }
  /**
   * @method selectedAll 选中所有复选框
   * @param {event} event 事件对象
   */
  selectedAll(event) {
    const checked = event.target.checked;
    const list = document.querySelectorAll('#page-menu-list input:not(:disabled)');
    let pages = [],
      names = []; //选中所有  

    if (checked) {
      //全选，获取所有页面id，非全选，获取空数组
      pages = [...list].map(e => {
        //名称数组存在则向其中push名称
        names.push(e.parentNode.nextElementSibling.textContent);
        return e.value;
      });
    } //判断是否选中所有复选框


    this.setState({
      all: checked,
      pages,
      names
    }); //存在处理方法，执行处理方法

    this.props.selectedAll && this.props.selectedAll(pages, checked);
  }
  /**
   * @method ensure 点击确认执行方法
   */
  ensure() {
    //确定参数  0 选择页面id数组  1 是否全选  2所选页面的名称
    this.props.ensure && this.props.ensure(this.state.pages, this.state.all, this.state.names); //卸载面板

    ReactDOM.unmountComponentAtNode(this.props.element);
  }

}


export { PageControler }