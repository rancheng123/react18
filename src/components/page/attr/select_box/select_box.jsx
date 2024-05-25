// 导入 React 库
import { useEffect, useState } from 'react';
// 导入 ReactDOM 库
import { createRoot } from 'react-dom/client';
// import ReactDom from 'react-dom';
// 导入自定义的 dispatcher 模块
import Dispatcher from '@/system/tools/dispatcher.js';
// 导入自定义的 single_selected 模块
import SingleSelected from './single_selected';
// 导入自定义的 single_drag 模块
import SingleDrag from '@/system/tools/single_drag.js';
// 导入自定义的 adsorptionv3 模块
import adsorptionv3 from './adsorptionv3';


const marginMap = new Map();
let keydown;

const marginType = (type, attr) => type == 'pc' ? attr : type + attr;
/**
 * @class SelectBox 选中框组件实例
 */
class SelectBox {
  constructor(node, container) {
    /**@property node 控件数据对象*/
    this.node = node;
    /**@property container 容器节点对象 */

    this.container = container;

    // 渲染选中框的react根节点
    this.selectRoot = null
  }
  /**
   * @method selectedBox 选中框结构
   * @return {object} 选中框结构
   */
  static selectBox(opts) {
    const element = document.querySelector(`#${opts.id}`);
    //节点对象存在，在插入选中框
    if (element) {
      const select = new this(opts.node, element);

      if (this.selectRoot) {
        this.selectRoot.unmount()
      }
      this.selectRoot = createRoot(element)

      // ReactDom.render(React.createElement(select.render, {
      //   select: select,
      //   dots: opts.dots,
      //   def_layout: opts.layout
      // }), element);
      this.selectRoot.render(
        <select.render
          select={select}
          dots={opts.dots}
          def_layout={opts.layout}
        />
      );
    }
  }
  /**
   * 渲染结构
   * @param {type} 
   * @return: void
   */
  render({
    select,
    dots,
    def_layout
  }) {
    const state = useState(def_layout);
    const {
      current: {
        layout: {
          x,
          y
        },
        id
      }
    } = select.node; //当控件发生变化时，更新选中框

    useEffect(select.loaded.bind(select, state, dots), [id + parseInt(x) + parseInt(y)]);
    // return React.createElement("div", {
    //   className: "ediBox",
    //   "data-id": select.id,
    //   style: state[0]
    // }, select.node.current.hidden != '1' ? select.prev() : null, select.node.current.hidden != '1' ? select.selection(dots) : React.createElement("button", {
    //   className: "hidDivBtn",
    //   onClick: select.show.bind(select)
    // }, window.public.lang.clicShow));
    return (
      <div
        className="ediBox"
        data-id={select.id}
        style={state[0]}
      >
        {select.node.current.hidden !== '1' ? (
          select.prev()
        ) : null}
        {select.node.current.hidden !== '1' ? (
          select.selection(dots)
        ) : (
          <button className="hidDivBtn" onMouseDown={select.show.bind(select)}>
            {window.public.lang.clicShow}
          </button>
        )}
      </div>
    )
  }
  /**
   * @method bindEvent 绑定事件
   * @param {object} button 按钮节点对象 
   * @param {array} state 状态对象 
   */
  bindEvent(button, state) {
    const setLayout = state[1];
    button.onmousedown = this.positionStart.bind(this, setLayout);
    keydown = this.onkeydown.bind(this, setLayout);
    window.addEventListener('keydown', keydown);
  }
  /**
   * @method removeEvent 删除事件对象
   * @param {object} button 按钮节点对象
   */
  removeEvent(button) {
    button.onmousedown = null;
    window.removeEventListener('keydown', keydown);
  }


  /**
   * @method loaded 结构加载完毕执行
   * @param {array} state 状态对象 
   * @param {object} def_layout 默认布局对象 
   * @param {object} dots 操作点对象
   * @return {function} 卸载函数 
   */
  loaded(state, dots) {
    const button = this.container.querySelector('.adjustingButton'),
      name = `${this.node.current.id}_select_setLayout`,
      setLayout = state[1]; //2021-1-19 wyq 注释
    //setLayout(def_layout);//清除事件和绑定事件

    if (dots && button) {
      this.bindEvent(button, state);
    } //如果已经注册事件，则先取消，在注册


    Dispatcher.has(name) && Dispatcher.unregister(name); //注册事件

    Dispatcher.register(name, setLayout);
    const resize = this.listenLayout(state); //返回卸载函数

    return () => {
      button && this.removeEvent(button);
      resize.disconnect();
    };
  }
  /**
   * @method decorateLayout 装饰设置布局方法
   * @param {function} setLayout 设置布局的函数
   * @returns {function} 经过装饰以后的布局函数
   */
  decorateLayout(setLayout, dots) {
    //返回设置布局的方法
    return value => setLayout(typeof value != 'function' ? this.optimizeSelectionBox(value, dots) : prevState => this.optimizeSelectionBox(value(prevState), dots));
  }
  /**
   * @method selection 选中框结构
   * @param {object} props 参数对象
   * @return {object} 选中框结构
   */
  selection(dots) {
    if (dots == undefined) return null;
    const {
      btns,
      list
    } = dots;

    // return React.createElement("div", {
    //   className: "adjustingButton"
    // }, btns ? btns.map((e, i) => {
    //   const icon = e != 'top-left' ? {
    //     name: 'iconfont',
    //     icon: ''
    //   } : {
    //     name: 'cross',
    //     icon: ''
    //   };
    // return React.createElement("em", {
    //     key: i,
    //     className: `occupa-${e}`,
    //     "data-position": e
    //   }, React.createElement("i", {
    //     className: icon.name,
    //     "data-position": e
    //   }, icon.icon));
    // }) : null, list ? list.map((e, i) => React.createElement("span", {
    //   key: i,
    //   "data-position": e,
    //   className: `cursor-${e}`
    // })) : null);
    return (
      <div className="adjustingButton">
        {btns ? btns.map((e, i) => {
          const icon = e !== 'top-left' ? { name: 'iconfont', icon: '&#xe790;' } : { name: 'cross', icon: '' };
          return (
            <em key={i} className={`occupa-${e}`} data-position={e}>
              {/* <i className={icon.name} data-position={e}>{icon.icon}</i> */}
              <i className={icon.name} data-position={e} dangerouslySetInnerHTML={{ __html: icon.icon }}></i>
            </em>
          );
        }) : null}
        {list ? list.map((e, i) => (
          <span key={i} data-position={e} className={`cursor-${e}`} />
        )) : null}
      </div>
    )

  }

  prev() {
    return null;
  }
  /**
   * @method show 点击显示
   */
  show() {
    // const promise = __webpack_require__.e(/*! import() */ "hiding").then(__webpack_require__.bind(null, /*! ../hiding */ "./components/page/attr/hiding.js"));
    const promise = import('../hiding.js')
    promise.then(({
      Hiding
    }) => {
      Hiding.hiding({
        node: this.node
      });
    });

    //清空选中框
    Dispatcher.dispatch('selectedHidden', {
      value: true
    });
  }
  /**
   * @method listenLayout 监听控件布局变化，更改选中框布局。只监听宽高数据
   * @param {object} layout 布局数据
   * @return {ResizeObserver} 实例对象
   */
  listenLayout(state) {
    const component = window.public.dom.querySelector(`#${this.node.current.id}`),
      {
        parentNode: {
          offsetLeft,
          offsetTop
        }
      } = document.querySelector('.property-modal'),
      posValue = getComputedStyle(component).position;
    const resize = new ResizeObserver(function (state) {
      //创建动画帧，在下一帧更新节点
      const timer = window.requestAnimationFrame(() => {
        const scrollTop = component.ownerDocument.documentElement.scrollTop,
          [layout, setSelectionLayout] = state;
        let {
          left,
          top,
          width,
          height
        } = component.getBoundingClientRect();

        if (width != 0 && height != 0 && (left != layout.left || width != layout.width || top != layout.top || height != layout.height)) {
          //id存在并且存在宽高则表示为控件，则更新选中框
          setSelectionLayout(prevState => {
            let position = '';
            posValue == 'fixed' ? (position = posValue, top += offsetTop, left += offsetLeft) : top += scrollTop;
            state.splice(0, 1, {
              ...prevState,
              width,
              height,
              left,
              top,
              position
            });
            return state[0];
          });
        }

        window.cancelAnimationFrame(timer);
      });
    }.bind(this, state));
    resize.observe(component, {
      box: "border-box"
    });
    return resize;
  }

  optimizeSelectionBox({
    width,
    height,
    left,
    top,
    position
  }) {
    // 根据顶部边界，左边界，右边界，调整拖拽按钮的位置
    const topBtn = document.querySelector('#select-box em[data-position="top"]');
    const leftBtn = document.querySelector('#select-box em[data-position="left"]');
    const rightBtn = document.querySelector('#select-box span[data-position="right"]');
    const selectBox = document.querySelector('#select-box .ediBox');
    const {
      width: mainwidth
    } = document.querySelector('#ediMain').getBoundingClientRect(); // 主体的宽度

    if (selectBox) {
      const {
        left: boxLeft,
        top: boxTop,
        width: boxWidth
      } = selectBox.style;

      if (topBtn) {
        // 10 是默认样式的值
        parseFloat(boxTop) < 10 ? topBtn.style.top = `${10 - parseFloat(boxTop) - 10}px` : topBtn.style.cssText = '';
      }

      if (leftBtn) {
        // 10 是默认样式的值
        parseFloat(boxLeft) < 10 ? leftBtn.style.left = `${10 - parseFloat(boxLeft) - 10}px` : leftBtn.style.cssText = '';
      }

      if (rightBtn) {
        // 5 是默认样式的值
        const num = mainwidth - parseFloat(boxWidth);
        num < 5 ? rightBtn.style.right = `${5 - num - 5}px` : rightBtn.style.cssText = '';
      }
    }

    return {
      width,
      height,
      left,
      top,
      position
    }; // 下面逻辑线不走， 后期可能会用
    // 选中框没有拖拽按钮配置及其父级，不需要重新调整选中框
    // if(!dots || boxId === 'select-parent-box') {
    //    return {width,height,left,top}
    // }
    // const {btns, list} = dots;
    // const iframe = document.querySelector('#iframe'),
    //       iframeWidth = iframe.offsetWidth;
    // let widthZoom = 0,leftZoom = 0,heightZoom = 5,topZoom = 3;
    // if(Math.ceil(width + widthZoom) >= iframeWidth){ widthZoom = -12,leftZoom = 5; }
    // //
    // else if(left <= 1){ leftZoom = 7,widthZoom = -2; }
    // //
    // else if(left + width + widthZoom > iframeWidth){ widthZoom = -3,leftZoom = -2; }
    // 根据选中框拖拽按钮配置来调整选中框
    // let layout = {
    //    width:(btns && btns.includes('left')) ? width + widthZoom : width,
    //    height:(btns && btns.includes('top')) ? height + heightZoom : height,
    //    left: (btns && btns.includes('left'))? left + leftZoom : left,
    //    top,
    // };
    //只有选中控件时执行一次，其它时候不再执行
    // if(isSelected != true){ 
    //    layout.top = (btns && btns.includes('top')) ? top - topZoom : top;
    //    isSelected = true; 
    // }
    // return layout;
  }
  /**
   * @method useAdsorption 是否使用吸附功能
   * @returns {boolean} true 或 false
   */
  // useAdsorption(){
  //    return this.systype != 'mo' 
  //           && 
  //           document.querySelector('.property-modal .auxiliary');
  // }

  /**
   * 上/左边距拖动过程
   * 
   * @param {type} 
   * @return: void
   */
  positionDrag(setLayout, position, event) {
    let {
      angle,
      offsetX,
      offsetY,
      currentX: x,
      currentY: y
    } = SingleDrag.move(event); // 获取拖动参数

    y += this.iframeWindow.scrollY;
    x -= this.screenArea;
    const {
      node: {
        current: {
          id
        }
      },
      currentEle
    } = this;

    switch (position) {
      case 'top':
        //上拖拽，垂直移动
        this.positionDragTop({
          currentEle,
          id,
          setLayout,
          offsetY
        }); //this.positionDragTopLeft({x,y,angle,offsetX,offsetY,currentEle,id,setLayout});

        break;

      case 'left':
        //左拖拽,水平移动
        this.positionDragLeft({
          currentEle,
          x,
          id,
          setLayout,
          offsetX,
          event
        });
        break;

      case 'right':
        //右拖拽，改变宽度。
        this.positionDragRight({
          currentEle,
          offsetX,
          id,
          setLayout
        });
        break;

      case 'top-left':
        //左上拖拽,任意方向移动
        this.positionDragTopLeft({
          x,
          y,
          angle,
          offsetX,
          offsetY,
          currentEle,
          id,
          setLayout
        });
        break;

      case 'bottom-right':
        //右下
        this.positionDragBottomRight({
          angle,
          offsetX,
          currentEle,
          id,
          setLayout
        });
        break;

      default:
        console.error('控件无此拖动行为');
        break;
    }
  }
  /**
  * @description addControlPosUnit 新增控件定位的默认数据
  */
  addControlPosUnit(id) {
    const fnName = `${id}_get`;
    const {
      component: {
        componentType
      },
      data: {
        theme_data: {
          style
        }
      }
    } = Dispatcher.dispatch(fnName);

    if (componentType == "em-Button" || componentType == "em-Shopcart") {
      return false;
    } //按钮控件数据完整，不用进行数据处理，并且在居中时补单位会出问题 


    let defStyle = {
      "marginTopUnit": "%",
      "marginRightUnit": "%",
      "marginLeftUnit": "%",
      "marginBottomUnit": "%",
      "paddingTopUnit": "px",
      "paddingRightUnit": "px",
      "paddingBottomUnit": "px",
      "paddingLeftUnit": "px",
      "momarginTopUnit": "rem",
      "momarginRightUnit": "rem",
      "momarginBottomUnit": "rem",
      "momarginLeftUnit": "rem",
      "mopaddingTopUnit": "px",
      "mopaddingRightUnit": "px",
      "mopaddingBottomUnit": "px",
      "mopaddingLeftUnit": "px"
    };
    let newStyle = {
      ...defStyle,
      ...style
    };
    Dispatcher.dispatch(`${id}_set`, {
      args: [`theme_data.style.`, newStyle]
    });
  }
  /**
   * @description: 控件移动初始化
   * @return: void
   */
  positionInit() {
    // 判断当layout存在的时候执行代码 lby 2020-07-02
    if (this.node.parent.layout) {
      const {
        current: {
          id
        },
        parent: {
          layout: {
            x,
            y
          }
        }
      } = this.node;
      this.iframeWindow = document.querySelector('#iframe').contentWindow;
      this.currentEle = this.iframeWindow.document.querySelector('#' + id); //当前控件
      // 判断元素是否存在

      if (this.currentEle) {
        this.systype = window.public.type; //系统类型

        this.ediMain = document.querySelector('#ediMain');
        this.screenArea = (document.body.clientWidth - this.ediMain.getBoundingClientRect().width) / 2; //设计界面与屏幕的边距

        this.layoutX = x;
        this.layoutY = y;

        if (this.systype != 'mo') {
          adsorptionv3.init(this.currentEle.getBoundingClientRect(), this.node.parent.layout, Dispatcher.dispatch("getRuler")); //吸附初始化
        }

        this.addControlPosUnit(id);
        const ediBox = document.querySelector('.ediBox');
        SingleSelected.init(ediBox.offsetWidth, ediBox.offsetLeft);
        SingleDrag.init(event);
        const marginLeft = this.getCssValue(window, this.currentEle, 'marginLeft'),
          marginTop = this.getCssValue(window, this.currentEle, 'marginTop'),
          marginBottom = this.getCssValue(window, this.currentEle, 'marginBottom'),
          marginRight = this.getCssValue(window, this.currentEle, 'marginRight');
        marginMap.set(`#${id}`, [marginTop, marginRight, marginBottom, marginLeft]);
      }
    }
  }
  /**
   * @description: 键盘按下事件
   * @param {setLayout}
   * @param {event} 
   * @return: void
   */
  onkeydown(setLayout, event) {
    let change;
    const {
      keyCode
    } = event,
      movingDistance = 1;
    this.positionInit();

    if (this.currentEle) {
      const {
        node: {
          current: {
            id
          }
        },
        currentEle
      } = this;

      if ([37, 38, 39, 40].findIndex(code => code === keyCode) !== -1) {
        switch (keyCode) {
          case 38:
            //上
            change = {
              offsetY: -movingDistance
            };
            break;

          case 40:
            change = {
              offsetY: movingDistance
            };
            break;

          case 37:
            //左右
            change = {
              offsetX: -movingDistance
            };
            break;

          case 39:
            change = {
              offsetX: movingDistance
            };
            break;
        }

        if (keyCode == 38 || keyCode == 40) {
          this.positionDragTop({
            currentEle,
            id,
            setLayout,
            ...change
          });
        } else {
          this.positionDragLeft({
            currentEle,
            id,
            setLayout,
            ...change
          });
        }

        event.stopPropagation();
        event.preventDefault();
      }
    } else {
      window.removeEventListener('keydown', keydown);
    }
  }
  /**
   * 上/左边距拖动初始化
   * @param {stirng} position 
   * @param {object} event 
   */
  positionStart(setLayout, event) {
    try {
      this.positionInit();
      const position = event.target.dataset.position; // 判断元素是否存在

      const {
        node: {
          current: {
            id
          }
        },
        currentEle
      } = this;

      if (currentEle) {
        // 记录拖拽之前的控件数据,用于回退
        let {
          left: pleft,
          top: ptop,
          width: pwidth,
          height: pheight
        } = currentEle.getBoundingClientRect(); // History.add(id, 'selectBox', {left: pleft, top: ptop, width: pwidth, height: pheight});
        // 存一下拖拽之前的位置

        const dom = document.querySelector('#select-box .ediBox');
        const {
          left: oldLeft,
          top: oldTop
        } = (dom === null || dom === void 0 ? void 0 : dom.style) || {}; //选中控件面板 透明

        const domList = document.querySelectorAll('.functionBox');
        (domList || []).forEach(item => {
          item.style.opacity = 0;
        });
        document.onmousemove = this.positionDrag.bind(this, setLayout, position);
        document.onmouseup = this.positionEnd.bind(this, oldLeft, oldTop);
      }
    } catch (e) { }

    event.stopPropagation();
  }
  /**
   * 获取控件css属性值
   * @param {win} window对象
   * @param {ele} 当前元素
   * @param {attr} 要取的css属性值
   * @return:css属性值
   */
  getCssValue(win, ele, attr) {
    return parseFloat(win.getComputedStyle(ele)[attr].replace('px', '')); //当前控件marginRight值
  }
  /**
   *拖拽top值处理
   * 
   * @param {type} 
   * @return: void
   */
  positionDragTop({
    currentEle,
    id,
    setLayout,
    offsetY
  }) {
    let {
      top: _offsetTop,
      left: _offsetLeft,
      height,
      bottom
    } = currentEle.getBoundingClientRect();
    _offsetTop += this.iframeWindow.scrollY;
    let [mTop, mRight, mBottom, mLeft] = marginMap.get(`#${id}`);

    if (this.systype != 'mo') {
      const verSide = adsorptionv3.verticalHandle(offsetY, _offsetTop, bottom, height);

      if (verSide === false) {
        return;
      } else if (Array.isArray(verSide)) {
        offsetY = verSide[0];
        _offsetTop = verSide[1] += this.iframeWindow.scrollY;
      }
    }

    let _mTop = offsetY + mTop,
      scale = _mTop; // this.getScale(_mTop,currentEle.parentNode.offsetWidth);//margin比例


    if (scale < 0) scale = 0;
    marginMap.set(`#${id}`, [_mTop, mRight, mBottom, mLeft]);
    const marginTop = marginType(this.systype, 'marginTop');

    let dataGet = Dispatcher.dispatch(`${id}_get`) || {},
      //获取控件数据
      _style = dataGet.data.theme_data.style || {}; //获取控件style数据


    let unit = _style[`${marginTop}Unit`] || "%"; //获取数据中的单位

    if (unit != "px") {
      window.public.unit.selector = `#${id}`;
      scale = window.public.unit[unit](scale, unit); //调用老王单位转换方法，计算出当前单位下的数值
    }

    Dispatcher.dispatch(`${id}_set`, {
      args: [`theme_data.style.${marginTop}`, scale]
    });
    setLayout({
      left: _offsetLeft,
      top: _offsetTop,
      width: currentEle.offsetWidth,
      height: currentEle.offsetHeight
    });
  }
  /**
   *拖拽left值处理
    * 
    * @param {type} 
    * @return: 
    */
  positionDragLeft({
    id,
    currentEle,
    setLayout,
    offsetX
  }) {
    let {
      top: _offsetTop,
      left: _offsetLeft,
      width,
      right: _right
    } = currentEle.getBoundingClientRect();
    _offsetTop += this.iframeWindow.scrollY;
    const {
      parentNode: {
        offsetWidth: pwidth
      }
    } = currentEle;
    let [mTop, mRight, mBottom, mLeft] = marginMap.get(`#${id}`),
      selectedWidth = currentEle.offsetWidth; //框架内拖拽X值

    let _iframeX = offsetX;

    if (this.systype != 'mo') {
      const horSide = adsorptionv3.horizontalHandle(offsetX, _offsetLeft, _right, width);

      if (horSide === false) {
        return;
      } else if (Array.isArray(horSide)) {
        _iframeX = horSide[0];
        _offsetLeft = horSide[1];
      }
    }

    let offsetLeft = _iframeX + mLeft,
      offsetRight,
      scaleLeft = 0,
      scaleRight = 0;
    const diffLeft = pwidth - selectedWidth; //可移动最大值

    const boundaryValue = mLeft + mRight;

    if (offsetLeft <= 0) {
      //左边临界
      offsetLeft = 0;
      offsetRight = boundaryValue;
      scaleRight = offsetRight; //this.getScale(offsetRight,pwidth);
    } else if (offsetLeft >= diffLeft) {
      //右边临界
      offsetLeft = boundaryValue;
      offsetRight = 0;
      scaleLeft = offsetLeft; //this.getScale(offsetLeft,pwidth);
    } else {
      //中间
      offsetRight = -_iframeX + mRight;
      scaleLeft = offsetLeft; //this.getScale(offsetLeft,pwidth);

      scaleRight = offsetRight; //this.getScale(offsetRight,pwidth);
    }

    marginMap.set(`#${id}`, [mTop, offsetRight, mBottom, offsetLeft]);
    const marginLeft = marginType(this.systype, 'marginLeft'),
      marginRight = marginType(this.systype, 'marginRight');

    let dataGet = Dispatcher.dispatch(`${id}_get`) || {},
      //获取控件数据
      skin = dataGet.component.skin,
      skinType = skin && skin.split(".")[1],
      //获取控件皮肤中，具体的控件类型   
      _style = dataGet.data.theme_data.style || {}; //获取控件style数据


    let unitLeft = _style[`${marginLeft}Unit`] || "%";

    if (unitLeft != "px") {
      window.public.unit.selector = `#${id}`;
      scaleLeft = window.public.unit[unitLeft](scaleLeft, unitLeft);
    }

    let unitRight = _style[`${marginRight}Unit`] || "%";

    if (unitRight != "px") {
      window.public.unit.selector = `#${id}`;
      scaleRight = window.public.unit[unitRight](scaleRight, unitRight);
    }

    let style = {
      [marginLeft]: scaleLeft,
      [marginRight]: scaleRight
    }; //控件类型为icon按钮和文本按钮时，根据按钮位置设置左右的margin  

    if (skinType == "button" || skinType == "textBtn" || skinType == "number") {
      let styleMarginLeft = _style[marginLeft],
        styleMarginRight = _style[marginRight];

      if (styleMarginLeft == 'auto' && styleMarginRight == 'auto') {
        style = {};
      } else if (styleMarginRight == 'auto') {
        style = {
          [marginLeft]: scaleLeft
        };
      } else if (styleMarginLeft == 'auto') {
        style = {
          [marginRight]: scaleRight
        };
      }
    }

    Dispatcher.dispatch(`${id}_set`, {
      args: ['theme_data.style.', style]
    });
    setLayout({
      left: _offsetLeft,
      top: _offsetTop,
      width: selectedWidth,
      height: currentEle.offsetHeight
    });
  }
  /**
   *拖拽right值处理
    * 
    * @param {type} 
    * @return: 
    */
  positionDragRight({
    currentEle,
    offsetX,
    id,
    setLayout
  }) {
    let {
      top: _offsetTop,
      left: _offsetLeft
    } = currentEle.getBoundingClientRect();
    _offsetTop += this.iframeWindow.scrollY;
    const {
      offsetWidth: currentEleWidth,
      offsetHeight: currentEleHeight
    } = currentEle;
    const [mTop, mRight, mBottom, mLeft] = marginMap.get(`#${id}`);
    let offset = mRight - offsetX,
      scale = offset; // this.getScale(offset,currentEle.parentNode.offsetWidth);//margin比例

    const selectedWidth = SingleSelected.getWidth(),
      _ediBoxWidth = selectedWidth + offsetX; //不走之前的百分比计算了，走老王的算法，不需要判断 
    //if(scale >= 0 && scale <= 100){


    if (scale < 0) scale = 0;
    SingleSelected.setWidth(_ediBoxWidth);
    marginMap.set(`#${id}`, [mTop, offset, mBottom, mLeft]);
    setLayout({
      width: currentEleWidth,
      height: currentEleHeight,
      top: _offsetTop,
      left: _offsetLeft
    });
    const marginRight = marginType(this.systype, 'marginRight');

    let dataGet = Dispatcher.dispatch(`${id}_get`) || {},
      //获取控件数据
      skin = dataGet.component.skin,
      skinType = skin && skin.split(".")[1],
      //获取控件皮肤中，具体的控件类型
      _style = dataGet.data.theme_data.style || {}; //获取控件style数据
    //控件类型为icon按钮和文本按钮时，向右拖拽改变最大宽度数据 


    if (skinType == "button" || skinType == "textBtn") {
      let maxWidth = marginType(this.systype, 'maxWidth');
      let unit = _style[`${maxWidth}Unit`] || "%";
      let scaleWidth = _style[maxWidth] || 100;

      if (unit != "px") {
        window.public.unit.selector = `#${id}`;
        offsetX = window.public.unit[unit](offsetX, unit); //把拖拽的值 ，已经单位值的转换
      } //老宽度加上新改变的值 ，保留一位小数


      let newScaleWidth = (parseFloat(scaleWidth) + parseFloat(offsetX)).toFixed(1);

      if (unit == "%") {
        if (newScaleWidth > 100) {
          newScaleWidth = 100;
        }

        if (newScaleWidth < 1) {
          newScaleWidth = 1;
        }
      }

      Dispatcher.dispatch(`${id}_set`, {
        args: [`theme_data.style.${maxWidth}`, newScaleWidth]
      });
    } else {
      let unit = _style[`${marginRight}Unit`] || "%";

      if (unit != "px") {
        window.public.unit.selector = `#${id}`;
        scale = window.public.unit[unit](scale, unit);
      }

      Dispatcher.dispatch(`${id}_set`, {
        args: [`theme_data.style.${marginRight}`, scale]
      });
    } //}   

  }
  /**
    *拖拽right值处理
    * 
    * @param {type} 
    * @return: 
    */
  positionDragRightV2({
    currentEle,
    offsetX,
    id,
    setLayout
  }) {
    let {
      top: _offsetTop,
      left: _offsetLeft
    } = currentEle.getBoundingClientRect();
    _offsetTop += this.iframeWindow.scrollY;
    const {
      parentNode: {
        offsetWidth: pwidth
      }
    } = currentEle,
      selectedWidth = SingleSelected.getWidth(),
      diffLeft = pwidth - selectedWidth,
      [mTop, mRight, mBottom, mLeft] = marginMap.get(`#${id}`),
      boundaryValue = mLeft + mRight;
    let offsetLeft = offsetX + mLeft,
      offsetRight,
      scaleLeft = 0,
      scaleRight = 0;

    if (offsetLeft <= 0) {
      //左边临界
      offsetLeft = 0;
      offsetRight = boundaryValue;
      scaleRight = offsetRight; //this.getScale(offsetRight,pwidth);
    } else if (offsetLeft >= diffLeft) {
      //右边临界
      offsetLeft = boundaryValue;
      offsetRight = 0;
      scaleLeft = offsetLeft; //this.getScale(offsetLeft,pwidth);
    } else {
      //中间
      offsetRight = -offsetX + mRight;
      scaleLeft = offsetLeft; //this.getScale(offsetLeft,pwidth);

      scaleRight = offsetRight; //this.getScale(offsetRight,pwidth);
    }

    marginMap.set(`#${id}`, [mTop, offsetRight, mBottom, offsetLeft]);
    setLayout({
      left: _offsetLeft,
      top: _offsetTop,
      width: selectedWidth,
      height: currentEle.offsetHeight
    });
    const marginLeft = marginType(this.systype, 'marginLeft'),
      marginRight = marginType(this.systype, 'marginRight');

    let dataGet = Dispatcher.dispatch(`${id}_get`) || {},
      //获取控件数据
      _style = dataGet.data.theme_data.style || {}; //获取控件style数据


    let unitLeft = _style[`${marginLeft}Unit`] || "%";

    if (unitLeft != "px") {
      window.public.unit.selector = `#${id}`;
      scaleLeft = window.public.unit[unitLeft](scaleLeft, unitLeft);
    }

    let unitRight = _style[`${marginRight}Unit`] || "%";

    if (unitRight != "px") {
      window.public.unit.selector = `#${id}`;
      scaleRight = window.public.unit[unitRight](scaleRight, unitRight);
    }

    let style = {
      [marginLeft]: scaleLeft,
      [marginRight]: scaleRight
    };
    Dispatcher.dispatch(`${id}_set`, {
      args: ['theme_data.style.', style]
    });
  }
  /**
   *拖拽TopLeft值处理
   * 
   * @param {type} 
   * @return: 
   */
  positionDragTopLeft({
    x,
    offsetX,
    offsetY,
    currentEle,
    id,
    setLayout
  }) {
    let {
      top: _offsetTop,
      left: _offsetLeft,
      width,
      height,
      right: _right,
      bottom
    } = currentEle.getBoundingClientRect();
    _offsetTop += this.iframeWindow.scrollY;
    let {
      parentNode: {
        offsetWidth: pwidth
      }
    } = currentEle,
      selectedWidth = SingleSelected.getWidth(),
      diffLeft = pwidth - selectedWidth,
      [mTop, mRight, mBottom, mLeft] = marginMap.get(`#${id}`),
      boundaryValue = mLeft + mRight; //框架内拖拽X值

    let _iframeX = offsetX;

    if (this.systype != 'mo') {
      const horSide = adsorptionv3.horizontalHandle(offsetX, _offsetLeft, _right, width);

      if (horSide === false) {
        _iframeX = 0;
      } else if (Array.isArray(horSide)) {
        _iframeX = horSide[0];
        _offsetLeft = horSide[1];
      }

      const verSide = adsorptionv3.verticalHandle(offsetY, _offsetTop, bottom, height);

      if (verSide === false) {
        offsetY = 0;
      } else if (Array.isArray(verSide)) {
        offsetY = verSide[0];
        _offsetTop = verSide[1] += this.iframeWindow.scrollY;
      }
    }

    let offsetLeft = _iframeX + mLeft,
      _mTop = offsetY + mTop,
      offsetRight,
      scaleLeft = 0,
      scaleRight = 0,
      scaleTop = _mTop; //this.getScale(_mTop,pwidth);


    if (offsetLeft <= 0) {
      //左边临界
      offsetLeft = 0;
      offsetRight = boundaryValue;
      scaleRight = offsetRight; //this.getScale(offsetRight,pwidth);
    } else if (offsetLeft >= diffLeft) {
      //右边临界
      offsetLeft = boundaryValue;
      offsetRight = 0;
      scaleLeft = offsetLeft; //this.getScale(offsetLeft,pwidth);
    } else {
      //中间
      offsetRight = -_iframeX + mRight;
      scaleLeft = offsetLeft; //this.getScale(offsetLeft,pwidth);

      scaleRight = offsetRight; //this.getScale(offsetRight,pwidth);
    }

    if (scaleTop < 0) {
      scaleTop = 0;
    }

    marginMap.set(`#${id}`, [_mTop, offsetRight, mBottom, offsetLeft]);
    const marginLeft = marginType(this.systype, 'marginLeft'),
      marginRight = marginType(this.systype, 'marginRight'),
      marginTop = marginType(this.systype, 'marginTop');

    let dataGet = Dispatcher.dispatch(`${id}_get`) || {},
      //获取控件数据
      skin = dataGet.component.skin,
      skinType = skin && skin.split(".")[1],
      //获取控件皮肤中，具体的控件类型   
      _style = dataGet.data.theme_data.style || {}; //获取控件style数据


    let unitLeft = _style[`${marginLeft}Unit`] || "%";

    if (unitLeft != "px") {
      window.public.unit.selector = `#${id}`;
      scaleLeft = window.public.unit[unitLeft](scaleLeft, unitLeft);
    }

    let unitRight = _style[`${marginRight}Unit`] || "%";

    if (unitRight != "px") {
      window.public.unit.selector = `#${id}`;
      scaleRight = window.public.unit[unitRight](scaleRight, unitRight);
    }

    let unitTop = _style[`${marginTop}Unit`] || "%";

    if (unitTop != "px") {
      window.public.unit.selector = `#${id}`;
      scaleTop = window.public.unit[unitTop](scaleTop, unitTop);
    }

    let style = {
      [marginLeft]: scaleLeft,
      [marginRight]: scaleRight,
      [marginTop]: scaleTop
    }; //控件类型为icon按钮和文本按钮时，只改变marginLeft就可以  

    if (skinType == "button" || skinType == "textBtn") {
      let styleMarginLeft = _style[marginLeft],
        styleMarginRight = _style[marginRight];

      if (styleMarginLeft == 'auto' && styleMarginRight == 'auto') {
        style = {
          [marginTop]: scaleTop
        };
      } else if (styleMarginRight == 'auto') {
        style = {
          [marginLeft]: scaleLeft,
          [marginTop]: scaleTop
        };
      } else if (styleMarginLeft == 'auto') {
        style = {
          [marginRight]: scaleRight,
          [marginTop]: scaleTop
        };
      }
    }

    Dispatcher.dispatch(`${id}_set`, {
      args: ['theme_data.style.', style]
    });
    setLayout({
      left: _offsetLeft,
      top: _offsetTop,
      width: selectedWidth,
      height: currentEle.offsetHeight
    });
  }
  /**
   *拖拽BottomRight值处理
   * 
   * @param {type} 
   * @return: 
   */
  positionDragBottomRight({
    angle,
    offsetX,
    currentEle,
    id,
    setLayout
  }) {
    let operation1, operation2;

    if (angle >= 90 && angle <= 180) {
      operation1 = 1;
      operation2 = -1;
    } else if (angle >= -90 && angle <= 0) {
      operation1 = -1;
      operation2 = 1;
    }

    let {
      top: _offsetTop,
      left: _offsetLeft
    } = currentEle.getBoundingClientRect();
    _offsetTop += this.iframeWindow.scrollY;
    const {
      offsetWidth: width,
      offsetHeight: height
    } = currentEle;
    const [mTop, mRight, mBottom, mLeft] = marginMap.get(`#${id}`);

    const _offsetX = Math.abs(offsetX);

    let selectedWidth = SingleSelected.getWidth(),
      selectedX = SingleSelected.getX(),
      diff = _offsetX * 2,
      left = selectedX + operation1 * _offsetX,
      _ediBoxWidth = selectedWidth + operation2 * diff,
      _mLeft = mLeft - offsetX,
      _mRight = mRight - offsetX,
      leftScale = _mLeft,
      //this.getScale(_mLeft,currentEle.parentNode.offsetWidth),//margin比例
      rightScale = _mRight; //this.getScale(_mRight,currentEle.parentNode.offsetWidth);//margin比例


    marginMap.set(`#${id}`, [mTop, _mRight, mBottom, _mLeft]);

    if (leftScale <= 0) {
      leftScale = 0;
    }

    if (rightScale <= 0) {
      rightScale = 0;
    } //if(leftScale <= 49.9 && rightScale <= 49.9){


    SingleSelected.setWidth(_ediBoxWidth);
    SingleSelected.setX(left);
    setLayout({
      left: _offsetLeft,
      top: _offsetTop,
      height,
      width
    });
    const marginLeft = marginType(this.systype, 'marginLeft'),
      marginRight = marginType(this.systype, 'marginRight');

    let dataGet = Dispatcher.dispatch(`${id}_get`) || {},
      //获取控件数据
      _style = dataGet.data.theme_data.style || {}; //获取控件style数据


    let unitLeft = _style[`${marginLeft}Unit`] || "%";

    if (unitLeft != "px") {
      window.public.unit.selector = `#${id}`;
      leftScale = window.public.unit[unitLeft](leftScale, unitLeft);
    }

    let unitRight = _style[`${marginRight}Unit`] || "%";

    if (unitRight != "px") {
      window.public.unit.selector = `#${id}`;
      rightScale = window.public.unit[unitRight](rightScale, unitRight);
    }

    let style = {
      [marginLeft]: leftScale,
      [marginRight]: rightScale
    };
    Dispatcher.dispatch(`${id}_set`, {
      args: ['theme_data.style.', style]
    }); //}
  }
  /**
   * 上/左边距拖动结束
   * 
   * @param {type} 
   * @return: void
   */
  positionEnd(oldLeft, oldTop, event) {
    const {
      currentTarget: target
    } = event;
    target.onmousemove = target.onmouseup = null;
    if (window.public.type == 'pc') adsorptionv3.clearLightColor(); //清除辅助线高亮状态// 调整属性面板的位置

    const dom = document.querySelector('#select-box .ediBox');
    const panelDom = document.querySelector('#property-buttons .functionBox');

    if (dom && panelDom) {
      const {
        left,
        top
      } = panelDom.style;
      const {
        left: newLeft,
        top: newTop
      } = dom.style;
      const changeLeft = parseFloat(left) + (parseFloat(newLeft) - parseFloat(oldLeft));
      const changeTop = parseFloat(top) + (parseFloat(newTop) - parseFloat(oldTop));
      panelDom.style.left = `${changeLeft}px`;
      panelDom.style.top = `${changeTop}px`;
    }

    const domList = document.querySelectorAll('.functionBox');
    (domList || []).forEach(item => {
      item.style.opacity = 1;
    });
  }
  /**
   * 获取比例
   * 
   * @param {type} 
   * @return: void
   */
  getScale(value, baseWidth) {
    return value / baseWidth * 100;
  }
  /**
  * 获取某元素以浏览器左上角为原点的坐标
  * 
  * @param {obj} 传入节点
  * @return: void
  */
  getPoint(obj) {
    let t = 0,
      l = 0;

    do {
      t += obj.offsetTop; //获取该元素对应父容器的上边距  

      l += obj.offsetLeft; //对应父容器的上边距  

      obj = obj.offsetParent;
    } while (obj);

    return {
      top: t,
      left: l
    };
  }

}
export { SelectBox }