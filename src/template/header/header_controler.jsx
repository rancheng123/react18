import React from 'react'
import Dispatcher from '../../system/tools/dispatcher';
import Header from './header';
import History from '../../system/tools/history';

/**
 * @class {HeaderControler} 编辑页头部控制器类
 */

export default class HeaderControler extends React.Component {
  constructor(props) {
    super(props);

    /**@property {array} btn_list 按钮配置列表*/

    this.btn_list = [//将语言包内的数组改为JSON格式 headList lw 2020-12-11   
      {
        "event": "rulerShow",
        'title': window.public.lang.guide
      },
      {
        "event": "rulerShow",
        'title': window.public.lang.image
      },
      {
        "event": "rulerShow",
        'title': window.public.lang.font
      }, {
        "event": "showHidden",
        "iconName": "&#xe7a1;",
        "iconClass": "",
        'title': window.public.lang.showHidden
      }, 
      {"iconClass":"iconfont","iconName":"&#xe775;","event":"undo",'title':window.public.lang.backOff}, //先注掉 原因是功能还没完全的做完。 lw 2021-4-22
      {"iconClass":"iconfont","iconName":"&#xe771;","event":"redo",'title':window.public.lang.forwards},
      // {
      //   "iconName": "",
      //   "iconClass": "yiyingbaoicon",
      //   "event": "switchPcEdit",
      //   'title': window.public.lang.ComputerEditing
      // }, {
      //   "iconName": "",
      //   "iconClass": "yiyingbaoicon",
      //   "event": "switchMoEdit",
      //   'title': window.public.lang.MobileEditing
      // },
      {
        "event": "preview",
        'title': window.public.lang.preview
      }, //判断是否上线，上线显示发布，不上线不显示发布
       {
        "event": "save",
        'title': window.public.lang.preservation
      },
      window.pageData.onlineSite == 0 ? null : {
        "event": "publish",
        'title': window.public.lang.release
      }, {
        "event": "manage",
        'title': window.public.lang.returnAdministration
      }, window.pageData.revert === "0" ? null : {
        "href": window.pageData.backUrl || "/index.php/webinfo/myWeb",
        'title': window.public.lang.return
      }]; //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Header} view 初始化 view 实例*/

    this.view = new Header(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */

  render() {
    console.log(this.switchPcEdit, '’急啊急啊纠结啊')
    return this.view.render()
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   */

  init() {
    this.state = {
      page: "",
      hidden: false,
      plann: false,
      showIcon: '&#xe9cd;'
    };
    Dispatcher.register('setPageName', this.setPageName, this);
    Dispatcher.register('savePage', this.save, this);
  }
  /**
   * @method switchEdit 切换到PC编辑模式
   */

  switchPcEdit() {
    Dispatcher.dispatch("switchEdit", {
      value: "pc"
    }); //点击切换到pc时，默认关闭弹窗 author lw date 2021-1-26

    const close = document.querySelector('.layer-close'); //关闭所有弹层

    var headerlist = document.querySelector('.em-open-layer .layer-close');

    if (headerlist) {
      headerlist.click();
    }

    close && close.click();
  }
  /**
   * @method switchEdit 切换到MO编辑模式
   */

  switchMoEdit() {
    Dispatcher.dispatch("switchEdit", {
      value: "mo"
    });
    var showlist = document.querySelector('.edipage');
    showlist.click();
  }
  /**
   * @method pageWidth 页面宽度
   */

  pageWidth(event) {
    const target = event.currentTarget;
    const promise = Promise.all(/*! import() | page_width */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("page_width")]).then(__webpack_require__.bind(null, /*! ../../system/function/page_width */ "./system/function/page_width.js"));
    promise.then(module => {
      module.PageWidth.pageWidth('function-modal', target);
    });
  }
  /**
   * @method showHidden 列出隐藏
   */


  showHidden() {
    const iconName = this.state.showIcon == '&#xe7a1;' ? '&#xe7a1;' : '&#xe798;';
    this.setState({
      showIcon: iconName
    });
    const promise = __webpack_require__.e(/*! import() | hiding */ "hiding").then(__webpack_require__.bind(null, /*! ../../components/page/attr/hiding */ "./components/page/attr/hiding.js"));
    promise.then(({
      Hiding
    }) => Hiding.show());
  }
  /**
   * @method rulerShow 设置辅助线显隐功能
   * @date 2020-2-24
   * @author sxt
   */


  rulerShow() {
    Dispatcher.dispatch("setRuler");
  }
  /**
   * @method undo 撤销
   * @date 2019-09-10
   
   */


  undo() {
    History.undo();
  }
  /**
   * @method redo 还原
   * @date 2019-09-10
   
   */


  redo() {
    History.redo();
  }
  /**
   * @method progress 创建或删除进度条
   * @date 2019-11-29
   
   * @param {object} element 元素节点 
   * @param {object} action  执行行为
   */


  progress(element, action) {
    if (action == "add") {
      const div = document.createElement("div");
      div.className = "save-progress";
      div.innerHTML = "<i></i>";
      return element.appendChild(div);
    } else {
      setTimeout(() => element.remove(), 500);
    }
  }
  /**
   * @method save 保存
   * @date 2019-09-10
   
   */


  async save() {
    const header = document.querySelector('#save'); //判断是否已经插入进度条

    if (header.lastChild.className != "save-progress") {
      const progress = this.progress(header, 'add');
      const {
        Save
      } = await Promise.all(/*! import() | save */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("save")]).then(__webpack_require__.bind(null, /*! ../../system/function/save */ "./system/function/save.js"));
      await new Save("#component-modal").save();
      this.progress(progress, 'remove');
    }
  }
  /**
   * @method preview 预览
   * @date 2019-09-10
   
   */


  preview(event) {
    const promise = this.save(event);
    promise.then(() => {
      var _children$2$pageId;

      const {
        pageData: {
          siteId,
          domainName
        }
      } = window;
      const {
        component: {
          children
        }
      } = Dispatcher.dispatch('getIframeData');
      const pageId = (_children$2$pageId = children[2].pageId) !== null && _children$2$pageId !== void 0 ? _children$2$pageId : children[1].pageId;
      const href = `${domainName}?sid=${siteId}&pid=${pageId}&type=${window.public.type}`;
      window.open(href);
    });
  }
  /**
   * @method publish 发布
   * @date 2019-09-10
   
   */


  publish(event) {
    const promise = this.save(event);
    promise.then(() => {
      const promise = Promise.all(/*! import() | publish_controler */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("publish_controler")]).then(__webpack_require__.bind(null, /*! ../../system/function/publish/publish_controler */ "./system/function/publish/publish_controler.js"));
      promise.then(({
        PublishControler
      }) => PublishControler.publish());
    });
  }
  /**
  * @method manage 跳转到cms的链接
  * @author sxt
  * @param {event} 事件对象
  */


  manage(e) {
    const _script = document.createElement("script");

    _script.src = "/public/sys/admin.js?v=3.0";

    _script.onload = (e = event) => {
      top.admin("login", pageData.siteId, "", true);
      e.target.remove();
    };

    document.body.appendChild(_script);
  }
  /**
   * @method manage 管理
   * @date 2019-09-10
   
   */


  pageManage() {
    const promise = Promise.all(/*! import() | page_management_controler */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("page_management_controler")]).then(__webpack_require__.bind(null, /*! ../page_management/page_management_controler */ "./ui/page_management/page_management_controler.js"));
    promise.then(module => {
      const page = module.PageManagementControler;
      page.pageManagement();
    });
  }

  setPageName(value) {
    this.setState({
      page: value
    });
  }

  hidden(event) {
    const hidden = event.currentTarget.dataset.hidden,
      value = hidden == "false" ? true : false;
    this.setState({
      hidden: value
    });
    Dispatcher.dispatch("setEdibtn", {
      value: value
    });
    Dispatcher.dispatch("rulerHidden", {
      value: value
    });
  }
  /**
   * @method textPlann    点击多语言按钮展示选项的方法
   * @author lw
   * @date 2021-3-8
  */


  textPlann() {
    const value = this.state.plann == true ? false : true;
    this.setState({
      plann: value
    });
  }

}

//# sourceURL=webpack:///./ui/header/header_controler.js?