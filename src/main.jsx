import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from './App'
import Util from './page/util/util.js'
import './public/public.js'
import './language/system/zh.js'

  function load(event, callback) {
    const pub = window.public; //存储框架页window对象

    pub.win = event.target.contentWindow, //存储框架页document对象
      pub.dom = pub.win.document; //是否存在页面数据

    if (pub.win.siteAsJson) {
      //加载页面
      Util.loadComponent(pub.type == 'pc' ? 'html' : 'mo', //pc 加载html结构，mo 加载mo html 结构
        JSON.parse(JSON.stringify(pub.win.siteAsJson))).then(Page => {
          root.render(Page, pub.dom.querySelector("#root"), callback);
        });
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


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App load={load} unload={unload} />
  </React.StrictMode>
);