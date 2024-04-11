__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Basic", function() { return Basic; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! widget */ "./system/widgets/widget.js");


/**
 * @class {Basic} 基本属性视图类
 * @author wyq
 * @version 1.0
 * @date 2019-10-30
 */

class Basic {
  constructor() {}
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
   * @date 2019-11-11
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    let groupList = this.state.groupList || [];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pc-basic-setting"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "pcConAttDesign"
    }, groupList.map(e => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: e,
      className: "pcAttList"
    }, this[e] && this[e]()))));
  }
  /**
  * @method link 设置链接
  * @author sxt
  * @param {object} 设置链接结构。
  */


  link() {
    const {
      state: {
        link
      }
    } = this;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].ShowInfo, {
      title: "setUpLink",
      id: "set-up-link",
      value: link ? link.value : window.public.lang["addButtonLink"],
      click: this.controler.link.bind(this.controler)
    });
  }
  /**
    * @method Anchor 锚点
    * @author Lby
    * @return {object} 锚点
    * @date    2020-04-16 11:41
    */


  anchorSet() {
    let content = this.controler.getParentType(this.props.node, "em-PageContent");

    if (content) {
      let isParentList = this.state.isParentList;

      if (isParentList) {
        //控件在列表中时，不需要锚点属性，预览列表中的控件是没id的 sxt 
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Radio, {
        title: "anchor",
        id: "",
        list: [{
          name: "openTurn",
          value: "true"
        }, {
          name: "closeOff",
          value: "false"
        }],
        value: this.state.anchor || false,
        change: this.controler.setAnchor.bind(this.controler, "anchor")
      });
    }
  }

  controlsName() {
    let value = this.state.componentName;
    let componentName = this.state.componentType; //slice(3)
    // console.log(componentName.slice(3))

    let componentId = this.props.id;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Input, {
      value: value || "",
      title: 'controlsName',
      placeholder: `${window.public.getName(componentName)}(${componentId})`,
      change: this.controler.setControlsName.bind(this.controler, 'componentName')
    });
  }
  /**
   * @method align 对齐方式
   * @date 2020-06-01
   * @author wyq
   * @return {object} 对齐结构
   */


  align(props = {
    title: 'btnAlign'
  }) {
    var _ref, _state$;

    const {
      props: {
        prefix
      },
      state
    } = this;
    const align = (_ref = (_state$ = state[`${prefix}align`]) !== null && _state$ !== void 0 ? _state$ : state.align) !== null && _ref !== void 0 ? _ref : 'center';
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(widget__WEBPACK_IMPORTED_MODULE_1__["Widget"].Align, {
      id: "btnAlign",
      title: props.title,
      value: align,
      change: this.controler.setAlign.bind(this.controler)
    });
  }

}

//# sourceURL=webpack:///./components/page/attr/basic/basic.js?