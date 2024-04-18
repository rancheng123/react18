import React from 'react'
import ReactDom from 'react-dom'
import PageManagement from './page_management'
import PageSetup from './page_setup'
import PageClassifyControler from './classify/page_classify_controler'
import PageHistoryControler from './history/page_history_controler'
import Dispatcher from '../../system/tools/dispatcher';
import resourceManager from '../../system/function/resource/resource_manager'
import Layer from '../../system/widgets/layer'
import SingleDrag from '../../system/tools/single_drag'
import MenuDragTools from './menu_drag/MenuDragTools'

const { offset, l1, l2 } = MenuDragTools.getConf();
let childAdd = false,
    //是否添加子级
addClassify = ""; //是新增分类还是修改分类

export default class PageManagementControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {space} view 初始化 view 实例*/

    // this.view = new _page_management__WEBPACK_IMPORTED_MODULE_2__["PageManagement"](this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
    this.dragMove = this.dragMove.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this); // eric 2019-11-26

    this.tempX = 0;
    this.tempY = 0;
    this.current = '';
    this.eleWdith = 0;
    this.eleHeigth = 0;
    this.maxLevel = 3; //最大拖拽到2级分类,(-1)无限级,0禁止分级

    this.area = {
      left: 100,
      top: 153,
      bottom: 443
    };
    this._dragMove = false;
    this.caching = null;
    this.posTop = 0; //导航拖拽开始的top值
  }

  static pageManagement() {
    const element = document.querySelector('#page-management');
    ReactDom.render(React.createElement(PageManagementControler, null), element);
  }
  /**
      * @method  render 挂载组件方法
      * @author sxt
      */


  render() {
    return React.createElement(this.view.render, null);
  }
  /**
      * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
      * @author sxt
      */


  init() {
    this.state = {};
    const getIframeData = Dispatcher.dispatch("getIframeData");
    let getPageData = Dispatcher.dispatch("getPageData"),
        //当前页面数据
    pageType = getPageData.component.pageType;
    let items = getIframeData.data.document_data.MAIN_MENU.items || [],
        //已递归的数据
    tab = "menu",
        children = getIframeData.component.children || [],
        //框架页控件数据
    lightboxArr = [];

    for (let i = 0; i < children.length; i++) {
      let current = children[i];

      if (current.componentType == "em-Lightboxmodal") {
        let id = current.id,
            name = getIframeData.data.document_data[current.components[0].id].componentName || "弹出窗口";
        lightboxArr.push({
          "label": name,
          "pid": id
        });
      }
    }

    if (pageType == "Search" || pageType == "NewsContent" || pageType == "ProductContent" || pageType == "ShoppingCart" || pageType == "PageLabel") {
      items = getIframeData.data.document_data.MAIN_MENU.tempitems || [];
      tab = "template";
    }

    const decodeList = MenuDragTools.decode(items); //反向递归解析数据

    MenuDragTools.init(decodeList); //初始化数据

    this.state = {
      tab: tab,
      lightboxArr: lightboxArr,
      menuList: items,
      currentPageId: getPageData.component.id,
      currentData: {}
    };
  }
  /**
  * @method setTab 切换导航项类型
  * @date 2020-01-06 14:17
  * @author sxt
  * @param {String} type 切换类型
  */


  setTab(type) {
    let data = Dispatcher.dispatch("getIframeData"),
        MAIN_MENU = data.data.document_data.MAIN_MENU,
        _itemsList = [];

    if (type == "menu") {
      _itemsList = MAIN_MENU.items || [];
      this.maxLevel = 3;
      this.lightboxClose(); //清除弹出层
      //this.clickSelected(_itemsList[0]) //切换选项时不走默认选中第一个的方法(客服提的) sxt 2021-1-13
    } else if (type == "template") {
      _itemsList = MAIN_MENU.tempitems;
      this.maxLevel = 1;
      this.lightboxClose(); //清除弹出层
      //this.clickSelected(_itemsList[0])
    } else if (type == "lightbox") {
      _itemsList = this.state.lightboxArr;
      this.maxLevel = 0;
    } else if (type == "delete") {
      //回收站切换按钮
      _itemsList = MAIN_MENU.delitems;
      this.maxLevel = 1;
      this.lightboxClose(); //清除弹出层
      // if(_itemsList[0]){
      //     this.clickSelected(_itemsList[0])
      // }
    }

    const decodeList = MenuDragTools.decode(_itemsList); //反向递归解析数据

    MenuDragTools.init(decodeList); //初始化数据

    this.setState({
      tab: type,
      menuList: _itemsList
    });
  } //添加页面按钮显示


  pageAddShow() {
    this.setState({
      addBlock: true,
      setBlock: false
    });
  } //点击空白关闭新增页面按钮面板


  closeNew() {
    this.setState({
      addBlock: false
    });
  }
  /**
  * @method setExpand 设置项的展开和隐藏
  * @date 2020-01-06 14:17
  * @author sxt
  * @param {String} id 当前选中id
  */


  setExpand(id) {
    let state = this.state || {},
        expand = state.expand || [];

    if (expand.includes(id)) {
      expand.splice(expand.indexOf(id), 1);
    } else {
      expand.push(id);
    }

    this.setState({
      expand: expand
    });
  } //点击切换页面方法


  clickSelected(prop = {}) {
    //event.stopPropagation();
    if (!prop.pid) {
      return false;
    }

    let close = document.querySelector("#function-modal .layer-close"),
        pageSet = document.querySelector("#pageSet .layer-close"),
        propertyClose = document.querySelector("#component-property .layer-close"),
        //属性面板关闭
    functionClose = document.querySelector("#function-modal .layer-close"); //功能面板关闭

    close && close.click();
    pageSet && pageSet.click();
    propertyClose && propertyClose.click();
    functionClose && functionClose.click();
    this.setState({
      currentPageId: prop.pid,
      currentData: prop,
      addBlock: false
    });
    let pageType = prop.pageType || "PageLink";
    Dispatcher.dispatch("selectedHidden", {
      value: true
    });

    if (pageType == "PageLink" || pageType == "Search" || pageType == "NewsContent" || pageType == "ProductContent" || pageType == "ShoppingCart" || pageType == "PageLabel") {
      let savePage = Dispatcher.dispatch("savePage");
      savePage.then(() => {
        window.public.pageName = prop.label; //给页面名称赋值 sxt 2020-2-13

        Dispatcher.dispatch("setPageName", {
          value: prop.label
        });
        Dispatcher.dispatch("setPageId", {
          value: prop.pid
        });
        window.public.location.addHash("pageid", prop.pid);
      });
    }
  }
  /**
  * @method getAjaxPage 切换页面请求方法
  * @author sxt 
  * @date   2020-1-8 10:18
  * @param {string} id 当前页面id 
  * @return {object} 当前页面数据
  */


  getAjaxPage(id) {
    let newData = {
      sid: pageData.siteId,
      id: id
    };
    return fetch("/desktop/index.php/Edit/Pages/getPagesData", {
      method: 'POST',
      headers: {},
      body: JSON.stringify(newData)
    }).then(response => response.json()).then(data => {
      let datas = data.msg || {};
      return datas;
    }).catch(error => console.log("Error", error));
  } //点击遮照层，清除设置按钮


  clickMask() {
    this.setState({
      setBlock: false
    });
  } //单项设置显示


  singleSetShow(data, e) {
    // let _parentid=$(e.target).parents("[data-reactid]").attr("data-parentid");
    // let parentid=_parentid?false:true;
    // oneLevel=true;
    // _this=this;
    let _state = this.state || {};

    if (_state.tab == "lightbox") {
      this.setState({
        setTop: e.pageY - 80,
        setBlock: _state.setBlock == "block" ? "none" : "block",
        lightboxId: data.pid
      });
      this.lightboxClick(data); //点击单项显示时，显示弹出层
    } else {
      let top = e.pageY - 130; //之前位置太小，易被遮档，现改变在中部显示 sxt 2020-10-19

      this.clickSelected(data);
      this.setState({
        setTop: top,
        setBlock: _state.setBlock == "block" ? "none" : "block"
      });
    }
  } //新增页面


  addPage() {
    let state = this.state || {};
    let _data = {
      level: state.currentPageId,
      pid: state.currentPageId,
      type: "add",
      pageType: "PageLink"
    };

    if (childAdd != true) {
      delete _data.pid;
    } else {
      delete _data.level;
    }

    childAdd = false;
    this.pageAjax(_data);
    this.setState({
      addBlock: false
    });
  } //新增链接


  addPageLink() {
    let state = this.state || {};
    let _data = {
      level: state.currentPageId,
      pid: state.currentPageId,
      type: "add",
      pageType: "JumpLink"
    };

    if (childAdd != true) {
      delete _data.pid;
    } else {
      delete _data.level;
    }

    childAdd = false;
    this.changeLink(_data);
    this.setState({
      addBlock: false
    });
  } //更改链接


  showLink() {
    let state = this.state || {};
    let ajaxData = {
      type: "link",
      id: state.currentPageId
    };
    this.changeLink(ajaxData);
  } //修改链接共用方法


  changeLink(prop) {
    let state = this.state || {},
        linkData = state.currentData || {};
    const promise = Promise.all(/*! import() | link_controler */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("link_controler")]).then(__webpack_require__.bind(null, /*! ../../system/function/link/link_controler */ "./system/function/link/link_controler.js"));
    promise.then(module => {
      module.LinkControler && module.LinkControler.link({
        initialData: linkData.link || {},
        ensure: data => {
          let ajaxData = { ...prop,
            ...{
              json: data
            }
          };
          this.pageAjax(ajaxData);
        }
      });
    });
  } //新增导航标题


  addPageMenu() {} //新增新闻产品分类 


  pageAddCat(type) {
    addClassify = type; //用于在确定时，区分是修改还是新增加分类

    let state = this.state || {};
    let element = document.querySelector("#pageSet"),
        cat = {};

    if (addClassify == "CatLink") {
      cat = state.currentData.cat || {};
      cat.label = state.currentData.label;
    } // let _value = e.target.value;

    ReactDom.render(
      <PageClassifyControler
        callThis={this}
        initialData={cat}
        ensure={this.classifyEnsure}
      />
    , element)
    // ReactDom.render(React.createElement(_classify_page_classify_controler__WEBPACK_IMPORTED_MODULE_4__["PageAddClassify"], {
    //   callThis: this,
    //   ensure: this.classifyEnsure,
    //   initialData: cat
    // }), element);
    this.setState({
      addBlock: false
    });
  }
  /**
  * @description: 点击查看页面操作历史记录
  * @return: void
  * @author: Eric
  * @Date: 2020-01-08 10:51:31
  */


  history() {
    const element = document.querySelector("#pageSet"),
          cat = {},
          currentData = this.state.currentData;
      ReactDom.render(<PageHistoryControler callThis={this} pid={currentData.id} initialData={cat} />, element);
    // ReactDom.render(React.createElement(_history_page_history_controler__WEBPACK_IMPORTED_MODULE_5__["PageHistoryControler"], {
    //   callThis: this,
    //   pid: currentData.id,
    //   initialData: cat
    // }), element);
  }
  /**
  * @method classifyEnsure 新闻产品分类确定方法
  * @author sxt 
  * @date   2020-1-8 10:18
  * @param {Object} data 编辑的分类数据
  */


  classifyEnsure(data) {
    let state = this.state || {};
    let ajaxData = {
      type: addClassify,
      pageType: "CatLink",
      json: data,
      label: data.label,
      level: state.currentPageId,
      pid: state.currentPageId
    };

    if (addClassify == "CatLink") {
      ajaxData.id = state.currentPageId;
    }

    if (childAdd != true) {
      delete ajaxData.pid;
    } else {
      delete ajaxData.level;
    }

    childAdd = false;
    this.pageAjax(ajaxData);
  } //设置


  pageSetUp() {
    let state = this.state || {};
    let element = document.querySelector("#pageSet"); // let _value = e.target.value;

    ReactDom.render(<PageSetup callThis={this} initialData={state.currentData || {}} ensure={this.setEnsure} />, element)

    // ReactDom.render(React.createElement(_page_setup__WEBPACK_IMPORTED_MODULE_3__["PageSetUp"], {
    //   callThis: this,
    //   initialData: state.currentData || {},
    //   ensure: this.setEnsure
    // }), element);
  }
  /**
  * @method setEnsure 设置面板确定方法
  * @author sxt 
  * @date   2020-1-8 10:18
  * @param {Object} data 编辑的页面设置数据
  */


  setEnsure(data) {
    let state = this.state || {};
    data.id = state.currentPageId;
    this.pageAjax(data);
  } //更换图标


  changeIcon(prop, event) {
    event.stopPropagation();
    let state = this.state || {}; //this.clickSelected(prop);

    this.setState({
      currentPageId: prop.pid,
      currentData: prop
    });
    resourceManager("icon").then(module => {
      module.resource({
        selected: datas => {
          let ajaxData = {
            type: "icon",
            id: prop.pid,
            json: datas
          };
          this.pageAjax(ajaxData);
          const close = document.querySelector('.layer-close'); //切换icon时关闭属性面板 为了解决（切换icon后会刷新页面并且更改操作按钮的状态 然后当用户再次点击属性面板内的皮肤时 这时在页面中的皮肤是无法选中的，所以需要让用户重新打开操作按钮）panel无法选择问题 lw 2021-3-5

          close && close.click();
        }
      });
    });
  }
  /**
  * @method setIcon 设置icon方法
  * @date 2019-11-7
  * @author sxt 
  * @param {Object} datas 返回数据
  * @param {event} event 事件对象
  */


  setIcon(datas) {
    this.setState({
      "icon": datas
    });
    Dispatcher.dispatch(`${this.props.id}_set`, {
      args: [`document_data.icon`, datas]
    });
  }
  /**
   * @method lightboxClick 弹出容器切换功能
   * @date 2020-07-21 17:17
   * @author sxt
   * @param {String} type 切换类型
   */


  lightboxClick(prop) {
    let menuList = this.state.menuList || [];
    this.setState({
      lightboxId: prop.pid
    });

    for (let i = 0; i < menuList.length; i++) {
      if (menuList[i].pid == prop.pid) {
        Dispatcher.dispatch(`darg_range`, {
          value: "Lightboxmodal"
        });
        Dispatcher.dispatch('setLookup', {
          value: 'Lightboxmodal'
        }); //这个方法是鼠标移入只查找弹出窗口的控件，sxt 2020-9-10

        Dispatcher.dispatch(`${prop.pid}_set`, {
          value: {
            "lightboxShow": true
          }
        }); //编辑页面的弹出层显示，用于实时渲染
      } else {
        Dispatcher.dispatch(`${menuList[i].pid}_set`, {
          value: {
            "lightboxShow": false
          }
        }); //编辑页面的弹出层隐藏，用于实时渲染
      }
    }
  }
  /**
  * @method lightboxDelete 弹出容器删除功能
  * @date 2020-07-21 17:17
  * @author sxt
  * @param {String} type 切换类型
  */


  lightboxDelete(prop) {
    let id = this.state.lightboxId;

    if (id) {
      let menuList = this.state.menuList || [];

      for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].pid == id) {
          menuList.splice(i, 1);
        }
      }

      this.setState({
        menuList: menuList
      });
      Dispatcher.dispatch(`removeComponent`, {
        value: id
      });
    }
  }
  /**
  * @method lightboxClose 弹出容器关闭所有功能
  * @date 2020-07-21 17:17
  * @author sxt
  * @param {String} type 切换类型
  */


  lightboxClose() {
    let menuList = this.state.menuList || [];

    for (let i = 0; i < menuList.length; i++) {
      Dispatcher.dispatch(`${menuList[i].pid}_set`, {
        value: {
          "lightboxShow": false
        }
      }); //编辑页面的弹出层隐藏，用于实时渲染
    }

    Dispatcher.dispatch(`darg_range`, {
      value: ""
    });
    Dispatcher.dispatch('setLookup', {
      value: ''
    }); //这个方法是清空鼠标移入只查找弹出窗口的控件，sxt 2020-9-10

    this.setState({
      lightboxId: ""
    });
  }
  /**
  * @method deletePageAll 清空回收站
  * @date 2020-09-27 17:17
  * @author sxt
  * @param {String} type 切换类型
  */


  deletePageAll() {
    let data = {
      id: "all",
      type: "recovery"
    };
    this.pageAjax(data);
  }
  /**
   * @method pageReduction 页面还原方法
   * @date 2020-09-27 17:17
   * @author sxt
   * @param {String} id 页面id
   */


  pageReduction(id) {
    let data = {
      id: id,
      type: "restore"
    };
    this.pageAjax(data);
  }
  /**
   * @method pageShredFile 页面永久删除方法
   * @date 2020-09-27 17:17
   * @author sxt
   * @param {String} id 页面id
   */


  pageShredFile(id) {
    let data = {
      id: id,
      type: "recovery"
    };
    this.pageAjax(data);
  } //重命名弹出


  pageChangeName(id) {
    // let inputEl = this.refs.input;
    // inputEl.focus()
    let state = this.state || {};

    if (state.tab == "lightbox") {
      this.setState({
        lightboxNameId: state.lightboxId
      });
    } else {
      this.setState({
        pageNameId: id
      });
    }
  } //重命名


  pageChangeInput(e) {
    let state = this.state || {};
    let _value = e.target.value;

    if (state.tab == "lightbox") {
      let menuList = state.menuList || [];

      for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].pid == state.lightboxId) {
          menuList[i].label = _value;
        }
      }

      this.setState({
        menuList: menuList
      });
      let {
        component: {
          components = []
        }
      } = Dispatcher.dispatch(`${state.lightboxId}_get`),
          id = components[0].id;
      Dispatcher.dispatch(`${id}_set`, {
        args: [`document_data.componentName`, _value]
      });
    } else {
      state.currentData.label = _value;
      this.setState({
        currentData: state.currentData
      });
    }
  } //输入框失去焦点重命名


  pageNameBlur() {
    let state = this.state || {},
        pageType = state.currentData.pageType;
    let getIframeData = Dispatcher.dispatch("getIframeData"),
        //框架页数据
    getPageData = Dispatcher.dispatch("getPageData"); //当前页面数据

    let data = {
      type: "label",
      name: state.currentData.label,
      id: state.currentPageId,
      masterPage: {
        "data": getIframeData.data,
        "structure": getIframeData.component
      },
      pagesData: {
        "data": getPageData.data,
        "structure": getPageData.component
      }
    };

    if (pageType == "CatLink" || pageType == "JumpLink") {
      //页面类型为分类和链接时，不返回当前页面数据
      delete data.pagesData;
    }

    if (state.tab == "lightbox") {
      this.setState({
        lightboxNameId: ""
      });
    } else {
      this.setState({
        pageNameId: ""
      });
      this.pageAjax(data);
    }
  }
  /**
   * @method  completeName 点击确定重命名
   * @date 2019-12-31 16:50
   * @author sxt
   */


  completeName() {} // let state=this.state||{};
  // let data={type:"label",name:state.currentData.label,id:state.currentPageId};
  // this.setState({pageNameId:""}) 
  // this.pageAjax(data);

  /**
   * @method  pageTranslate 页面翻译按钮处理
   * @date 2020-10-15
   * @author sxt
   */


  pageTranslate() {
    let state = this.state || {};
    let data = {
      projectId: pageData.projectId,
      isTrans: pageData.isTrans,
      siteId: pageData.siteId,
      id: state.currentData.id,
      webToken: pageData.webToken
    };
    window.tranPage && window.tranPage(data);
  } //具体删除页面


  deletePage() {
    let state = this.state || {};
    let data = {
      type: "del",
      id: state.currentPageId,
      is_home: state.currentData.is_home
    };
    this.pageAjax(data);
  } //删除页面


  pageSetDelete() {
    let state = this.state || {},
        currentData = state.currentData || {},
        label = currentData.label,
        text = window.public.lang["confirmDelete"] + label + window.public.lang["you"];
    Layer.alert({
      area: ["420px", "225px"],
      skin: "",
      close: true,
      cancel: true,
      ensure: this.deletePage.bind(this),
      content: text
    });
  } //复制页面


  pageCopy() {
    let state = this.state || {};
    let _data = {
      level: state.currentPageId,
      id: state.currentPageId,
      type: "copy"
    };
    this.pageAjax(_data);
  } //页面隐藏显示


  pageShow() {
    let state = this.state || {},
        _value = 1;

    if (state.currentData.isVisible) {
      _value = 0;
    }

    let _data = {
      id: state.currentPageId,
      type: "hide",
      status: _value
    };
    this.pageAjax(_data);
  } //添加子级页面


  childPageAdd() {
    childAdd = true;
    this.setState({
      addBlock: true
    });
  } //更改母版


  childPageTemplate() {}
  /**
   * @method pageAjax 公用页面管理后台请求方法
   * @author sxt 
   * @date   2020-1-8 10:18
   * @param {Object} param 向后台发送的数据
   */


  pageAjax(param) {
    //return
    // {name:'managePage',value:'menu'},
    //     {name:'templatePage',value:'template'},
    let state = this.state || {};
    let tabType = state.tab;
    let data = {
      sid: pageData.siteId,
      tabType: tabType
    },
        newData = { ...data,
      ...param
    };
    fetch("/desktop/index.php/Edit/Pages/pagesEditOperat", {
      method: 'POST',
      headers: {},
      body: JSON.stringify(newData)
    }).then(response => response.json()).then(data => {
      let msg = data.msg;

      if (msg && msg.list) {
        let item = msg.item;
        const decodeList = MenuDragTools.decode(msg.list); //反向递归解析数据

        MenuDragTools.init(decodeList); //初始化数据
        //修改当前页面存储的数组类型

        let getIframeData = Dispatcher.dispatch("getIframeData"),
            itemsType = "items";

        if (tabType == "template") {
          itemsType = "tempitems";
        }

        if (tabType == "delete") {
          itemsType = "delitems";
        }

        getIframeData.data.document_data.MAIN_MENU[itemsType] = msg.list;

        if (item) {
          let pageNameId = "",
              paramType = param.type; //类型为新增和复制页面时，显示页面重命名结构 sxt 2020-1-16 18：26 

          if (paramType == "add" || paramType == "copy") {
            pageNameId = item.pid;
          }

          this.setState({
            menuList: msg.list,
            currentData: item,
            currentPageId: item.pid,
            pageNameId: pageNameId
          });
          let pageType = item.pageType || "PageLink";
          Dispatcher.dispatch("setPageName", {
            value: item.label
          });
          window.public.pageName = item.label; //给页面名称赋值 sxt 2020-2-13   
          //restore 是页面回收站还原  recovery 是清空回收站 sxt 2020-9-28

          if (paramType == "add" || paramType == "copy" || paramType == "del" || paramType == "restore" || paramType == "recovery") {
            if (pageType == "PageLink" || pageType == "Search" || pageType == "NewsContent" || pageType == "ProductContent" || pageType == "ShoppingCart" || pageType == "PageLabel") {
              Dispatcher.dispatch("selectedHidden", {
                value: true
              });
              Dispatcher.dispatch("setPageId", {
                value: item.pid
              });
              window.public.location.addHash("pageid", item.pid);
            } else {
              window.public.reload();
            }
          } else {
            window.public.reload();
          }
        } else {
          this.setState({
            menuList: msg.list
          });
        }
      }

      this.renameId = ""; //操作失败的错误请求

      if (data.suc != 0) {
        if (data.suc == "7000") {
          //重命名失败时，把失败的页面id存起来，用于二次改名用 sxt 2020-10-21
          this.renameId = this.state.currentPageId; //this.setState({pageNameId:this.state.currentPageId})
        }

        Layer.alert({
          area: ["420px", "225px"],
          skin: "",
          close: true,
          cancel: true,
          ensure: this.renameFailed.bind(this, data.suc),
          content: msg
        }); //返回类型为7000时,证明页面同级下名字相同了,
      }
    }).catch(error => console.log("Error", error));
  }
  /**
   * @method renameFailed 页面名称重复时执行方法
   * @author sxt 
   * @date   2020-1-8 10:18
   * @param {String} suc 后台返回的状态
   */


  renameFailed(suc) {
    if (suc == "7000" && this.renameId && this.renameId == this.state.currentPageId) {
      this.setState({
        pageNameId: this.renameId
      });
    }
  } ///////////////////////////////////////////////// Eric 新增 //////////////////////////////////////////////////////////////////////

  /**
   * @description: 拖拽原点处理
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2019-12-28 17:47:54
   */


  originHandle(data) {
    const list = [];
    data.forEach(item => {
      if (item.pid == this.original.pid) {
        this.current = MenuDragTools.createPlac(this.original.pid, item.parent_id);
        list.push(this.current);
      } else {
        list.push(item);
      }
    });

    const _data = MenuDragTools.listorder(list);

    const menuList = MenuDragTools.dgJson(_data);
    this.setState({
      menuList
    });
  }
  /**
   * @description: 拖拽左向处理
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2019-12-28 17:47:54
   */


  leftHandle(now, data, currentX, currentY) {
    if (now.last == '1' || now.first == '1' && now.len == '0') {
      const parent = MenuDragTools.findEle(data, this.current.parent_id); //找到父级

      let sameList,
          diffList,
          list = [];

      if (parent) {
        //如果存在父级
        sameList = MenuDragTools.getSameList(data, parent.parent_id); //获取父级的同级元素列表

        diffList = MenuDragTools.getDiffList(data, parent.parent_id); //获取(!父级的同级元素)元素列表

        for (let i = 0; i <= parent.listorder; i++) {
          list.push(sameList[i]);
        }

        this.current = MenuDragTools.createPlac(this.original.pid, parent.parent_id); //plac父级id = plac父级的父级id

        list.push(this.current);

        for (let i = parent.listorder + 1; i <= parent.len; i++) {
          const same = sameList[i];

          if (typeof same !== 'undefined') {
            list.push(sameList[i]);
          }
        }

        this.reset(currentX, currentY);

        const _data = MenuDragTools.listorder([...diffList, ...list]);

        const menuList = MenuDragTools.dgJson(_data);
        this.setState({
          menuList
        });
      }
    }
  }
  /**
    * @description: 拖拽右向处理
    * @param {type} 
    * @return: void
    * @author: Eric
    * @Date: 2019-12-28 17:47:54
    */


  rightHandle(plac, data, currentX, currentY) {
    let or = plac.listorder - 1,
        sameList,
        diffList,
        list = [];
    const prev = data.find((item, i) => {
      if (item.parent_id == plac.parent_id && item.listorder == or) {
        return true;
      }
    });
    const level = MenuDragTools.findLevel(plac, data);
    const hasChild = MenuDragTools.hasChild(plac, data);

    if (level < this.maxLevel && hasChild === -1 || this.maxLevel === -1) {
      if (prev) {
        sameList = MenuDragTools.getSameList(data, prev.pid);
        diffList = MenuDragTools.getDiffList(data, prev.pid);
        this.current = MenuDragTools.createPlac(this.original.pid, prev.pid);

        const _data = MenuDragTools.listorder([...diffList, ...sameList, this.current]);

        const menuList = MenuDragTools.dgJson(_data);
        this.setState({
          menuList
        });
        this.reset(currentX, currentY);
      }
    }
  }
  /**
    * @description: 拖拽垂直处理
    * @param {type} 
    * @return: void
    * @author: Eric
    * @Date: 2019-12-28 17:47:54
    */


  verticalHanlde(now, data, currentX, currentY) {
    if (now.pid != this.current.pid) {
      let sameList,
          diffList,
          list = [];
      sameList = MenuDragTools.getSameList(data, now.parent_id);
      diffList = MenuDragTools.getDiffList(data, now.parent_id);

      for (let i = 0; i <= now.listorder - 1; i++) {
        list.push(sameList[i]);
      }

      this.current = MenuDragTools.createPlac(this.original.pid, now.parent_id);
      ;
      list.push(this.current);

      for (let i = now.listorder; i <= now.len; i++) {
        const same = sameList[i];

        if (typeof same !== 'undefined') {
          list.push(sameList[i]);
        }
      }

      const _data = MenuDragTools.listorder([...diffList, ...list]);

      const menuList = MenuDragTools.dgJson(_data);
      this.setState({
        menuList
      });
      this.reset(currentX, currentY);
    }
  }
  /**
   * 更新缓存坐标
   * @param {*} x 
   * @param {*} y 
   */


  reset(x, y) {
    this.tempX = x;
    this.tempY = y;
  }
  /**
   * 设置控件位置
   * 
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2019-12-28 17:44:41
   */


  setPosition() {
    this.position = [];
    const area = document.querySelector('.pageMenu');
    area.querySelectorAll('div[data-element]').forEach(item => {
      const point = MenuDragTools.getPoint(item);
      const h = item.offsetHeight;
      const id = item.getAttribute('data-id');

      if (id) {
        this.position.push(MenuDragTools.box(point.top, 388, point.top + h, 117, id, item.innerHTML));
      }
    });
  }
  /**
    * @description: 查找与占位符同级的数据
    * @param {type} 
    * @return: void
    * @author: Eric
    * @Date: 2020-01-07 10:12:58
    */


  dragEndSameName(plac, data) {
    return data.find(item => {
      return item.parent_id == plac.parent_id && item.label == this.original.label && item.pid != plac.pid;
    });
  }
  /**
   * @description: 查找当前控件的top值
   * @return: void
   * @author: Eric
   * @Date: 2020-01-09 15:56:43
   */


  findPosTop(pid) {
    return this.position.find(item => {
      return item.pid == pid;
    }).top;
  }
  /**
   * @description: 拖拽结束
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2019-12-28 17:49:09
   */


  dragEnd() {
    let prev,
        plac,
        _data = {
      id: this.original.pid,
      parent_id: this.original.parent_id
    };
    const errorMsg = '错误：同一级下，不允许有相同的页面名或分类名称!';
    plac = MenuDragTools.data.find((item, i) => {
      return item.type == 'plac';
    });
    window.removeEventListener('mousemove', this.dragMove);
    window.removeEventListener('mouseup', this.dragEnd);

    if (typeof plac !== 'undefined') {
      //排序
      const list = MenuDragTools.data.map((item, i) => {
        if (item.type == 'plac') {
          return { ...this.original,
            parent_id: plac.parent_id
          };
        } else {
          return item;
        }
      });
      const getSameList = MenuDragTools.getSameList(MenuDragTools.data, plac.parent_id);
      prev = getSameList.find((item, i) => {
        return i + 1 == plac.listorder;
      });
      const data = MenuDragTools.listorder(list);
      const menuList = MenuDragTools.dgJson(data);
      this.setState({
        menuList,
        isDrag: false,
        isMove: false,
        dragMove: false
      });
      this._dragMove = false;
      _data = {
        id: this.original.pid,
        parent_id: plac.parent_id,
        type: 'order'
      };

      if (prev) {
        _data.prev_id = prev.pid;
      }
    }

    const posTop = this.findPosTop(this.original.pid);

    if (posTop != this.posTop || _data.parent_id != this.original.parent_id) {
      //上兄弟节点不等于当前兄弟节点 或者 上兄弟父节点不等于当前父节点
      if (typeof plac !== 'undefined') {
        const same = this.dragEndSameName(plac, MenuDragTools.data);

        if (typeof same === 'undefined') {
          this.pageAjax(_data);
        } else {
          Layer.alert({
            area: ["420px", "225px"],
            skin: "",
            close: true,
            cancel: true,
            ensure: true,
            content: errorMsg
          });
          const data = MenuDragTools.listorder(this.caching);
          const menuList = MenuDragTools.dgJson(data);
          this.setState({
            menuList,
            isDrag: false,
            isMove: false,
            dragMove: false
          });
          this._dragMove = false;
          this.clickSelected(this.original);
        }
      } else {
        this.pageAjax(_data);
      }
    } else {
      this.clickSelected(this.original);
    }
  }
  /**
   * @description: 拖拽开始
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2019-12-28 17:49:19
   */


  dragStart(event) {
    if (this.level == 0) {
      return;
    }

    this.caching = JSON.parse(JSON.stringify(MenuDragTools.data));
    SingleDrag.init(event);
    const {
      target
    } = event;
    let _target = target;

    while (!(_target.tagName == 'LI' && _target.getAttribute('data-element') == '1')) {
      _target = _target.parentNode;
    }

    this.tempX = event.clientX;
    this.tempY = event.clientY;
    const point = MenuDragTools.getPoint(_target);
    this.eleWdith = event.clientX - point.left;
    this.eleHeight = event.clientY - point.top;
    this.original = MenuDragTools.findEle(MenuDragTools.data, _target.getAttribute('data-id'));
    this.posTop = this.findPosTop(this.original.pid);
    const getSameList = MenuDragTools.getSameList(MenuDragTools.data, this.original.parent_id);
    this.prev = getSameList.find((item, i, arr) => {
      if (arr[i + 1]) {
        return arr[i + 1].pid == this.original.pid;
      }
    });
    this.prev = typeof this.prev == 'undefined' ? {} : this.prev;
    const dragElement = {
      w: _target.offsetWidth,
      h: _target.childNodes[0].offsetHeight,
      x: event.clientX - this.eleWdith - 100,
      y: event.clientY - this.eleHeight - 157
    };
    this.setState({
      dragElement,
      original: this.original,
      isMove: true
    });
    window.addEventListener('mousemove', this.dragMove);
    window.addEventListener('mouseup', this.dragEnd);
  }
  /**
   * @description: 拖拽移动
   * @param {type} 
   * @return: void
   * @author: Eric
   * @Date: 2019-12-28 17:49:27
   */


  dragMove(event) {
    const {
      currentX,
      currentY,
      offsetX,
      offsetY
    } = SingleDrag.move(event);
    const {
      scrollTop
    } = this.pageMenu;
    const realY = currentY + scrollTop;
    const diffX = currentX - this.tempX;
    const diffY = currentY - this.tempY;
    const current = this.position.find(item => {
      return realY > item.top && realY < item.bottom;
    });

    if (diffX <= 5 && diffY <= 5 && !this._dragMove) {
      //防止手抖
      this.tempX = currentX;
      this.tempY = currentY;
      this._dragMove = true; //this.setState({dragMove:true});
      //this.clickSelected(this.prop);
    } else {
      // if(currentX < 273){
      //     return;
      // }
      this._dragMove = true; //this.setState({dragMove:true});

      let _dragElement;

      const {
        dragElement
      } = this.state;
      const {
        data
      } = MenuDragTools;

      let _x = currentX - this.eleWdith - 100;

      let _y = currentY - scrollTop - this.eleHeight - 157;

      if (_x < 0) {
        _x = 0;
      }

      if (_x > 170) {
        _x = 170;
      }

      if (_y < 0) {
        _y = 0;
      }

      _dragElement = { ...dragElement,
        x: _x,
        y: _y
      };
      this.setState({
        dragElement: _dragElement,
        isDrag: true
      });

      if (typeof current !== 'undefined') {
        const now = MenuDragTools.findEle(data, current.pid);
        const plac = data.find((item, i) => {
          return item.type == 'plac';
        });

        if (Math.abs(diffX) > offset) {
          this.tempX = currentX;
        }

        if (Math.abs(diffY) > offset) {
          this.tempY = currentY;
        }

        if (!plac) {
          this.originHandle(data);
        } else {
          if (diffX <= -l1 && diffY > -l2 && diffY < l2) {
            //('左',plac);
            this.leftHandle(now, data, currentX, currentY);
          } else if (diffX >= l1 && diffY > -l2 && diffY < l2) {
            //('右',plac);
            //('右',plac);
            this.rightHandle(plac, data, currentX, currentY);
          } else if (diffY <= -l1 && diffX > -l2 && diffX < l2 || diffY >= l1 && diffX > -l2 && diffX < l2) {
            //垂直
            this.verticalHanlde(now, data, currentX, currentY);
          } else if (diffX <= -l1 && diffY <= -l1 || diffX <= -l1 && diffY >= l1) {
            //('左上 or 左下');  
            this.verticalHanlde(now, data, currentX, currentY);
          } else if (diffY >= l1 && diffX >= l1 || diffY <= -l1 && diffX >= l1) {
            //('右上 or 右下');
            this.verticalHanlde(now, data, currentX, currentY);
          } else {//(diffX,diffY)
          }
        }
      }
    }
  }
  /**
   * @description: 即时渲染
   * @return: void
   * @author: Eric
   * @Date: 2019-12-28 17:49:50
   */


  componentDidUpdate() {
    this.setPosition();
  }
  /**
   * @description: 初始化渲染
   * @return: void
   * @author: Eric
   * @Date: 2019-12-28 17:49:40
   */


  componentDidMount() {
    this.pageMenu = document.querySelector('.pageMenu');
    this.setPosition();
  }

}
