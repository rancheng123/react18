__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageAddClassify", function() { return PageAddClassify; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
/* harmony import */ var _page_classify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page_classify */ "./ui/page_management/classify/page_classify.js");




class PageAddClassify extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {space} view 初始化 view 实例*/

    this.view = new _page_classify__WEBPACK_IMPORTED_MODULE_3__["Classify"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  static pageManagement() {
    const element = document.querySelector('#page-management');
    react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PageAddClassify, null), element);
  }
  /**
      * @method  render 挂载组件方法
      * @author sxt
      */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.view.render, null);
  }
  /**
      * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
      * @author wyq
      */


  init() {
    let pageList = this.getLink();
    let cat = this.props.initialData;

    if (!cat.pageId) {
      cat.pageId = pageList[0] && pageList[0].id;
      cat.pageName = pageList[0] && pageList[0].name;
    }

    let data = {
      pageList: pageList,
      catType: cat.catType || "product"
    };
    this.state = { ...data,
      ...cat
    };
  }

  componentWillMount() {
    let state = this.state || {},
        catType = state.catType;
    const promise = this.getAjaxClassify(catType);
    promise.then(data => {
      if (data) {
        if (!state.catId) {
          let catName = data[0] && data[0].catname || "";
          this.setState({
            classifyList: data,
            catId: data[0] && data[0].id,
            catName: catName,
            label: state.label || catName || window.public.lang["noClassification"]
          });
        } else {
          this.setState({
            classifyList: data
          });
        }
      }
    });
  } //确定


  ensure() {
    let state = this.state || {};
    let cta = {
      catType: state.catType,
      catId: state.catId,
      catName: state.catName,
      pageId: state.pageId,
      pageName: state.pageName,
      label: state.label || window.public.lang["noClassification"]
    };
    this.props.ensure.call(this.props.callThis, cta);
  } //修改分类名称


  changeCatName(e) {
    let value = e.target.value;
    this.setState({
      label: value
    });
  } //修改分类类型


  selectType(e) {
    let type = e.target.value;
    this.setState({
      catType: type
    });
    const promise = this.getAjaxClassify(type);
    promise.then(data => {
      this.setState({
        classifyList: data,
        catId: data[0] && data[0].id,
        catName: data[0] && data[0].catname
      });
    });
  } //请求分类数据方法


  getAjaxClassify(type) {
    let newData = {
      sid: pageData.siteId,
      type: type
    };
    return fetch("/desktop/index.php/Edit/List/getcategory", {
      method: 'POST',
      headers: {},
      body: JSON.stringify(newData)
    }).then(response => response.json()).then(data => {
      let datas = data.data || {};

      if (datas.list) {
        return datas.list || [];
      } else {
        return [];
      }
    }).catch(error => console.log("Error", error));
  }
  /**
  * @method clickClassifyList 点击显示分类列表
  * @date 2019-12-4
  * @author sxt
  * @param {event} event 事件对象 
  */


  clickClassifyList() {
    let _state = this.state || {},
        _showClassify = _state.showClassify,
        _isClassifyTrue = false;

    if (_showClassify) {
      _isClassifyTrue = false;
    } else {
      _isClassifyTrue = true;
    }

    this.setState({
      showClassify: _isClassifyTrue,
      showPage: false
    });
  } //选择分类


  selectClassifyList(prop) {
    this.setState({
      catName: prop.catname,
      catId: prop.id,
      showClassify: false
    });
  } //获取所有实体页面方法


  getLink(items, arr = []) {
    let data = dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch("getIframeData"),
        dataItems = data.data.document_data.MAIN_MENU.items || [];
    items = items || dataItems;

    for (let item of items) {
      if (item.pageType == "PageLink") {
        arr.push({
          name: item.label,
          id: item.pid
        });
      }

      if (item.child) this.getLink(item.child, arr);
    }

    return arr;
  } //获取页面方法


  getPageLink() {
    this.state = {};
    const data = dispatcher__WEBPACK_IMPORTED_MODULE_2__["Dispatcher"].dispatch("getIframeData"),
          items = data.data.document_data.MAIN_MENU.items || [];
    return this.getLink(items, []);
  } //下拉切换页面


  selectPageList(prop) {
    this.setState({
      pageName: prop.name,
      pageId: prop.id,
      showPage: false
    });
  } //点击显示选择页面


  clickPageList() {
    let _state = this.state || {},
        _showPage = _state.showPage,
        _isPageTrue = false;

    if (_showPage) {
      _isPageTrue = false;
    } else {
      _isPageTrue = true;
    }

    this.setState({
      showPage: _isPageTrue,
      showClassify: false
    });
  }

}

//# sourceURL=webpack:///./ui/page_management/classify/page_classify_controler.js?