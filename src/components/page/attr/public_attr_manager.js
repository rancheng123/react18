
/**
 * @function connect 连接处理模块路径与模块名 
 * @param {string} name 控件名称
 * @param {array} moduleInfo 存储模块信息的数组
 * @return {array} 连接处理以后的模块路径和模块名
 */
function connect(name, moduleInfo) {
  let [path, moduleName] = moduleInfo;

  //判断name中是否含有em-，如果有截取掉
  if (name.indexOf("em-") != -1) {
    name = name.substring(3);
  }

  //对名称进行拼接
  const pathName = window.humpJoin(name, "_");

  //判断路径中是否存在占位，存在则进行相应替换
  if (path.includes("[name]")) {
    path = path.replace("[name]", pathName);
  }

  //返回模块路径与模块名称
  return [`${pathName}/attr/${path}`, name + moduleName];
}
/**
 * @instance {PublicAttrManager} 属性管理实例
 */
const PublicAttrManager = {
  /**
   * @method basic 获取基本模块
   * @param {string} name 控件名称
   * @return {Basic} 基本属性模块
   */
  async basic(name) {
    console.log(name);
    if (name) {
      const [path, moduleName] = connect(name, ["basic/[name]_basic_controler", "BasicControler"]);
      console.log(path, moduleName);
      const module = await this.basicDynamicImport(path, moduleName)
      return module;
      // return __webpack_require__("./components lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
      // return import(`../../${path}`).then(module => module[moduleName]);
    }

    return null;
  },

  /**
   * @method design 设计模块
   * @return {Design} 设计模块
   */
  design() {
    return import("./design/design").then(module => module.default);
  },

  /**
   * @method basic 获取设置模块
   * @param {string} name 控件名称
   * @return {Basic} 设置模块
   */
  setting(name) {
    let path = "setting.jsx",
      moduleName = "Setting";

    if (name) {
      [path, moduleName] = connect(name, ['[name]_setting.jsx', moduleName]);
    }
    // return __webpack_require__("./components lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
    return import(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method basic 获取动画设置模块
   * @param {string} name 控件名称
   * @return {Basic} 设置模块
   */
  animation(name) {
    let path = "animation/animation_controler.jsx",
      moduleName = "AnimationControler";
    // return __webpack_require__("./components/page/attr lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
    return import(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method custom 获取自定义样式模块
   * @return {CustomControler} 自定义样式模块
   */
  custom(name) {
    let path = "page/attr/custom/custom_controler.jsx",
      moduleName = "CustomControler";

    if (name) {
      [path, moduleName] = connect(name, ['[name]_custom_controler.jsx', moduleName]);
    }
    // return __webpack_require__("./components lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
    return import(`../../${path}`).then(module => module[moduleName]);
    // return import(`./custom/custom_controler.jsx`).then(module => module[moduleName]);
  },


  /**
   * @method customcss 获取自定义css模块
   * @return {CustomcssControler} 自定义样式模块
   */
  customcss(name, pathname) {
    let path = "page/attr/customcss/customcss_controler.jsx",
      moduleName = "CustomcssControler";

    if (name) {
      [path, moduleName] = connect(name, [(pathname == undefined ? '' : pathname + '/') + '[name]_customcss_controler.js', moduleName]);
    }

    // return __webpack_require__("./components lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
    // return import(`./${path}`).then(module => module[moduleName]);
    return import(`./customcss/customcss_controler.jsx`).then(module => module[moduleName]);
  },

  /**
   * @method collection 获取收藏模块
   * @return {CustomControler} 自定义样式模块
   */
  collection() {
    return import('../../../template/toolbar/collection/add_collection_controler').then(res => res.default)
    // return Promise.all(/*! import() | add_collection_controler */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e("add_collection_controler")]).then(__webpack_require__.bind(null, /*! ../../../ui/toolbar/collection/add_collection_controler.js */ "./ui/toolbar/collection/add_collection_controler.js")).then(module => module.AddCollectionControler);
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
   * @param {string} name 控件名称
   */
  selectBox(name) {
    let path = "page/attr/select_box/select_box.js",
      moduleName = "SelectBox";

    if (name) {
      [path, moduleName] = connect(name, ['[name]_select_box.js', moduleName]);
    }
    // return __webpack_require__("./components lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
    return import(`./select_box/select_box`).then(module => module[moduleName]);
  },

  /**
   * @method hiding 获取隐藏模块
   */
  hiding() {
    return import('./hiding').then(module => module.default)
    // return __webpack_require__.e(/*! import() */ "hiding").then(__webpack_require__.bind(null, /*! ./hiding */ "./components/page/attr/hiding.js")).then(module => module.Hiding);
  },

  /**
   * @method hiding 获取应用模块
   */
  quote() {
    return __webpack_require__.e(/*! import() */ 1024).then(__webpack_require__.bind(null, /*! ../../hoverbox/attr/quote.js */ "./components/hoverbox/attr/quote.js")).then(module => module.Quote);
  },

  /**
   * @method hiding 获取链接模块
   */
  link() {
    return import('./link/link_controler.jsx').then(module => module.LinkContainer);
  },

  // 动态导入处理函数
  async basicDynamicImport(path, name) {
    try {
      const modules = import.meta.glob('../../../components/*/attr/basic/*.js')
      const m = await modules[`../../${path}.js`]
      return m ? m().then(mod => mod[name]) : null
    } catch (error) {
      console.error('err', error);
    }
  }

};

export default PublicAttrManager
