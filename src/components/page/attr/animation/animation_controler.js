__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationControler", function() { return AnimationControler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animation */ "./components/page/attr/animation/animation.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * @Description: 动画控制器
 * @Author: ningfei
 * @Date: 2020-01-03 09:39:04
 * @LastEditors: ningfei
 * @LastEditTime: 
 */

class AnimationControler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    _defineProperty(this, "config", () => {
      return {
        noAnimation: {
          className: "aNone",
          newClassName: "new-aNone",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        rebound: {
          className: "aBounce-In",
          newClassName: "new-aBounce-In",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        slide: {
          className: "aGlide-In",
          newClassName: "new-aGlide-In",
          setting: {
            angle: 90,
            offsetDistance: 200,
            translateX: -200,
            translateY: 0
          }
        },
        fadeIn: {
          className: "aFade-In",
          newClassName: "new-aFade-In",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        // float:{
        //     className:"aFloat-In",
        //     newClassName:"new-aFloat-In",
        //     setting:{
        //      angle:270,offsetDistance:200,
        //      translateX:200,translateY:0}
        // },
        open: {
          className: "aExpand-In",
          newClassName: "new-aExpand-In",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        screwing: {
          className: "aSpin-In",
          newClassName: "new-aSpin-In",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        flyInto: {
          className: "aFly-In",
          newClassName: "new-aFly-In",
          setting: {
            angle: 270,
            offsetDistance: 600,
            translateX: 600,
            translateY: 0
          }
        },
        toChangeInto: {
          className: "aTurn-In",
          newClassName: "new-aTurn-In",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        arcSpinIn: {
          className: "aArc-In",
          newClassName: "new-aArc-In",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        inhalation: {
          className: "aPuff-In",
          newClassName: "new-aPuff-In",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        foldBack: {
          className: "aFold-In",
          newClassName: "new-aFold-In",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        flip: {
          className: "aFlip-In",
          newClassName: "new-aFlip-In",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        reveal: {
          className: "aReveal",
          newClassName: "new-aReveal",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        topslide: {
          className: "topslide",
          newClassName: "new-topslide",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        },
        bottomslide: {
          className: "bottomslide",
          newClassName: "new-topslide",
          setting: {
            delay: "",
            angle: "",
            offsetDistance: "",
            translateX: "",
            translateY: ""
          }
        } //			in:{
        //				className:"aSlide-In",
        //				newClassName:"new-aSlide-In",
        //				setting:{
        //				 angle:90,offsetDistance:200,
        //				 translateX:-200,translateY:0}
        //			}

      };
    });

    _defineProperty(this, "animationPlay", () => {
      const {
        className,
        delay,
        duration,
        dom
      } = this.state;
      dom.style.animationDelay = delay + 's';
      dom.style.animationDuration = duration + 's';
      dom.setAttribute('data-name', className);
      dom.onanimationend = this.animationEnd;
    });

    _defineProperty(this, "animationEnd", () => {
      const {
        dom
      } = this.state;
      dom.removeAttribute('data-name');
      dom.style.animationDelay = '';
      dom.style.animationDuration = '';
      dom.style.transform = '';
      dom.onanimationend = null;
    });

    this.init();
    /**@property {Link} view 初始化 view 实例*/

    this.view = new _animation__WEBPACK_IMPORTED_MODULE_3__["Animation"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
    const frame_document = document.getElementById("iframe").contentWindow.document;
    const div = frame_document.querySelector(`#${this.props.id}`);
    const defaultData = {
      "className": "aNone",
      "duration": 1,
      "delay": 0,
      "angle": 90,
      "offsetDistance": 200,
      "translateX": "",
      "translateY": "",
      "name": "noAnimation",
      "value": "无动画"
    };
    const {
      data
    } = dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_get`);
    let animation_data = data.animation_data || false;

    if (!animation_data) {
      animation_data = defaultData;
      dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch('addData', {
        args: [this.props.id, `animation_data.${this.props.id}`, defaultData]
      });
    }

    let o = 0;
    const cls = animation_data.className || 'aNone';
    let i = Object.values(this.config()).findIndex(v => v.className === cls);
    if (i) o = i;
    this.state = { ...animation_data,
      dom: div,
      on: o,
      setting: false
    };
  }
  /**
   * @Description: 动画样式项
   * @Author: ningfei
   * @Return: object
   * @Date: 2020-01-03 18:37:15
   * @LastEditors: ningfei
   * @LastEditTime: 
   */


  /**
   * @Description: 渲染视图
   * @Param: {opts} 组件参数
   * @Author: ningfei
   * @Return: 
   * @Date: 2020-01-03 18:38:04
   * @LastEditors: ningfei
   * @LastEditTime: 
   */
  static animation(opts) {
    const {
      node,
      element
    } = opts;
    react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this, {
      id: node.current.id,
      node: node
    }), element);
  }
  /**
   * @Description: 挂载组件方法
   * @Author: ningfei
   * @Return: Animation
   * @Date: 2020-01-03 09:39:36
   * @LastEditors: ningfei
   * @LastEditTime: 
   */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.view.render, null);
  }
  /**
   * @Description: 组件挂载前初始化方法,整个生命周期内只执行一次
   * @Author: ningfei
   * @Return: void
   * @Date: 2020-01-03 09:40:14
   * @LastEditors: ningfei
   * @LastEditTime: 
   */


  init() {} // const fnName = `${this.props.id}_get`
  // const {data:{document_data}} = Dispatcher.dispatch(fnName);

  /**
   * @Description: 切换动画样式
   * @Param: {v} 选择动画项
   * @Param: {key} 选择动画项索引
   * @Author: ningfei
   * @Return: void
   * @Date: 2020-01-03 18:39:53
   * @LastEditors: ningfei
   * @LastEditTime: 
   */


  toggleClass(v, key) {
    const data = this.state;
    const {
      dom
    } = data;
    const c = this.config()[v.name];
    data.className = c.className;
    data.name = v.name;
    data.value = v.value;
    this.setState({ ...data,
      on: key
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`animation_data.className`, c.className]
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`animation_data.name`, v.name]
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`animation_data.value`, v.value]
    });
    dom.setAttribute('data-name', c.className);
    dom.onanimationend = this.animationEnd;
  }
  /**
   * @Description: 弹出设置框
   * @Param: bool {val}
   * @Author: ningfei
   * @Return: void
   * @Date: 2020-01-03 18:40:58
   * @LastEditors: ningfei
   * @LastEditTime: 
   */


  setting(val) {
    this.setState({
      setting: val
    });
  }
  /**
   * @Description: 滑块组件
   * @Param: key 设置项键
   * @Param: e 事件对象
   * @Author: ningfei
   * @Return: void
   * @Date: 2020-01-03 18:41:32
   * @LastEditors: ningfei
   * @LastEditTime: 
   */


  setRange(key, e) {
    // const animation = this.state;
    // if(key === 'offsetDistance') {
    //     let _angle=animation.angle,
    // 	_x = parseInt(e.target.value * Math.sin(- _angle* Math.PI / 180)),
    // 	_y = parseInt(e.target.value * Math.cos(-_angle * Math.PI / 180));
    //     animation.translateX=_x;
    //     animation.translateY=_y;
    // }
    this.setState({
      [key]: e.target.value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`animation_data.${key}`, e.target.value]
    });
  }
  /**
   * @Description: 动画开始
   * @Author: ningfei
   * @Date: 2020-01-03 18:44:54
   * @LastEditors: ningfei
   * @LastEditTime: 
   */


  /**
   * @Description: 旋转开始
   * @Param: event 事件对象
   * @Author: ningfei
   * @Date: 2020-01-04 11:13:40
   * @LastEditors: ningfei
   * @LastEditTime: 
   */
  start(event) {
    const {
      currentTarget: target
    } = event;
    const {
      left,
      top,
      width
    } = target.getBoundingClientRect();
    let opts = {
      x: left,
      y: top,
      radius: width / 2
    }; //绑定mousemove事件

    target.onmousemove = this.drag.bind(this, opts); //绑定mouseup事件

    target.onmouseup = this.end.bind(this, opts);
    event.stopPropagation();
  }
  /**
   * @Description: 旋转进行中
   * @Param: opts 初始角度
   * @Param: event 事件对象
   * @Author: ningfei
   * @Date: 2020-01-04 11:14:23
   * @LastEditors: ningfei
   * @LastEditTime: 
   */


  drag(opts, event) {
    const {
      pageX,
      pageY
    } = event,
          {
      y,
      x,
      radius
    } = opts; //通过坐标计算角度

    opts.deg = this.deg(pageX - x - radius, pageY - y - radius);
    const animation = this.state;
    animation.angle = opts.deg;

    let _angle = animation.angle,
        _x = parseInt(opts.deg * Math.sin(-_angle * Math.PI / 180)),
        _y = parseInt(opts.deg * Math.cos(-_angle * Math.PI / 180));

    animation.translateX = _x;
    animation.translateY = _y;
    this.setState({ ...animation
    });
  }
  /**
   * @Description: 拖拽结束
   * @Param: opts 初始角度
   * @Param: event 事件对象
   * @Author: ningfei
   * @Date: 2020-01-04 11:15:22
   * @LastEditors: ningfei
   * @LastEditTime: 
   */


  end(opts, event) {
    const target = event.currentTarget; //取消绑定事件

    target.onmousemove = target.onmouseup = null;
    const animation = this.state;
  }
  /**
   * @Description: 计算角度
   * @Param: 
   * @Author: ningfei
   * @Date: 2020-01-04 11:15:42
   * @LastEditors: ningfei
   * @LastEditTime: 
   */


  deg(x, y) {
    let deg = 0; //只有x坐标或y坐标不等于零，才计算角度

    if (x != 0 || y != 0) {
      deg = Math.atan2(Math.floor(y), Math.floor(x)) * 180 / Math.PI;
      deg = deg >= -90 && deg <= 180 ? 90 + deg : 360 + (90 + deg);
    }

    return Math.round(deg);
  }

}

//# sourceURL=webpack:///./components/page/attr/animation/animation_controler.js?