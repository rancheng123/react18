__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicControler", function() { return BasicControler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");



class BasicControler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
  }
  /**
   * @static button 创建文本属性
   * @author wyq 
   * @date 2019-11-11
   * @param {object} opts 参数列表
   * @param {string} opts.selector css选择器
   * @param {object} opts.element 节点对象
   */


  static basic(opts = {}) {
    const {
      list: group,
      node,
      element,
      config,
      publicAttr
    } = opts; //控件数据与要插入的父级元素是否存在，存在继续执行

    if (node && element) {
      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this, {
        id: node.current.id,
        node: node,
        config: config,
        group: group,
        groupList: this.LIST,
        publicAttr: publicAttr,
        prefix: window.public.type == 'pc' ? '' : 'mo'
      }), element);
    }
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.view.render, null);
  }

  init() {
    const fnName = `${this.props.id}_get`;
    const {
      component: {
        layout,
        controlType
      },
      data: {
        document_data,
        theme_data = {}
      }
    } = dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(fnName);
    let groupList = this.props.groupList;

    if (this.props.group) {
      groupList = window.public.configure(this.props.groupList, this.props.group);
    }

    let parentData = this.getParentType(this.props.node, "em-List"); //查找当前控件是否在列表中

    this.state = {
      groupList,
      controlType,
      layout,
      ...document_data,
      isParentList: parentData,
      ...theme_data.style
    };
  }

  componentDidMount() {
    //判断是否存在连接数据
    if (this.state.link) {
      const promise = Promise.all(/*! import() | link_controler */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("link_controler")]).then(__webpack_require__.bind(null, /*! ../../../../system/function/link/link_controler */ "./system/function/link/link_controler.js"));
      promise.then(module => {
        module.LinkControler && this.setState(state => {
          state.link.value = module.LinkControler.linkText(state.link);
          return {
            link: state.link
          };
        });
      });
    }
  }
  /**
   * @method link 设置链接
   * @author sxt
   */


  link() {
    const promise = Promise.all(/*! import() | link_controler */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("link_controler")]).then(__webpack_require__.bind(null, /*! ../../../../system/function/link/link_controler */ "./system/function/link/link_controler.js"));
    promise.then(module => {
      module.LinkControler && module.LinkControler.link({
        initialData: this.state.link,
        dataState: this.state,
        ensure: data => {
          data.value = module.LinkControler.linkText(data);
          this.setState({
            link: data
          });
          dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_set`, {
            args: [`document_data.link`, data]
          });
        }
      });
    });
  }
  /**
   * @method getDataSize ajax返回图片size
   * @author sxt
   */


  getDataSize(uri) {
    return fetch(`/index.php/webdesign/getImgSize?imgsrc=${uri}&u_siteID=${window.pageData.siteId}`, {
      method: 'GET' // credentials: 'same-origin',
      // body: JSON.stringify({ imgsrc: uri, u_siteID: window.pageData.siteId || "6e495b26f1bff3757f963934bfabc56b" }),

    }).then(response => response.json()).then(data => data ? data : "").catch(err => console.log("Oh, error", err));
  }
  /**
  * @method getParentType 获取是否包含控件父级
  * @author sxt
  * @date 2020-2-28
  * @param {Object} node 控件父级数据
  * @param {event} type 查找的控件类型
  * @return {Object} 返回当前项的数据
  */


  getParentType(node, type) {
    let find = true,
        current = "";

    while (find) {
      if (node.parent) {
        if (node.parent.type == type) {
          current = node.parent;
          find = false;
        } else {
          node = node.parent;
        }
      } else {
        find = false;
      }
    }

    return current;
  }
  /**
  * @method  setAnchor 设置锚点
  * @date 2019-11-26
  * @author LBY
  * @param {string} key 属性名
  * @param {event} e 事件对象
  */


  setAnchor(key, e) {
    let _value = e.target.value == "true" ? true : false;

    this.setState({
      [key]: _value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    });
  }

  setControlsName(field, event) {
    const {
      value
    } = event.target;
    this.setState({
      [field]: value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${field}`, value]
    });
  }

}

//# sourceURL=webpack:///./components/page/attr/basic/basic_controler.js?