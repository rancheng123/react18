__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shadow", function() { return Shadow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");


/**
 * @class {Radius} 圆角视图类
 * @author wyq
 * @version 1.0
 * @date 2019-11-8
 */

class Shadow {
  constructor(controler) {
    /**@property controler 边框控制器实例 */
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
   * @date 2019-11-12
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcTextBox"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "pcConAttDesign"
    }, this.state.isShadow ? this.props.list.map((e, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: i,
      className: "pcAttList"
    }, this[e] && this[e]())) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList"
    }, this.isShadow())));
  }
  /**
  * @method direction 阴影方向属性
  * @date 2019-11-12
  * @author wyq
  * @return {object} 阴影方向属性结构
  */


  direction() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
      className: "pcConAttTitle"
    }, window.public.lang["direction"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcConAttCon"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcConDir"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcCircle",
      style: {
        transform: "rotate(" + this.state.deg + "deg)"
      },
      onMouseDown: this.controler.start.bind(this.controler)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcCirCenter"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcCirKnob"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      className: "slider-number-input",
      placeholder: "0",
      value: this.state.deg,
      onChange: this.controler.range.bind(this.controler, "deg")
    }))));
  }
  /**
   * @method distance 阴影距离属性
   * @date 2019-11-12
   * @author wyq 
   * @return {object} 阴影距离属性结构 
   */


  distance() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Range, {
      title: "distance",
      id: "distance",
      unit: "px",
      max: 50,
      value: this.state.distance,
      change: this.controler.range.bind(this.controler, "distance")
    });
  }
  /**
   * @method size 阴影大小属性
   * @date 2019-11-12
   * @author wyq
   * @return {object} 阴影属性结构
   */


  size() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Range, {
      title: "size",
      id: "size",
      unit: "px",
      max: 50,
      value: this.state.size,
      change: this.controler.range.bind(this.controler, "size")
    });
  }
  /**
   * @method vague 阴影模糊属性
   * @date 2019-11-12
   * @author wyq
   * @return {object} 阴影模糊属性结构
   */


  vague() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Range, {
      title: "vague",
      id: "vague",
      unit: "px",
      max: 50,
      value: this.state.vague,
      change: this.controler.range.bind(this.controler, "vague")
    });
  }
  /**
   * @method color 阴影颜色属性
   * @date 2019-11-12
   * @author wyq
   * @return {object} 阴影颜色属性结构
   */


  color() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ColorPicker, {
      id: "shadowColor",
      title: "shadowColor",
      color: this.state.color,
      change: this.controler.set.bind(this.controler, "color")
    });
  }
  /**
   * @method isShadow 是否启用阴影
   * @date 2019-11-12
   * @author wyq
   * @return {object} 阴影结构
   */


  isShadow() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].OnOff, {
      title: "openShadow",
      checked: this.state.isShadow,
      change: this.controler.isShadow.bind(this.controler)
    });
  }

}
