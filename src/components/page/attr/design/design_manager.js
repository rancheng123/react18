
import { getAsyncComponent, componentBasePath } from '@/config/async_import_components_config'

// 当前文件的引入基路径
const importBasPath = 'page/attr/design/'
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
      path = "background/background_controler.jsx";
      moduleName = "BackgroundControler";
    }
    //返回对应模块类
    // return import(`./${path}.jsx`).then(module => module[moduleName])
    return getAsyncComponent(componentBasePath + importBasPath + path, moduleName)
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
      path = "border/border_controler.jsx";
      moduleName = "BorderControler";
    } //返回对应模块类

    // return import(`./${path}.jsx`).then(module => module[moduleName])
    return getAsyncComponent(componentBasePath + importBasPath + path, moduleName)
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
      path = "radius/radius_controler.jsx";
      moduleName = "RadiusControler";
    } //返回对应模块类

    // return import(`./${path}.jsx`).then(module => module[moduleName])
    return getAsyncComponent(componentBasePath + importBasPath + path, moduleName)
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
      path = "shadow/shadow_controler.jsx";
      moduleName = "ShadowControler";
    } //返回对应模块类

    // return import(`./${path}.jsx`).then(module => module[moduleName])
    return getAsyncComponent(componentBasePath + importBasPath + path, moduleName)
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
      path = "text/text_controler.jsx";
      moduleName = "TextControler";
    } //返回对应模块类
    // return import(`./${path}.jsx`).then(module => module[moduleName])
    return getAsyncComponent(componentBasePath + importBasPath + path, moduleName)
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
    // return import(`./${path}.jsx`).then(module => module[moduleName])
    return getAsyncComponent(componentBasePath + importBasPath + path, moduleName)
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

    // return import(`./${path}.jsx`).then(module => module[moduleName])
    return getAsyncComponent(componentBasePath + importBasPath + path, moduleName)
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
      path = "icon/icon_controler.jsx";
      moduleName = "IconControler";
    } //返回对应模块类

    // return import(`./${path}.jsx`).then(module => module[moduleName])
    return getAsyncComponent(componentBasePath + importBasPath + path, moduleName)
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
      path = "position/position_controler.jsx";
      moduleName = "PositionControler";
    } //返回对应模块类

    // return import(`./${path}.jsx`).then(module => module[moduleName])
    return getAsyncComponent(componentBasePath + importBasPath + path, moduleName)
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
      path = "space/space_controler.jsx";
      moduleName = "SpaceControler";
    } //返回对应模块类

    // return import(`./${path}.jsx`).then(module => module[moduleName])
    return getAsyncComponent(componentBasePath + importBasPath + path, moduleName)
  },

  /**
  * @method levelnav 获取水平导航类
  * @param {string} type 类型
  * @return {Backgroun} 返回对应的控制器或视图类
  */
  levelnav(type) {
    let path = "levelnav/levelnav.jsx",
      moduleName = "Levelnav"; //判断类型是否为控制器

    if (type == "controler") {
      path = "levelnav/levelnav_controler";
      moduleName = "LevelnavControler";
    } //返回对应模块类

    // return import(`./${path}.jsx`).then(module => module[moduleName])
    return getAsyncComponent(componentBasePath + importBasPath + path, moduleName)
  }

};

export default DesignManager;