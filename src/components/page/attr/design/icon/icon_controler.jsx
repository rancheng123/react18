__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconControler", function() { return IconControler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon */ "./components/page/attr/design/icon/icon.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class IconControler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Link} view 初始化 view 实例*/

    this.view = new _icon__WEBPACK_IMPORTED_MODULE_3__["Icon"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  /**
  * @static icon 创建文本属性
  * @author sxt 
  * @date 2019-09-30
  * @param {object} opts 参数列表
  * @param {object} opts 参数列表
  * @param {object} opts.element 节点对象
  * @param {object} opts.group 属性配置项
  * @param {object} opts.node 控件对象
  * @param {string} opts.prefix 拼接前缀
  * @param {PublicAttribute} opts.publicAttr 共用属性实例
  * @param {boolean} opts.disableUnit 禁止选择单位
  */
  static icon(opts = {}) {
    const {
      group,
      node,
      element,
      prefix,
      publicAttr,
      disableUnit
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      let list = this.LIST;

      if (group) {
        list = window.public.configure(this.LIST, group);
      }

      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IconControler, {
        id: node.current.id,
        node: node,
        prefix: prefix,
        list: list,
        publicAttr: publicAttr,
        disableUnit: disableUnit
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
    const fnName = `${this.props.id}_get`;
    const {
      data: {
        theme_data,
        document_data
      }
    } = dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(fnName);
    this.state = {}; //theme_data数据存在并且存在style数据，则与state合并

    if (theme_data && theme_data.style) {
      this.state = theme_data.style;
    } //icon不区分pc与mo但是区分基本和click sxt 2020-8-20


    let _prefix = `${this.props.prefix}icon`;

    if (_prefix.indexOf("mo") != -1) {
      _prefix = _prefix.replace("mo", "");
    }

    const icon = document_data[_prefix],
          //[`${this.props.prefix}icon`],icon不区分mo和pc  sxt 2020-7-20
    link = document_data.link;
    this.state = Object.assign(this.state, document_data); //把document_data的数据也进行合并

    this.state.prefixIcon = _prefix; //把icon的键值存起来，用于结构中读取icon数据
    //this.state.icon=icon;
    //this.state.link=link;
  }
  /**
   * @method range 滑块拖拽方法
   * @date 2019-11-7
   * @author wyq 
   * @param {string} key 键值
   * @param {event} event 事件对象
   */


  range(key, event) {
    this.set(key, Number(event.target.value || 0));
  }
  /**
   * @method set 设置样式数据
   * @date 2019-11-7
   * @author wyq 
   * @param {string} key 键值
   * @param {string} value 属性值
   */


  set(key, value) {
    this.setState({
      [key]: value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`theme_data.style.${key}`, value]
    });
  }
  /**
  * @method delIcon 删除icon方法
  * @date 2020-04-02
  * @author wyq 
  */


  delIcon(type) {
    let prefixIcon = this.state.prefixIcon;

    if (type == "left") {
      prefixIcon = "lefticon";
    }

    if (type == "right") {
      prefixIcon = "righticon";
    }

    this.setState({
      [prefixIcon]: {}
    }); // let _prefix=`${this.props.prefix}icon`;
    // if(_prefix.indexOf("mo")!=-1){
    //     _prefix=_prefix.replace("mo","");
    // }

    dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_remove`, {
      value: `document_data.${prefixIcon}`
    });
  }
  /**
   * @method setIcon 设置icon方法
   * @date 2020-04-02
   * @author wyq 
   * @param {Object} datas 返回数据
   * @param {event} event 事件对象
   */


  setIcon(type, datas) {
    let prefixIcon = this.state.prefixIcon;

    if (type == "left") {
      prefixIcon = "lefticon";
    }

    if (type == "right") {
      prefixIcon = "righticon";
    }

    this.setState({
      [prefixIcon]: datas
    }); // let _prefix=`${this.props.prefix}icon`;
    // if(_prefix.indexOf("mo")!=-1){
    //     _prefix=_prefix.replace("mo","");
    // }

    dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${prefixIcon}`, datas]
    });
  }
  /**
  * @method showIcon icon显示方法
  * @date 2020-04-02
  * @author wyq 
  * @param {string} key 键值
  * @param {event} event 事件对象
  */


  showIcon(type) {
    __webpack_require__.e(/*! import() */ "resource_manager").then(__webpack_require__.bind(null, /*! ../../../../../system/function/resource/resource_manager */ "./system/function/resource/resource_manager.js")).then(({
      resourceManager
    }) => {
      resourceManager("icon").then(module => {
        module.resource({
          selected: this.setIcon.bind(this, type)
        });
      });
    });
  }
  /**
  * @method link 设置链接
  * @author sxt
  */


  link(type) {
    const promise = Promise.all(/*! import() | link_controler */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("link_controler")]).then(__webpack_require__.bind(null, /*! ../../../../../system/function/link/link_controler */ "./system/function/link/link_controler.js"));
    let linkType = "link";

    if (type == "left") {
      linkType = "leftlink";
    }

    if (type == "right") {
      linkType = "rightlink";
    }

    promise.then(module => {
      module.LinkControler && module.LinkControler.link({
        initialData: this.state[linkType],
        ensure: data => {
          data.value = module.LinkControler.linkText(data);
          this.setState({
            [linkType]: data
          });
          dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: [`document_data.${linkType}`, data]
          });
        }
      });
    });
  }

}

_defineProperty(IconControler, "LIST", ["size", "color"]);

//# sourceURL=webpack:///./components/page/attr/design/icon/icon_controler.js?