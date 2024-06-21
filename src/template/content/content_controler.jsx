import React from 'react'
import Dispatcher from "../../system/tools/dispatcher";
import RulerControler from '../../system/function/ruler/ruler_controler'
import ComponentEditTestControler from '../../system/function/component_edit/component_edit_test_controler'

import CollectionControler from '../toolbar/collection/collection_controler'
import WidgetLibraryControler from '../toolbar/widget_library/widget_library_controler'
import TemplateControler from '../toolbar/template/template_controler'
import { createRoot } from 'react-dom/client';

// import TranslatePopup from '@/components/publicComponents/TranslatePopup/TranslatePopup.jsx'
export default class ContentControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次
    // this.init();
    /**@property {RulerControler} 标尺组件控制器 */

    /**@property {ComponentEditControler} 控件编辑组件控制器 */

    this.state = {
      display: null,
      edibtn: null,
      type: '',
      pageid: '',
      height: 0,
      search: '',
      rulerShow: null,
    };

    // 右侧操作栏
    this.toolbars = [{
      iconClass: "iconfont",
      iconName: "&#xe76e;",
      type: "componentLibrary"
    }, {
      iconClass: "iconfont",
      iconName: "&#xe773;",
      type: "widgetLibrary"
    },
    // {
    //   iconClass: "yiyingbaoicon",
    //   iconName: "",
    //   type: "setUp"
    // },
    {
      iconClass: "iconfont",
      iconName: "&#xe774;",
      type: "template"
    }, {
      iconClass: "iconfont",
      iconName: "&#xe76d;",
      type: "collection"
    }]; //绑定this
  }
  /**
   * @method init 
   * 组件挂载前初始化方法,整个生命周期内只执行一次 
   */

  init() {
    const location = window.public.location;
    const pageid = location.getHash('pageid');
    const type = window.public.type = location.getHash('type') || 'pc'; //
    this.setState({
      display: false,
      edibtn: true,
      type: type,
      pageid: pageid,
      height: 0,
      search: `?pageid=${pageid}&type=${type}`,
      rulerShow: false,
    });

    //注册切换编辑事件
    Dispatcher.register("switchEdit", this.switchEdit, this);
    //注册隐藏工具栏事件
    Dispatcher.register("hideToolbars", this.hideToolbars, this);
    //注册设置页面id事件
    Dispatcher.register("setPageId", this.setPageId, this);
    //注册设置辅助线显隐功能
    Dispatcher.register("setRuler", this.setRuler, this);
    //注册左侧工具栏显隐功能
    Dispatcher.register("setEdibtn", this.setEdibtn, this);
  }

  search(key, value) {
    const regxp = new RegExp(`(${key}=)[\\w]*`);
    let {
      state: {
        search
      }
    } = this;
    search = search.replace(regxp, `$1${value}`);
    return search;
  }
  /**
   * @method switchEdit 切换编辑方式
   * @param {string} type 切换的类型
   */


  switchEdit(type) {
    if (this.state.type != type) {
      //清空hover框、选中框、属性按钮
      Dispatcher.dispatch("selectedHidden", {
        value: true
      });
      //调用保存
      const save = Dispatcher.dispatch('savePage');
      //保存成功后执行切换
      save.then(() => {
        const search = this.search('type', type); //存储页面类型

        window.public.type = type; //重置列出隐藏状态

        window.public.hiding = 'reset'; //添加到hash

        window.public.location.addHash('type', type);
        this.setState({
          type: type,
          search: search
        });
      });
    }
  }
  /**
   * @method setPageId 设置页面id
   * @param {string} pageid 页面id 
   */
  setPageId(pageid) {
    const search = this.search('pageid', pageid);
    this.setState({
      pageid: pageid,
      search: search
    });
  }
  /**
  * @method setRuler 设置辅助线显隐
  * @param {string} pageid 页面id 
  */
  setRuler() {
    let {
      rulerShow
    } = this.state || {};
    this.setState({
      rulerShow: !rulerShow
    }, () => {
    });
  }

  setEdibtn() {
    let {
      edibtn
    } = this.state || {};
    this.setState({
      edibtn: !edibtn
    });
  }
  /**
   * @method load 框架页加载完毕后执行方法
   * @param {Object} event 事件对象
   */
  load(event) {
    //绑定卸载事件
    event.target.contentWindow.onunload = this.unload.bind(this); //调用load方法 load在main.js中传过来的

    this.props.load && this.props.load(event, () => {
      const {
        public: {
          win,
          dom
        }
      } = window;
      const modal = document.querySelector(".property-modal"); //设置页面名称

      Dispatcher.dispatch("setPageName", {
        value: win.pageData.label || ""
      });
      window.public.pageName = win.pageData.label; //给页面名称赋值 
      //初始化时要在页面存在数据时进行模拟点击 

      if (window.public.type == 'mo') {
        document.querySelector('.edipage').click();
      } //页面加载完毕，清空所有限制选中设置


      Dispatcher.dispatch('setLookup', {
        value: ''
      }); //修改测导航按钮显示状态 

      this.state.display = false; //监听滚动事件，滚动property=modal时，让框架页面也跟着滚动

      if (modal) {
        modal.onscroll = e => win.scrollTo(0, e.target.scrollTop);
      } //注册观察者


      new ResizeObserver(([{
        contentRect,
        target
      }]) => {
        //更新页面高度
        this.setState({
          height: contentRect.height
        });
        const header = target.querySelector('#SITE_HEADER'); //设置辅助线top值

        header && Dispatcher.dispatch("rulerTop", {
          value: header.offsetHeight
        });
      }).observe(dom.querySelector("body"));
    });
  }


  /**
   * @method unload 卸载iframe时执行方法
   */
  unload(event) {
    this.props.unload && this.props.unload(event); //取消事件

    event.currentTarget.onunload = null;
  }


  /**
   * @method showToolbars 显示对应类型面板
   * @param {string} type 面板类型 
   * @param {event} event 事件类型 
   */
  showToolbars(type, event) {
    // 获取toolBar根节点对象
    const toolBarsRoot = createRoot(document.getElementById("edit-toolbar-content"));

    //判断是否存在弹出此工具栏的面板
    if (this[type]) {
      this[type](toolBarsRoot);
      this.setState({
        toolbar: type
      });
    }
  }


  /**
   * @method hideToolbars 清空导航栏选中状态
   */
  hideToolbars() {
    this.setState({
      toolbar: ""
    });
  }


  /**
   * @method widgetLibrary 弹出控件面板
   */
  widgetLibrary(toolBarsRoot) {
    var box = document.getElementById("edit-toolbar-content"),
      close = box.querySelector("#panel-close");
    close && close.click();
    // WidgetLibraryControler.widgetLibrary("edit-toolbar-content");
    WidgetLibraryControler.widgetLibrary(toolBarsRoot);
  }

  /**
   * @method componentLibrary 模块库弹出面板
   */
  componentLibrary(toolBarsRoot) {
    var box = document.getElementById("edit-toolbar-content"),
      close = box.querySelector("#panel-close");
    close && close.click();
    console.log(box, close, toolBarsRoot)
    WidgetLibraryControler.widgetLibrary(toolBarsRoot, 'component');
  }

  /**
   * @method template 弹出模版更换面板
   */
  template() {
    // import('../../system/function/resource/resource_manager.js').then(module => {

    //   module.resourceManager("template").then(module => {

    //     module.resource({
    //       selected: null
    //     });
    //   });
    // });

    TemplateControler.template()
  }

  /**
  * @method collection 弹出收藏面板
  */
  collection(toolBarsRoot) {
    // CollectionControler.collection("edit-toolbar-content");
    CollectionControler.collection(toolBarsRoot);
  }

  /**
   * @method setUp 弹出设置面板
   */
  setUp() {
    Promise.all(/*! import() | set_up */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("set_up")]).then(__webpack_require__.bind(null, /*! ../toolbar/set_up/set_up.js */ "./ui/toolbar/set_up/set_up.js")).then(({
      SetUp
    }) => SetUp.setUp("edit-toolbar-content"));
  }

  showPanel() {
    const value = this.state.display == true ? false : true;
    const promise = Promise.all(/*! import() | panel_attribute */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e("panel_attribute")]).then(__webpack_require__.bind(null, /*! ../../components/panel/attr/panel_attribute */ "./components/panel/attr/panel_attribute.js"));
    promise.then(({
      PanelAttribute
    }) => PanelAttribute.display(value));
    this.setState({
      display: value
    });
  }

  /**
  * @method showDesignpage 弹出设计面板
  */
  showDesignpage(e) {
    //获取每一个页面中的页面内容id
    const iframeData = Dispatcher.dispatch("document_get");
    const pageId = iframeData.component.children[2].pageId; //获取当前点击X跟Y坐标

    let x = e.clientX - 270;
    let y = e.clientY; //页面内容id

    let id = pageId;
    Dispatcher.dispatch(`selectedComponent`, {
      args: [{
        button: 0,
        isdrag: false
      }, x, y, id, this.Designpageclick]
    });
    this.setState({
      'data': []
    });
    e.stopPropagation(); //阻止冒泡       
  }

  /**
   * @method Designpageclick 模拟点击属性面板
   */
  Designpageclick() {
    var designIcoclick = document.querySelector('.designIco');

    if (designIcoclick) {
      designIcoclick.click();
    }
  }


  // 组件渲染执行的方法
  componentDidMount() {
    this.init()
  }


  /**
   * @method DesignPagebtns 弹出设计面板结构
   */
  DesignPagebtns() {
    if (this.state.type == 'mo' && this.state.display == false) {
      return React.createElement("div", {
        className: "pageStyle",
        onClick: this.controler.showDesignpage.bind(this.controler)
      }, React.createElement("i", null), React.createElement("span", null, "\u8BBE\u8BA1\u9875\u9762"));
    }

    return null;
  }

  prompt() {
    if (this.state.type == 'mo') {
      return React.createElement("span", {
        className: "remo_help"
      }, window.public.lang.moEditPrompt, React.createElement("br", null), window.public.lang.moEditPrompta, React.createElement("i", null, "\xD7"));
    }

    return null;
  }


  button() {
    if (this.state.type == 'mo') {
      return React.createElement("div", {
        className: "showPanel",
        onClick: this.controler.showPanel.bind(this.controler)
      }, React.createElement("i", null), React.createElement("span", null, this.state.display == true ? '隐藏导航' : '显示侧导航'));
    }

    return null;
  }

  // 渲染右侧工具栏
  renderEdiTool() {
    const { state: { type, edibtn, toolbar } } = this;
    if (type == 'pc') {
      return (
        <div id="ediTool">
          {
            edibtn ?
              <div id="ediToolbtn">
                <ul className="edibtn">
                  {
                    this.toolbars.map((item, index) => {
                      return (
                        <li
                          key={index}
                          data-type={item.type}
                          className={item.type != toolbar ? item.type : `${item.type} on`}
                          onClick={() => this.showToolbars(item.type)}
                        >
                          <a>
                            <i className="iconfont" dangerouslySetInnerHTML={{ __html: item.iconName }}></i>
                            <p>{window.public.lang.toolbars[index]}</p>
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              : null
          }

          <div id="edit-toolbar-content" data-add="c9IoTZL_1"></div>
        </div>
      )
    } else {
      return (null)
    }

  }


  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    const { state: { type, height, rulerShow, edibtn } } = this;
    let _style = null;

    if (type == 'pc' && rulerShow) {
      _style = { top: "60px", height: "calc(100% - 60px)" };
    }

    //页面为pc，并且头部工具栏隐藏时，top变化 
    if (type == 'pc' && !edibtn) {
      _style = {
        top: "20px",
        height: "calc(100% - 20px)"
      };
    }
    const siteId = window.pageData.siteId;
    return (
      <div id='ediMain' className={`${type}-content`} style={_style}>
        <div id='edit-container'>
          <iframe
            id="iframe"
            scrolling="no"
            onLoad={(event) => this.load(event)}
            // src={`/framework2.html`}
            src={`/blank.html`}
          // src={`/desktop/index.php/Edit/Response/edit/sid/${siteId}.html${this.state.search}`} 
          />
        </div>
        <div className='property-modal'>
          {
            type == 'pc' && !rulerShow ? <RulerControler height={height} /> : null
          }
          <ComponentEditTestControler height={height} />
        </div>

        {this.renderEdiTool()}
        {/* <TranslatePopup /> */}
        <div id="component-property"></div>
        <div id="component-modal"></div>
        <div id="gallery-modal"></div>
        <div id="function-modal"></div>
        <div id="source-modal"></div>
        <div id="page-management"></div>
        <div id="info-prompt"></div>
        <div id="collection-modal"></div>
        <div id="translate-modal"></div>
        <div id="publish-modal"></div>
      </div>
    )
  }
}


