import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './public/public'
import './language/system/zh'

import HeaderControler from './ui/header/header_controler.js'
import ContentControler from './ui/content/content_controler.js'
import Util from './components/page/util/util.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





// {
//   /**
//    * @function main 入口方法
//    */
//   (function main() {
//     root.render(React.createElement("div", {
//       className: "editorCon"
//     }, React.createElement(HeaderControler, null), React.createElement(ContentControler, {
//       load: load,
//       unload: unload
//     })), document.querySelector("#root"));
//   })();
//   /**
//    * @function load 加载页面
//    * @param {function} callback 框架页加载完毕执行
//    */


//   function load(event, callback) {
//     const pub = window.public; //存储框架页window对象

//     pub.win = event.target.contentWindow, //存储框架页document对象
//       pub.dom = pub.win.document; //是否存在页面数据

//     if (pub.win.siteAsJson) {
//       //加载页面
//       Util.loadComponent(pub.type == 'pc' ? 'html' : 'mo', //pc 加载html结构，mo 加载mo html 结构
//         JSON.parse(JSON.stringify(pub.win.siteAsJson))).then(Page => {
//           root.render(Page, pub.dom.querySelector("#root"), callback);
//         });
//     }
//   }
//   /**
//    * @function unload 卸载页面
//    * @param {object} event 事件对象 
//    */


//   function unload(event) {
//     const dom = event.currentTarget.document;
//     root.unmountComponentAtNode(dom.querySelector("#root"));
//   }
// }


