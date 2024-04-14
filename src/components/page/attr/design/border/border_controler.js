__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BorderControler", function() { return BorderControler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
/* harmony import */ var _border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./border */ "./components/page/attr/design/border/border.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * @class {BorderControler} 边框控制器类
 * @author wyq
 * @version 1.0
 * @date 2019-10-30
 */

class BorderControler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Border} view 初始化 view 实例*/

    this.view = new _border__WEBPACK_IMPORTED_MODULE_3__["Border"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  /**
   * @static border 边框渲染
   * @author sxt 
   * @date 2019-09-30
   * @param {object} opts 参数列表
   * @param {object} opts.element 节点对象
   */
  static border(opts) {
    const {
      group,
      node,
      element,
      prefix
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      let list = this.LIST;

      if (group) {
        list = window.public.configure(this.LIST, group);
      }

      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BorderControler, {
        id: opts.id || node.current.id,
        node: node,
        prefix: prefix,
        list: list
      }), element);
    }
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-09-30
   * @author sxt
   * @return {object} 待渲染的组件对象
   */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @author 
   */


  init() {
    const key = `${this.props.id}_get`;
    const {
      data: {
        theme_data
      }
    } = dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(key);
    this.state = {}; //theme_data数据存在并且存在style数据，则与state合并

    if (theme_data && theme_data.style) {
      this.state = theme_data.style;
    }
  }
  /**
   * @method set 设置样式数据
   * @date 2019-11-7
   * @author wyq 
   * @param {string} key 键值
   * @param {string} value 属性值
   */


  set(type, key, value, event) {
    //判断值是否存在，不存在则进行赋值    
    if (!value) {
      value = event.target.value;

      if (/^\d+$/g.test(value)) {
        value = Number(value || 0);
      }
    }

    const border = {
      [key + 'Width']: this.state[key + 'Width'] || 1,
      [key + 'Style']: this.state[key + 'Style'] || 'solid',
      [key + 'Color']: this.state[key + 'Color'] || '#000000',
      [key + type]: value
    }; //更新面板ui 

    this.setState({ ...border
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`theme_data.style.`, border]
    });
  }
  /**
   * @method clear 清空边框
   * @date 2019-10-30
   * @author wyq
   */


  clear() {
    this.setState((state, props) => {
      const {
        prefix,
        list
      } = props;

      for (let i = 0, len = list.length; i < len; i++) {
        const name = prefix + list[i].replace("der", "");
        const width = `${name}Width`,
              style = `${name}Style`,
              color = `${name}Color`;
        delete state[width], delete state[style], delete state[color];
        dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_remove`, {
          value: `theme_data.style.${width}`
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_remove`, {
          value: `theme_data.style.${style}`
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_remove`, {
          value: `theme_data.style.${color}`
        });
      }

      return state;
    });
  }

}

_defineProperty(BorderControler, "LIST", ["border", "borderTop", "borderRight", "borderBottom", "borderLeft"]);

//# sourceURL=webpack:///./components/page/attr/design/border/border_controler.js?