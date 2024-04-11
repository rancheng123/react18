
import React from "react"; // 导入 React 模块
import ReactDOM from "react-dom"; // 导入 ReactDOM 模块
import Dispatcher from "@/system/tools/dispatcher"; // 导入 dispatcher 模块
import componentsManager  from "@/components/components_manager"; // 导入 componentsManager 
import Attribute from "../attribute"; // 导入 attrProxy 变量
import Layer from "@/system/widgets/layer"; // 导入 layer 变量
import BackgroundControler from "../design/background/background_controler"; 

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


let initIndex = 0,
    index = 0;
/**
 * @class {ComponentManageControler} 容器项管理控制器类
 * @author wyq
 * @version 1.0
 * @date 2019-11-19
 */

export default class ComponentManageControler extends React.Component {
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
    /*新增项是否为复制上一个，true时为复制上一个 */

    this.addCopy = false;
  }
  /**
   * @static manage 容器项管理载入
   * @author wyq
   * @date 2019-09-30
   * @param {object} opts 参数列表
   * @param {object} opts.element 节点对象
   */


  static manage(opts) {
    const {
      node,
      element
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      const ManageControler = this;
      ReactDOM.render(React.createElement(ManageControler, _extends({}, opts, {
        id: node.current.id
      })), element);
    }
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-11-20
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    return React.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @date 2019-11-23
   * @author wyq
   */


  init() {
    var _this$items$current;

    const fnName = `${this.props.id}_get`;
    let {
      component: {
        components,
        skin
      },
      data: {
        document_data: {
          current = 0
        }
      }
    } = Dispatcher.dispatch(fnName); //theme_data数据存在并且存在style数据，则与state合并

    this.items = components.map(e => {
      let {
        component: {
          id,
          skin,
          componentType
        },
        data
      } = Dispatcher.dispatch(`${e.id}_get`);
      const type = componentType.split("-")[1].toLowerCase();
      data.component = {
        id,
        skin,
        type,
        componentType
      };
      return data;
    });
    const {
      items: [{
        component: {
          type
        }
      }]
    } = this,
          group = this.props.list[type]; //截取皮肤

    skin = skin.substring(0, skin.lastIndexOf('.'));
    this.state = {
      current: (_this$items$current = this.items[current]) !== null && _this$items$current !== void 0 ? _this$items$current : this.items[0],
      list: group[skin] || group.all
    };
  }
  /**
   * @method addHandle 新增项处理逻辑
   * @date 2023-3-31
   * @author sxt
   */


  addHandle(componentData) {
    let newComponentData = JSON.parse(JSON.stringify(componentData)); //取出的原始数据要深拷贝一下，防止污染了原始数据，导致新拖入控件数据不对 sxt 2020-1-6

    this.addBefore && this.addBefore(newComponentData); //新增控件之前数据处理方法  sxt 2020-6-28 

    Dispatcher.dispatch(`${this.props.id}_addComponent`, {
      args: [newComponentData, undefined, element => {
        const key = `${element.lastChild.id}_get`;
        let {
          component: {
            id,
            skin,
            componentType
          },
          data
        } = Dispatcher.dispatch(key);
        const type = componentType.split("-")[1].toLowerCase();
        data.component = {
          id: id,
          skin: skin,
          type: type,
          componentType: componentType
        };
        this.items.push(data);
        this.setState({
          add: id
        });
        this.switchTab(data); //新增成功调用方法

        this.added && this.added();
      }]
    });
  }
  /**
   * @method add 新增项
   * @date 2019-11-23
   * @author wyq
   */


  add() {
    let _this = this;

    if (this.items.length > this.max) {
      var tipsSeparate = window.public.lang.tipsSeparate;
      var maxall = this.max + 1;
      var itemPrompt = window.public.lang.itemPrompt; //条件满足时的提示信息 lw 2021-2-22

      Layer.alert({
        area: ["420px", "225px"],
        skin: "",
        close: true,
        cancel: true,
        ensure: true,
        content: `${tipsSeparate}${maxall}${itemPrompt}`
      });
      return false;
    }

    const {
      state: {
        current: {
          component: {
            componentType,
            skin,
            id
          }
        }
      }
    } = _this;
    let {
      props: {
        node: {
          current: {
            componentType: nodeType
          }
        }
      }
    } = _this; //开启了复制新增，走复制的逻辑 sxt 2023-3-31

    if (_this.addCopy) {
      let datas = Dispatcher.dispatch('getComponentData', {
        args: [id, true]
      });

      if (nodeType == "em-Tab" || nodeType == "em-Collapsible") {
        let _index = this.items.length + 1;

        datas.data.label = `新增项${_index}`;
      }

      _this.addHandle(datas);
    } else {
      const promise = componentsManager(componentType);
      promise.then(module => {
        const promise = module.getData(window.humpJoin(skin.split('.')[1], '_'));

        if (promise) {
          promise.then(data => {
            const componentData = data.items[skin];

            if (componentData) {
              _this.addHandle(componentData);
            }
          });
        }
      });
    }
  }
  /**
   * @method remove 删除项
   * @date 2019-11-23
   * @author wyq
   * @param {object} item 要删除的项 
   * @param {event} event 事件对象
   * @returns {boolean} 删除成功返回true ，删除失败、未执行删除返回false 
   */


  remove(item, event) {
    if (this.items.length <= this.min) {
      return false;
    }

    const {
      component: {
        id
      }
    } = item,
          pid = this.props.id;
    const {
      data: {
        document_data = {}
      }
    } = Dispatcher.dispatch(`${pid}_get`);
    Dispatcher.dispatch(`${pid}_removeComponent`, {
      value: id
    });
    const index = this.items.findIndex(e => id == e.component.id);
    this.items.splice(index, 1); //当删除的是当前切换项时，把当前项索引改为零

    if (index == document_data.current) {
      Dispatcher.dispatch(`${pid}_set`, {
        args: [`document_data.current`, 0]
      });
    }

    this.state.current.component.id != id ? this.setState({
      isremove: id
    }) : this.setState({
      current: this.items[0]
    }); //删除成功调用方法

    this.removed && this.removed(); //阻止事件冒泡

    event.stopPropagation();
    return true;
  }
  /**
   * @method switchTab 切换选项
   * @param {object} item 要切换的项 
   * @param {event} event 事件对象 
   */


  switchTab(item, event) {
    //切换项与当前项不是同一项，则进行切换
    if (item.component.id != this.state.current.component.id) {
      const group = this.props.list[item.component.type];
      let {
        component: {
          skin
        }
      } = Dispatcher.dispatch(`${this.props.id}_get`); //截取皮肤

      skin = skin.substring(0, skin.lastIndexOf('.'));
      this.setState({
        current: item,
        list: group[skin] || group.all
      });
    }
  }

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
    Dispatcher.dispatch(`${itemId}_set`, {
      args: [`document_data.hidden`, hidden]
    });
  }
  /**
   * @method showPanel 显示面板
   * @date 2019-11-23
   * @author wyq
   */


  showPanel() {
    const {
      state: {
        current: {
          component: {
            id,
            skin,
            componentType
          }
        }
      }
    } = this;
    new Attribute().init(componentType).then(module => {
      module.showAttributePanel({
        index: 0,
        id: "component-modal",
        node: {
          current: {
            id: id,
            skin: skin,
            type: componentType
          }
        }
      });
    });
  }
  /**
   * @method dragStart 拖拽开始执行方法
   * @author wyq
   * @param {event} e
   */


  dragStart(id, event) {
    const index = this.items.findIndex(e => e.component.id == id); //记录拖拽控件的初始索引   

    initIndex = index;
    event.dataTransfer.setData("text", "123");
  }
  /**
   * @method dragOver 拖拽到可放置目标时处罚
   * @author wyq
   * @param {event} e 
   */


  dragOver(id, e) {
    //获取当前位置处目标的索引
    index = this.items.findIndex(e => e.component.id == id);
    const current = this.items.splice(initIndex, 1)[0]; //替换拖拽目标到当前目标位置

    this.items.splice(index, 0, current); //渲染属性面板

    this.setState({
      draggable: id
    }); //记录初始索引

    initIndex = index;
  }
  /**
   * @method dragEnd 拖拽结束执行方法
   * @author wyq
   * @param {event} e 事件对象
   */


  dragEnd(id, event) {
    const pid = this.props.id;
    const {
      component: {
        components
      }
    } = Dispatcher.dispatch(`${pid}_get`, {
      value: true
    });
    initIndex = components.findIndex(e => e.id == id);
    components.splice(index, 0, components.splice(initIndex, 1)[0]); //渲染控件结构

    Dispatcher.dispatch(`${pid}_set`, {
      args: [`component.components`, components]
    }); //切换为当前项

    this.switchTab(this.items[index], event);
  }
  /**
   * @method set 向document_data中设置数据
   * @date 2020-8-06
   * @author wyq
   * @param {string} key 键名 
   * @param {object} event 事件对象
   */


  set(key, event) {
    const id = this.state.current.component.id;
    let value = event.target.value;

    if (/true|false/.test(value)) {
      value = value == "true" ? true : false;
    }

    this.state.current.document_data[key] = value;
    this.setState({
      current: this.state.current
    });
    Dispatcher.dispatch(`${id}_set`, {
      args: [`document_data.${key}`, value]
    });
  }
  /**
   * @method BackgroundPanel 加载背景面板
   * @date 2020-11-13
   * @author wyq
   */


  BackgroundPanel() {
    const id = this.state.current.component.id;
    return React.createElement(BackgroundControler, {
      id: id,
      key: id,
      node: this.props.node,
      list: ["backgroundPanel"],
      prefix: window.public.type == 'pc' ? '' : 'mo'
    });
  }

}
