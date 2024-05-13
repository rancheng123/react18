
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
    // ReactDOM.render(React.createElement(this, {
    //   id: node.current.id,
    //   node: node,
    //   config: config
    // }), element);

    root.render(React.createElement(this, {
      id: node.current.id,
      node: node,
      config: config
    }));
  }


  /**
   * @static render 返回结构
   * @return {object} 结构
  */
  render() {
    // return React.createElement(this.view.render, null);
    return <this.view.render />
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
