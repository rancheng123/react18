// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomcssControler", function () { return CustomcssControler; });
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/umd/react-dom.development.js");
// /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
// /* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
// /* harmony import */ var _customcss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customcss */ "./components/page/attr/customcss/customcss.js");

import React from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '@/system/tools/dispatcher';
import Customcss from './customcss';



function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class {CustomControler} 样式切换功能类
 */
class CustomcssControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    this.view = new Customcss(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  /**
   * @static custom 插入结构方法
   * @param {object} opts 参数列表
  */
  static customcss(opts) {
    const {
      node,
      element,
      config,
      root
    } = opts;
    ReactDOM.render(React.createElement(this, {
      id: node.current.id,
      node: node,
      config: config
    }), element);

    // root.render(React.createElement(this, {
    //   id: node.current.id,
    //   node: node,
    //   config: config
    // }));
  }


  /**
   * @static render 返回结构
   * @return {object} 结构
  */
  render() {
    return React.createElement(this.view.render, null);
  }


  /**
   * @static init 初始化方法
  */
  // init(){
  //     let currentId=this.props.id;//当前控件id
  //     let parentId=this.props.node.parent.id;//父级id
  //     let parentData=Dispatcher.dispatch(`${parentId}_get`),//父级数据
  //         components=parentData&&parentData.component.components||[],//父级控件数组
  //         _index=0;//当前控件所在父级位置
  //     //id为document时，取children sxt 2020-7-9
  //     if(parentId=="document"){
  //         components=parentData&&parentData.component.children||[]
  //     }
  //     let datas=Dispatcher.dispatch(`${currentId}_get`);//获取控件数据
  //     const {component:{layout,componentType},data={}} = datas;
  // }


  init() {
    var _window, _window$pageData;

    const pcContentBox = document.querySelector('.pc-content'); // displayType  存在表示移动端

    const displayType = ((_window = window) === null || _window === void 0 ? void 0 : (_window$pageData = _window.pageData) === null || _window$pageData === void 0 ? void 0 : _window$pageData.themeType) === 'pc' ? '' : 'mo';
    let currentId = this.props.id; //当前控件id

    const fnName = `${currentId}_get`;
    const {
      component: {
        layout,
        controlType
      },
      data,
      data: {
        document_data,
        theme_data = {}
      }
    } = Dispatcher.dispatch(fnName);
    this.state = {
      // groupList:this.LIST,
      controlType,
      layout,
      ...document_data,
      ...theme_data.style,
      customcss: theme_data.customcss,
      // 响应式pc
      mocss: theme_data.mocss,
      // 移动
      displayType // 移动端，pc 响应式端
      // mobilecss: theme_data?.mobilecss, // 纯移动

    };
  }

  changeText(value) {
    let currentId = this.props.id; //当前控件id
    //const {displayType} = this.state;
    console.log('修改value值', value);
    let displayType = "";
    this.setState({
      [`${displayType}customcss`]: value
    });
    Dispatcher.dispatch(`${currentId}_set`, {
      args: [`theme_data.${displayType}customcss`, value]
    });
  }

}

_defineProperty(CustomcssControler, "LIST", ["cssText"]);

export { CustomcssControler }
