import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from './App'
import Util from '@/components/page/util/util.jsx'
import './utils/public.js'
import './utils/userWorker';
import './language/system/zh.js'

import store from "./store";
import { Provider } from "react-redux";
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';

import { getTemplateDataAPI } from "@/api/template/index.js";

// import { componentsAsync } from "@/config/async_import_components_config";
// console.log(componentsAsync, 'componentsAsync');

/**
 * 异步加载函数，用于在特定事件触发时加载页面。
 * @param {Event} event - 触发事件的对象。
 * @param {Function} callback - 加载完成后的回调函数。
 */
async function load(event, callback) {
  console.log('编辑页面刷新');
  const pub = window.public;
  //存储框架页window对象
  pub.win = event.target.contentWindow
  //存储框架页document对象
  pub.dom = pub.win.document;


  // 模拟获取模板数据
  const obj = {
    template_id: 1  //模板id
  }
  await getTemplateDataAPI(obj).then((res) => {
    console.log(res);
    pub.win.siteAsJson = res.data.content
  })

  //是否存在页面数据
  if (pub.win.siteAsJson) {
    //加载页面
    // Util.loadComponent(pub.type == 'pc' ? 'html' : 'mo', //pc 加载html结构，mo 加载mo html 结构
    // JSON.parse(JSON.stringify(pub.win.siteAsJson))).then(Page => {
    //   ReactDOM.createRoot(pub.dom.querySelector("#root")).render(Page).then(() => {
    //     callback && callback();
    //   });
    // });

    try {
      const res = await Util.loadComponent(pub.type == 'pc' ? 'html' : 'mo', JSON.parse(JSON.stringify(pub.win.siteAsJson)))
      ReactDOM.createRoot(pub.dom.querySelector("#root")).render(res)
      callback && callback()
    } catch (error) {
      console.log(error, 'error');
    }
  }
}


/**
 * @function unload 卸载页面
 * @param {object} event 事件对象 
 */
function unload(event) {
  const dom = event.currentTarget.document;
  root.unmountComponentAtNode(dom.querySelector("#root"));
}

export const root = ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider locale={zh_CN} >
      <App load={load} unload={unload} />
    </ConfigProvider>
  </Provider>
  // {/* </React.StrictMode> */}
);