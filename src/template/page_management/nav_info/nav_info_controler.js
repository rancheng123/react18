__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoControler", function() { return InfoControler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nav_info__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nav_info */ "./ui/page_management/nav_info/nav_info.js");
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");




/**
 * @class {CompanyControler} Company变量控制器类
 * @author wyq
 * @version 1.0
 * @date 2019-12-3
 */

class InfoControler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {DataSource} view 初始化 view 实例*/

    this.view = new _nav_info__WEBPACK_IMPORTED_MODULE_2__["Info"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-08-17
   * @author wyq
   * @return {object} 待渲染的组件对象
   */


  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @data 2019-12-03
   * @author wyq
   */


  init() {
    const {
      props: {
        initialData
      }
    } = this;

    if (initialData.catid == -1) {
      initialData.bindClassify = false;
    } else {
      initialData.bindClassify = true;
      initialData.catId = initialData.catid;
    }

    this.state = initialData;
  } //获取数组中当前项名称


  getName(list = [], id, key) {
    let name = "";

    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        name = list[i][key];
      }
    }

    return name;
  }

  componentWillMount() {
    let state = this.state || {},
        catType = state.catType || "goods",
        pageId = state.pageId,
        catId = state.catId;
    let pageList = this.getLink();
    let pageName = this.getName(pageList, pageId, "name");
    this.setState({
      pageList: pageList,
      pageName: pageName
    });
    const promise = this.getAjaxClassify(catType);
    promise.then(data => {
      if (data) {
        let catname = this.getName(data, catId, "catname");
        this.setState({
          classifyList: data,
          catName: catname
        });
      }
    });
  }
  /**
   * @method  changText 设置按钮文本
   * @date 2019-11-9
   * @author sxt
   * @param {string} key 数据名称
   * @param {event} e 事件对象
   */


  changText(key, e) {
    const _value = e.target.value; //this.setState({[key]:_value})

    this.putState({
      [key]: _value
    });
  }
  /**
  * @method  setRadio 设置单行属性
  * @date 2019-11-26
  * @author sxt
  * @param {string} key 属性名
  * @param {event} e 事件对象
  */


  setRadio(key, e) {
    let _value = e.target.value == "true" ? true : false;

    this.putState({
      [key]: _value
    });
  }
  /**
  * @method  setContent 设置展示内容
  * @date 2020-9-14
  * @author sxt
  * @param {string} key 属性名
  * @param {event} e 事件对象
  */


  setContent(key, e) {
    let _value = e.target.value;
    this.putState({
      [key]: _value
    });
  }
  /**
  * @method  设置分类绑定
  * @date 2020-9-14
  * @author sxt
  * @param {string} key 属性名
  * @param {event} e 事件对象
  */


  setBindClassify(key, e) {
    let {
      catType,
      catId,
      catName,
      pageId,
      pageName = "",
      pid,
      label,
      displayContent
    } = this.state || {};

    let _value = e.target.value == "true" ? true : false;

    if (_value == false) {
      this.putState({
        [key]: _value,
        "catType": "",
        catId: "",
        catName: "",
        pageId: "",
        pageName: ""
      });
    } else {
      // let _page=Control.siteData.getData("","SITE_HEADER"),_displayContent="classifyDisplay",
      //      _label=_page.document_data[_pageNameId].label||"";
      //      _ajax.ajaxData=getAjaxData("products","",_displayContent);
      // this.putState(this,"setup",{"catType":"products","catId":"whole","catName":Public.lang["whole"],"pageId":_pageNameId.split("-")[1],"pageName":_label});   
      this.putState({
        [key]: _value,
        "catType": catType || "goods",
        catId: catId || "5",
        catName: catName || window.public.lang["whole"],
        pageId: pageId || pid,
        pageName: pageName || label,
        displayContent: displayContent || "classifyDisplay"
      }); // if(!state.pageId){
      // 	let pageId=pageList[0]&&pageList[0].id,
      // 		pageName=pageList[0]&&pageList[0].name;
      // 	this.putState({pageId:pageId,pageName:pageName,catType:catType});
      // }
      // if(!state.catId){
      // 	let catName=data[0]&&data[0].catname||"";
      // 	this.putState({catId:data[0]&&data[0].id,catName:catName});
      // }
    }
  }
  /**
  * @method  设置分类绑定类型
  * @date 2020-9-14
  * @author sxt
  * @param {string} key 属性名
  * @param {event} e 事件对象
  */


  setClassifyType(key, e) {
    let {
      pageId,
      pageName = "",
      pid,
      label,
      displayContent
    } = this.state || {};
    let _value = e.target.value;
    let id = _value == "goods" ? 5 : 6;
    this.putState({
      [key]: _value,
      "bindClassify": true,
      catId: id,
      catName: window.public.lang["whole"],
      pageId: pageId || pid,
      pageName: pageName || label,
      displayContent: displayContent || "classifyDisplay"
    });
    const promise = this.getAjaxClassify(_value);
    promise.then(data => {
      this.setState({
        classifyList: data
      });
    });
  } //修改分类类型
  //  selectType(e){
  // 	let type=e.target.value;
  // 	this.setState({catType:type})
  // 	const promise = this.getAjaxClassify(type);
  //     promise.then(data=>{
  // 		this.putState({catId:data[0]&&data[0].id,catName:data[0]&&data[0].catname});
  // 		this.setState({classifyList:data})
  // 	})
  //  }
  //请求分类数据方法


  getAjaxClassify(type) {
    let newData = {
      sid: pageData.siteId,
      type: type == "goods" ? "product" : type
    };
    return fetch("/desktop/index.php/Edit/List/getcategory", {
      method: 'POST',
      headers: {},
      body: JSON.stringify(newData)
    }).then(response => response.json()).then(data => {
      let datas = data.data || {};

      if (datas.list) {
        let id = type == "goods" ? 5 : 6;
        let list = datas.list || [];
        list.unshift({
          id: id,
          layer: 1,
          catname: window.public.lang["whole"]
        });
        return list;
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
    this.putState({
      catName: prop.catname,
      catId: prop.id
    });
    this.setState({
      showClassify: false
    });
  } //获取所有实体页面方法


  getLink(items, arr = []) {
    let data = dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch("getIframeData"),
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
    const data = dispatcher__WEBPACK_IMPORTED_MODULE_3__["Dispatcher"].dispatch("getIframeData"),
          items = data.data.document_data.MAIN_MENU.items || [];
    return this.getLink(items, []);
  } //下拉切换页面


  selectPageList(prop) {
    this.putState({
      pageName: prop.name,
      pageId: prop.id
    });
    this.setState({
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

//# sourceURL=webpack:///./ui/page_management/nav_info/nav_info_controler.js?