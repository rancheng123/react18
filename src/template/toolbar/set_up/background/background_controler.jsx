// 导入 React 库
import React from 'react';
// 导入 ReactDOM 库
import ReactDom from 'react-dom';
// 导入 widget 模块
import Widget from '@/system/widgets/widget';
// 导入 dispatcher 模块
import Dispatcher from '@/system/tools/dispatcher';
// 导入 Background 模块
import Background from './background';

/**
 * @class {BackgroundControler} 页面背景控制器类
 */
export default class BackgroundControler extends React.Component {
  constructor(props) {
    super(props);
    /**@property {string} 页面id */

    this.id = ''; //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Background} view 初始化 view 实例*/

    this.view = new Background(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  /**
   * @static background 背景渲染
   * @param {object} opts 参数列表
   * @param {object} opts.element 节点对象
   * @param {string} opts.id 控件id
   */
  static background(id) {
    const element = document.querySelector(`#${id}`);
    ReactDom.render(<BackgroundControler />, element);
  }


  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    // return React.createElement(this.view.render, null);
    return (
      <this.view.render />
    )
  }


  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   */
  init() {
    var _children$2$pageId, _design_data$this$id;

    const data = Dispatcher.dispatch('document_get');
    const {
      component: {
        children
      },
      data: {
        design_data = {}
      }
    } = data;
    this.id = (_children$2$pageId = children[2].pageId) !== null && _children$2$pageId !== void 0 ? _children$2$pageId : children[1].pageId;
    this.state = data ? {
      ...((_design_data$this$id = design_data[this.id]) !== null && _design_data$this$id !== void 0 ? _design_data$this$id : {})
    } : {};
  }

  help() { }


  /**
   * @method backgroundColor 设置背景颜色
   * @param {string} bgColor 色值
   */
  backgroundColor(bgColor) {
    Dispatcher.dispatch('document_set', {
      args: [`design_data.${this.id}`, {
        bgColor,
        type: 'BackgroundColor'
      }]
    });
    this.setState({
      bgColor,
      type: 'BackgroundColor'
    });
  }

  /**
   * @method setImg 设置图片方法
   */
  setImage(datas) {
    this.backgroundImage(datas.ima_path);
  }


  /**
   * @method backgroundImage 设置图片方法
   */
  backgroundImage(uri) {
    Dispatcher.dispatch('document_set', {
      args: [`design_data.${this.id}.`, {
        uri,
        type: 'Image'
      }]
    });
    this.setState({
      uri,
      type: 'Image'
    });
  }


  /**
   * @method setVideo 设置视频
   * @param {Object} datas 返回数据
   * @param {event} event 事件对象
   */
  setVideo(datas, uri) {
    Dispatcher.dispatch('document_set', {
      args: [`design_data.${this.id}`, {
        uri,
        type: 'video'
      }]
    });
    this.setState({
      uri,
      type: 'video'
    });
  }

  /**
   * @method selectVideoShow 显示选择视频面板
   */
  selectVideoShow() {
    const promise = __webpack_require__.e(/*! import() | resource_manager */ "resource_manager").then(__webpack_require__.bind(null, /*! ../../../../system/function/resource/resource_manager */ "./system/function/resource/resource_manager.js"));
    promise.then(({
      resourceManager
    }) => {
      const manager = resourceManager("video");
      const setVideo = this.setVideo.bind(this);
      manager.then(module => module.resource({
        selected: setVideo
      }));
    });
  }


  /**
   * @method selectImageShow 显示图片选择面板
   */
  selectImageShow() {
    const promise = __webpack_require__.e(/*! import() | resource_manager */ "resource_manager").then(__webpack_require__.bind(null, /*! ../../../../system/function/resource/resource_manager */ "./system/function/resource/resource_manager.js"));
    promise.then(({
      resourceManager
    }) => {
      const manager = resourceManager("image");
      const setImage = this.setImage.bind(this);
      manager.then(module => module.resource({
        selected: setImage
      }));
    });
  }


  /**
   * @method showImagePanel 显示图片属性设置面板
   */
  showImagePanel() {
    // const promise = __webpack_require__.e(/*! import() | background_image_controler */ "background_image_controler").then(__webpack_require__.bind(null, /*! ./backgroundImage/background_image_controler */ "./ui/toolbar/set_up/background/backgroundImage/background_image_controler.js"));
    const promise = import('./backgroundImage/background_image_controler.jsx')
    promise.then(({
      BackgroundImageControler
    }) => {
      const element = document.querySelector('#function-modal');
      BackgroundImageControler.backgroundImage({
        id: this.id,
        element: element
      });
    });
  }


  /**
   * @method showApplyPanel 显示应用到所有页面面板
   */
  showApplyPanel() {
    const {
      data: {
        design_data = {}
      }
    } = Dispatcher.dispatch('document_get');
    let data = JSON.parse(JSON.stringify(design_data)),
      oldData = {};
    Widget.PageSelector({
      element: document.querySelector('#function-modal'),
      isBackground: true,
      data,
      id: this.id,
      selected: (id, checked) => {
        if (checked) {
          var _data$id;

          oldData[id] = (_data$id = data[id]) !== null && _data$id !== void 0 ? _data$id : {};
          data[id] = {
            ...data[this.id]
          };
        } else {
          data[id] = {
            ...oldData[id]
          };
        }

        Dispatcher.dispatch('document_set', {
          args: [`design_data.${id}`, data[id]]
        });
      },
      selectedAll: (list, checked) => {
        list.length ? list.forEach(e => {
          oldData[e] = data[e], data[e] = data[this.id];
        }) : data = oldData;
        Dispatcher.dispatch('document_set', {
          args: [`design_data.`, JSON.parse(JSON.stringify(data))]
        });
      }
    });
  }

}
