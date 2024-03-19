/**
 * @module {BoxManager} 容器管理器模块
 * @author wp
 * @version 1.0
 * @date 2019-11-19
 */
const BoxManager = {
  getView(opts) {
    return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module[opts.name]);
  },

  getAttr() {
    return null  // 暂时这么写
    return Promise.all([import(2), import(3), import(5), import(128)]).then(import("./attr/box_attribute.js")).then(module => module.BoxAttribute);
  },

  getStyle(cate, type) {
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  },

  getData(type) {
    return null // 暂时这么写
    return import(`./data/${type}_data.json`).then(module => module.default);
  }

};

export default BoxManager

//# sourceURL=webpack:///./components/box/box_manager.js?