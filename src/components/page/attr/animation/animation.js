__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Animation {
  constructor(controler) {
    _defineProperty(this, "list", () => {
      return [{
        name: "noAnimation",
        value: "无动画"
      }, {
        name: "rebound",
        value: "左侧滑入"
      }, {
        name: "slide",
        value: "右侧滑入"
      }, {
        name: "fadeIn",
        value: "淡入"
      }, {
        name: "open",
        value: "中心放大"
      }, {
        name: "screwing",
        value: "旋转进入"
      }, {
        name: "flyInto",
        value: "右侧飞入"
      }, {
        name: "toChangeInto",
        value: "转入"
      }, {
        name: "arcSpinIn",
        value: "电弧旋入"
      }, {
        name: "inhalation",
        value: "吸入"
      }, {
        name: "foldBack",
        value: "折叠打开"
      }, {
        name: "flip",
        value: "翻转"
      }, {
        name: "reveal",
        value: "揭示 "
      }, {
        name: "topslide",
        value: "上部滑入"
      }, {
        name: "bottomslide",
        value: "底部滑入"
      }];
    });

    /**@property controler 动画控制器实例 */
    this.controler = controler;
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} state 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }

  /**
   * @method render 组件渲染方法
   * @author sxt
   * @return {object} 待渲染的组件对象
   */
  render() {
    const {
      setting,
      on,
      className,
      duration,
      delay,
      angle,
      offsetDistance,
      name,
      value
    } = this.state;
    return setting ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "contorlBtn returnBtn",
      onClick: () => this.controler.setting(false)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "<"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("font", {
      id: "animationClose"
    }, "\u8FD4\u56DE")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      className: "hr-short"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "aniSty"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      "data-name": name
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, value), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "stopBtn",
      onClick: this.controler.animationPlay
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "aa"
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      className: "hr-short"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "pcConAttDesign"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Range, {
      title: "duration",
      max: 10,
      value: duration,
      change: e => this.controler.setRange("duration", e)
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Range, {
      title: "delay",
      max: 10,
      value: delay,
      change: e => this.controler.setRange("delay", e)
    })))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "aniStyles conMain aniCon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: " scrollContent"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, this.list().map((v, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: on == i ? 'on' : '',
      key: `ani_${i}`,
      onClick: () => this.controler.toggleClass(v, i)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      "data-name": v.name,
      "data-value": v.value
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, v.value)))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "scrollbar"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      "data-scrolltop": "0"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "panlBottom"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: `contorlBtn  ${on > 0 ? '' : 'noSelection'}`,
      onClick: () => this.controler.setting(true)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("font", null, "\u8BBE\u7F6E"))));
  }

}

//# sourceURL=webpack:///./components/page/attr/animation/animation.js?