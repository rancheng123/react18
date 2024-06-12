import React from 'react'
import Dispatcher from '@/system/tools/dispatcher';
import History from '@/system/tools/history';
import logo from '@/assets/image/logo.png'
import { Select, Button } from 'antd';
import styles from './header.module.less'
import EditPage from './components/editPage.jsx'
import GlobalFamily from "./components/globalFamily/index.jsx";
import Background from "./components/background/index.jsx";
import TranslatePopup from '@/components/publicComponents/TranslatePopup/TranslatePopup.jsx'
import { getcustomerLangListtAPI } from '@/api/translate';
import { getLan } from '@/utils/utils.js';
/**
 * @class {HeaderControler} 编辑页头部控制器类
 */

export default class HeaderControler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "",
      hidden: false,
      plann: false,
      showIcon: '&#xe7a1;',
      editfontFamily: false,   // 是否展示编辑全局字体
      editBackground: false,   // 是否展示编辑背景
      lang_list: []   // 语言数据
    }

    /**@property {array} btn_list 按钮配置列表*/

    this.btn_list = [//将语言包内的数组改为JSON格式 headList 
      {
        "event": "rulerShow",
        'title': window.public.lang.guide,
        'iconName': "&#xe76f;"
      },
      {
        "event": "background",
        'title': window.public.lang.image,
        'iconName': "&#xe78d;"
      },
      {
        "event": "fontFamily",
        'title': window.public.lang.font,
        'iconName': "&#xe76a;"
      }, {
        "event": "showHidden",
        'title': window.public.lang.showHidden
      },
      { "iconClass": "iconfont", "iconName": "&#xe775;", "event": "undo", 'title': window.public.lang.backOff }, //先注掉 原因是功能还没完全的做完。 lw 2021-4-22
      { "iconClass": "iconfont", "iconName": "&#xe771;", "event": "redo", 'title': window.public.lang.forwards },
      // {
      //   "iconName": "",
      //   "iconClass": "",
      //   "event": "switchPcEdit",
      //   'title': window.public.lang.ComputerEditing
      // }, {
      //   "iconName": "",
      //   "iconClass": "",
      //   "event": "switchMoEdit",
      //   'title': window.public.lang.MobileEditing
      // },
      {
        "event": "preview",
        'title': window.public.lang.preview,
        'iconName': window.public.lang.preview,
        className: 'btn textBtn firstTextBtn'
      }, //判断是否上线，上线显示发布，不上线不显示发布
      {
        "event": "save",
        'title': window.public.lang.preservation,
        'iconName': window.public.lang.preservation,
        className: 'btn textBtn'
      },
      window.pageData.onlineSite == 0 ? null : {
        "event": "publish",
        'title': window.public.lang.release,
        className: 'btn textBtn',
        iconName: window.public.lang.release
      }, {
        "event": "manage",
        'title': window.public.lang.returnAdministration,
        className: 'btn textBtn',
        iconName: window.public.lang.returnAdministration
      }]; //组件挂载前的初始化方法，整个生命周期内只执行一次


    // 设备数据
    this.device_list = [
      {
        "event": "switchPcEdit",
        'title': window.public.lang.ComputerEditing,
        'iconName': "&#xe772;"
      },
      {
        "event": "switchIpadEdit",
        'title': window.public.lang.ipadEditing,
        'iconName': "&#xe768;"
      },
      {
        "event": "switchMoEdit",
        'title': window.public.lang.MobileEditing,
        'iconName': "&#xe76c;"
      },
    ]

    // 页面数据
    this.page_list = [
      '产品列表页',
      '产品详情页',
      '案例列表页',
      '案例详情页',
      '新闻列表页',
      '新闻详情页',
      '下载列表页',
      'FAQ列表页',
      '证书列表页',
      '视频列表页',
      '单页',
      '空白页',
    ]

    // this.init();
  }
  async componentDidMount() {
    // 获取语种列表
    await getcustomerLangListtAPI().then(res => {
      this.setState({
        lang_list: res.data.list
      })
    })

    this.init()
  }
  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */

  render() {
    return (
      <header id="ediHeader">
        <div className="ediHeLeft">
          <img src={logo} width="128" />
          {/* <div className="edipage">
            <i className="iconfont">&#xe67e;</i>
            <span>当前页面:HOME</span>
            <i className="iconfont pageBtn"></i>
          </div> */}
          <div className={styles.ediLang}>
            <Select
              className={styles.langSelect}
              style={{ width: '150px', height: "32px" }}
              defaultValue={getLan() ? decodeURIComponent(getLan()) : ''}
              options={
                [
                  {
                    label: <span className={styles.langSelectTitle}>我的网站语言</span>,
                    title: "lang",
                    options: this.state.lang_list.map((item, index) => {
                      return (
                        {
                          label: <span className={styles.langSelectChild} key={item.id} > {item.is_main === 1 && <em>*</em>}{item.name}</span>,
                          value: item.id + '#' + item.name + '#' + item.is_main,
                        }
                      )
                    }),
                  }
                ]}
              onChange={this.handLangChange}
            />
            <Button type="primary" className={styles.translateBtn} onClick={this.handTranslate.bind(this)}>翻译</Button>
          </div>

          <div className={styles.edipage}>
            <EditPage pageList={this.page_list} />
          </div>

          <div className={styles.ediDevice}>
            <ul>
              {
                this.device_list.map((item, index) => {
                  return (
                    <li
                      key={item.event}
                      id={item.event}
                      title={item.title}
                      className={item.className}
                      onClick={item.event ? this[item.event].bind(this) : () => { }}
                    >
                      <a><i className="iconfont" dangerouslySetInnerHTML={{ __html: item.iconName }}></i></a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>

        <div className="ediHeRight">
          <ul className="e_ulBox">
            {
              this.btn_list.map((item, index) => {
                if (!item) return null
                return (
                  <li
                    key={index}
                    id={item.event}
                    title={item.title}
                    className={item.className}
                    onClick={item.event ? this[item.event].bind(this) : () => { }}
                  >
                    {
                      // item.event === 'rulerShow' ? (
                      //   <a>
                      //     <svg t="1582531184791" width="22" height="22" className="icon" fill='#7E4DF7'
                      //       viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5778">
                      //       <path
                      //         d="M413.84598 635.535515h292.849778V342.685737H413.84598v292.849778z m341.656565 97.614869v48.806788h97.620041v-48.806788h-97.620041z m-146.421656 48.806788h97.614869v-48.806788h-97.614869v48.806788z m-146.428121 0h97.62004v-48.806788h-97.62004v48.806788z m-146.42295 0h97.614869v-48.806788h-97.614869v48.806788zM169.80299 733.150384v48.806788h97.614869v-48.806788H169.80299z m97.614869 146.426828h48.811959v-97.62004h-48.811959v97.62004z m48.811959-244.041697h-48.811959v97.614869h48.811959v-97.614869z m0-146.428121h-48.811959v97.62004h48.811959v-97.62004z m0-146.421657h-48.811959v97.614869h48.811959v-97.614869z m0-146.428121h-48.811959v97.614869h48.811959v-97.614869z"
                      //         p-id="5779" fill="#ffffff"></path>
                      //     </svg></a>
                      // ) : (<a><i className="iconfont" dangerouslySetInnerHTML={{ __html: item.iconName }}></i></a>)
                      item.event === 'showHidden' ? (
                        <a><i className="iconfont" dangerouslySetInnerHTML={{ __html: this.state.showIcon }}></i></a>
                      ) : (
                        <a><i className="iconfont" dangerouslySetInnerHTML={{ __html: item.iconName }}></i></a>
                      )

                    }
                  </li>
                )
              })
            }

            {/* <li title="组件显示/隐藏" onClick={() => hanlderIcon('showHidden')} id="showHidden"><a>{state.showHidden ? <i className="iconfont">&#xe7a1;</i> : <i className="iconfont">&#xe798;</i>}</a></li>
            <li title="图片" id="showImage"><a><i className="iconfont">&#xe78d;</i></a></li>
            <li title="字体" id="showFont"><a><i className="iconfont">&#xe76a;</i></a></li>

            <li title="撤销" id="switchPcEdit"><a><i className="iconfont">&#xe775;</i></a></li>
            <li title="恢复" id="switchMoEdit"><a><i className="iconfont">&#xe771;</i></a></li>
            <li title="预览" id="preview" className='btn'><a><i>预览</i></a></li>
            <li title="保存" id="save" className='btn'><a><i>保存</i></a></li>
            <li title="发布" id="manage" className='btn'><a><i>发布</i></a></li>
            <li title="返回后台" className='btn'><a href="/"><i>返回后台</i></a></li> */}
          </ul>
        </div>
        <div className="hideBtn" data-hidden="false"><i className="iconfont"></i></div>


        {/* 全局字体弹框 */}
        {this.state.editfontFamily && <GlobalFamily close={() => this.setState({ editfontFamily: false })} />}
        {/* 背景弹框 */}
        {this.state.editBackground && <Background close={() => this.setState({ editBackground: false })} />}
        {/* 全局翻译弹框 */}
        {this.state.translate && <TranslatePopup close={() => this.setState({ translate: false })} />}
      </header>
    )
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   */

  init() {
    Dispatcher.register('setPageName', this.setPageName, this);
    Dispatcher.register('savePage', this.save, this);
  }
  /**
   * @method switchEdit 切换到PC编辑模式
   */

  switchPcEdit() {
    Dispatcher.dispatch("switchEdit", {
      value: "pc"
    }); //点击切换到pc时，默认关闭弹窗

    const close = document.querySelector('.layer-close'); //关闭所有弹层

    var headerlist = document.querySelector('.em-open-layer .layer-close');

    if (headerlist) {
      headerlist.click();
    }

    close && close.click();
  }

  /**
   * @method switchEdit 切换到平板编辑模式
   */
  switchIpadEdit() {
    Dispatcher.dispatch("switchEdit", {
      value: "ipad"
    });
    var showlist = document.querySelector('.edipage');
    showlist.click();
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
    const iconName = this.state.showIcon != '&#xe7a1;' ? '&#xe7a1;' : '&#xe798;';
    this.setState({
      showIcon: iconName
    });
    // const promise = __webpack_require__.e(/*! import() | hiding */ "hiding").then(__webpack_require__.bind(null, /*! ../../components/page/attr/hiding */ "./components/page/attr/hiding.js"));
    const promise = import('../../components/page/attr/hiding.js')
    promise.then(({
      Hiding
    }) => Hiding.show());
  }


  /**
   * @method rulerShow 设置辅助线显隐功能
   */
  rulerShow() {
    Dispatcher.dispatch("setRuler");
  }
  /**
   * @method undo 撤销
   */
  undo() {
    History.undo();
  }


  /**
   * @method redo 还原
   */
  redo() {
    History.redo();
  }


  /**
   * @method progress 创建或删除进度条
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
   */
  async save() {
    const header = document.querySelector('#save'); //判断是否已经插入进度条

    if (header.lastChild.className != "save-progress") {
      const progress = this.progress(header, 'add');
      // const {
      //   Save
      // } = await Promise.all(/*! import() | save */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("save")]).then(__webpack_require__.bind(null, /*! ../../system/function/save */ "./system/function/save.js"));
      const { Save } = await import('../../system/function/save.js');
      await new Save("#component-modal").save();
      this.progress(progress, 'remove');
    }
  }
  /**
   * @method preview 预览
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
   * @method textPlann 点击多语言按钮展示选项的方法
  */
  textPlann() {
    const value = this.state.plann == true ? false : true;
    this.setState({
      plann: value
    });
  }


  // 全局字体
  fontFamily() {
    this.setState({
      editfontFamily: true
    });
  }

  // 全局背景
  background() {
    this.setState({
      editBackground: true
    });
  }

  // 全局翻译
  handTranslate() {
    this.setState({
      translate: true
    });
  }

  // 切换语言下拉框
  handLangChange(v) {
    // 语种id,语种名字,是否为主语种
    const [id, name, is_main] = v.split('#')
    localStorage.setItem('is_main', is_main)

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('lan', v)

    // 替换页面数据
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`)
    window.location.reload()
  }
}
