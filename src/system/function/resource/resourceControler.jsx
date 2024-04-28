
// 导入 React 库
import React from 'react';
// 导入 ReactDOM 库
import {createRoot} from 'react-dom/client';
// 导入自定义的 resource.js 模块
import Resource from './resource';


/**
 * @class {ResourceControler} 资源库面板
 */
export default class ResourceControler extends React.Component {
  constructor(props) {
    super(props);
    this.init(); 
    this.view= new Resource(this);
    this.view.render=this.view.render.bind(this.view);
  }


  /**
    * @static imageResource 创建链接面板
    * @param {object} opts 参数列表
    * @param {string} opts.selector css选择器
    * @param {object} opts.element 节点对象
    * @param {string} [opts.include] 只导入哪些属性项
    * @param {string} [opts.exclude] 排除哪些属性项
    * @param {object} [opts.group] 显示项的配置
    * @param {object} opts.initialData 链接初始数据
    * @param {function} opts.selected  选择图片方法
    * 
    */
  static resource(opts = {}) {
    console.log(opts);
    if (!opts.element) {
      if (!opts.selector) {
        opts.selector = "#function-modal";
      }

      opts.element = document.querySelector(opts.selector);
      opts.root = createRoot(opts.element);
    }

    const ResourceControler = this;
    opts.root.render(React.createElement(ResourceControler, {
      exclude: opts.exclude,
      include: opts.include,
      group: opts.group,
      initialData: opts.initialData || {},
      selected: opts.selected ? opts.selected : null
    }), opts.element);
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
   */
  init() {}
  
  /**
   * @method componentDidMount 在第一次渲染后调用,
   */
  componentDidMount() {}

  close() {}
  /**
  * @method getPagingList 获取分页列表,
  */
  getPagingList() {} //${pageData.siteId}


  getAjaxData(prop) {
    let resourceType = prop.resourceType,
        data = {};

    switch (resourceType) {
      case "image":
        data = {
          type: prop.type,
          sid: pageData.siteId,
          cate: prop.cate,
          spec: prop.spec,
          searchValuekey: prop.searchValue || "",
          page: prop.page,
          size: prop.size
        };
        break;

      case "icon":
        data = {
          type: prop.type,
          sid: pageData.siteId,
          page: prop.page,
          cate: prop.cate,
          searchValue: prop.searchValue || ""
        };
        break;

      case "video":
        data = {
          type: prop.type,
          sid: pageData.siteId,
          page: prop.page,
          status: prop.status,
          searchValue: prop.searchValue || ""
        };
        break;

      case "file":
        data = {
          type: prop.type,
          sid: pageData.siteId,
          page: prop.page,
          react: prop.react,
          searchValue: prop.searchValue || ""
        };
        break;

      case "template":
        data = {
          type: prop.type,
          sid: pageData.siteId,
          page: prop.page,
          size: prop.size,
          industry: prop.industry,
          language: prop.language,
          key: prop.key || ""
        };
        break;

      default:
        return prop;
    }

    return data;
  }
  /**
   * @method getResourceList 获取资源列表,
   * @author 
   */
  getResourceList(prop) {
    let _ajaxUrl = this.ajaxUrl;

    let _ajaxData = this.getAjaxData(prop);

    if (_ajaxUrl) {
      return fetch(_ajaxUrl, {
        method: 'POST',
        body: JSON.stringify(_ajaxData),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(response => response.json()).then(data => data ? data : {}).catch(err => console.log("Oh, error", err));
    }
  }
  /**
   * @method selected 选中方法,
   * @author 
   */
  selected() {}
  /**
   * @method upload 上传方法,
   * @author 
   */
  upload() {}
  /**
   * @method search 搜索方法,
   * @author 
   */


  search() {}

}
