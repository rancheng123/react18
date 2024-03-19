/* harmony import */ //var _components_map_json__WEBPACK_IMPORTED_MODULE_0__ = import(/*! ./components_map.json */ "./components/page/components_map.json");
import _components_map_json__WEBPACK_IMPORTED_MODULE_0__ from './components_map.js'

/**
 * @function componentsManager 控件结构管理器
 
 * @date 2019-09-17
 * @param {strng} type 控件类型
 * @return {object} 指定对象 
 */

 function componentsManager(type) {
  //检测类型是否是字符串
  if (typeof type == "string") {
    //检测类型中是否存在中划线
    if (type.indexOf("-") != -1) {
      type = type.split("-")[1];
    }

    const first = type.charAt(0);
    type = type.replace(first, first.toLowerCase());
    const {
      path,
      name
    } = _components_map_json__WEBPACK_IMPORTED_MODULE_0__[type] || {};
    return path && name ? import("../../components"+path).then(Module => comProxy(Module[name])) : null;
  } else {
    return null;
  }
}
/**
 * @method comProxy 控件代理
 * @date 2019-10-09
 
 * @param {object} object 控件模块对象 
 */

function comProxy(object) {
  //处理对象
  const handler = {
    get(object, name) {
      if (name != "then") {
        //真对访问进行验证处理
        return (cate, type) => object[name] ? object[name](cate, type) : null;
      } else {
        return object[name];
      }
    }

  }; //返回代理对象

  return new Proxy(object, handler);
}

export default componentsManager

//# sourceURL=webpack:///./components/page/components_manager.js?