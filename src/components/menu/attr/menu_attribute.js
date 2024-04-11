
import Attribute from "@/components/page/attr/attribute";
import PublicAttrManager from "@/components/page/attr/public_attr_manager";
import Dispatcher from "@/system/tools/dispatcher";
import MenuConfig from "./menu_config.json";

/**
 * @class {Attribute} 内容面板属性控制器类
 * @author sxt
 * @version 1.0
 * @date 2019-09-18 HeaderAttribute.config = data;
 */

const MenuAttribute = Attribute;
MenuAttribute.config = MenuConfig;

MenuAttribute.manageNav = function () {
  document.querySelector(".edipage").click();
};
/**
 * @method design 加载设计属性
 * @date 2019-11-15
 * @author sxt
 * @param {object} opts 参数对象
 */


MenuAttribute.design = async function (opts) {
  //获取子级模块
  const {
    Design
  } = await __webpack_require__.e(/*! import() */ 1253).then(__webpack_require__.bind(null, /*! ./design/design */ "./components/menu/attr/design/design.js")); //获取父类模块

  const Parent = await PublicAttrManager.design(); //子类继承父类，并调用方法

  window.public.extends(Design, Parent).design(opts);
};
/**
 * @method setting 加载设置属性
 * @date 2021-3-25
 * @author lw
 * @param {object} opts 参数对象
 */


MenuAttribute.setting = async function (opts) {
  //获取子级模块
  const {
    Setting
  } = await __webpack_require__.e(/*! import() */ 1896).then(__webpack_require__.bind(null, /*! ./setting/setting */ "./components/menu/attr/setting/setting.js")); //获取父类模块

  const Parent = await PublicAttrManager.setting(); //子类继承父类，并调用方法

  window.public.extends(Setting, Parent).setting(opts);
};
/**
 * @method selected 选中控件之后调用
 * @date 2021-02-25
 * @author wyq
 * @param {object} node 控件数据对象 
 */


MenuAttribute.selected = function (node) {
  const id = node.current.id,
        {
    component: {
      components
    },
    data: {
      menu_data
    }
  } = Dispatcher.dispatch(`${id}_get`); //是否存在menu_data数据并且有开启自定义次级导航

  if (menu_data && menu_data.submenuList) {
    //循环
    Object.keys(menu_data.submenuList).forEach(mid => {
      //获取关联的次级导航数据
      const item = components.find(e => e.parentId == mid); //次级导航数据存在且与数据中存储的id不同，更新存储的次级id

      if (item && item.id != menu_data.submenuList[mid]) {
        //数据更新
        Dispatcher.dispatch(`${id}_set`, {
          args: [`menu_data.submenuList.${mid}`, item.id]
        });
      }
    });
  }
};


export default MenuAttribute