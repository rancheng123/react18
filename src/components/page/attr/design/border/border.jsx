__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Border", function() { return Border; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");


/**
 * @class {Border} 边框视图类
 * @author wyq
 * @version 1.0
 * @date 2019-10-30
 */

class Border {
  constructor(controler) {
    /**@property controler 边框控制器实例 */
    this.controler = controler;
    this.clear = this.clear.bind(this);
    this.style = this.style.bind(this);
    this.color = this.color.bind(this);
    this.width = this.width.bind(this);
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
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pcBorderBox"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.clear, null), this.props.list.map(e => {
      const className = e.replace("der", "");
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "borderStyleUl",
        key: e
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `borderDiv ${className}div`
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.style, {
        name: className
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.color, {
        name: className
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.width, {
        name: className
      })));
    }));
  }

  clear() {
    const clear = this.controler.clear.bind(this.controler);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "borderStyleUl"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "borderDiv",
      onClick: clear
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, window.public.lang["resetBorder"]));
  }
  /**
   * @method borderColor 边框颜色结构
   * @date 2019-10-30 
   * @author wyq
   * @param {object} prop 属性对象
   * @param {string} prop.name 边框名称
   * @return {object} 边框颜色结构
   */


  color(prop) {
    const key = this.props.prefix + prop.name;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ColorPicker, {
      id: key,
      basic: true,
      color: this.state[`${key}Color`] || this.state[`${prop.name}Color`] || 'rgba(0,0,0)',
      change: this.controler.set.bind(this.controler, "Color", key)
    });
  }
  /**
   * @method borderColor 边框宽度结构
   * @date 2019-10-30 
   * @author wyq
   * @param {object} prop 属性对象
   * @param {string} prop.name 边框名称
   * @return {object} 边框宽度结构
   */


  width(prop) {
    const key = this.props.prefix + prop.name;
    let defBorder = this.state[`${key}Width`];
    let borderWidth = defBorder || this.state[`${prop.name}Width`] || 0; //当前的border宽度设置为0时，不再读取默认的border宽度  sxt 2021-1-13

    if (defBorder === 0) {
      borderWidth = 0;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Range, {
      id: key,
      max: 50,
      basic: true,
      unit: "px",
      value: borderWidth,
      change: this.controler.set.bind(this.controler, "Width", key, '')
    });
  }
  /**
   * @method borderStyle 边框样式结构
   * @date 2019-10-30 
   * @author wyq
   * @param {object} prop 属性对象
   * @param {string} prop.name 边框名称
   * @return {object} 边框样式结构
   */


  style(prop) {
    const lang = window.public.lang;
    const key = this.props.prefix + prop.name;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Select, {
      id: key,
      basic: true,
      value: this.state[`${key}Style`] || this.state[`${prop.name}Style`],
      list: [{
        name: lang.solid,
        value: "solid"
      }, {
        name: lang.dashed,
        value: "dashed"
      }, {
        name: lang.dotted,
        value: "dotted"
      }],
      change: this.controler.set.bind(this.controler, "Style", key, '')
    });
  }

}

//# sourceURL=webpack:///./components/page/attr/design/border/border.js?