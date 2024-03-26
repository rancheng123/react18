__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetLibraryControler", function() { return WidgetLibraryControler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_widget_library_config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/widget_library_config.json */ "./config/widget_library_config.json");
var _config_widget_library_config_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../config/widget_library_config.json */ "./config/widget_library_config.json", 1);
/* harmony import */ var _config_component_library_config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config/component_library_config.json */ "./config/component_library_config.json");
var _config_component_library_config_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../config/component_library_config.json */ "./config/component_library_config.json", 1);
/* harmony import */ var _widget_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./widget_library */ "./ui/toolbar/widget_library/widget_library.js");
/* harmony import */ var _drag_add__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../drag_add */ "./ui/toolbar/drag_add.js");
/* harmony import */ var _components_page_components_manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/page/components_manager */ "./components/page/components_manager.js");







var nmbTerm = null; //用来存储切换控件库内选项的index lw date 2021-2-3

var nmbTermid = null; //用来存储切换控件库内选项的id   lw

class WidgetLibraryControler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    let configType = props.configType || "";
    /**@property {object} info 拖拽控件的信息 */

    this.info = null;
    this.configType = configType; //类型为组件时

    if (configType == "component") {
      this.tabs = _config_component_library_config_json__WEBPACK_IMPORTED_MODULE_3__.group[137].tabs || {}; // //currentTab=tabs[0].id,

      this.group = JSON.parse(JSON.stringify(_config_component_library_config_json__WEBPACK_IMPORTED_MODULE_3__.group[137].group || {}));
    } else {
      /**@property {object} tabs 控件列表*/
      this.tabs = _config_widget_library_config_json__WEBPACK_IMPORTED_MODULE_2__.tabs;
      /**@property {object} group 控件内容列表*/

      this.group = JSON.parse(JSON.stringify(_config_widget_library_config_json__WEBPACK_IMPORTED_MODULE_2__.group));
    }
    /**@property {string} skin 拖拽控件的皮肤名 */


    this.skin = ''; //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {WidgetLibrary} view 初始化 view 实例*/

    this.view = new _widget_library__WEBPACK_IMPORTED_MODULE_4__["WidgetLibrary"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  static widgetLibrary(id, configType) {
    const element = document.querySelector(`#${id}`);
    react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WidgetLibraryControler, {
      id: id,
      configType: configType
    }), element);
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-09-25
   * @author sxt 
   * @return {object} 待渲染的组件对象
   */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @date 2019-09-25
   * @author sxt
   */


  init() {
    var tabs = this.tabs || [],
        tabsinx = '';

    if (nmbTerm && nmbTermid && tabs[nmbTerm] && nmbTermid == tabs[nmbTerm].id) {
      tabsinx = nmbTerm;
    }

    this.state = {
      current: tabsinx != '' ? tabs[tabsinx] : tabs[0]
    }; //初始化时如果tabsinx值为''的话，打开时就默认选中第一个选项，否则打开就是之前关闭时的位置 lw date 2021-2-3
  }
  /**
   * @method selectTab 切换控件项方法
   * @date 2019-09-24
   * @author sxt
   * @param {string} tab 切换的值
   */


  selectTab(tab) {
    nmbTermid = tab.id;
    var tabsArray = this.tabs; //获取控件库数组 lw 2021-2-3

    this.setState({
      current: tab,
      jump: "",
      top: 0
    });

    for (var i = 0; i < tabsArray.length; i++) {
      if (tab == tabsArray[i]) {
        //遍历对比进行存值 lw 2021-2-3
        nmbTerm = i;
      }
    }
  }

  close(close) {
    this.__proto__.close = close;
  }

  help() {}
  /**
   * @method scrollTo 滚动条变化时，锚点定位方法
   * @date 2019-09-24
   * @author sxt
   */


  scrollTo() {
    const _anchor = document.querySelector(".anchorsMain .selected"),
          _parent = document.querySelector(".content_2"),
          {
      offsetHeight: conHeight
    } = _parent,
          {
      offsetHeight: mHeight,
      scrollTop: parNodePar
    } = _parent.parentNode; //当前项存在下一个元素时


    if (_anchor.nextElementSibling) {
      //获取下一个元素的top值
      let _nextName = _anchor.nextElementSibling.dataset.anchorName,
          _next = document.getElementById(_nextName),
          _nextTop = _next.offsetTop; //滚动条的位置大于下一个元素的top时，赋值


      if (parNodePar > _nextTop) {
        return this.setState({
          jump: _nextName
        });
      }
    } //当前项存在上一个元素时


    if (_anchor.previousElementSibling) {
      //获取上一个元素的top值
      let _prevName = _anchor.previousElementSibling.dataset.anchorName,
          _prev = document.getElementById(_prevName),
          _prevTop = _prev.offsetTop; //滚动条的位置小于等于下一个元素的top时，赋值


      if (parNodePar <= _prevTop) {
        return this.setState({
          jump: _prevName
        });
      }
    } //父级高度+滚动条top大于等于内容总高时，证明在最底部，最后一个元素选中


    if (mHeight + parNodePar >= conHeight) {
      const _last = document.querySelector(".anchorsMain>li:last-child");

      return this.setState({
        jump: _last.dataset.anchorName
      });
    }
  }
  /**
   * @method anchorMouseEnter 锚点移入方法
   * @date 2019-09-24
   * @author sxt
   * @param {string} value 切换的值
   */


  anchorMouseEnter(value) {
    this.setState({
      prompt: value
    });
  }
  /**
  * @method anchorMouseLeave 锚点移出方法
  * @date 2019-09-24
  * @author sxt
  */


  anchorMouseLeave() {
    this.setState({
      prompt: ""
    });
  }
  /**
  * @method jumpAnchor 点击锚点方法
  * @date 2019-09-24
  * @author sxt
  * @param {string} value 切换的值
  */


  jumpAnchor(value) {
    this.setState({
      jump: value
    });
  }
  /**
   * @method getData 获取控件数据
   * @date 2019-10-22
   * @author wyq
   * @return {object} 控件数据 
   */


  async getData() {
    if (this.skin) {
      const [type, classname] = this.skin.split(".");
      const module = await Object(_components_page_components_manager__WEBPACK_IMPORTED_MODULE_6__["componentsManager"])(type);

      if (module) {
        const name = window.humpJoin(classname, "_");
        const data = await module.getData(name);
        return data ? data.items[this.skin] : null;
      }
    }

    return null;
  }
  /**
   * @method start 拖拽开始执行方法
   * @date 2019-10-22
   * @author wyq
   * @param {string} skin 皮肤
   * @param {event} event 事件对象
   */


  start(skin, event) {
    this.skin = skin;
    new _drag_add__WEBPACK_IMPORTED_MODULE_5__["DragAdd"](this).start(event);
  }

}

//# sourceURL=webpack:///./ui/toolbar/widget_library/widget_library_controler.js?