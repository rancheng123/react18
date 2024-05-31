// 导入React和ReactDOM库
import React from "react";
import ReactDOM from "react-dom";

// 导入其他模块
import Dispatcher from "@/system/tools/dispatcher";
import Classify from "./page_classify";

class PageAddClassify extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    /**@property {space} view 初始化 view 实例*/

    this.view = new Classify(this); //给view 入口方法绑定this

    this.view.render = this.view.render.bind(this.view);
  }

  static pageManagement() {
    const element = document.querySelector("#page-management");
    ReactDOM.render(React.createElement(PageAddClassify, null), element);
  }
  /**
   * @method  render 挂载组件方法
   */

  render() {
    return React.createElement(this.view.render, null);
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   */

  init() {
    let pageList = this.getLink();
    let cat = this.props.initialData;

    if (!cat.pageId) {
      cat.pageId = pageList[0] && pageList[0].id;
      cat.pageName = pageList[0] && pageList[0].name;
    }

    let data = {
      pageList: pageList,
      catType: cat.catType || "product",
    };
    this.state = { ...data, ...cat };
  }

  componentWillMount() {
    let state = this.state || {},
      catType = state.catType;
    const promise = this.getAjaxClassify(catType);
    promise.then((data) => {
      if (data) {
        if (!state.catId) {
          let catName = (data[0] && data[0].catname) || "";
          this.setState({
            classifyList: data,
            catId: data[0] && data[0].id,
            catName: catName,
            label:
              state.label || catName || window.public.lang["noClassification"],
          });
        } else {
          this.setState({
            classifyList: data,
          });
        }
      }
    });
  } //确定

  ensure() {
    let state = this.state || {};
    let cta = {
      catType: state.catType,
      catId: state.catId,
      catName: state.catName,
      pageId: state.pageId,
      pageName: state.pageName,
      label: state.label || window.public.lang["noClassification"],
    };
    this.props.ensure.call(this.props.callThis, cta);
  } //修改分类名称

  changeCatName(e) {
    let value = e.target.value;
    this.setState({
      label: value,
    });
  } //修改分类类型

  selectType(e) {
    let type = e.target.value;
    this.setState({
      catType: type,
    });
    const promise = this.getAjaxClassify(type);
    promise.then((data) => {
      this.setState({
        classifyList: data,
        catId: data[0] && data[0].id,
        catName: data[0] && data[0].catname,
      });
    });
  } //请求分类数据方法

  getAjaxClassify(type) {
    let newData = {
      sid: pageData.siteId,
      type: type,
    };
    return fetch("/desktop/index.php/Edit/List/getcategory", {
      method: "POST",
      headers: {},
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        let datas = data.data || {};

        if (datas.list) {
          return datas.list || [];
        } else {
          return [];
        }
      })
      .catch((error) => console.log("Error", error));
  }
  /**
   * @method clickClassifyList 点击显示分类列表
   * @param {event} event 事件对象
   */

  clickClassifyList() {
    let _state = this.state || {},
      _showClassify = _state.showClassify,
      _isClassifyTrue = false;

    if (_showClassify) {
      _isClassifyTrue = false;
    } else {
      _isClassifyTrue = true;
    }

    this.setState({
      showClassify: _isClassifyTrue,
      showPage: false,
    });
  } //选择分类

  selectClassifyList(prop) {
    this.setState({
      catName: prop.catname,
      catId: prop.id,
      showClassify: false,
    });
  } //获取所有实体页面方法

  getLink(items, arr = []) {
    let data = Dispatcher.dispatch("getIframeData"),
      dataItems = data.data.document_data.MAIN_MENU.items || [];
    items = items || dataItems;

    for (let item of items) {
      if (item.pageType == "PageLink") {
        arr.push({
          name: item.label,
          id: item.pid,
        });
      }

      if (item.child) this.getLink(item.child, arr);
    }

    return arr;
  } //获取页面方法

  getPageLink() {
    this.state = {};
    const data = Dispatcher.dispatch("getIframeData"),
      items = data.data.document_data.MAIN_MENU.items || [];
    return this.getLink(items, []);
  } //下拉切换页面

  selectPageList(prop) {
    this.setState({
      pageName: prop.name,
      pageId: prop.id,
      showPage: false,
    });
  } //点击显示选择页面

  clickPageList() {
    let _state = this.state || {},
      _showPage = _state.showPage,
      _isPageTrue = false;

    if (_showPage) {
      _isPageTrue = false;
    } else {
      _isPageTrue = true;
    }

    this.setState({
      showPage: _isPageTrue,
      showClassify: false,
    });
  }
}

export default PageAddClassify;
