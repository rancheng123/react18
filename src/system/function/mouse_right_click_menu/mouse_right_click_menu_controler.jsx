import React from 'react';
import Dispatcher from '../../tools/dispatcher';
// import MouseRightClickMenu from './mouse_right_click_menu';
// import { ModuleGraph } from 'vite';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 //用来存储复制后的内容 author   lw data 2021-1-5  因为触发剪切方法时，组建销毁会初始化this.stete，所以要定义一个全局变量用来存贮复制后的值。 

var copyObj = null;
export default class MouseRightClickMenuControler extends React.Component {
  constructor(props) {
    super(props); //鼠标右键展示面板一级数据内容

    _defineProperty(this, "handleContextMenu", e => {
      let _this = this;

      var mask = document.querySelector('#selected-mask');
      let objText = document.getElementById("cke_editor"); //判断文本富文本结构是否存在 lw 2021-2-6

      if (objText) {
        return false;
      }

      if (mask) {
        e.preventDefault();
        e.stopPropagation();

        _this.setState({
          'style': _this.calculationPosition(e)
        }); // 判断控件是否已经被选中


        var x = e.pageX;
        var y = e.pageY - 68;

        _this.setState({
          'xyPosition': {
            xaxis: x,
            yaxis: y
          }
        });

        if (_this.props.node) {
          x = null;
          y = null;
        }

        Dispatcher.dispatch(`selectedComponent`, {
          args: [{
            button: 0,
            isdrag: false
          }, x, y, function () {
            let arr = [];
            let obj = _this.props.node ? _this.props.node : null; //如果存在系统右键不打开

            if (obj != null && obj.parent.type) {
              while (obj.parent) {
                if (obj.parent.type) {
                  if (obj.parent.selectable != false) {
                    arr.push({
                      id: obj.parent.id,
                      type: obj.parent.type,
                      name: Dispatcher.dispatch(`${obj.parent.id}_get`).data.document_data.componentName
                    });
                  }
                }

                obj = obj.parent;
              }
            }

            _this.setState({
              'data': arr
            });
          }]
        }); //鼠标右键面板出现后点击左键或者右键都让面板隐藏

        document.onmousedown = function (e) {
          e.stopPropagation();

          _this.setState({
            'data': []
          });
        };
      }
    });

    console.log(this)

    this.Property_panel_list = [// {"event":"copy","title":window.public.lang.copy,"name":"Ctrl+C"},
    // {"event":"paste","title":window.public.lang.paste,"name":"Ctrl+V"},
    // {"event":"shear","title":window.public.lang.shear,"name":"Ctrl+X"}, 注掉，原因为功能未完全开发完成，不能想粘贴到哪里就粘贴到哪里 lw 2021-4-22
    {
      "event": "remove",
      "title": window.public.lang.remove,
      "name": "Del"
    }, {
      "event": "",
      "title": window.public.lang.cascadeControl,
      "secondary": window.public.lang.laminatedStructure,
      "iconClass": "cascadeControl",
      "iconC": "iconfont"
    }]; //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
  }

  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   */


  init() {
    let _this = this;

    _this.state = {};
    window.Mousetrap.bind('del', () => this.remove());
    // __webpack_require__.e(/*! import() | mousetrap */ "mousetrap").then(__webpack_require__.t.bind(null, /*! mousetrap */ "./node_modules/mousetrap/mousetrap.min.js", 7)).then(module => {
      // module.bind('del', () => this.remove()); // module.bind('ctrl+c', () => this.copy());
      // module.bind('ctrl+v', () => this.paste());
      // module.bind('ctrl+x', () => this.shear()); 注掉，原因为功能未完全开发完成，不能想粘贴到哪里就粘贴到哪里 lw 2021-4-22
    // }); //author: lby date:2020-06-16

    document.oncontextmenu = function (e) {
      e.stopPropagation();
      e.preventDefault();
    }; 
    //以前的方法不适用 组件销毁后再次调用会导致面板不展示 author  lw data 2021-1-5
    // $(window).load(function() {
    //     let mask = document.querySelector('#selected-mask')
    //     if (mask) {
    //         mask.oncontextmenu = function (e) {
    //             e.preventDefault()
    //             // document.onmouseover = false
    //             e.stopPropagation()
    //             _this.setState({ 'style': _this.calculationPosition(e) })
    //             // 判断控件是否已经被选中
    //             var x = e.pageX
    //             var y = e.pageY - 68
    //             _this.setState({ 'xyPosition': { xaxis: x, yaxis: y } })
    //             if (_this.props.node) {
    //                 x = null;
    //                 y = null;
    //             }
    //                 Dispatcher.dispatch(`selectedComponent`, {
    //                     args: [{ button: 0, isdrag: false }, x, y, function () {
    //                         let arr = []
    //                         let obj = _this.props.node ? _this.props.node : null
    //                         if (obj != null && obj.parent.type) {
    //                             while (obj.parent) {
    //                                 if (obj.parent.type) {
    //                                     if (obj.parent.selectable != false) {
    //                                         arr.push({ id: obj.parent.id, type: obj.parent.type, name: Dispatcher.dispatch(`${obj.parent.id}_get`).data.document_data.componentName });
    //                                     }
    //                                 }
    //                                 obj = obj.parent
    //                             }
    //                         }
    //                         _this.setState({ 'data': arr })
    //                     }]
    //                 })
    //         }
    //         // document.onmousedown = function (e) {
    //         //     e.stopPropagation()
    //         //     _this.setState({
    //         //          'data': []
    //         // })
    //         // }
    //     }
    // });

  } //在组建加载完毕后，使用事件监听器给函数绑定鼠标右键事件    author lw data 2021-1-5


  componentDidMount() {
    document.addEventListener('contextmenu', this.handleContextMenu);
  }

  //组件销毁后，使用移除事件监听器移除鼠标右键事件  author lw data 2021-1-5
  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleContextMenu);
  }
  /**
     * @method handleContextMenu 绑定鼠标右击事件
     * @param e 事件对象
     */


  /**
  * @method calculationPosition 计算展开的位置
  * @param e 事件对象
  * @return 定位的属性值
  */
  calculationPosition(e) {
    let iframeDom = document.getElementById('iframe').contentWindow.document.documentElement;
    // let iframeDom = window.public.dom.documentElement,
    let scrolltop = iframeDom.scrollTop //因为在内容页在iframe框架里 不能直接通过获取html的卷曲高度
    ,
        x = e.pageX,
        y = e.pageY - 68,
        screenWidth = window.screen.width,
        width = screenWidth - x > 130 ? 'left' : 'right' //判断鼠标点击的位置向右侧是否能够展开 如果展不开的话就贴着右边展开
    ,
        screenHeight = document.documentElement.clientHeight //获取当前屏幕可视区域的高度
    ,
        allHeight = iframeDom.offsetHeight //总高
    ,
        bottom = allHeight - y - scrolltop //bottom位置
    ,
        height = screenHeight - y > 250 ? 'top' : 'bottom',
        _value = {
      [width]: width == 'left' ? x : x = 0,
      [height]: height == 'top' ? y + scrolltop : bottom
    };

    if (window.public.type == "mo") {
      _value = {
        left: 5,
        [height]: _value[height]
      };
    }

    return _value;
  }
  /**
  * @method rightClick 关闭鼠标右键弹出框
  * @data 2020-06-17
  * @param e 事件对象
  */


  rightClick(e) {
    let that = this;
    let x = that.state.xyPosition.xaxis;
    let y = that.state.xyPosition.yaxis;
    let id = e.target && e.target.id;
    Dispatcher.dispatch(`selectedComponent`, {
      args: [{
        button: 0,
        isdrag: false
      }, x, y, id, this.Simulatedclick]
    });
    that.setState({
      'data': []
    });
    e.stopPropagation(); //阻止冒泡
  }
  /**
  * @method Simulatedclick 模拟点击属性面板
  * @data 2021-1-27
  */


  Simulatedclick() {
    //property-buttons
    //选中当前控件时，只弹出有基本设置的属性，没有时的只选中控件，sxt 2021-9-23
    var basicIco = document.querySelector("#property-buttons .functionUL .basicIco");

    if (basicIco) {
      basicIco.click();
    }
  }
  /**
      * @method mouseMove 鼠标划入菜单的时候取消选中
      * @data 2020-06-18
      * @param e 事件对象
      */


  theMouseMove(e) {
    e.stopPropagation();
  }
  /**
   * @method remove 删除快捷键
   * @date 2019-12-04
   */


  remove() {
    const node = this.props.node;

    if (node) {
      const {
        parent: {
          id = false,
          type,
          skin
        },
        current = {}
      } = node; //父级是最外层控件，或者是列表内的容器时，取值

      let _components = [];

      if (/Header|Content|Footer/.test(type) || skin == 'box.box.s111.313') {
        let {
          component: {
            components
          }
        } = Dispatcher.dispatch(`${id}_get`);
        _components = components;
      } //父级是否是Header|Content|Footer


      if (/Header|Content|Footer/.test(type)) {
        //如果内部只有一个控件，禁止删除
        if (_components.length == 1) {
          return;
        } else {
          //过滤隐藏的控件
          const children = _components.filter(e => {
            var _Dispatcher$dispatch, _Dispatcher$dispatch$, _Dispatcher$dispatch$2;

            return ((_Dispatcher$dispatch = Dispatcher.dispatch(`${e.id}_get`)) === null || _Dispatcher$dispatch === void 0 ? void 0 : (_Dispatcher$dispatch$ = _Dispatcher$dispatch.data) === null || _Dispatcher$dispatch$ === void 0 ? void 0 : (_Dispatcher$dispatch$2 = _Dispatcher$dispatch$.theme_data.style) === null || _Dispatcher$dispatch$2 === void 0 ? void 0 : _Dispatcher$dispatch$2.pchidden) != 'none';
          }); //过滤掉隐藏控件后还剩一个控件的话，不允许删除


          if (children.length == 1) {
            return void 0;
          }
        }
      }

      if (id && current.removable != false) {
        //如果是根控件则不拼id
        const key = id != 'document' ? `${id}_` : ''; //是列表内的容器时,并且只有一项，禁止删除

        if (skin == 'box.box.s111.313' && _components && _components.length == 1) {
          return;
        } else {
          Dispatcher.dispatch(`${key}removeComponent`, {
            args: [current.id || ""]
          }); //清空hover框、选中框、属性按钮

          Dispatcher.dispatch("selectedHidden", {
            value: true
          });
        }
      }
    }
  }
  /**
   * @method copy 复制快捷键
   * @date 2019-12-04
   * @author nf
   */


  copy() {
    const node = this.props.node;

    if (node) {
      const {
        current: {
          id = false,
          copable = true
        }
      } = node;

      if (id && copable != false) {
        const component = Dispatcher.dispatch('getComponentData', {
          value: id
        });
        copyObj = component;
      }
    }
  }
  /**
   * @method paste 粘贴快捷键
   * @date 2019-12-04
   * @author nf
   */


  paste() {
    //判断是否存在这个变量
    if (copyObj) {
      const node = this.props.node;
      let index;

      if (node) {
        const {
          parent: {
            id = false
          }
        } = node;
        Dispatcher.dispatch(`${id}_addComponent`, {
          args: [copyObj, index]
        });
      }
    }
  }
  /**
   * @method shear 剪切方法
   * @date 2020-12-31
   * @author lw
   */


  shear() {
    //调用复制快捷键方法
    this.copy(); //调用删除快捷键的方法

    this.remove();
  }

    /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */


    render() {

      let arr = this.state.data ? this.state.data : [];

      if (arr && arr.length != 0) {
        let _marginLeft = '-10px';
        if (window.public.type == "pc") {
          let winW = window.innerWidth,
              left = this.state.style.left || winW,
              rightClickWidth = 210 + 130; //
  
          if (winW - left <= rightClickWidth) {
            _marginLeft = '-340px';
          }
        }

        return (
          <div 
            className='rightClick'
            onMouseMove={this.theMouseMove.bind(this)}
            style={{
              'display': 'block',
              'position': 'absolute',
              'left': this.state.style.left,
              'bottom': this.state.style.bottom,
              'right': this.state.style.right,
              'top': this.state.style.top
            }}
          >
            <ul className="rightClick-popUp">
              {
                this.Property_panel_list.map((e, index) => {
                  return (
                    <li 
                      key={index} 
                      id={e.event}
                      className={e.iconClass} 
                      title={e.title} 
                      onMouseDown={e.event ? this[e.event].bind(this) : null}
                    >
                      <span>{e.title}</span>
                      <span className={e.iconC}>{e.name}{e.iconC ? "" : ''}</span>
                      {
                        e.secondary && (
                          <ul className="rightClick rightclickCascade" style={{
                            'position': 'absolute',
                            'left': '100%',
                            'top': '-15px',
                            'marginLeft': _marginLeft,
                            'zIndex': '1'
                          }}>
                            {
                              arr.map(item => {
                                var _item$name;
                                return (
                                  <li key={item.id} id={item.id} onMouseDown={this.rightClick.bind(this)}>
                                    {
                                    (_item$name = item.name) !== null && _item$name !== void 0 ? _item$name : window.public.getName(item.type)
                                    }
                                  </li>
                                )
                              })
                            }
                          </ul>
                        )
                      }
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }

      return null
      // return <MouseRightClickMenu {...this} />
    }

}
