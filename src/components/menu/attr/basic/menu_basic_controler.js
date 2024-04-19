__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuBasicControler", function () { return MenuBasicControler; });
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
/* harmony import */ var _menu_basic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu_basic */ "./components/menu/attr/basic/menu_basic.js");
/* harmony import */ var basic_controler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! basic-controler */ "./components/page/attr/basic/basic_controler.js");
/* harmony import */ var _page_attr_proxy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../page/attr_proxy */ "./components/page/attr_proxy.js");
/* harmony import */ var _system_function_resource_resource_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../system/function/resource/resource_manager */ "./system/function/resource/resource_manager.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




///attr_proxy


/** 
* MenuBasicControler 导航基本属性面板类
* @author      sxt 作者 
* @version     1.0 版本号
* @date     	2019-12-27 16-50
*/

class MenuBasicControler extends basic_controler__WEBPACK_IMPORTED_MODULE_2__["BasicControler"] {
  constructor(props) {
    super(props);
    /**@property {Link} view 初始化 view 实例*/

    this.view = new _menu_basic__WEBPACK_IMPORTED_MODULE_1__["MenuBasic"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
  }

  /**
   * @method  init 初始化方法
   * @date 2019-12-30 9:50
   * @author sxt
   */
  init() {
    const fnName = `${this.props.id}_get`;
    const {
      component: {
        layout
      },
      data: {
        document_data,
        menu_data = {}
      }
    } = dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(fnName);
    let props = this.props || {},
      _groupList = props.groupList,
      group = props.group;
    this.state = {
      ...document_data,
      ...menu_data
    };
    this.state.align = this.state.align || "left";
    this.state.layout = layout;

    if (group) {
      //groupList = window.public.configure(props.groupList, group); 
      if (group.tabs) {
        let tabs1 = group.tabs[0];
        this.state.tabs = group.tabs;
        this.state.currentTab = tabs1;
        this.state.groupList = window.public.configure(_groupList, group.group[tabs1]);
      } else {
        this.state.groupList = window.public.configure(_groupList, group);
      }
    }
  }
  /**
  * @method  setScreen 设置通屏属性
  * @date 2019-12-27 16:50
  * @author sxt
  * @param {string} key 键值 
  * @param {event} e 事件对象
  */


  setScreen(key, e) {
    let _value = e.target.value == "true" ? true : false;

    this.setState({
      [key]: _value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    }); //开启时 把布局数据删除掉

    if (_value) {
      this.setState({
        layout: undefined
      });
      dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_remove`, {
        value: 'component.layout'
      });
    } else {
      //关闭时把布局数据加上
      const width = window.public.minWidth;
      this.setState({
        layout: {
          width: width
        }
      });
      dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
        args: ['component.layout.width', width]
      });
    }
  }
  /**
   * @method  setTwoLevelNav 设置开启次级导航层级
   * @date 2019-12-27 16:50
   * @author sxt
   * @param {string} key 键值 
   * @param {event} e 事件对象
   */


  setTwoLevelNav(key, e) {
    let _value = e.target.value;
    let dataSource = this.state.dataSource || {};
    dataSource[key] = _value;
    this.setState({
      "dataSource": dataSource
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`menu_data.dataSource.level`, _value]
    });
  }
  /**
   * @method  setDropdownIcon 设置一级导航下拉图标
   * @date 2019-12-27 16:50
   * @author sxt
   * @param {string} key 键值 
   * @param {event} e 事件对象
   */


  setDropdownIcon(key, e) {
    let _value = e.target.value == "true" ? true : false;

    this.setState({
      [key]: _value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    });
  }
  /**
   * @method  setTwoNav 设置开启次级导航
   * @date 2019-12-27 16:50
   * @author sxt
   * @param {string} key 键值 
   * @param {event} e 事件对象
   */


  setTwoNav(key, e) {
    let _value = e.target.value == "true" ? true : false;

    this.setState({
      [key]: _value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    });
  }
  /**
  * @method  radioHandler 单选属性设置
  * @date 2019-12-27 16:50
  * @author sxt
  * @param {string} key 键值 
  * @param {event} e 事件对象
  */


  radioHandler(key, e) {
    let _value = e.target.value;
    this.setState({
      [key]: _value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    });
  }
  /**
  * @method  setAnchor 设置锚点
  * @date 2019-12-27 16:50
  * @author sxt
  * @param {string} key 属性名
  * @param {event} e 事件对象
  */


  setAnchor(key, e) {
    let _value = e.target.value == "true" ? true : false;

    this.setState({
      [key]: _value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    });
  }
  /**
   * @method showDataSource 显示数据源面板 设置数据
   * @date 2019-12-27 16:50
  * @author sxt
   */


  showDataSource() {
    const promise = Promise.all(/*! import() | data_source_controler */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("data_source_controler")]).then(__webpack_require__.bind(null, /*! ../../../../system/function/data_source/data_source_controler */ "./system/function/data_source/data_source_controler.js"));

    let _this = this;

    promise.then(module => {
      module.DataSourceControler && module.DataSourceControler.dataSource({
        initialData: this.state.dataSource,
        data_source_type: "Menu",
        identifier_item: "nav_list",
        ensure: data => {
          let datas = {
            justIdList: data.justIdList,
            sourceType: data.sourceType,
            displayContent: data.displayContent,
            selectAll: data.selectAll,
            sourceText: data.sourceText
          };
          this.setState({
            dataSource: datas
          });
          dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${_this.props.id}_set`, {
            args: [`menu_data.dataSource`, datas]
          });
          this.getSourceData(datas);
        }
      });
    });
  }
  /**
   * @method 获取外部数据
   * @date 2019-12-09
   * @author sxt 
   * @return Promise
   */


  getSourceData(datas) {
    let state = this.state || {};
    let ajaxData = {
      ...{
        sid: pageData.siteId,
        level: state.level || "0"
      },
      ...datas
    };

    let _this = this; //return 


    fetch("/desktop/index.php/Edit/NavData/getNavData", {
      method: 'POST',
      headers: {},
      body: JSON.stringify(ajaxData)
    }).then(response => response.json()).then(data => {
      if (data.suc == 0) {
        let tree = data.data.tree || [];
        this.setState({
          menuList: tree
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${_this.props.id}_set`, {
          args: [`menu_data.menuList`, tree]
        });
        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${_this.props.id}_set`, {
          args: [`theme_data.style.menuLilen`, tree.length]
        });
      }
    }); // const payload = new FormData();
    // payload.set('sid','ef518ffa556cd9e558378e6dd943b7f1');
    // return fetch("/desktop/index.php/Edit/index/newsList",{
    //     method: 'POST',
    //     body:payload
    // }).then(response=>response.json());
  }
  /**
   * @method showPanel 显示二级导航设置面板
   * @date 2019-12-27 16:50
   * @author sxt
   */


  showPanel() {
    var _components$;

    const id = this.props.id;
    const {
      component: {
        components,
        skin: parentSkin
      }
    } = dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_get`);
    const {
      id: childId,
      skin,
      componentType: type
    } = (_components$ = components[0]) !== null && _components$ !== void 0 ? _components$ : {};
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${childId}_set`, {
      value: {
        showSub: true
      }
    });
    new _page_attr_proxy__WEBPACK_IMPORTED_MODULE_3__["AttrProxy"]().init(type).then(module => {
      module.showAttributePanel({
        type: "design",
        id: "component-modal",
        node: {
          current: {
            id: childId,
            skin,
            type,
            unsubmenuBox: true
          },
          parent: {
            id,
            skin: parentSkin
          }
        }
      });
    });
  }
  /**
      * @method  setAnchor 设置向右或者向下
      * @date 2020-04-21
      * @author lby
      * @param {string} key 属性名
      * @param {event} e 事件对象
      */


  setDirection(key, e) {
    let _value = e.target.value == "downWard" ? "downWard" : "rightWard";

    this.setState({
      [key]: _value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    });
  }
  /**
      * @method  setMouseEvent 设置鼠标移入还是点击
      * @date 2020-04-22
      * @author lby
      * @param {string} key 属性名
      * @param {event} e 事件对象
      */


  setMouseEvent(key, e) {
    let _value = e.target.value == "onclick" ? "onclick" : "onmouseover";

    this.setState({
      [key]: _value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    });
  }
  /**
   * @method  setOverFlowPart 设置导航溢出部分是显示还是隐藏
   * @date 2020-04-22
   * @author lby
   * @param {string} key 属性名
   * @param {event} e 事件对象
   */


  setOverFlowPart(key, e) {
    let _value = e.target.value == "textShow" ? "textShow" : "lineFeed";

    this.setState({
      [key]: _value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    });
  }
  /**
   * @method  setPageIcon 用于开启页面图标
   * @date 2021-3-18
   * @author sxt
   * @param {string} key 属性名
   * @param {event} e 事件对象
   */


  setPageIcon(key, e) {
    let _value = e.target.value == "true" ? true : false;

    this.setState({
      [key]: _value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.${key}`, _value]
    });
  }
  /**
   * @method  setAlign 设置次级位置方法
   * @date 2021-2-20
   * @author sxt
   * @param {Object} event 事件对象
   */


  setAlign(event) {
    const value = event.target.value;
    this.setState({
      "align": value
    });
    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${this.props.id}_set`, {
      args: [`document_data.align`, value]
    });
  }
  /**
   * @method  clickTabs 栏目切换方法
   * @date 2021-2-20
   * @author sxt
   * @param {string} value 属性值
   */


  clickTabs(value) {
    let props = this.props || {},
      _groupList = props.groupList,
      group = props.group;
    let newList = window.public.configure(_groupList, group.group[value]);
    this.setState({
      currentTab: value,
      groupList: newList
    });
  }

}

_defineProperty(MenuBasicControler, "LIST", ["dataContent", "openScreen", "linkTarget", "sortColumns", "twoLevelNavigation", "dropdownIcon", "levelNavShow", "button", "anchorSet", "displayModel", "overflowPart"]);
