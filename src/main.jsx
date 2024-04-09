import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from './App'
import Util from '@/components/page/util/util.jsx'
import './public/public.js'
import './language/system/zh.js'

  async function load(event, callback) {
      const pub = window.public;
      //存储框架页window对象
      pub.win = event.target.contentWindow, 
      //存储框架页document对象
      pub.dom = pub.win.document; 

      //是否存在页面数据
      if (pub.win.siteAsJson) {
        //加载页面
        // Util.loadComponent(pub.type == 'pc' ? 'html' : 'mo', //pc 加载html结构，mo 加载mo html 结构
        // JSON.parse(JSON.stringify(pub.win.siteAsJson))).then(Page => {
        //   console.log(Page, 'page')
        //   ReactDOM.createRoot(pub.dom.querySelector("#root")).render(Page).then(() => {
        //     callback && callback();
        //   });
        // });

        try {
            const res = await Util.loadComponent(pub.type == 'pc' ? 'html' : 'mo',JSON.parse(JSON.stringify(pub.win.siteAsJson)))
            console.log(res,'res');
            ReactDOM.createRoot(pub.dom.querySelector("#root")).render(res)
            callback && callback()
        } catch (error) {
            console.log(error,'error');
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
  <React.StrictMode>
    <App load={load} unload={unload} />
  </React.StrictMode>
);