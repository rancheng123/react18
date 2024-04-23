
/**
 * @instance {DesignManager} 设计管理器实例
 */
const DesignManager = {
  /**
   * @method background 获取背景类
   * @param {string} type 类型
   * @return {Backgroun} 返回对应的控制器或视图类
   */
  background(type) {
    let path = "background/background",
      moduleName = "Background"; //判断类型是否为控制器

    if (type == "controler") {
      path = "background/background_controler";
      moduleName = "BackgroundControler";
    }

    //返回对应模块类
    return import(`./${path}.jsx`).then(module => module[moduleName])
    // return __webpack_require__("./components/page/attr/design lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method border 获取边框类
   * @param {string} type 类型
   * @return {Backgroun} 返回对应的控制器或视图类
   */
  border(type) {
    let path = "border/border",
      moduleName = "Border"; //判断类型是否为控制器

    if (type == "controler") {
      path = "border/border_controler";
      moduleName = "BorderControler";
    } //返回对应模块类

    return import(`./${path}.jsx`).then(module => module[moduleName])
    // return __webpack_require__("./components/page/attr/design lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method background 获取圆角类
   * @param {string} type 类型
   * @return {Backgroun} 返回对应的控制器或视图类
   */
  radius(type) {
    let path = "radius/radius",
      moduleName = "Radius"; //判断类型是否为控制器

    if (type == "controler") {
      path = "radius/radius_controler";
      moduleName = "RadiusControler";
    } //返回对应模块类

    return import(`./${path}.jsx`).then(module => module[moduleName])
    // return __webpack_require__("./components/page/attr/design lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method background 获取阴影类
   * @param {string} type 类型
   * @return {Backgroun} 返回对应的控制器或视图类
   */
  shadow(type) {
    let path = "shadow/shadow",
      moduleName = "Shadow"; //判断类型是否为控制器

    if (type == "controler") {
      path = "shadow/shadow_controler";
      moduleName = "ShadowControler";
    } //返回对应模块类

    return import(`./${path}.jsx`).then(module => module[moduleName])
    // return __webpack_require__("./components/page/attr/design lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method background 获取文本类
   * @param {string} type 类型
   * @return {Backgroun} 返回对应的控制器或视图类
   */
  text(type) {
    let path = "text/text",
      moduleName = "Text"; //判断类型是否为控制器

    if (type == "controler") {
      path = "text/text_controler";
      moduleName = "TextControler";
    } //返回对应模块类

    return import(`./${path}.jsx`).then(module => module[moduleName])
    // return __webpack_require__("./components/page/attr/design lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method background 获取文本类
   * @param {string} type 类型
   * @return {Backgroun} 返回对应的控制器或视图类
   */
  animation(type) {
    let path = "animation/animation",
      moduleName = "Animation"; //判断类型是否为控制器

    if (type == "controler") {
      path = "animation/animation_controler";
      moduleName = "AnimationControler";
    } //返回对应模块类

    return import(`./${path}.jsx`).then(module => module[moduleName])
    // return __webpack_require__("./components/page/attr/design lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method hoveranimation 获取蒙动画类
   * @param {string} type 类型
   * @return {Backgroun} 返回对应的控制器或视图类
   */
  hoveranimation(type) {
    let path = "hoveranimation/hoveranimation",
      moduleName = "Hoveranimation"; //判断类型是否为控制器
    if (type == "controler") {
      path = "hoveranimation/hoveranimation_controler";
      moduleName = "HoveranimationControler";
    } //返回对应模块类

    return import(`./${path}.jsx`).then(module => module[moduleName])
    // return __webpack_require__("./components/page/attr/design lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method background 获取图标类
   * @param {string} type 类型
   * @return {Backgroun} 返回对应的控制器或视图类
   */
  icon(type) {
    let path = "icon/icon",
      moduleName = "Icon"; //判断类型是否为控制器

    if (type == "controler") {
      path = "icon/icon_controler";
      moduleName = "IconControler";
    } //返回对应模块类

    return import(`./${path}.jsx`).then(module => module[moduleName])
    // return __webpack_require__("./components/page/attr/design lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method background 获取定位类
   * @param {string} type 类型
   * @return {Position} 返回对应的控制器或视图类
   */
  position(type) {
    let path = "position/position",
      moduleName = "Position"; //判断类型是否为控制器

    if (type == "controler") {
      path = "position/position_controler";
      moduleName = "PositionControler";
    } //返回对应模块类

    return import(`./${path}.jsx`).then(module => module[moduleName])
    // return __webpack_require__("./components/page/attr/design lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
   * @method space 获取间距类
   * @param {string} type 类型
   * @return {Space} 返回对应的控制器或视图类
   */
  space(type) {
    let path = "space/space",
      moduleName = "Space"; //判断类型是否为控制器

    if (type == "controler") {
      path = "space/space_controler";
      moduleName = "SpaceControler";
    } //返回对应模块类

    return import(`./${path}.jsx`).then(module => module[moduleName])
    // return __webpack_require__("./components/page/attr/design lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  },

  /**
  * @method levelnav 获取水平导航类
  * @param {string} type 类型
  * @return {Backgroun} 返回对应的控制器或视图类
  */
  levelnav(type) {
    let path = "levelnav/levelnav",
      moduleName = "Levelnav"; //判断类型是否为控制器

    if (type == "controler") {
      path = "levelnav/levelnav_controler";
      moduleName = "LevelnavControler";
    } //返回对应模块类

    return import(`./${path}.jsx`).then(module => module[moduleName])
    // return __webpack_require__("./components/page/attr/design lazy recursive ^\\.\\/.*$")(`./${path}`).then(module => module[moduleName]);
  }

};

export default DesignManager;