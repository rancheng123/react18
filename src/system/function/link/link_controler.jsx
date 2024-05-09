
import React from "react";
import ReactDOM from "react-dom"

// 导入其他模块
import Link from "./link";
import Dispatcher from "@/system/tools/dispatcher";
import { resourceManager } from "@/system/function/resource/resource_manager";


/**
 * @class {LinkControler} 链接面板控制器类
 */
class LinkControler extends React.Component {
  constructor(props = {}) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {Link} view 初始化 view 实例*/

    this.view = new Link(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }
  /**
   * @static link 创建链接面板
   * @param {object} opts 参数列表
   * @param {string} opts.selector css选择器
   * @param {object} opts.element 节点对象
   * @param {string} [opts.include] 只导入哪些属性项
   * @param {string} [opts.exclude] 排除哪些属性项
   * @param {object} [opts.group] 显示项的配置
   * @param {object} opts.initialData 链接初始数据
   * @param {object} opts.dataState  当前控件的数据
   * @param {function} [opts.cancel] 点击取消时调用方法
   * @param {function} opts.ensure  点击确定时调用方法
   */
  static link(opts = {}) {
    if (!opts.element) {
      if (!opts.selector) {
        opts.selector = "#function-modal";
      }

      opts.element = document.querySelector(opts.selector);
    }

    ReactDOM.render(React.createElement(LinkControler, {
      exclude: opts.exclude,
      include: opts.include,
      cancel: opts.cancel ? opts.cancel : null,
      ensure: opts.ensure ? opts.ensure : null,
      group: opts.group,
      initialData: opts.initialData || {},
      dataState: opts.dataState || {}
    }), opts.element);
  }

  static linkText(link) {
    let _text;

    if (link && link.type) {
      switch (link.type) {
        case "noLink":
          _text = window.public.lang['noLink'];
          break;
        //选择为无链接时内容展示无连接

        case "externalLinks":
          _text = window.public.lang['externalLinks'] + " " + (link.url || window.public.lang["pleaseChoose"]);
          break;

        case "email":
          _text = window.public.lang['email'] + " " + (link.recipient || window.public.lang["pleaseChoose"]);
          break;

        case "phone":
          _text = window.public.lang['phone'] + " " + (link.phoneNumber || window.public.lang["pleaseChoose"]);
          break;

        case "pageAnchor":
          _text = window.public.lang['pageAnchor'] + " " + (window.public.lang[link.linkToType] || window.public.lang["pleaseChoose"]);
          break;

        case "onlineConsulting":
          _text = window.public.lang['onlineConsulting'] + " " + (link.consultName || window.public.lang["pleaseChoose"]);
          break;

        case "download":
          _text = window.public.lang['download'] + " " + (link.downloadName || window.public.lang["pleaseChoose"]);
          break;

        case "back":
          _text = window.public.lang['back'] + " " + (link.backName || window.public.lang["pleaseChoose"]);
          break;

        case "lightbox":
          _text = window.public.lang['lightbox'] + " " + (link.ejectBoxName || window.public.lang["pleaseChoose"]);
          break;

        case "languageLinks":
          _text = window.public.lang['languageLinks'];
          break;

        case "functionalLinks":
          _text = window.public.lang['functionalLinks'] + " " + (link.functionalLinkName || window.public.lang["pleaseChoose"]);
          break;

        case "annexDownload":
          _text = window.public.lang['annexDownload'];
          break;
      }

      return _text;
    } else {
      _text = window.public.lang['noLink']; //选择为无链接时内容展示无连接 

      return _text;
    }
  }


  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  render() {
    return React.createElement(this.view.render, null);
  }


  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @author 
   */
  init() {
    //"download","functionalLinks"  功能未做暂时隐藏 
    this.tabs = window.public.configure(["noLink", "pageAnchor", "externalLinks", "email", "phone", "back", "onlineConsulting", "functionalLinks", "lightbox", "annexDownload"], this.props);
    let dataSource = this.props.dataState,
      componentType = dataSource.componentType; //控件类型

    this.state = {
      tab: this.props.initialData.type || "noLink",
      data: Object.assign({
        type: "noLink"
      }, this.props.initialData),
      componentType: componentType
    };
  }

  componentWillMount() {
    let state = this.state || {},
      data = state.data;

    if (state.tab == "pageAnchor") {
      this.getDataLink({
        type: data.linkToType || "menu",
        id: data.pageId,
        itemId: data.itemId
      });
    } //类型为弹出窗口时，渲染弹出窗口列表 


    if (state.tab == "lightbox") {
      this.lightboxsList = this.getlightboxsList();
    }

    if (state.tab == "languageLinks") {
      this.getLanguageList();
    }
  }
  /**
   * @method getAnchorsList 获取锚点列表
   * @param {string} id 选择的当前页面id
   * @returns
   */


  getAnchorsList(id) { }
  /**
   * @method getlightboxsList 获取弹出层列表
   * @date
   * @author
   * @returns
   */
  getlightboxsList() {
    //this.state = {}; 
    const getIframeData = Dispatcher.dispatch("getIframeData");
    let children = getIframeData.component.children || [],
      //框架页控件数据
      lightboxArr = [];

    for (let i = 0; i < children.length; i++) {
      let current = children[i];

      if (current.componentType == "em-Lightboxmodal") {
        let id = current.id,
          name = getIframeData.data.document_data[current.components[0].id].componentName || "弹出窗口";
        lightboxArr.push({
          "name": name,
          "value": id
        });
      }
    }

    return lightboxArr;
  }

  getPagesList() { }
  /**
   * @method getDefaultValue 获取对应项默认值
   */
  getDefaultValue(type) {
    switch (type) {
      case "pageAnchor":
        let getPageData = Dispatcher.dispatch("getPageData") || {},
          //当前页面数据
          pageType = getPageData.component.pageType,
          currentPage = ""; //只有在内页是在标currentPage的数据，用于后台拼标签

        if (pageType == "Search" || pageType == "NewsContent" || pageType == "ProductContent" || pageType == "ShoppingCart" || pageType == "PageLabel") {
          currentPage = getPageData.component.id;
        }

        this.getDataLink({
          type: "menu",
          id: getPageData.component.id,
          displayContent: "classify",
          currentPage: currentPage
        }); //给锚点的类型添加为动画类型，并设置0.8s的时间

        this.state.data.anchorType = "cartoon";
        this.state.data.speed = "0.8"; //此处设置默认值 ，链接类型为导航项，展示内容为分类 
        return {
          type: type,
          linkToType: "menu",
          currentPage: getPageData.component.id
        };
      //切换类型时，默认就是当前页面要标当前页面数据

      case "lightbox":
        if (!this.lightboxsList) {
          this.lightboxsList = this.getlightboxsList();
        }

        return this.lightboxsList ? {
          type: type
        } : {
          type: type
        };

      case "languageLinks":
        this.getLanguageList();
        return {
          type: type
        };

      default:
        return {
          type: type
        };
    }
  }

  selectTab(type, event) {
    this.setState({
      tab: type,
      data: this.getDefaultValue(type)
    });
  }

  close() { }

  cancel() {
    this.props.cancel && this.props.cancel();
    this.close();
  }

  ensure() {
    this.props.ensure && this.props.ensure(Object.assign({}, this.state.data));
  }
  /**
   * @method inputHandler input设置数据方法
   * @param {key} key 设置的数据名称 
   * @param {event} event 事件对象 
   */
  inputHandler(key, event) {
    let _value = event.target.value;
    let {
      state: {
        data = {}
      }
    } = this;
    data[key] = _value;
    this.setState({
      data: data
    });
  }
  /**
  * @method rangeHandler 滑块设置数据方法
  * @param {key} key 设置的数据名称 
  * @param {event} event 事件对象 
  */
  rangeHandler(key, event) {
    let _value = event.target.value;
    let {
      state: {
        data = {}
      }
    } = this;
    data[key] = _value;
    this.setState({
      data: data
    });
  }


  /**
  * @method selectHandler 下拉设置数据方法
  * @param {key} key 设置的数据名称 
  * @param {event} event 事件对象 
  */
  selectHandler(key, key1, event) {
    let _value = event.target.value,
      _index = event.target.selectedIndex,
      _text = event.target.options[_index].text;
    let {
      state: {
        data = {}
      }
    } = this;
    data[key] = _value;

    if (key1) {
      data[key1] = _text;
    }

    if (data.dataSource) {
      delete data.dataSource;
      delete data.account;
    }

    this.setState({
      data: data
    });
  }


  /**
  * @method setConsulting 设置在线咨询类型
  * @param {key} key 设置的数据名称 
  * @param {event} event 事件对象 
  */
  setConsulting(key, key1, event) {
    let _value = event.target.value,
      _index = event.target.selectedIndex,
      _text = event.target.options[_index].text;
    let {
      state: {
        data = {}
      }
    } = this;
    data[key] = _value;

    if (key1) {
      data[key1] = _text;
    } //切换类型时把之前选择的数据源去掉


    delete data.dataSource;
    delete data.account; //清除之前的帐号

    this.setState({
      data: data
    });
  }


  /**
   * @method radioHandler 单选设置数据方法
   * @param {key} key 设置的数据名称 
   * @param {event} event 事件对象 
   */
  radioHandler(key, event) {
    let _value = event.target.value;
    let {
      state: {
        data = {}
      }
    } = this;
    data[key] = _value;
    this.setState({
      data: data
    });
  }

  /**
  * @method setLinkTo 设置链接到类型方法
  * @param {key} key 设置的数据名称 
  * @param {event} event 事件对象 
  */
  setLinkTo(key, event) {
    let _value = event.target.value;
    let {
      state: {
        data = {}
      }
    } = this;
    data[key] = _value;
    this.getDataLink({
      type: _value
    }); //this.setState({data:data,showList:false,showContent:false,newList:[],newContentList:[]});
  }


  /**
  * @method changeClassifyList 搜索分类功能 
  * @param {event} event 事件对象 
  */
  changePageList(e) {
    let _state = this.state || {},
      _list = _state.list || [];

    let _value = e.target.value,
      _newList = [];

    for (let i = 0; i < _list.length; i++) {
      if (_list[i].name.indexOf(_value) != -1) {
        _newList.push(_list[i]);
      }
    }

    this.setState({
      newList: _newList
    });
  }


  /**
  * @method selectPageList 下拉选择分类功能 
  * @param {event} event 事件对象 
  */
  selectPageList(prop) {
    let {
      state: {
        data = {}
      }
    } = this;

    if (data.linkToType == "menu") {
      let getPageData = Dispatcher.dispatch("getPageData") || {},
        //当前页面数据
        pageType = getPageData.component.pageType,
        //页面类型
        pid = getPageData.component.id; //设置的链接为当前页面时，给后台标上数据currentPage  用于内页赋值链接 
      //只有在内页是在标currentPage的数据，用于后台拼标签 sxt 2020-7-17

      if (pid == prop.id && (pageType == "Search" || pageType == "NewsContent" || pageType == "ProductContent" || pageType == "ShoppingCart" || pageType == "PageLabel")) {
        data.currentPage = prop.id;
      } else {
        delete data.currentPage;
      }
    } else {
      delete data.currentPage;
    }

    this.getDataLink({
      id: prop.id
    });
  }


  /**
  * @method selectPageList 点击显示分类列表
  * @param {event} event 事件对象 
  */
  clickPageList() {
    let _state = this.state || {},
      _showList = _state.showList,
      _isListTrue = false;

    if (_showList) {
      _isListTrue = false;
    } else {
      _isListTrue = true;
    }

    this.setState({
      showList: _isListTrue,
      showContent: false,
      newList: [],
      newContentList: []
    });
  }


  /**
  * @method changeClassifyList 搜索内容功能 
  * @param {event} event 事件对象 
  */
  changeContentList(e) {
    let _value = e.target.value,
      _newContentList = [],
      contentList = this.state.itemsList || [];

    for (let i = 0; i < contentList.length; i++) {
      if (contentList[i].name.indexOf(_value) != -1) {
        _newContentList.push(contentList[i]);
      }
    }

    this.setState({
      newContentList: _newContentList
    });
  }


  /**
  * @method clickContentList 点击显示内容列表
  * @param {event} event 事件对象 
  */
  clickContentList() {
    let _state = this.state || {},
      _showContent = _state.showContent,
      _isClassifyTrue = false;

    if (_showContent) {
      _isClassifyTrue = false;
    } else {
      _isClassifyTrue = true;
    }

    this.setState({
      showContent: _isClassifyTrue,
      showList: false,
      newList: [],
      newContentList: []
    });
  }



  /**
  * @method selectContentList 下拉选择内容功能 
  * @param {event} event 事件对象 
  */
  selectContentList(prop) {
    let {
      state: {
        data = {}
      }
    } = this;
    data.itemName = prop.name;
    data.itemId = prop.id;
    this.setState({
      data: data,
      showContent: false,
      showList: false,
      newList: [],
      newContentList: []
    });
  }


  /**
  * @method getDataSourceData 公用数据源后台请求方法
  * @param {string} type 类型选项
  */
  getLanguageList(prop) {
    let {
      state: {
        data = {}
      }
    } = this;
    let ajaxDatas = {
      method: "POST",
      body: {
        method: "language_data/getLanguageList",
        params: {
          projectId: pageData.projectId
        }
      }
    };
    let url = `${pageData.rpcDomain}/basics_data_center`;
    window.public.fetchRpc(url, ajaxDatas).then(datas => {
      if (datas && datas.suc == 0) {
        let data = datas.data || {},
          _list = data.list || [];

        for (let i = 0; i < _list.length; i++) {
          _list[i].value = _list[i].resource_language;
        }

        this.setState({
          languageList: _list
        });
      }
    });
  }


  /**
  * @method getDataSourceData 公用数据源后台请求方法
  * @param {string} type 类型选项
  */
  getDataLink(prop) {
    let {
      state: {
        data = {}
      }
    } = this; //displayContent展示内容 先读取数据中的，再读取传过来的默认值  

    let dataDef = {
      sid: pageData.siteId,
      type: data.linkToType,
      displayContent: data.displayContent || prop.displayContent
    };
    let ajaxData = {
      ...dataDef,
      ...prop
    }; //类型为导航时，传个pid（当前页面的id）用于内页面时，也能添加锚点;

    if (ajaxData.type == "menu") {
      let getPageData = Dispatcher.dispatch("getPageData") || {}; //当前页面数据

      ajaxData.pid = getPageData.component.id;
    }

    fetch("/desktop/index.php/Edit/SelectLink/getLinkContent", {
      method: 'POST',
      headers: {},
      body: JSON.stringify(ajaxData)
    }).then(response => response.json()).then(datas => {
      if (datas.suc == 0) {
        let msgData = datas.data || {};

        if (ajaxData.type == "menu" || ajaxData.type == "template") {
          if (!prop.itemId) {
            data.itemName = "";
            data.itemId = "";
          }
        } else {
          data.itemName = msgData.itemName || "";
          data.itemId = msgData.itemId || "";
        }

        data.pageId = msgData.pageId || "";
        data.pageName = msgData.pageName || "";
        data.linkToType = ajaxData.type;
        data.displayContent = ajaxData.displayContent; //当前页面相同时，赋值，

        if (ajaxData.currentPage) {
          data.currentPage = ajaxData.currentPage;
        }

        data.type = "pageAnchor";
        let list = this.getPageLink(msgData.list, data.linkToType);
        this.setState({
          data: data,
          list: list,
          itemsList: msgData.itemsList || [{
            "id": 0,
            name: "请选择"
          }],
          showList: false,
          showContent: false,
          newList: [],
          newContentList: []
        });
      }
    });
  } //获取所有实体页面方法


  getPageLink(items, type) {
    let arr = [];

    if (items && items.length >= 1) {
      for (let item of items) {
        if (item.pageType != 3) {
          arr.push(item);
        }
      }

      return arr;
    } else {
      return [{
        "id": "0",
        name: "请选择"
      }];
    }
  }


  /**
   * @method webLinkBlur 自定义输入链接失去焦点处理逻辑 
   * @param {key} key 设置的数据名称 
   * @param {event} event 事件对象 
   */
  webLinkBlur(key, event) {
    let _value = event.target.value;
    let {
      state: {
        data = {}
      }
    } = this;

    if (_value.indexOf("http") == -1) {
      _value = "http://" + _value;
      data[key] = _value;
      this.setState({
        data: data
      });
    }
  }


  /**
  * @method duenloadFile 下载选择文件方法
  */
  duenloadFile() {
    resourceManager("file").then(module => {
      module.resource({
        selected: this.setFile.bind(this)
      });
    });
  }


  /**
   * @method setFile 设置文件方法
   * @param {Object} datas 返回数据
   * @param {event} event 事件对象
   */
  setFile(datas) { }

  // this.setState({"uri":datas.ima_path})
  // Dispatcher.dispatch(`${this.props.id}_set`,{
  //     args:[`document_data.uri`,datas.ima_path]
  // })

  /**
   * @method SelectImage 图片设置面板显示方法
   * @param {event} event 事件对象
   */
  selectImageShow() { }


  /**
   * @method selectLinkSource 选择链接来源
   * @param {event} event 事件对象 
   */
  selectLinkSource(event) {
    const value = event.target.value;
    this.setState({
      linkSource: value
    });
    this.pageList = this.getPagesList(value);
  }

  dataSource(type, event) { } //调用数据源面板 

  /**
   * @method showDataSource 显示数据源面板
   */
  showDataSource(data) {
    let tab = this.state.tab,
      _linkType = "linkEmail";

    if (tab == "phone") {
      _linkType = "linkPhone";
    }

    if (tab == "onlineConsulting") {
      let consultValue = data.consultValue;

      if (consultValue == "whatsApp") {
        _linkType = "linkWhatsApp";
      }

      if (consultValue == "whatsappPc") {
        _linkType = "linkWhatsAppPc";
      }
    }

    const promise = Promise.all(/*! import() | data_source_controler */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("data_source_controler")]).then(__webpack_require__.bind(null, /*! ../data_source/data_source_controler */ "./system/function/data_source/data_source_controler.js"));
    let dataSource = this.state.data.dataSource;

    if (dataSource) {
      dataSource.data_source_type = "Link";
      dataSource.linkType = _linkType;
    }

    promise.then(module => {
      module.DataSourceControler && module.DataSourceControler.dataSource({
        initialData: dataSource,
        data_source_type: "Link",
        linkType: _linkType,
        identifier_item: "company",
        ensure: data => {
          let _companyField = data.companyField;

          let _linkData = this.state.data || {}; //data.sourceName = "showText";
          //类型为电话时设置链接数据


          if (_companyField == "tel" || _companyField == "phone" || _companyField == "fax") {
            _linkData.phoneNumber = data.companyValue;
            _linkData.type = "phone";
            _linkData.dataSource = data;
            _linkData.dataSource.sourceName = "phoneNumber";
          } //类型为邮箱时设置邮箱数据


          if (_companyField == "email") {
            _linkData.recipient = data.companyValue;
            _linkData.type = "email";
            _linkData.mailTheme = "";
            _linkData.dataSource = data;
            _linkData.dataSource.sourceName = "recipient";
          } //类型为WhatsApp时设置WhatsApp数据


          if (_companyField == "whatsapp" || _companyField == "whatsappPc") {
            _linkData.account = data.companyValue;
            _linkData.dataSource = data;
            _linkData.dataSource.sourceName = "account";
          }

          this.setState({
            data: _linkData
          });
        }
      });
    });
  }


  /**
   * @method showTextClose 清除数据源数据
   */
  showTextClose() {
    let {
      state: {
        data = {}
      }
    } = this;
    let newData = {
      ...data,
      ...{
        dataSource: undefined,
        phoneNumber: "",
        recipient: "",
        account: ""
      }
    };
    this.setState({
      data: newData
    });
  }


  /**
  * @method setAnnexType 设置附件类型
  */
  setAnnexType(key, event) {
    let _value = event.target.value;
    let {
      state: {
        data = {}
      }
    } = this;
    data[key] = _value;
    this.setState({
      data: data
    });
  }

}

export default LinkControler