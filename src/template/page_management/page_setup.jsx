import React from 'react'
import ReactDom from 'react-dom'
import Dispatcher from '../../system/tools/dispatcher';
import Layer from '../../system/widgets/layer'

//读取文件方法
async function setTypeModule(type) {
  let map = {
    pageInFo: {
      "path": "nav_info/nav_info_controler",
      "name": "InfoControler"
    },
    layout: {
      "path": "page_layout/page_layout_controler",
      "name": "LayoutControler"
    },
    seo: {
      "path": "seo/seo_controler",
      "name": "SeoControler"
    },
    authority: {
      "path": "authority/authority_controler",
      "name": "AuthorityControler"
    }
  };
  const {
    path,
    name
  } = map[type];
  return import(`./${path}`).then(module => module[name]);
}

export default class PageSetUp extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次
    this.init();
  }

  /**
    * @method  render 挂载组件方法
    */

  render() {
    let props = this.props;
    return React.createElement(Layer.open, {
      titles: [window.public.lang["pageManagement"]],
      offset: ['300px', '0px'],
      area: ["480px", "auto"],
      skin: "em-function-seo",
      close: true,
      cancel: true,
      ensure: this.ensure.bind(this)
    }, React.createElement("div", {
      className: "galCon"
    }, React.createElement("div", {
      className: "sysNav"
    }, React.createElement("ul", {
      className: "sysCon"
    }, this.pageSetList())), React.createElement("div", {
      className: "sysPic conStretch"
    }, React.createElement("div", {
      className: "galteCon",
      id: "pageSetContent"
    }))));
  } //项列表


  pageSetList() {
    let state = this.state || {};

    let _str = state.itemList.map((e, i) => {
      return (<li data-name={e} key={e} className={state.listName == e ? "on" : ""} onClick={this.clickTab.bind(this, e)}>
        <a data-name={e}>{window.public.lang[e]}</a>
      </li>)
      // return React.createElement("li", {
      //   "data-name": e,
      //   key: e,
      //   className: state.listName == e ? "on" : "",
      //   onClick: this.clickTab.bind(this, e)
      // }, React.createElement("a", {
      //   "data-name": e
      // }, window.public.lang[e]));
    });
    return _str;
  } //点击切换项


  clickTab(type) {
    this.data = {};
    this.loadComponent(type);
    this.setState({
      listName: type
    });
  } //底部结构方法


  loadComponent(type) {
    const element = document.querySelector('#pageSetContent');
    let props = this.props || {};

    if (element) {
      const promise = setTypeModule(type),
            self = this;
      let getPageData = Dispatcher.dispatch("getPageData"),
          //当前页面数据
      currentData = getPageData.data.document_data[props.initialData.pid];
      let newData = { ...currentData,
        ...props.initialData
      };
      promise.then(Module => {
        Module.prototype.putState = function (data) {
          Object.assign(self.data, data);
          this.setState(data);
        };

        ReactDom.render(React.createElement(Module, {
          initialData: newData
        }), element);
      });
    }
  }
  /**
      * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
      * @author sxt
      */


  init() {
    let itemList = [],
        listName = "";
    let initialData = this.props.initialData || {},
        _pageType = initialData.pageType;

    if (_pageType == "PageLabel" || _pageType == "Search" || _pageType == "NewsContent" || _pageType == "ProductContent" || _pageType == "ShoppingCart") {
      itemList = ["layout", "seo"]; //"seo","layout","power"
    } else if (_pageType == "CatLink") {
      itemList = ["pageInFo"]; //"seo","power"
    } else if (_pageType == "PageLink") {
      itemList = ["pageInFo", "layout", "seo", "authority"]; //"seo","power",
    } else {
      itemList = ["pageInFo"]; //"power","layout",
    }

    listName = itemList[0];
    this.data = {};
    let data = {
      itemList: itemList,
      listName: listName
    };
    this.state = { ...initialData,
      ...data
    };
  }

  componentDidMount() {
    let state = this.state || {};
    this.loadComponent(state.listName);
  }

  ensure() {
    let state = this.state || {},
        data = this.data;
    data.type = state.listName;

    if (data.type != "layout") {
      let props = this.props || {};
      let getPageData = Dispatcher.dispatch("getPageData"),
          //当前页面数据
      currentData = getPageData.data.document_data[props.initialData.pid] || {}; //只有实体页面才有这个数据，分类和链接是没有此数据的 sxt 2020-5-28

      let link_type = data.link_type || currentData.link_type; //类型为seo时，并且设置了seo的自定义链接，并且没有找到http时，弹出提示，sxt 2020-4-27

      if (data.type == "seo" && link_type == "customLink" && data.canonical_point && data.canonical_point.indexOf("http") == -1) {
        Layer.alert({
          area: ["420px", "225px"],
          skin: "",
          close: true,
          cancel: true,
          ensure: true,
          content: window.public.lang["httpHelp"]
        });
        return false;
      }

      if (data.catId) {
        data.catid = data.catId;
      }

      this.props.ensure.call(this.props.callThis, data);
    } else {}
  }

}
