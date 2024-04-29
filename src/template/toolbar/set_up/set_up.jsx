
// 导入 React 库
import React,{useState,useEffect} from 'react';
// 导入 ReactDom 库
import ReactDom from 'react-dom';
// 导入 toolbar 模块
import Toolbar from '../toolbar';
import { componentsAsync } from 'src/config/async_import_components_config'

console.log(componentsAsync, '哈哈哈哈哈')


/**
 * @instance SetUp 设置实例
 * @date 2020-04-09
 * @author wyq
 */

const SetUp = {
  /**@property menus 显示导航项 */
  menus: [{
    type: 'background',
    title: 'bgSetUp'
  }, {
    type: 'fontFamily',
    title: 'fontSetting'
  }],

  /**
   * @method setUp 设置面板加载
   * @date 2020-04-09
   * @author wyq
   * @param {string} id 元素id
   */
  setUp(id) {
    const element = document.getElementById(id); //初始化页面边距

    this.page();
    element && ReactDom.render(React.createElement(SetUp.render, {
      id: id
    }), element);
  },

  /**
   * @method render 挂载组件方法
   * @date 2020-04-09
   * @author wyq
   * @return {object} 待渲染的组件对象
   */
  render(props) {
    const [index, setIndex] = useState(0);
    const {
      type,
      title
    } = SetUp.menus[index]; //元素加载后执行

    useEffect(() => {
      const fn = SetUp[type];
      fn && fn();
    }, [index]);
    return React.createElement(Toolbar, {
      id: props.id,
      title: window.public.lang[title]
    }, React.createElement("ul", {
      className: "toolFontit"
    }, SetUp.menus.map(({
      type,
      title
    }, i) => {
      return React.createElement("li", {
        key: type,
        className: index != i ? null : 'on',
        onClick: () => setIndex(i)
      }, React.createElement("a", null, React.createElement("span", null, window.public.lang[title])));
    })), index == 0 ? React.createElement("div", {
      id: "set-up-content"
    }) : React.createElement(_fontFamily_fontFamily__WEBPACK_IMPORTED_MODULE_3__["default"], null));
  },

  /**
   * @method background 背景设置
   * @date 2020-04-09
   * @author wyq
   */
  background() {
    const promise = __webpack_require__.e(/*! import() */ 1891).then(__webpack_require__.bind(null, /*! ./background/background_controler */ "./ui/toolbar/set_up/background/background_controler.js"));
    promise.then(({
      BackgroundControler
    }) => {
      BackgroundControler.background('set-up-content');
    });
  },

  /**
   * @method page 页面设置
   * @date 2020-04-09
   * @author wyq
   */
  page() {
    __webpack_require__.e(/*! import() */ 1899).then(__webpack_require__.bind(null, /*! ./page */ "./ui/toolbar/set_up/page.js")).then(({
      Page
    }) => {
      Page.exec();
    });
  }

};

export default SetUp;