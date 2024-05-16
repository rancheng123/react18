// 导入 React 库
import React from 'react';
// 导入 ReactDOM 库
import ReactDOM from 'react-dom/client';
// 导入自定义的 layer 模块
import Layer from '@/system/widgets/layer';
import PublicAttrManager from './public_attr_manager.js';
import PublicAttribute from './public_attribute';


/**
 * @instance {Attribute} 控件属性实例
 */
const Attribute = {
  /**@property width 属性面板宽度 */
  width: 435,

  /**@property height 属性面板高度 */
  height: 517,

  /**@proeprty node 控件结构数据 */
  node: null,

  /**@property showState 面板显示状态 open and close */
  showState: 'close',

  /**@property publicAttr 公用属性模块 */
  publicAttr: PublicAttribute,

  /**@property iconList 属性按钮预设图标集合 */
  iconList: {
    attribute: "",
    design: "",
    setting: "",
    animate: ""
  },

  /**
 * @method getParentType 获取是否包含控件父级
 * @author sxt
 * @date 2020-2-28
 * @param {Object} node 控件父级数据
 * @param {event} type 查找的控件类型
 * @return {Object} 返回当前项的数据
 */
  getParentType(node, type) {
    let find = true,
      current = "";

    while (find) {
      if (node.parent) {
        if (node.parent.type == type) {
          current = node.parent;
          find = false;
        } else {
          node = node.parent;
        }
      } else {
        find = false;
      }
    }

    return current;
  },

  /**
   * @method showAttributePanel 点击属性按钮触发方法
   * @param {object} opts 参数对象
   * @param {object} opts.node 控件结构数据对象 
   * @param {boolean} opts.reload 是否重新加载面板 true 重新加载 false 不重新加载。注：此属性仅在面板已经处于开启状态时有效
   */
  showAttributePanel(opts) {

    var _ref, _tabs, _config$window$public;

    this.node = opts.node;
    let {
      draggable = {}
    } = opts; //解构赋值

    let {
      config,
      width,
      height,
      node: {
        current: {
          skin = ""
        }
      }
    } = this;
    let tabs = (_ref = (_tabs = ((_config$window$public = config[window.public.type]) !== null && _config$window$public !== void 0 ? _config$window$public : config).tabs) !== null && _tabs !== void 0 ? _tabs : config.tabs) !== null && _ref !== void 0 ? _ref : []; //属性项不是数组，进一步处理

    if (!Array.isArray(tabs)) {
      var _ref2, _tabs$key;

      const key = skin.slice(0, skin.lastIndexOf('.'));
      tabs = (_ref2 = (_tabs$key = tabs[key]) !== null && _tabs$key !== void 0 ? _tabs$key : tabs.all) !== null && _ref2 !== void 0 ? _ref2 : tabs;
    }


    //index 不存在则通过opts.type查找。 opts.type 也不存在，默认为零
    if (opts.index == undefined) {
      opts.index = opts.type ? tabs.findIndex(e => e.type == opts.type) : 0;
    }

    //查找tabs数组中是否包含type类型
    if (opts.index != -1) {
      const element = document.querySelector(`#${opts.id}`),
        cid = this.node.current.id;
      //父级元素内为插入面板结构或reload为true或要展示的控件id与当前展示面板的控件id不同，则重新载入面板结构
      if (element.children.length == 0 || opts.reload || cid != Attribute.currentId) {
        //如果面板为打开状态且reload不为true，则不在加载面板，通过模拟点击来选中对应项
        // if(this.showState == 'open' && opts.reload != true)
        // {
        //     return element.querySelector(`.layer-tabs li:nth-child(${opts.index + 1})`).click();  
        // }
        const ul = document.querySelector('#property-buttons ul');
        const id = `pro-con-${new Date().getTime()}`; //计算弹出位置,如果不是reload或者layout为undefined计算位置

        if (opts.reload != true || this.layout == undefined) {
          var _opts$layout;

          this.layout = (_opts$layout = opts.layout) !== null && _opts$layout !== void 0 ? _opts$layout : this.showPanelPosition(ul, width, height);
        } //存储控件id。直接使用对象名来访问属性，是为了保证子对象之间可以共享此属性


        Attribute.currentId = cid; //设置面板显示状态为 'open'

        this.showState = 'open'; //如果此接口被实现，则进行调用

        if (this.editTabs) tabs = this.editTabs(tabs.map(e => ({
          ...e
        })));


        // 推入自定义css模块
        let result = tabs.findIndex(item => item.type == "customcss");
        if (result == -1) {
          let parentData = this.getParentType(this.node, "em-List");

          if (!parentData) {
            tabs.push({
              "name": "customcss",
              "type": "customcss"
            });
          }
        }

        if (tabs.length == 7) {
          width = width + 60;
        }

        const modalDom = ReactDOM.createRoot(element)
        // modalDom.render(React.createElement(Layer.tab, {
        //   id: id,
        //   draggable: draggable.draggable === false ? false : true,
        //   tabs: tabs,
        //   tab: tabs[opts.index].type,
        //   change: this.showTab.bind(this, id),
        //   area: [width + "px", height + "px"] // offset = {[x + 'px',y + 'px']}
        //   ,
        //   offset: [this.layout.x + 'px', this.layout.y + 'px'],
        //   skin: skin.substring(0, skin.indexOf('.')) + '-panel',
        //   close: () => {
        //     this.showState = 'close';
        //     this.closeAttributePanel();
        //     opts.close && opts.close();
        //     modalDom.unmount();
        //   }
        // }))

        // 渲染结构
        modalDom.render(
          <Layer.tab
            id={id}
            draggable={draggable.draggable === false ? false : true}
            tabs={tabs}
            tab={tabs[opts.index].type}
            change={this.showTab.bind(this, id)}
            area={[`${width}px`, `${height}px`]}
            offset={[`${this.layout.x}px`, `${this.layout.y}px`]}
            skin={`${skin.substring(0, skin.indexOf('.'))}-panel`}
            close={() => {
              this.showState = 'close';
              this.closeAttributePanel();
              opts.close && opts.close();
              modalDom.unmount();
            }}
          />
        )

        // ReactDOM.render(React.createElement(Layer.tab, {
        //   id: id,
        //   draggable: draggable.draggable === false ? false : true,
        //   tabs: tabs,
        //   tab: tabs[opts.index].type,
        //   change: this.showTab.bind(this, id),
        //   area: [width + "px", height + "px"] // offset = {[x + 'px',y + 'px']}
        //   ,
        //   offset: [this.layout.x + 'px', this.layout.y + 'px'],
        //   skin: skin.substring(0, skin.indexOf('.')) + '-panel',
        //   close: () => {
        //     this.showState = 'close';
        //     this.closeAttributePanel();
        //     opts.close && opts.close();
        //   }
        // }), element);
      } else {
        element.querySelector(`.layer-tabs li:nth-child(${opts.index + 1})`).click();
      }
    } else {
      this.showTab(undefined, opts.type);
    }
  },

  /**
   * @virtual closeAttributePanel 关闭面板时触发
   */
  closeAttributePanel() { },

  /**
   * @method showTab 选中指定项，显示对应内容
   * @param {string} type 选项类型 
   */
  showTab(id, type) {
    var _this$config$window$p, _type, _conf$group;

    const skin = this.node.current.skin || '';
    const key = skin.slice(0, skin.lastIndexOf('.'));
    const conf = (_this$config$window$p = this.config[window.public.type]) !== null && _this$config$window$p !== void 0 ? _this$config$window$p : this.config;
    const group = (_type = ((_conf$group = conf.group) !== null && _conf$group !== void 0 ? _conf$group : {})[type]) !== null && _type !== void 0 ? _type : this.config.group[type];


    //参数赋值
    let param = {
      node: this.node,
      config: this.config,
      publicAttr: Attribute.publicAttr
    };
    param.list = group ? group[key] || group.all || group : null; //如果此接口被实现并且存在属性配置，则进行调用

    if (this.editGroup && param.list) {
      const list = JSON.parse(JSON.stringify(param.list));
      param.list = this.editGroup(list);
    }

    if (id) {
      param.element = document.querySelector(`#${id}`);
      param.root = ReactDOM.createRoot(document.querySelector(`#${id}`))
    }

    this[type](param);
  },

  /**
   * @method showPanelPosition 显示面板位置
   * @param {object} element 参照元素节点对象
   * @param {number} width 面板宽度
   * @param {number} height 面板高度
   */
  showPanelPosition(element, width, height) {
    const ul = document.querySelector('#ediToolbtn ul'); //获取右侧工具按钮宽度

    const twidth = ul ? ul.offsetWidth : 0;
    const layout = element.getBoundingClientRect();
    const {
      innerWidth,
      innerHeight
    } = window;
    const {
      x,
      y,
      width: pwidth
    } = layout;
    let position = {
      x: x + pwidth + 15,
      y
    }; //判断右侧是否能完全展示面板，不能展示，在左侧展示

    if (innerWidth - position.x < width + twidth) {
      position.x = x - width - 15;
    } //判断以参照元素作为y轴，能否显示全面板


    if (innerHeight - y <= height) {
      //判断屏幕高度是否小于面板高度，小于的话优先保证头部部分显示出来
      if (innerHeight < height) {
        const main = document.querySelector('#ediMain');
        position.y = main.offsetTop;
      } else {
        position.y = innerHeight - height;
      }
    }

    return position;
  },

  /**
   * @method selectBox 显示选中框
   * @param {object} opts 参数对象
   */
  async selectBox(opts) {
    const SelectBox = await PublicAttrManager.selectBox();
    SelectBox && SelectBox.selectBox(opts);
  },

  /**
   * @method basic 基本选项属性
   * @param {object} opts 参数对象 
   */
  async basic(opts) {
    const {
      node: {
        current: {
          type
        }
      }
    } = this;
    const basic = await PublicAttrManager.basic(type);
    basic && basic.basic(opts);
  },

  /**
   * @method design 设计选项属性
   * @param {object} opts 参数对象 
   */
  async design(opts) {
    const design = await PublicAttrManager.design();
    design.design(opts);
  },

  /**
   * @method setup 设置选项属性
   * @param {object} opts 参数对象 
   */
  async setting(opts) {
    const setting = await PublicAttrManager.setting();
    setting.setting(opts);
  },

  /**
   * @method setup 设置动画选项属性
   * @param {object} opts 参数对象 
   */
  async animation(opts) {
    const animation = await PublicAttrManager.animation();
    animation.animation(opts);
  },

  /**
   * @method custom 自定义选项属性
   * @param {object} opts 参数对象 
   */
  async custom(opts) {
    const custom = await PublicAttrManager.custom();
    custom.custom(opts);
  },


  /**
   * @method custom 自定义选项属性
   * @param {object} opts 参数对象 
   */
  async customcss(opts) {
    const customcss = await PublicAttrManager.customcss();
    customcss.customcss(opts);
  },


  /**
  * @method collection 收藏选项属性
  * @param {object} opts 参数对象 
  */
  async collection(opts) {
    const collection = await PublicAttrManager.collection();
    collection.collection(opts);
  },

  /**
   * @method manage 项管里选项属性
   * @param {object} opts 参数对象 
   */
  async manage(opts) {
    const {
      node: {
        current: {
          type
        }
      }
    } = this;
    const manage = await PublicAttrManager.manage(type);
    manage.manage(opts);
  },

  /**
   * @method hiding 隐藏控件属性
   * @param {object} opts 参数对象 
   */
  async hiding(opts) {
    const hiding = await PublicAttrManager.hiding();
    hiding.hiding(opts);
  },

  /***
   * @method quote 应用属性
   * @param {object} opts 参数对象
   */
  async quote(opts) {
    const quote = await PublicAttrManager.quote();
    quote.quote(opts);
  },

  /***
   * @method link 链接属性
   * @param {object} opts 参数对象
   */
  async link(opts) {
    // const link =  await PublicAttrManager.link();
    // link.link(opts)

    // 渲染函数式组件
    const Link = await PublicAttrManager.link();
    opts.root.render(<Link {...opts} />)
  }

};

export default Attribute
