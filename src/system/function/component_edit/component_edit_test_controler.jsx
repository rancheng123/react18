import React from 'react';
import ReactDom from 'react-dom';
import Dispatcher from '../../tools/dispatcher';
import ComponentEditTest from './component_edit_test'
import SingleComponentEditTest from './single/single_component_edit_test'
import MoreComponentEdit from './more_component_edit'
import AttrProxy from '../../../page/attr_proxy'
import MoreRightClickMenuControler from '../mouse_right_click_menu/mouse_right_click_menu_controler'
import Positions from '../../function/component_edit/positions'


function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }



/**
 * @class {ComponentEditControler} 控件编辑控制器类
 
 * @version 1.0
 * @date 2019-11-13
 */

class ComponentEditControler extends React.Component {
  /**@property {string} lookup 指向查找 */
  constructor(props) {
    super(props);
    /**@property {Selected} selected 控件的不同选中状态对象。 单选或多选*/

    _lookup.set(this, {
      writable: true,
      value: ''
    });

    this.selected = null;
    /**@property {Node} node 当前鼠标指针下的控件节点对象*/

    this.node = null;
    /**@property {AttrProxy} proxy 属性代理 */

    this.proxy = new AttrProxy();
    /**@property {MouseRightClickMenuControler} menu 右键菜单组件 */

    this.menu = MoreRightClickMenuControler; //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {ComponentEdit} view 初始化 view 实例*/

    this.view = new ComponentEditTest["ComponentEdit"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
    this._initX = 0;
    this.findBtn = false;
    this.virtualNode = false;
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-11-13
   
   * @return {object} 待渲染的组件对象
   */


  render() {
    return React.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @date 2019-11-13
   
   */


  init() {
    this.state = {
      hidden: false,
      ismove: true
    };
  }
  /**
   * @method componentDidMount 组件第一次挂载完毕执行方法
   * @date 2020-01-07
   
   */


  componentDidMount() {
    Dispatcher.register('selectedHidden', this.hidden, this);
    Dispatcher.register("selectedComponent", this.mousedown, this);
    Dispatcher.register('setLookup', this.setLookup, this);
  }
  /**
   * @method componentWillUnmount 卸载组件时执行方法
   * @date 2020-01-07
   
   */


  componentWillUnmount() {
    Dispatcher.unregister('selectedHidden');
    Dispatcher.unregister("selectedComponent");
    Dispatcher.unregister('setLookup');
  }

  hidden(value) {
    const selected = document.querySelector(".component-selected"); //选中框节点是否存在

    if (selected) {
      const children = selected.children,
            {
        children: [parentBtn, btn]
      } = children[0]; //卸载父级属性按钮

      ReactDom.unmountComponentAtNode(parentBtn); //卸载属性按钮

      ReactDom.unmountComponentAtNode(btn); //卸载父级选中框

      ReactDom.unmountComponentAtNode(children[1]); //卸载选中框

      ReactDom.unmountComponentAtNode(children[2]);
    } //如果选中对象存在则调用选中框卸载方法


    this.selected && this.selected.componentWillUnmount();
    this.setState({
      hidden: value
    });
  }
  /**
   * @method setLookup 设置指向查找 
   * @date 2020-09-09
   
   * @param {string} lookup 一个数组，用于存储容器类型 
   */


  setLookup(lookup) {
    _classPrivateFieldSet(this, _lookup, lookup !== null && lookup !== void 0 ? lookup : '');
  }
  /**
   * @description: 获取新节点
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-03-10 14:59:16
   */


  getNewNode(node) {
    const obj = {};

    try {
      obj.parent = node.parent;

      for (const key in node) {
        if (node.hasOwnProperty(key)) {
          if (key != 'parent') {
            obj[key] = node[key];
          }
        }
      }

      return obj;
    } catch (error) {}
  }
  /**
   * @method find 根据坐标值查找控件
   * @date 2019-10-14
   
   * @param {number} initX x轴坐标
   * @param {number} initY y轴坐标
   * @param {number} stop 滚动条滚动的阈值
   * @param {string} cid 当前控件id
   * @return {node} 相应控件数据
   */
  // find(initX,initY,stop,cid){
  //     console.time();
  //     this.findPropertyBtn();
  //     const data = Dispatcher.dispatch("getIframeData");
  //     //判断data中是否存有数据
  //     if(data)
  //     {
  //         let {component:{children:components,documentType}} = data, 
  //             current = {parent : {id:documentType},current : null},
  //             len = components.length,i = 0,parent = null,node = null,
  //             childs = null,isroot = true;
  //         while(i < len){
  //             let component = components[i],
  //                 {id,type:feature,componentType:type,combinationType,skin,isDragable:dragable,
  //                 layout = {},selectable,removable,copable} = component,
  //                 s_top = stop,y = initY,x = initX;
  //             //类型如果是em-Content，则把数据变成当前页面的数据
  //             if(type == "em-Content")
  //             {
  //                const page = Dispatcher.dispatch("getPageData",{value:component.pageId});
  //                component = page.component,{id,componentType:type} = component;
  //             }
  //             //如果指定指向查找并且当前容器类型未包含在指定查找属性中，跳出循环 只查找根级下的直系父级
  //             if(isroot == false || this.#lookup == '' || this.#lookup.indexOf(type.split('-')[1]) != -1)
  //             { 
  //                 const element = window.public.dom.querySelector(`#${id}`);
  //                 //控件是否存在对应的节点元素
  //                 if(element)
  //                 {
  //                     const {left,top,right,bottom,width,height} = element.getBoundingClientRect();
  //                     //判断当前是否是移动端浏览
  //                     if(window.public.type == 'mo'){ x = x - (window.innerWidth - 375) / 2; }
  //                     //判断控件是否时固定定位的
  //                     if(layout.position == 'fixed'){ y = initY - s_top,s_top = 0; }
  //                     //判断鼠标是不是在控件范围内并且控件
  //                     if(x >= left && x <= right && y >= top + s_top && y <= bottom + s_top && (node == null || node.layout.x <= left && node.layout.height >= height))
  //                     {   
  //                         const hidden = element.dataset.mask;
  //                         //存储符合条件的控件数据。循环查找过程中，如果出现两个及两个以上符合条件的控件，则按其在父级中的位置，决定存储谁的数据
  //                         node = {
  //                             layout:{x:left,y:top + stop,width,height},index:i,
  //                             combinationType,feature,id,type,skin,dragable,
  //                             selectable,removable,copable,hidden
  //                         };
  //                         //控件是容器且不是隐藏的，则向其内部继续执行查找
  //                         if(hidden != 1){ childs = component.components; }
  //                     }
  //                 }
  //             }
  //             //判断是否已经循环到了最后或当前循环的控件id等于传入的控件id
  //             if(i == len - 1 || id == cid)
  //             {   //赋值false，表示已经循环完毕根级下的直系父级
  //                 isroot = false;
  //                 //是否存在当前控件
  //                 if(node)
  //                 {   //存在父级控件对父级进行赋值
  //                     if(parent){ current.parent = parent,parent = null; }
  //                     //如果当前控件是可以选中的，则对当前控件赋值
  //                     if(node.selectable != false){ current.current = node; }
  //                 }
  //                 //当前循环的控件id等于传入的控件id,跳出循环不在查找
  //                 if(id == cid){ break }
  //                 //控件时容器并且内部有子控件，继续往里边查找
  //                 if(childs && childs.length)
  //                 {   //存储父级
  //                     parent = {layout:node.layout,id:node.id,skin,selectable,type:node.type,combinationType:node.combinationType,parent:current.parent};
  //                     //要进行查找的控件时当前控件的子控件，清空当前控件
  //                     if(components[node.index].components == childs){ node = null; }
  //                     //初始化值，重新循环
  //                     i = 0,len = childs.length,components = childs,childs = null; 
  //                     continue;
  //                 }
  //             } 
  //             i++;
  //         }
  //         //判断是否存在当前控件，存在返回当前控件，不存在返回null
  //         if(current && current.current)
  //         {   //当前控件与父级控件相同，则对父级重新赋值
  //             if(current.current.id == current.parent.id){ current.parent = current.parent.parent; }
  //             positions.virtual= false; console.timeEnd();
  //             //返回控件数据
  //             return current;
  //         }
  //     }
  //     //没有数据返回空
  //     return null;
  // }

  /**
   * @method findComponent 根据坐标值或id查找控件
   * @date 2020-02-06
   
   * @param {number} initX x轴坐标 
   * @param {number} initY y轴坐标
   * @param {number} stop 滚动条滚动的阈值
   * @param {string} cid 要查找的控件id
   * @param {node} 查找到的控件数据
   */


  findComponent(initX, initY, stop, cid) {
    this.findPropertyBtn(); //获取总数据

    const data = Dispatcher.dispatch("getIframeData"); //判断data中是否存有数据

    if (data) {
      //判断当前是否是移动端浏览
      if (window.public.type == 'mo') {
        initX = initX - (window.innerWidth - 375) / 2;
      }

      let {
        component: {
          documentType,
          children: components
        }
      } = data,
          isroot = true,
          componentData = {
        components,
        i: 0,
        len: components.length,
        current: null,
        componentsList: []
      },
          parents = [{
        id: documentType
      }]; //循环

      while (componentData.i < componentData.len) {
        componentData.component = componentData.components[componentData.i]; //类型如果是em-Content，则把数据变成当前页面的数据

        if (componentData.component.componentType == "em-Content") {
          const page = Dispatcher.dispatch("getPageData", {
            value: componentData.component.pageId
          });
          componentData.component = page.component;
        }

        const {
          id,
          componentType: type
        } = componentData.component; //如果指定指向查找并且当前容器类型未包含在指定查找属性中，跳出循环 只查找根级下的直系父级

        (isroot == false || _classPrivateFieldGet(this, _lookup) == '' || _classPrivateFieldGet(this, _lookup).indexOf(type.split('-')[1]) != -1) && this.lookForCurrent(initX, initY, stop, cid, componentData); //是否已循环到最后一个或是传入的id与当前循环的id相同

        if (componentData.i == componentData.len - 1 || id == cid) {
          //赋值false，表示已经循环完毕根级下的直系父级
          isroot = false; //数组内是否还有父级数据，有存储父级数据，无根据当前控件查找父级数据

          if (componentData.componentsList.length && id != cid) {
            this.saveParent(componentData, parents);
            continue;
          } else {
            this.lookForParent(componentData.current, parents);
            break;
          }
        }

        componentData.i++;
      }

      Positions.virtual = false;
      return componentData.current ? {
        parent: componentData.current.parent,
        current: componentData.current
      } : null;
    } //没有数据返回空


    return null;
  }
  /**
   * @method lookForParent 查找父级
   * @date 2020-02-06
   
   * @param {object} current 当前控件数据 
   * @param {array} parents 存储父级的数组 
   */


  lookForParent(current, parents) {
    const element = current && window.public.dom.querySelector(`#${current.id}`); //循环数组

    parents.forEach(e => {
      const parent = window.public.dom.querySelector(`#${e.id}`); //当前控件数据存在且id不同且当前节点是父级的子集

      if (current && e.id != current.id && parent.contains(element)) {
        //存在父级属性，执行赋值
        if (current.parent) e.parent = current.parent;
        current.parent = e;
      }
    });
  }
  /**
   * @method lookForCurrent 查找当前控件
   * @date 2020-02-06
   
   * @param {number} x x轴坐标 
   * @param {number} y y轴坐标
   * @param {number} stop 滚动挑滚动的阈值 
   * @param {string} id  要查找的控件id
   * @param {object} componentData 存放共享数据
   */


  lookForCurrent(x, y, stop, id, componentData) {
    const component = componentData.component,
          element = window.public.dom.querySelector(`#${componentData.component.id}`);

    if (element) {
      const {
        left,
        right,
        top,
        bottom,
        width,
        height
      } = element.getBoundingClientRect(),
            hidden = element.dataset.mask; //过滤不在屏幕内的控件

      if (!(bottom <= 0 || top >= window.public.win.innerHeight)) {
        var _component$layout;

        const layout = {
          x: left,
          y: top + stop,
          width,
          height
        }; //判断控件是否时固定定位的

        if (((_component$layout = component.layout) !== null && _component$layout !== void 0 ? _component$layout : {}).position == 'fixed') {
          y = y - stop, stop = 0;
        } //过滤不在当前鼠标指针范围内的控件


        if (id == component.id || x >= left && x <= right && y >= top + stop && y <= bottom + stop) {
          const parentNode = componentData.current && element.ownerDocument.querySelector(`#${componentData.current.id}`); //

          if (!(parentNode && parentNode.contains(element) != true && parentNode.dataset.position == 'highest') && component.selectable != false) {
            componentData.current = { ...component,
              layout,
              hidden,
              dragable: component.isDragable,
              feature: component.type,
              type: component.componentType
            };
          }
        }

        component.components && component.components.length && hidden != 1 && componentData.componentsList.push({
          component,
          layout
        });
      }
    }
  }
  /**
   * @method saveParent 存储父级数据
   * @date 2020-02-06
   
   * @param {object} componentData 存放共享数据
   * @param {array} parents 存储父级数据的数组 
   */


  saveParent(componentData, parents) {
    const {
      componentsList: [{
        layout,
        component
      }]
    } = componentData,
          {
      id,
      skin,
      selectable,
      componentType,
      type,
      combinationType
    } = component; //去重

    id != parents[parents.length - 1].id && parents.push({
      layout,
      id,
      skin,
      selectable,
      feature: type,
      type: componentType,
      combinationType
    });
    componentData.components = component.components;
    componentData.len = componentData.components.length;
    componentData.i = 0; //删除首个元素

    componentData.componentsList.shift();
  }

  findPropertyBtn() {
    if (Array.isArray(this.state.hover)) {
      const node = this.state.hover.find(btn => Positions.findBox(this._initX, this._initY, btn.absolute, btn.id, btn.current.type));

      if (typeof node != 'undefined') {
        this.findBtn = true;
        Positions.virtual = false;
        return this.getNewNode(node);
      }
    }

    this.findBtn = false;
  }
  /**
   * @method hoverState 获取hover的状态数据
   * @date 2019-10-12
   
   * @param {object} state 控件数据 
   * @return {object} 拼接完成后的hover状态数据
   */


  hoverState(state, scrollTop) {
    //是否存在状态对象并且存在布局数据
    if (state && state.layout) {
      const {
        type,
        layout,
        absolute,
        id
      } = state,
            hover = {
        name: window.public.getName(type)
      }; //判断是否存在布局数据

      if (layout) {
        const {
          x,
          y,
          width,
          height
        } = layout;
        hover.layout = {
          left: x,
          top: y,
          width,
          height
        };
        hover.absolute = absolute;
        hover.id = id;
        hover.current = state;
        hover.parent = state.parent;
      }

      return hover;
    }

    return null;
  }
  /**
   * @method hover 
   * @date 2019-10-12
   
   * @param {event} event 事件对象 
   */


  hover(event) {
    const top = document.querySelector("#ediMain").offsetTop,
          stop = event.currentTarget.parentNode.scrollTop;
    const initX = event.pageX;
    const initY = event.pageY - top + stop;
    this._initX = initX - (document.body.clientWidth - document.querySelector('#ediMain').getBoundingClientRect().width) / 2;
    this._initY = initY;
    this.virtualNode = Positions.findVirtual(this._initX, this._initY); //找到虚拟区域，保留当前位置导航按钮

    if (this.virtualNode !== false && this.state.hover) {
      this.node = this.virtualNode;
      return;
    } //查找指定坐标范围内的控件  


    this.node = this.findComponent(initX, initY, stop); //是否查找到了控件

    if (this.node) {
      const {
        node: {
          current
        }
      } = this;
      const configList = []; //判断当前查找到的控件是否是已经选中的控件，不是则if，是则else

      if (!(this.selected && this.selected.isNode(current))) {
        const nodes = Positions.getParentNodes(this.node, this._initX);
        if (nodes === false) return;
        nodes.forEach((node, i) => {
          const cur = this.hoverState(node, stop);

          if (cur != null) {
            configList.push(cur);
          }
        }); //更新视图

        this.setState({
          hidden: false,
          hover: configList
        });
      } else //如果鼠标在当前选中控件内，则不出现滑入框并且清空this.node
        {
          this.node = null, this.setState({
            hover: null
          });
        }
    }
  }
  /**
   * @description: 鼠标经过按钮点击事件
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2020-03-09 17:25:41
   */


  hoverDown(type, e) {
    this.mousedown(e, null, null, id => {
      setTimeout(() => {
        document.getElementById(id + '-' + type).click();
      }, 200);
    });
    e.stopPropagation();
  }
  /**
  * @method isShow 根据条件判断是否显示属性按钮
  * @date 2020-03-19
  
  * @param {object} node 节点对象
  * @param {string} show 显示条件
  * @return {boolean} 一个布尔值，用来表示是显示还是隐藏
  */


  isShow(node, show) {
    let [condition, num] = show.split(' ');
    let parent = node.parent,
        i = 1,
        isshow = true,
        unshow = false; //条件内是否存在叹号。存在叹号则进行取反操作

    if (condition.charAt(0) == "!") {
      //取反赋值
      isshow = false, unshow = true; //消除叹号重新赋值

      condition = condition.substring(1);
    } //循环查找父级


    while (parent) {
      //条件符合，返回true，显示示属性按钮
      if ((parent.type || '').indexOf(condition) != -1) {
        return isshow;
      } //总循环次数不等于undefined，当前循环次数等于总循环次数，跳出循环


      if (num != undefined && i == num) {
        return unshow;
      } //赋值


      parent = parent.parent, i = i + 1;
    }

    return unshow;
  }
  /**
   * @method mousedown 鼠标按下选中控件
   * @date 2019-10-12
   
   * @param {event} event 事件对象
   * @param {number} [x] x轴坐标
   * @param {number} [y] y轴坐标
   * @param {string} [id] 控件id
   * @param {function} [fn] 控件选中后触发事件
   * @return {object} 当前选中控件的数据
   */


  mousedown(event, x, y, id, fn) {
    const closes = document.querySelectorAll('.layer-close,#panel-close'); //获取导航项管理的父级id 以及关闭的类 author lw date 2021-1-27

    let el = document.querySelector('#page-management .layer-close');
    closes.length && [...closes].forEach(e => {
      if (window.public.type == 'mo' && el == e) {//如果是mo的时候且导航项管理存在且数组内存在则不关闭
      } else {
        e.click();
      }
    });

    try {
      //判断鼠标按下的是否是左键
      if (event.button == 0) {
        this.selected = event.ctrlKey ? MoreComponentEdit : SingleComponentEditTest;
        this.selected.controler = this; //如果id类型为function，把id值赋给变量fn，id赋为空

        if (typeof id == 'function') {
          fn = id, id = null;
        }

        return this.selected.mousedown(event, x, y, id, fn);
      }

      return null;
    } catch (error) {
      console.error(error.message);
    }
  }

}

var _lookup = new WeakMap();

export default ComponentEditControler;

//# sourceURL=webpack:///./system/function/component_edit/component_edit_test_controler.js?