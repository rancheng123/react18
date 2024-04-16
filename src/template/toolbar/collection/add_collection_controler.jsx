
// 导入 React 库
import React from 'react';
// 导入 ReactDOM 库
import {createRoot} from 'react-dom/client';
// 导入 dispatcher 模块
import Dispatcher from '@/system/tools/dispatcher';

// 导入 layer 模块
import Layer from '@/system/widgets/layer';

// 导入 widget 模块
import Widget from '@/system/widgets/widget';


export default class AddCollectionControler extends React.Component {
  constructor(props) {
    super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次

    this.init();
    // /**@property {AddCollection} view 初始化 view 实例*/

    // this.view = new AddCollection(this); //给view 入口方法绑定this

    // this.view.render = this.view.render.bind(this.view);
  }

  static collection(opts) {
    const element = document.querySelector("#collection-modal");
    const {
      node
    } = opts;
    const collectionRoot = createRoot(element)
    collectionRoot.render(React.createElement(AddCollectionControler, {
      id: node.current.id,
      node: node,
      collectionRoot,
    }));
  }
  /**
   * @method render 挂载组件方法
   * @date 2019-09-25
   * @author sxt 
   * @return {object} 待渲染的组件对象
   */


  render() {
    // return React.createElement(this.view.render, null);
    return (
      <Layer.open
        titles={[window.public.lang["collection"]]}
        area={["360px", "200px"]}
        shade={[0.8, "#000000"]}
        skin="em-collection-add"
        draggable={true}
        cancel={()=> this.props.collectionRoot.unmount()}
        ensure={()=>this.ensure()}
        close={() => this.props.collectionRoot.unmount()}
      >
        <ul className="pcConAttDesign">
          <li className="pcAttList">
            <Widget.Input
              title="collectionName"
              id="collectionName"
              readonly={false}
              placeholder={this.state.placeholder}
              value={this.state.collectionText || ""}
              change={(event)=> this.changText("collectionText",event)}
            />
          </li>
        </ul>
      </Layer.open>

    )
  }
  /**
   * @method init 组件挂载前初始化方法,整个生命周期内只执行一次
   * @date 2019-09-25
   * @author sxt
   */


  init() {
    let getPageData = Dispatcher.dispatch("getPageData"),
        //当前页面数据
    pageId = getPageData.component.id;
    let currentId = this.props.id; //当前控件id

    let datas = Dispatcher.dispatch('getComponentData', {
      args: [currentId, true]
    }); //Dispatcher.dispatch(`${currentId}_get`);//获取控件数据

    const {
      structure: {
        layout,
        skin,
        componentType
      },
      data = {}
    } = datas; //控件类型为列表时，在收藏时把分页数据、无结果提示数据都去掉 sxt 2022-7-13

    if (componentType == "em-List") {
      datas.structure.components = [datas.structure.components[0]];
      datas.data.noResultText = false;
      datas.source.isMain = false;
      datas.source.isPaging = false;
    }

    let name = window.public.lang[skin.split(".")[0]]; //获取控件名称

    let placeholder = window.public.pageName + " - " + name;
    this.state = {
      placeholder: placeholder,
      content: datas,
      collectionText: data.collectionText || "",
      pageId: pageId,
      componentType: componentType
    };
  }
  /**
   * @method ensure 点击确定方法
   * @date 2020-2-13
   * @author sxt
   */


  ensure() {
    let state = this.state || {};

    let _times = new Date().getTime();

    let content = state.content,
        //控件完整数据
    title = state.collectionText || state.placeholder; //收藏名称
    //edition 时间   pagetype:6 类型，用于区分响应式或pc的

    let newData = {
      siteid: pageData.siteId,
      title: title,
      content: content,
      edition: _times,
      pageid: state.pageId,
      type: state.componentType,
      pagetype: 6
    };
    let body = `content=${encodeURIComponent(JSON.stringify(newData))}`;
    return fetch("/desktop/index.php/Edit/Collection/index", {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      body: body
    }).then(response => response.json()).then(data => {
      if (data.suc == 0) {
        localStorage.editionResp = _times;
        localStorage.dataResp = localStorage.dataResp || "{}";

        if (localStorage.dataResp == "null") {
          localStorage.dataResp = "{}";
        }

        let _data = JSON.parse(localStorage.dataResp);

        let _colists = [];

        if (localStorage.colistsResp) {
          _colists = JSON.parse(localStorage.colistsResp);
        }

        _colists.unshift({
          id: data.msg.id,
          title: title
        });

        if (_colists.length >= 50) {
          _colists.pop();
        }

        _data[data.msg.id] = content;
        localStorage.dataResp = JSON.stringify(_data);
        localStorage.colistsResp = JSON.stringify(_colists);
      } else {
        Layer.alert({
          area: ["420px", "225px"],
          skin: "",
          close: true,
          cancel: true,
          ensure: true,
          content: window.public.lnag["addFailed"]
        });
      }
    }).catch(error => console.log("Error", error));
  }
  /**
   * @method changText 修改收藏名称
   * @date 2020-2-13
   * @author sxt
   * @param {string} key 属性名
   * @param {event} event 事件对象
   */


  changText(key, event) {
    let value = event.target.value;
    this.setState({
      [key]: value
    });
  }

}
