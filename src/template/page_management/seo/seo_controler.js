__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeoControler", function() { return SeoControler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./seo */ "./ui/page_management/seo/seo.js");
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * @class SeoControler seo控制器类
 * @author sxt
 */

class SeoControler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {space} view 初始化 view 实例*/

    this.view = new _seo__WEBPACK_IMPORTED_MODULE_2__["Seo"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**@property {object} data 存储当前编辑的SEO数据*/


  /**
      * @method  render 挂载组件方法
      * @author wyq
      */
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.view.render, null);
  }
  /**
      * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
      * @author sxt
      */


  init() {
    const {
      props: {
        initialData = {}
      }
    } = this;
    this.state = initialData;
    let group = ["title", "keyword", "description", "urlRule", "staticURI", "weightType", "customLink", "pageLink", "visitFrequency", "chooseWeight", "chooseImage"];
    this.state.group = group;
    this.state.pageList = this.getLink();
    this.getSeoUrl();
    this.state.urlList = [{
      "id": "",
      "title": "请选择"
    }];
  }
  /**
   * @method getSeoUrl 获取url规则数据
   * @author sxt
   * @date 2024-2-19
   */


  getSeoUrl(type) {
    let newData = {
      projectId: pageData.projectId,
      typeId: 0
    };
    return fetch(`${pageData.rpcDomain}/basics_data_center/SiteLinkRule/getListData?projectId=${pageData.projectId}&typeId=0`, {
      method: 'GET',
      headers: {} // body:JSON.stringify(newData)

    }).then(response => response.json()).then(data => {
      let datas = data.data || [];

      if (datas.length) {
        let urlList = [{
          "id": "",
          "title": "请选择"
        }];
        urlList = urlList.concat(datas);
        this.setState({
          urlList: urlList
        }); //this.state.urlList=urlList;
      } //console.log(data,"什么值")

    }).catch(error => console.log("Error", error));
  }
  /**
   * @method getLink 获取所有实体页面方法
   * @author sxt
   * @date 2020-4-27
   * @param {string} key SEO键值
   * @param {event} event 事件对象
   */


  getLink(items, arr = [{
    name: window.public.lang["pleaseChoose"],
    id: "1"
  }]) {
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
  }
  /**
   * @method setSeoInfo 设置SEO信息
   * @author sxt
   * @date 2020-4-27
   * @param {string} key SEO键值
   * @param {event} event 事件对象
   */


  setSeoInfo(key, event) {
    const value = event.target.value;
    this.putState({
      [key]: value
    });
  }
  /**
   * @method setCustomLink 设置自定义链接
   * @author sxt
   * @date 2020-4-27
   * @param {string} key SEO键值
   * @param {event} event 事件对象
   */


  setCustomLink(key, event) {
    const value = event.target.value;
    this.putState({
      [key]: value
    });
  }
  /**
   * @method setWeightType 设置权重类型
   * @author sxt
   * @date 2020-4-27
   * @param {string} key SEO键值
   * @param {event} event 事件对象
   */


  setWeightType(key, event) {
    const value = event.target.value;
    this.putState({
      [key]: value,
      "canonical_point": ""
    });
  }
  /**
   * @method showImageGallery 显示图库面板与选择图片
   * @author wyq
   * @param {number} index 索引
   */


  showImageGallery(index) {
    //弹出资源库
    Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../../../system/function/resource/resource_manager */ "./system/function/resource/resource_manager.js")).then(({
      resourceManager
    }) => resourceManager('image')).then(({
      resource
    }) => resource({
      selected: data => {
        var _this$state$seoImgLis;

        let seoImgList = (_this$state$seoImgLis = this.state.seoImgList) !== null && _this$state$seoImgLis !== void 0 ? _this$state$seoImgLis : [];
        seoImgList[index] = data.ima_path;
        this.putState({
          seoImgList
        });
      }
    }));
  }
  /**
   * @method deleteImage 图片删除方法
   * @author wyq
   * @param {number} index 索引
   * @param {event} event 事件对象 
   */


  deleteImage(index, event) {
    let seoImgList = this.state.seoImgList;
    seoImgList.splice(index, 1);
    this.putState({
      seoImgList
    });
  }
  /**
   * @method ensure 像后台发送SEO数据
   * @author wyq
   * @param {string} id 当前项id
   */


  static ensure(id) {
    const data = SeoControler.getData(id);
    let linkType = data.link_type,
        canonical_point = data.canonical_point; //自定义链接存在，并且选择的自定义类型，不包含http时，弹出提示

    if (canonical_point && linkType == "customLink" && canonical_point.indexOf("http") == -1) {
      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tool.ModalBox, {
        isunHelp: true,
        isCancel: true,
        isMask: true,
        ModalBox: "pageSaveTips",
        boxClass: " saveTips ",
        title: "prompt",
        texts: [window.public.lang["httpHelp"]],
        width: "360px",
        height: "200px",
        left: "calc(50% - 180px)",
        top: "calc(50% - 100px)"
      }), DOM.querySelector("#pageSaveTips"));
      return false;
    }

    if (data) {
      fetch(`${pageData.base}/Edit/index/editInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
        },
        body: data
      }).then(response => response.json()).then(data => {
        if (data.suc != 0) {
          react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tool.ModalBox, {
            isunHelp: true,
            isCancel: true,
            isMask: true,
            ModalBox: "pageSaveTips",
            boxClass: " saveTips ",
            title: "prompt",
            texts: [data.msg],
            width: "360px",
            height: "200px",
            left: "calc(50% - 180px)",
            top: "calc(50% - 100px)"
          }), DOM.querySelector("#pageSaveTips"));
        }
      });
    }
  }

}

_defineProperty(SeoControler, "data", null);

//# sourceURL=webpack:///./ui/page_management/seo/seo_controler.js?