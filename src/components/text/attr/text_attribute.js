// 导入模块
import Dispatcher from "@/system/tools/dispatcher.js";
import Attribute from "@/components/page/attr/attribute";
import textConfig from "./text_config.json";

/**
 * @class {Attribute} 内容面板属性控制器类
 * @author wyq
 * @version 1.0
 * @date 2019-09-18
 */

const TextAttribute = Attribute;
TextAttribute.config = textConfig; // 图片质量面板引入 date 2020-12-30 lw 

TextAttribute.picture = async opts => {
  const {
    TextPictureControler
  } = await __webpack_require__.e(/*! import() */ 541).then(__webpack_require__.bind(null, /*! ./picture/text_picture_controler */ "./components/text/attr/picture/text_picture_controler.js"));
  TextPictureControler.picture(opts);
};

TextAttribute.ckeditor = function () {
  if (this.node && this.node.current) {
    let ediBox = document.querySelector("#select-box .ediBox"),
        div = document.createElement("div");
    div.setAttribute("id", "editor");
    div.setAttribute("contentEditable", true);
    ediBox.appendChild(div); //阻止冒泡事件，防止走拖拽控件方法，sxt 2020-1-13 17:27

    div.onmousedown = function (event) {
      event.stopPropagation();
    };

    __webpack_require__.e(/*! import() | editor */ "editor").then(__webpack_require__.bind(null, /*! ./editor */ "./components/text/attr/editor.js")).then(module => module.changeText(this.node.current.id));
  }
};
/**
 * @method selected 选中时调用方法
 * @description 双击时显示文本编辑器
 * @date 2020-12-23
 * @author sxt 
 * @param {object} node 节点对象
 */


TextAttribute.selected = function (node) {
  let ediBox = document.querySelector(".ediBox"); //选中元素的父级存在时

  if (ediBox) {
    ediBox.ondblclick = null; //添加双击事件

    ediBox.ondblclick = function () {
      let id = node.current.id + "-ckeditor",
          ckeditorDom = document.querySelector("#" + id); //存在文本编辑的属性按钮时，模拟点击属性按钮

      ckeditorDom && ckeditorDom.click();
    };
  }
};
/**
 * @function isDataSource 是否是数据源
 * @date 2020-12-30
 * @author wyq
 * @param {object} node 控件数据
 * @return {boolean} 一个布尔值，表示是否是数据源 
 */


function isDataSource(node) {
  const {
    current: {
      id
    }
  } = node;
  const {
    data: {
      document_data = {}
    }
  } = Dispatcher.dispatch(`${id}_get`);
  return document_data.selectionContent != 'databaseData' ? false : true;
}
/**
 * @method selectBefore 选中之前调用方法
 * @description 控制更换图片属性显示与隐藏
 * @date 2020-03-11
 * @author wyq
 * @param {object} node 节点对象
 * @param {object} config 配置对象
 */


TextAttribute.selectBefore = function (node, config) {
  //如果类型等于pc，执行配置处理
  if (window.public.type == 'pc') {
    //是否是数据源
    const value = isDataSource(node); //如果是数据源则隐藏修改文本属性项，不是则不隐藏

    Dispatcher.dispatch('select_button', {
      args: [config, node.current.skin, 0, 'hidden', value]
    });
  }
};
/**
 * @method editTabs 编辑属性面板tabs项
 * @date 2020-12-30
 * @author wyq
 * @param {array} tabs tab项集合
 * @return {array} 处理后的tab项集合
 */


TextAttribute.editTabs = function (tabs) {
  const index = tabs.length - 1;
  tabs[index].hidden = isDataSource(this.node);
  return tabs;
};

//# sourceURL=webpack:///./components/text/attr/text_attribute.js?