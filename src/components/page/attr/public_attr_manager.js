/**
 * @function connect 连接处理模块路径与模块名 
 * @date 2019-11-7
 * @author wyq
 * @param {string} name 控件名称
 * @param {array} moduleInfo 存储模块信息的数组
 * @return {array} 连接处理以后的模块路径和模块名
 */
function connect(name, moduleInfo) {
  let [path, moduleName] = moduleInfo; //判断name中是否含有em-，如果有截取掉

  if (name.indexOf("em-") != -1) {
    name = name.substring(3);
  } //对名称进行拼接


  const pathName = window.humpJoin(name, "_"); //判断路径中是否存在占位，存在则进行相应替换

  if (path.includes("[name]")) {
    path = path.replace("[name]", pathName);
  } //返回模块路径与模块名称


  return [`${pathName}/attr/${path}`, name + moduleName];
}
/**
 * @instance {PublicAttrManager} 属性管理实例
 * @author wyq
 * @version 1.0
 * @date 2019-10-30
 */


const PublicAttrManager = {
  /**
   * @method basic 获取基本模块
   * @date 2019-11-7
   * @author wyq
   * @param {string} name 控件名称
   * @return {Basic} 基本属性模块
   */
  basic(name) {
    if (name) {
      const [path, moduleName] = connect(name, ["basic/[name]_basic_controler.js", "BasicControler"]);
      return __webpack_require__("./components lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
    }

    return null;
  },

  /**
   * @method design 设计模块
   * @date 2019-11-7
   * @author wyq
   * @return {Design} 设计模块
   */
  design() {
    return __webpack_require__.e(/*! import() */ 45).then(__webpack_require__.bind(null, /*! ./design/design */ "./components/page/attr/design/design.js")).then(module => module.Design);
  },

  /**
   * @method basic 获取设置模块
   * @date 2019-11-7
   * @author wyq
   * @param {string} name 控件名称
   * @return {Basic} 设置模块
   */
  setting(name) {
    let path = "page/attr/setting.js",
        moduleName = "Setting";

    if (name) {
      [path, moduleName] = connect(name, ['[name]_setting.js', moduleName]);
    }

    return __webpack_require__("./components lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method basic 获取动画设置模块
   * @date 2020-01-01
   * @author mlj
   * @param {string} name 控件名称
   * @return {Basic} 设置模块
   */
  animation(name) {
    let path = "animation/animation_controler.js",
        moduleName = "AnimationControler";
    return __webpack_require__("./components/page/attr lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method custom 获取自定义样式模块
   * @date 2019-11-7
   * @author wyq
   * @return {CustomControler} 自定义样式模块
   */
  custom(name) {
    let path = "page/attr/custom/custom_controler.js",
        moduleName = "CustomControler";

    if (name) {
      [path, moduleName] = connect(name, ['[name]_custom_controler.js', moduleName]);
    }

    return __webpack_require__("./components lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method collection 获取收藏模块
   * @date 2020-2-13
   * @author sxt
   * @return {CustomControler} 自定义样式模块
   */
  collection() {
    return Promise.all(/*! import() | add_collection_controler */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("add_collection_controler")]).then(__webpack_require__.bind(null, /*! ../../../ui/toolbar/collection/add_collection_controler.js */ "./ui/toolbar/collection/add_collection_controler.js")).then(module => module.AddCollectionControler);
  },

  //单项
  manage(name) {
    if (name) {
      const [path, moduleName] = connect(name, ["manage/[name]_manage_controler.js", "ManageControler"]);
      return __webpack_require__("./components lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
    }

    return null;
  },

  /**
   * @method selectBox 获取选中框模块
   * @date 2020-02-20
   * @author wyq
   * @param {string} name 控件名称
   */
  selectBox(name) {
    let path = "page/attr/select_box/select_box.js",
        moduleName = "SelectBox";

    if (name) {
      [path, moduleName] = connect(name, ['[name]_select_box.js', moduleName]);
    }
    console.log(path);
    // return __webpack_require__("./components lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
    return import(`../../${path.split('.')[0]}`).then(module => module[moduleName]);
    
  },

  /**
   * @method hiding 获取隐藏模块
   * @date 2020-02-27
   * @author wyq
   */
  hiding() {
    return __webpack_require__.e(/*! import() */ "hiding").then(__webpack_require__.bind(null, /*! ./hiding */ "./components/page/attr/hiding.js")).then(module => module.Hiding);
  },

  /**
   * @method hiding 获取应用模块
   * @date 2020-03-20
   * @author wyq
   */
  quote() {
    return __webpack_require__.e(/*! import() */ 1024).then(__webpack_require__.bind(null, /*! ../../hoverbox/attr/quote.js */ "./components/hoverbox/attr/quote.js")).then(module => module.Quote);
  }

};

export default PublicAttrManager

//# sourceURL=webpack:///./components/page/attr/public_attr_manager.js?