__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Space", function() { return Space; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");


/**
 * @class {Space} 间距视图类
 * @author wyq
 * @version 1.0
 * @date 2020-05-18
 */

class Space {
  constructor(controler) {
    /**@property controler 间距控制器实例 */
    this.controler = controler; //unit 绑定this，实现伪继承

    this.unit = this.props.publicAttr.unit.bind(this);
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
   * @author wyq
   * @date 2020-05-18
   * @return {object} 待渲染的组件对象
   */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "design-space"
    }, this.props.list.map((e, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "pcAttList",
      key: i
    }, this[e] && this[e]())));
  }
  /**
   * @method columnSpace 列间距
   * @author wyq
   * @date 2020-05-18
   * @return {object} 列间距结构
   */


  columnSpace() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.unit, {
      id: "columnSpace",
      title: "columnSpace",
      sname: "colspacing",
      uname: "colspacingUnit",
      disabled: this.props.disableUnit
    });
  }
  /**
   * @method rowSpace 行间距
   * @author wyq
   * @date 2020-05-18
   * @return {object} 行间距结构
   */


  rowSpace() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.unit, {
      id: "rowSpace",
      title: "rowSpace",
      sname: "rowspacing",
      uname: "rowspacingUnit",
      disabled: this.props.disableUnit
    });
  }
  /**
   * @method innerspacing 内间距
   * @date 2020-05-20
   * @author wyq
   * @return {object} 内间距结构
   */


  innerspacing() {
    var _this$state$key;

    const name = "innerSpace";
    const key = this.props.prefix + name;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Range, {
      id: "innerspacing",
      title: "innerspacing",
      unit: "px",
      min: 0,
      max: 30,
      value: (_this$state$key = this.state[key]) !== null && _this$state$key !== void 0 ? _this$state$key : this.state[name],
      change: this.controler.range.bind(this.controler, key)
    });
  }
  /**
  * @method paddingBtm 上下内间距结构
  * @date 2020-05-20
  * @author sxt
  * @return {object} 上下内间距结构
  */


  paddingBtm() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.unit, {
      id: "paddingBtm",
      title: "paddingBtm",
      sname: "paddingBtm",
      uname: "paddingBtmUnit",
      disabled: this.props.disableUnit
    });
  }
  /**
   * @method paddingRit 左右内间距结构
   * @date 2020-05-20
      * @author sxt
   * @return {object} 左右内间距结构
   */


  paddingRit() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.unit, {
      id: "paddingRit",
      title: "paddingRit",
      sname: "paddingRit",
      uname: "paddingRitUnit",
      disabled: this.props.disableUnit
    });
  }

}

//# sourceURL=webpack:///./components/page/attr/design/space/space.js?