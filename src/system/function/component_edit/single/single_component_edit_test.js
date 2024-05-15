import { createRoot } from "react-dom/client";
import Dispatcher from '../../../tools/dispatcher';
import AttrProxy from '@/components/page/attr_proxy';
import Drag from '../../../tools/drag';


/**
 * @instance {SingleComponentEdit} 单个选中编辑实例
 */
const SingleComponentEdit = {
  /**@property {ComponentEditControler} controler 控件编辑控制器实例*/
  controler: null,

  /**@property {Node} node 当前鼠标指针下的控件节点对象*/
  node: null,

  /**@property {Node} parent 父级控件节点对象 */
  parent: null,

  /**@property {number} x 选中控件，鼠标点击时的x坐标 */
  x: 0,

  /**@property {number} y 选中控件，鼠标点击时的x坐标 */
  y: 0,

  /**@property {AttrProxy} proxy 当前控件属性代理 */
  proxy: null,

  /**
   * @method render 加载选中框和选中按钮
   * @param {object} config 配置对象
   */
  render({
    Buttons,
    node,
    btnId,
    boxId
  }) {

    const {
      current: {
        layout: {
          x,
          y,
          width,
          height
        },
        skin,
        hidden
      }
    } = node,
      config = this.proxy.config;

    // 生成按钮组菜单方法
    if (hidden != '1') {
      Buttons.x = this.x, Buttons.y = this.y;
      Buttons.controler = this.controler;
      Buttons.buttons(btnId, node, this.proxy, Buttons.button(config, skin));
    }


    // 生成选中框方法
    this.proxy.selectBox({
      id: boxId,
      dots: config.dots,
      node,
      layout: {
        left: x,
        top: y,
        width,
        height
      }
    });
  },

  /**
   * @method init 初始化方法
   */
  async init() {
    const Buttons = await import('./buttons_test.jsx').then(module => module.default)
    // __webpack_require__.e(/*! import() */ 1854).then(__webpack_require__.bind(null, /*! ./buttons_test */ "./system/function/component_edit/single/buttons_test.js"));
    const {
      node: {
        current: {
          type,
          feature
        }
      }
    } = this;


    //判断是不是容器只有非容器，才继续执行
    if (feature != 'Container') {
      var _this$parent;
      //查找指定的父级数据
      parent = this.findParents(); //存在父级并且父级id不同，执行父级选中

      if (parent && ((_this$parent = this.parent) !== null && _this$parent !== void 0 ? _this$parent : {}).id != parent.current.id) {
        var _this$proxy$config;

        this.parent = parent;

        //获取代理对象
        this.proxy = await new AttrProxy().init(this.parent.current.type);


        //删除操作点配置
        delete ((_this$proxy$config = this.proxy.config) !== null && _this$proxy$config !== void 0 ? _this$proxy$config : {}).dots; //执行选中

        this.select({
          node: parent,
          Buttons,
          boxId: 'select-parent-box',
          btnId: 'property-parent-buttons'
        });
      }
    } //取消选中
    else {
      this.unselect('select-parent-box', 'property-parent-buttons');
    }

    this.proxy = await new AttrProxy().init(type);

    await this.select({
      node: this.node,
      Buttons,
      boxId: 'select-box',
      btnId: 'property-buttons'
    });

    //清除hover
    this.controler.setState({
      hover: null
    });
  },

  /**
   * @method findParents 查找符合条件的父级控件
   * @return {object} 符合条件的父级控件
   */
  findParents() {
    let superior = this.node.parent,
      def_superior = null; //循环父级

    while (superior) {
      const {
        id,
        combinationType,
        selectable,
        type
      } = superior; //是否存在标识或者为头部、底部、内容

      if (combinationType != undefined || /Header|Footer/.test(type)) break; //是否已循环到了根级

      if (id == 'document') {
        superior = def_superior;
        break;
      } //父级可以选中且变量值为null，执行赋值操作


      if (selectable != false && def_superior == null) def_superior = superior;
      superior = superior.parent;
    }

    return superior ? {
      current: superior,
      parent: superior.parent
    } : null;
  },

  /**
   * @method select 选中方法
   * @param {object} param0 参数对象
   * @param {object} param0.Buttons 属性按钮对象
   * @param {object} param0.node 控件数据对象
   * @param {object} param0.boxId 容器id
   * @param {object} param0.btnId 按钮id 
   */
  select({
    Buttons,
    node,
    boxId,
    btnId
  }) {

    //判断是否存在配置对象
    if (this.proxy.config) {
      //选中控件之前调用
      this.proxy.selectBefore(node, this.proxy.config); //{node,config,proxy,boxId,btnId}

      this.render({
        Buttons,
        node,
        boxId,
        btnId
      });

      //控件选中之后调用
      this.proxy.selected(node);
    }
  },

  /**
   * @method unselect 取消选中
   * @param {string} boxid 容器id
   * @param {string} btnid 按钮容器id
   */
  unselect(boxid, btnid) {
    const box = document.querySelector(`#${boxid}`),
      btn = document.querySelector(`#${btnid}`);
    // box.children.length && ReactDom.unmountComponentAtNode(box);
    // btn && btn.children.length && ReactDom.unmountComponentAtNode(btn);

    const boxRoot = createRoot(box)
    const btnRoot = createRoot(btn)
    box.children.length && boxRoot.unmount();
    btn && btn.children.length && btnRoot.unmount();
  },

  /**
   * @method componentWillUnmount 选中框、属性按钮卸载时执行
   */
  componentWillUnmount() {
    this.controler = this.node = null;
  },

  /**
   * @method isRangeNode 鼠标指针是否在当前控件节点范围内
   * @param {object} current 当前鼠标滑过的控件
   * @return {boolean} 范围内返回true，范围外返回false
   */
  isNode(current) {
    //判断是否存在当前选中控件
    if (this.node && this.node.current) {
      const {
        node: {
          current: {
            id
          }
        }
      } = this; //判断id是否相等

      if (id == current.id) {
        return true;
      }
    }

    return false;
  },

  /**
   * @method mousedown 鼠标按下选中控件方法
   * @param {object} event 事件对象
   * @param {number} x x轴坐标
   * @param {number} y y轴坐标
   * @param {string} id 控件id
   * @param {function} [fn] 控件选中之后执行
   * @return {object} 当前选中控件的数据。 没有返回null
   */
  mousedown(event, x, y, id, fn) {
    var _event$isdrag;
    console.log('mousedown');
    //pc端允许拖拽，mo端不允许拖拽
    let isdrag = ((_event$isdrag = event.isdrag) !== null && _event$isdrag !== void 0 ? _event$isdrag : window.public.type == 'pc') ? true : false;
    this.proxy && this.proxy.selectBlur(this.node); //判断是否存在滑入控件信息，把鼠标滑过的节点赋给选中的this.node属性

    if (this.controler.node) {
      this.node = this.controler.node;
    } //存在坐标的话，则根据坐标查找控件且。x为string表示通过id进行查找，


    if (typeof x == 'number' && typeof y == 'number' || typeof x == 'string') {
      const stop = document.querySelector(".property-modal").scrollTop; //存在坐标参数，表示方法不是事件触发，不允许执行拖拽方法。 调用查找方法，查找控件

      isdrag = false, this.node = this.controler.findComponent(x, y + stop, stop, id);
    } //判断是否存在控件


    if (this.node) {
      const {
        current: {
          dragable,
          id
        }
      } = this.node,
        {
          pageX: x,
          pageY: y
        } = event;

      //如果是pc端直接赋x坐标，移动端需要减去移动端的左边距离屏幕边距的距离
      this.x = window.public.type == 'pc' ? x : x - (window.innerWidth - 375) / 2, this.y = y;


      //初始化选中框。 如果控件允许拖拽且isdrag属性为true，则执行拖拽开始方法
      this.init().then(() => (fn && fn(id), isdrag && !dragable && this.start(x, y)));

      //返回控件
      return this.node;
    }
    //阻止默认事件

    event.preventDefault();
    return null;
  },

  /**
   * @method start 拖拽开始
   * @param {number} x x轴坐标
   * @param {number} y y轴坐标
   */
  start(x, y) {
    const main = document.querySelector('#ediMain'),
      left = main.offsetLeft,
      boundaryX = left + main.querySelector('#iframe').offsetWidth;
    let opts = {
      isdrag: false,
      initX: x,
      initY: y,
      left,
      top: main.offsetTop,
      boundaryX,
      isremove: false
    }; //禁止hover查找控件

    this.controler.setState({
      ismove: false
    });
    main.onmousemove = this.drag.bind(this, opts);
    main.onmouseup = this.end.bind(this, opts);
  },

  /**
   * @method insertMask 遮罩层的插入与删除
   * @param {string} id 控件id
   * @param {string} action 执行行为 默认为新增，值为remove 执行删除
   */
  mask(id, action) {
    const select = document.querySelector('#selected-mask>div');
    const component = window.public.dom.querySelector(`#${id}`); //控件内部不存在遮罩层的话，在向其内部追加遮罩层

    if (component.lastChild.id != 'component-mask') {
      const div = document.createElement("div"); //存在选中框节点，隐藏选中框、属性按钮、右键菜单

      if (select) {
        select.style.display = 'none';
      }

      component.style.position = 'relative';
      div.id = 'component-mask';
      div.style.cssText = 'background:rgba(0,0,0,0.3);border:2px dashed #2196f3;' + 'position:absolute;top:0;left:0;right:0;bottom:0;';
      component.appendChild(div);
    } //行为为remove的话，执行删除
    else if (action == 'remove') {
      component.style.position = ''; //选中框存在，展示选中框

      if (select) {
        select.style.display = '';
      }

      component.lastChild.remove();
    }
  },

  /**
   * @method drag 拖拽进行中
   * @param {object} opts 参数对象 
   * @param {event} event 事件对象
   */
  drag(opts, event) {
    const {
      pageX: x,
      pageY: y
    } = event,
      left = Math.abs(x - opts.initX); //当拖拽距离大于20时判定为拖拽。

    if ((left > 15 || Math.abs(y - opts.initY) > 15) && x < opts.boundaryX) {
      opts.isdrag = true;

      if (opts.ismask == undefined && this.node) {
        const {
          current: {
            id
          }
        } = this.node; //追加遮罩层

        this.mask(id), opts.ismask = true; //获取控件数据

        opts.component = Dispatcher.dispatch(`getComponentData`, {
          value: id
        }); //禁止循环控件本身

        Dispatcher.dispatch(`${id}_set`, {
          args: ['component.eachable', false, true]
        });
      } //如果在没有按下鼠标左键的情况下触发拖拽，则调用拖拽结束事件


      if (event.buttons == 0) {
        this.end(opts, event);
        return;
      }

      let _type = opts.component.component.combinationType || opts.component.component.componentType; //先获取combinationType的属性，此属性存在证明是组件库中的控件，是不允许嵌套的，sxt 2021-2-2


      Drag.drag(x - opts.left, y - opts.top, {
        type: _type,
        added: () => opts.isremove = true
      });
    } //阻止默认事件


    event.preventDefault();
  },

  /**
   * @method end 拖拽结束
   * @param {object} opts 参数对象 
   * @param {event} event 事件对象 
   */
  end(opts, event) {
    const {
      currentTarget: target
    } = event;
    target.onmousemove = target.onmouseup = null; //允许查找控件事件运行和显示选中框和属性按钮

    this.controler && this.controler.setState({
      ismove: true
    }); //判断是否在拖拽控件

    if (opts.isdrag && this.node) {
      const {
        current: {
          id
        },
        parent: {
          id: pid
        }
      } = this.node; //删除遮罩层和标识符

      this.mask(id, 'remove'); //判断数据是否存在并且控件是否可以删除

      if (opts.component && opts.isremove) {
        Dispatcher.dispatch(`${pid}_removeComponent`, {
          args: [id, () => {
            opts.isremove = false; // false 是 unadd， true 是 isSwitch 第三个true表示新增控件时不使用新id
            Drag.end(event, opts.component, false, true, true);
          }, false, // 表示要渲染ui，为true则不渲染ui
            true // 是位置更换的删除组件种类
          ]
        });
      } else //取消禁止循环控件本身
      {
        Dispatcher.dispatch(`${id}_set`, {
          args: ['component.eachable', true, true]
        });
      }
    }
  }

};

export default SingleComponentEdit;
