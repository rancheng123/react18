
// 导入 react、react-dom、dispatcher 和 ConfigBtn 模块
import React from "react";
import {createRoot} from "react-dom/client";
import Dispatcher from "@/system/tools/dispatcher";
import ConfigBtn from "./ConfigBtn";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class Buttons {
  /**@property btns 默认按钮配置 */

  /**@property x 鼠标点击的x坐标 */

  /**@property y 鼠标点击的y坐标 */

  /**@property controler 控件选中编辑对象 */
  constructor(proxy, node) {
    /**@property proxy 代理对象 */
    this.proxy = proxy;
    /**@property node 控件对象 */

    this.node = node;

    // 渲染按钮的react根节点
    this.buttonRoot = null
  }
  /** 
    * @method buttons 属性按钮列表结构
    * @return {object} 属性按钮列表结构
    */


  static buttons(id, node, proxy, btns) {
    const container = document.querySelector(`#${id}`);

    if (container) {
      var _ref, _data$data$document_d, _node$current$skin;

      const button = new Buttons(proxy, node),
      {
        current: {
          id: cid,
          layout: {
            x,
            y
          }
        }
      } = node
      
      const data = Dispatcher.dispatch(`${cid}_get`)
      const componentName = (_ref = (_data$data$document_d = data.data.document_data.categoryName) !== null && _data$data$document_d !== void 0 ? _data$data$document_d : window.public.lang[((_node$current$skin = node.current.skin) !== null && _node$current$skin !== void 0 ? _node$current$skin : '').split('.')[1]]) !== null && _ref !== void 0 ? _ref : window.public.getName(node.current.type);
      
      btns = Buttons.btnsHandle(btns, node.current.type);
      if(!this.buttonRoot){
        this.buttonRoot = createRoot(container)
      }
      this.buttonRoot.render(
        <button.render
          button={button}
          componentName={componentName}
          key={cid + x + y}
          btnId={id}
          btns={btns}
        />
      )
      // ReactDOM.render(React.createElement(button.render, {
      //   button: button,
      //   componentName: componentName,
      //   key: cid + x + y,
      //   btnId: id,
      //   btns: btns
      // }), container);
    }
  }
  /**
   * @method btnsHandle 按钮配置处理
   * @date 2020-01-22
   * @author wyq
   * @param {object} btns 按钮配置对象 
   * @param {string} type 控件类型
   */


  static btnsHandle(btns, type) {
    //头部等顶级容器不允许收藏和隐藏 sxt 2020-5-27  分页和搜索组件不允许收藏和隐藏 lw 2020-12-10
    if (/PageContent|Panel|Footer|Header|Lightboxmodal|Lightbox|Pagination|Input/.test(type)) {
      return window.public.type == "mo" && /Header|Footer|Pagination|Input/.test(type) ? btns.concat(Buttons.btns.mo) : btns;
    }

    return btns.concat(Buttons.btns.pc);
  }
  /**
   * @method button 属性按钮处理方法
   * @date 2020-03-11
   * @author wyq
   * @param {object} config 配置对象
   * @param {string} skin 皮肤
   * @param {number} [index] 索引
   * @param {string} [key] 键名
   * @param {string} [value] 键值
   */


  static button(config, skin = '', index, key, value) {
    var _config$window$public, _ref2, _conf$tabs, _ref3, _conf$btns;

    const conf = (_config$window$public = config[window.public.type]) !== null && _config$window$public !== void 0 ? _config$window$public : config; //取属性项配置

    let tabs = (_ref2 = (_conf$tabs = conf.tabs) !== null && _conf$tabs !== void 0 ? _conf$tabs : config.tabs) !== null && _ref2 !== void 0 ? _ref2 : {}; //取属性按钮配置

    let btns = (_ref3 = (_conf$btns = conf.btns) !== null && _conf$btns !== void 0 ? _conf$btns : config.btns) !== null && _ref3 !== void 0 ? _ref3 : tabs; //截取皮肤

    skin = skin.substring(0, skin.lastIndexOf(".")); //获取属性按钮

    btns = Array.isArray(btns) ? btns : btns[skin] || btns.all; //判断index和key是否存在

    if (typeof index == 'number' && key) {
      //值是否为undefined
      if (value != undefined) {
        btns[index][key] = value;
        return btns;
      }

      return btns[index][key];
    }

    return btns;
  }
  /**
   * @method render 按钮结构渲染
   * @date 2020-01-22
   * @author wyq
   * @param {object} param0 参数对象
   * @param {object} param0.button 按钮类的实例
   * @param {string} param0.btnsId 按钮容器id
   * @param {object} param0.bnts 按钮配置
   */


  render({
    button,
    btnId,
    btns,
    componentName
  }) {
    const id = button.node.current.id,
      componentType = button.node.current.type; //获取state状态

    const [layout, setLayout] = React.useState({
      opacity: 0
    }); //每次选中控件时，计算属性按钮位置。

    React.useEffect(button.btnListLayout(btnId, setLayout), []); //属性按钮选中

    const [selectState, setSelectState] = React.useState(null),
      [buttonList, setButtonList] = React.useState(btns); //注册选中加载按钮方法

    React.useEffect(() => {
      Dispatcher.register(`${id}_set_property_btns`, setButtonList, Buttons);
      return () => Dispatcher.unregister(`${id}_set_property_btns`);
    }, [id]);

    if (componentType == "em-Hoverbox" && !selectState) {
      const {
        data: {
          document_data: {
            current
          }
        }
      } = Dispatcher.dispatch(`${id}_get`);

      if (current == '0') {
        setSelectState("default");
      }

      if (current == '1') {
        setSelectState("currentHover");
      }
    }

    // return React.createElement(ConfigBtn['ConfigBtnWaper'], {
    //   style: layout,
    //   name: componentName,
    //   id: id
    // }, React.createElement("ul", {
    //   className: "functionUL"
    // }, 
    // //2020-03-12 by wyq change 循环控件属性按钮
    //   btns.map(({
    //     name,
    //     type,
    //     hidden,
    //     select,
    //     selected,
    //     show,
    //     className = type
    //   }, i) => {
    //     //判断属性按钮是隐藏还是显示
    //     if (hidden != true) {
    //       //判断控件是否在指定条件下显示
    //       if (show && !Buttons.controler.isShow(button.node, show)) {
    //         return null;
    //       }

    //       return React.createElement(ConfigBtn['ConfigButton'], {
    //         key: i,
    //         id: button.node.current.id,
    //         name: name,
    //         type: type,
    //         className: className,
    //         select: selectState != null ? type == selectState : selected,
    //         click: button.selectedBtn.bind(button, type, select, setSelectState)
    //       });
    //     }

    //     return null;
    //   })));
    return (
      <ConfigBtn.ConfigBtnWaper style={layout} name={componentName} id={id}>
        <ul className="functionUL">
          {/* 循环控件属性按钮 */}
          {btns.map(({ name, type, hidden, select, selected, show, className = type,iconName }, i) => {
            //判断属性按钮是隐藏还是显示
            if (hidden !== true) {
              if (show && !Buttons.controler.isShow(button.node, show)) {
                return null;
              }
              return (
                <ConfigBtn.ConfigButton
                  key={i}
                  id={button.node.current.id}
                  name={name}
                  type={type}
                  className={className}
                  iconName={iconName}
                  select={selectState != null ? type === selectState : selected}
                  click={button.selectedBtn.bind(button, type, select, setSelectState)}
                />
              );
            }
            return null;
          })}
        </ul>
      </ConfigBtn.ConfigBtnWaper>

    )
  }
  /**
   * @method btnListLayout 设置属性按钮布局
   * @date 2019-10-15
   * @author wyq
   * @param {function} setLayout 执行更新函数 
   * @return {function} 一个函数，再选中框加载完毕后调用
   */


  btnListLayout(btnId, setLayout) {
    return () => {
      const btn = document.querySelector(`#${btnId} ul`);

      if (btn) {
        const modal = document.querySelector(".property-modal"),
          {
            current: {
              layout
            }
          } = this.node,
          cy = layout.y - modal.scrollTop;
        let {
          offsetWidth: width,
          offsetHeight: height
        } = btn,
          {
            innerWidth,
            innerHeight
          } = window.public.win,
          position,
          left,
          top;
        height = height + 10; //如果头部或底部可以显示全按钮，则在头部或底部显示，否则点哪里在哪里显示

        if (cy > height || innerHeight - (cy + layout.height) > height) {
          top = layout.y - height, left = layout.x > 20 ? layout.x : 0; //如果以控件坐标为基准放不下属性按钮，则以属性按钮宽度来计算属性按钮的x坐标
          //80为右侧工具库按钮宽度

          if (innerWidth - layout.x < width + 95) {
            left = innerWidth - (width + 85);
          } //如果属性按钮y坐标小于自身高度，则属性按钮y坐标等于控件y坐标加上其高度的值


          if (cy <= height) {
            top = layout.height + layout.y + 10;
          }
        } else {
          const main = document.querySelector('#ediMain');
          height = main.offsetTop + height;
          left = Buttons.x >= width ? Buttons.x - width : Buttons.x + width; //如果属性按钮x轴加上自身宽度超出屏幕宽度，则x等于屏幕宽度减去属性按钮自身宽度

          if (left + width >= innerWidth) {
            left = innerWidth - width - 15;
          }

          top = Buttons.y > height ? Buttons.y - height : height;
          left = main.offsetLeft + left, top = main.offsetTop + top, position = 'fixed';
        }

        setLayout({
          left,
          top,
          position
        });
      }
    };
  }
  /**
   * @method selectedBtn 点击选中按钮，并弹出属性面板 
   * @date 2019-10-25
   * @author wyq
   * @param {string} type 当前要选中的按钮类型 
   * @param {boolean} select 当前按钮是否拥有选中状态 true 有 false 没有
   * @param {function} setBtnType 更新函数
   */


  selectedBtn(type, select, setSelectState) {
    let param = {
      type,
      node: this.node,
      id: "component-property"
    }; //如果可以选中则标选中状态

    if (select) {
      setSelectState(type), param.close = () => setSelectState('');
    }
    this.proxy.showAttributePanel(param);
  }

} //注册选中加载按钮方法

_defineProperty(Buttons, "btns", ConfigBtn['defaultBtns']);

_defineProperty(Buttons, "x", 0);

_defineProperty(Buttons, "y", 0);

_defineProperty(Buttons, "controler", null);

Dispatcher.register('select_loadButtons', Buttons.buttons, Buttons); //注册属性按钮处理方法

Dispatcher.register('select_button', Buttons.button);

export default Buttons