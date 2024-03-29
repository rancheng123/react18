
// 导入 React 库
import React from 'react';
import { createRoot } from 'react-dom/client';
// 导入 widget_library_config.json 文件
import WidgetLibraryConfig from '@/config/widget_library_config.js';
// 导入 component_library_config.json 文件
import componentLibraryConfig from '@/config/component_library_config.js';
// 导入 widget_library 模块
import WidgetLibrary from './widget_library.jsx';
// 导入 drag_add 模块
import DragAdd from '../drag_add';
// 导入 components_manager 模块
import ComponentsManager from '@/components/page/components_manager';



var nmbTerm = null; //用来存储切换控件库内选项的index lw date 2021-2-3

var nmbTermid = null; //用来存储切换控件库内选项的id   lw

export default class WidgetLibraryControler extends React.Component {
  constructor(props) {
    super(props);
    let configType = props.configType || "";
    /**@property {object} info 拖拽控件的信息 */

    this.info = null;
    this.configType = configType; //类型为组件时

    if (configType == "component") {
      this.tabs = componentLibraryConfig.group[137].tabs || {}; // //currentTab=tabs[0].id,

      this.group = JSON.parse(JSON.stringify(componentLibraryConfig.group[137].group || {}));
    } else {
      /**@property {object} tabs 控件列表*/
      this.tabs = WidgetLibraryConfig.tabs;
      /**@property {object} group 控件内容列表*/

      this.group = JSON.parse(JSON.stringify(WidgetLibraryConfig.group));
    }
    /**@property {string} skin 拖拽控件的皮肤名 */


    this.skin = ''; //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {WidgetLibrary} view 初始化 view 实例*/

    this.view = new WidgetLibrary(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  static widgetLibrary(id, configType) {
    const element = document.querySelector(`#${id}`);
    // ReactDom.render(React.createElement(WidgetLibraryControler, {
    //   id: id,
    //   configType: configType
    // }), element);
    createRoot(element).render(<WidgetLibraryControler configType={configType} id={id}/>)
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-09-25
   * @author sxt 
   * @return {object} 待渲染的组件对象
   */


  render() {
    // return React.createElement(this.view.render, null);

    return (
      <WidgetLibrary {...this} selectTab={this.selectTab}  jumpAnchor={this.jumpAnchor}  anchorMouseLeave={this.anchorMouseLeave}  anchorMouseEnter={this.anchorMouseEnter}  start={this.start}  />
    )

  }
  
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @date 2019-09-25
   * @author sxt
   */


  init() {
    var tabs = this.tabs || [],
        tabsinx = '';

    if (nmbTerm && nmbTermid && tabs[nmbTerm] && nmbTermid == tabs[nmbTerm].id) {
      tabsinx = nmbTerm;
    }

    this.state = {
      current: tabsinx != '' ? tabs[tabsinx] : tabs[0]
    }; //初始化时如果tabsinx值为''的话，打开时就默认选中第一个选项，否则打开就是之前关闭时的位置 lw date 2021-2-3
  }
  /**
   * @method selectTab 切换控件项方法
   * @date 2019-09-24
   * @author sxt
   * @param {string} tab 切换的值
   */


  selectTab = (tab) =>  {
    nmbTermid = tab.id;
    var tabsArray = this.tabs; //获取控件库数组 lw 2021-2-3

    this.setState({
      current: tab,
      jump: "",
      top: 0
    });

    for (var i = 0; i < tabsArray.length; i++) {
      if (tab == tabsArray[i]) {
        //遍历对比进行存值 lw 2021-2-3
        nmbTerm = i;
      }
    }
  }

  close(close) {
    this.__proto__.close = close;
  }

  help() {}
  /**
   * @method scrollTo 滚动条变化时，锚点定位方法
   * @date 2019-09-24
   * @author sxt
   */


  scrollTo() {
    const _anchor = document.querySelector(".anchorsMain .selected"),
          _parent = document.querySelector(".content_2"),
          {
      offsetHeight: conHeight
    } = _parent,
          {
      offsetHeight: mHeight,
      scrollTop: parNodePar
    } = _parent.parentNode; //当前项存在下一个元素时


    if (_anchor.nextElementSibling) {
      //获取下一个元素的top值
      let _nextName = _anchor.nextElementSibling.dataset.anchorName,
          _next = document.getElementById(_nextName),
          _nextTop = _next.offsetTop; //滚动条的位置大于下一个元素的top时，赋值


      if (parNodePar > _nextTop) {
        return this.setState({
          jump: _nextName
        });
      }
    } //当前项存在上一个元素时


    if (_anchor.previousElementSibling) {
      //获取上一个元素的top值
      let _prevName = _anchor.previousElementSibling.dataset.anchorName,
          _prev = document.getElementById(_prevName),
          _prevTop = _prev.offsetTop; //滚动条的位置小于等于下一个元素的top时，赋值


      if (parNodePar <= _prevTop) {
        return this.setState({
          jump: _prevName
        });
      }
    } //父级高度+滚动条top大于等于内容总高时，证明在最底部，最后一个元素选中


    if (mHeight + parNodePar >= conHeight) {
      const _last = document.querySelector(".anchorsMain>li:last-child");

      return this.setState({
        jump: _last.dataset.anchorName
      });
    }
  }
  /**
   * @method anchorMouseEnter 锚点移入方法
   * @date 2019-09-24
   * @author sxt
   * @param {string} value 切换的值
   */


  anchorMouseEnter(value) {
    this.setState({
      prompt: value
    });
  }
  /**
  * @method anchorMouseLeave 锚点移出方法
  * @date 2019-09-24
  * @author sxt
  */


  anchorMouseLeave() {
    this.setState({
      prompt: ""
    });
  }
  /**
  * @method jumpAnchor 点击锚点方法
  * @date 2019-09-24
  * @author sxt
  * @param {string} value 切换的值
  */


  jumpAnchor(value) {
    this.setState({
      jump: value
    });
  }
  /**
   * @method getData 获取控件数据
   * @date 2019-10-22
   * @author wyq
   * @return {object} 控件数据 
   */


  async getData() {
    if (this.skin) {
      const [type, classname] = this.skin.split(".");
      const module = await ComponentsManager(type);

      if (module) {
        const name = window.humpJoin(classname, "_");
        const data = await module.getData(name);
        return data ? data.items[this.skin] : null;
      }
    }

    return null;
  }
  /**
   * @method start 拖拽开始执行方法
   * @date 2019-10-22
   * @author wyq
   * @param {string} skin 皮肤
   * @param {event} event 事件对象
   */


  start(skin, event) {
    this.skin = skin;
    new DragAdd(this).start(event);
  }

}

//# sourceURL=webpack:///./ui/toolbar/widget_library/widget_library_controler.js?