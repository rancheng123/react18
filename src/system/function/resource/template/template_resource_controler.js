// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateResourceControler", function() { return TemplateResourceControler; });
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
// /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
// /* harmony import */ var _template_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template_resource */ "./system/function/resource/template/template_resource.js");
// /* harmony import */ var _resourceControler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../resourceControler */ "./system/function/resource/resourceControler.js");
// /* harmony import */ var layer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! layer */ "./system/widgets/layer.js");
// /* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");

// 导入React和ReactDOM库
import React from 'react';
import ReactDOM from 'react-dom';

// 导入其他模块
import templateResource from './template_resource';
import resourceControler from '../resourceControler'; // 注意路径根据实际文件结构调整
import layer from '@/system/widgets/layer.js';
import dispatcher from '@/system/tools/dispatcher';


/**
 * @class {TemplateResourceControler} 图片资源面板控制器类
 * @author wyq
 * @version 1.0
 * @date 2019-08-16
 */

class TemplateResourceControler extends _resourceControler__WEBPACK_IMPORTED_MODULE_3__["ResourceControler"] {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {TemplateResource} view 初始化 view 实例*/

    this.view = new _template_resource__WEBPACK_IMPORTED_MODULE_2__["TemplateResource"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
    this.ajaxUrl = "/desktop/index.php/Edit/Temp/responseTempList";
  }
  /**
  * @method init 初始化方法
  * @date 2019-08-16
  * @author sxt
  */


  init() {
    this.tabs = ["wholeClassify", "languageClassify", "hot"]; //新增语言分类选项和热门选项 lw 2021-3-8

    let innerHeight = window.innerHeight; //页面高度  用页面高度去计算,图片显示几列 sxt 2020-2-4

    let _height = innerHeight - 50 * 2,
      size = parseInt((_height - (54 + 85 + 65 + 32 + 26)) / 148);

    this.state = Object.assign({
      type: "wholeClassify",
      resourceType: "template",
      industry: 0,
      orderBy: 0,
      language: 0,
      size: size,
      page: 1
    }, this.props.initialData);
  }
  /**
  * @method componentDidMount 组件完成挂载 结构已经显示
  * @date 2019-08-16
  * @author sxt
  */
  //componentDidMount


  componentWillMount() {
    let _type = this.state.type;
    this.change("type", _type);
  }
  /**
   * @method selected 选中方法,
   * @author 
   */


  selectImg(prop) {
    layer__WEBPACK_IMPORTED_MODULE_4__["Layer"].alert({
      area: ["420px", "225px"],
      skin: "",
      close: true,
      cancel: true,
      ensure: this.getAjaxTemplate.bind(this, prop.id),
      content: window.public.lang["replaceTemplatePrompt"]
    });
  }

  previewBtn(previewurl, event) {
    window.open(previewurl);
    event.stopPropagation();
  }
  /**
   * @method getAjaxPage 切换页面请求方法
   * @author sxt 
   * @date   2020-1-8 10:18
   * @param {string} id 当前页面id 
   * @return {object} 当前页面数据
   */


  getAjaxTemplate(id) {
    document.querySelector("#function-modal .layer-close").click();
    dispatcher__WEBPACK_IMPORTED_MODULE_5__["Dispatcher"].dispatch("hideToolbars");
    let newData = {
      userSiteId: pageData.siteId,
      templateId: id
    };
    return fetch("/desktop/index.php/Edit/Temp/index", {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newData)
    }).then(response => response.json()).then(data => {
      if (data.suc == 0) {
        window.public.location.removeHash("pageid");
        location.reload();
      }
    }).catch(error => console.log("Error", error));
  }
  /**
   * @method setTab 设置导航项切换
   * @date 2019-09-07
   * @author sxt
   * @param {String} key 设置属性名称
   * @param {String} value 设置属性值 
   * @param {e} event 事件对象
   * */


  setTab(key, value, e) {
    let _state = this.state || {};

    this.setState({
      key: ""
    });
    this.change(key, value, e);
  }
  /**
   * @method change 设置公用方法 
   * @date 2019-09-07
   * @author sxt
   * @param {String} key 设置属性名称
   * @param {String} value 设置属性值 
   * @param {e} event 事件对象
   * */


  change(key, value, e) {
    if (value == undefined) {
      let _target = e.currentTarget;
      value = _target.id || _target.children[0].id;
    }

    let _state = this.state || {};

    let objData = null;

    if (value == "wholeClassify") {
      objData = Object.assign(_state, {
        [key]: value,
        language: 0,
        page: 1
      });
    }

    if (value == "languageClassify") {
      objData = Object.assign(_state, {
        [key]: value,
        industry: 0,
        page: 1
      });
    }

    if (value == "hot") {
      objData = Object.assign(_state, {
        [key]: value,
        industry: 0,
        language: 0,
        page: 1
      });
    }

    objData = Object.assign(_state, {
      [key]: value,
      page: 1,
      key: ""
    });
    super.getResourceList(objData).then(data => {
      if (data) {
        this.setState({
          [key]: value,
          templateList: data.list,
          totalPages: data.page
        });
      }
    });
  }
  /**
   * @method inputChange 搜索框change 
   * @date 2022-08-01
   * @author wh
   * @param {String} key 设置属性名称
   * @param {String} value 设置属性值 
   * @param {e} event 事件对象
   * */


  inputChange(key, e) {
    let _value = e.target.value;
    this.setState({
      [key]: _value
    });
  }
  /**
   * @method search 搜索事件
   * @date 2022-08-01
   * @author wh
   * */


  search() {
    let _state = this.state || {};

    let objData = Object.assign(_state, {
      page: 1
    });
    super.getResourceList(objData).then(data => {
      if (data) {
        this.setState({
          templateList: data.list,
          totalPages: data.page
        });
      }
    });
  }

}
