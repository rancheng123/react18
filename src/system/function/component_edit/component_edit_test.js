__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentEdit", function() { return ComponentEdit; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _single_ConfigBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./single/ConfigBtn */ "./system/function/component_edit/single/ConfigBtn.js");


/**
 * @class {ComponentEdit} 控件编辑类
 
 * @version 1.0
 * @date 2019-10-30
 */

class ComponentEdit {
  constructor(controler) {
    /**@property controler 控件编辑控制器实例 */
    this.controler = controler; //hover绑定this

    this.hover = this.hover.bind(this);
    this.hoverBtn = this.hoverBtn.bind(this);
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
   * @method render 挂载组件方法
   * @date 2019-10-30
   
   * @return {object} 待渲染的组件对象
   */
  //onMouseDown = {this.state.hover ?null:this.controler.mousedown.bind(this.controler)}


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "selected-mask",
      style: {
        height: this.props.height
      },
      onMouseMove: this.state.ismove ? this.controler.hover.bind(this.controler) : null,
      onMouseDown: this.controler.mousedown.bind(this.controler)
    }, this.state.hidden == false ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.hover, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "component-selected"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onMouseMove: e => e.stopPropagation(),
      onMouseDown: e => e.stopPropagation()
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "property-parent-buttons",
      className: "editControl"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "property-buttons",
      className: "editControl"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "select-parent-box"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "select-box"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "component-menu"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.controler.menu, {
      node: (this.controler.selected || {}).node
    }))) : null);
  }
  /**
   * @method hoverBox 鼠标滑过提示框结构
   * @date 2019-10-30
   
   * @param {object} props 参数对象 
   */


  hoverBox({
    data,
    index
  }) {
    if (data) {
      const {
        layout
      } = data; //layout.top-=1;

      const cls = index === 0 ? 'contHovBox' : 'contHovBox cellHoverbox';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cls,
        style: layout
      });
    }

    return null;
  }
  /**
   * @method hoverBox 鼠标滑过提示框结构
   * @date 2019-10-30
   
   * @param {object} props 参数对象 
   */


  hoverBtn({
    data,
    index
  }) {
    if (data) {
      if (data.absolute) {
        const {
          absolute: {
            left,
            top,
            name,
            fixedWidth,
            itemWidth,
            items
          },
          current: {
            hidden
          }
        } = data; //    console.log(items,"结构中items");

        return items.length && hidden != 1 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_single_ConfigBtn__WEBPACK_IMPORTED_MODULE_1__["ConfigBtnWaper"], {
          style: {
            left,
            top
          },
          name: name,
          index: index,
          fixedWidth: fixedWidth
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
          className: "functionUL",
          style: {
            width: itemWidth
          }
        }, items.map(({
          name,
          type,
          hidden,
          current,
          selected,
          show,
          className = type
        }, i) => {
          if (hidden != true) {
            //判断控件是否在指定条件下显示
            if (show && !this.controler.isShow(data, show)) {
              return null;
            }

            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_single_ConfigBtn__WEBPACK_IMPORTED_MODULE_1__["ConfigButton"], {
              select: selected,
              key: i,
              current: current,
              name: name,
              type: type,
              className: className,
              mousedown: this.controler.hoverDown.bind(this.controler, type)
            });
          }

          return null;
        }))) : null;
      }

      return null;
    }

    return null;
  }
  /**
   * @method hover 鼠标滑过结构
   * @date 2019-10-30
   
   * @return {object} 滑过结构
   */


  hover() {
    if (this.state.hover) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "component-hover"
      }, this.state.hover.map((data, i) => {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.hoverBox, {
          key: i,
          index: i,
          data: data
        });
      }), this.state.hover.map((data, i) => {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.hoverBtn, {
          key: i,
          index: i,
          data: data
        });
      }));
    }

    return null;
  }

}

//# sourceURL=webpack:///./system/function/component_edit/component_edit_test.js?