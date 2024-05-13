

/**
 * @module {ButtonManager} 按钮管理器模块
 */
const ButtonManager = {
  getView(opts) {
    console.log(opts);
    return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then(module => module[opts.name]);
  },

  getAttr() {
    return import('./attr/button_attribute.js').then(module => module.ButtonAttribute);
  },

  getStyle(cate, type) {
    return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
  },

  getData(type) {
    return import(`./data/${type}_data.json`).then(module => module.default);
  }

};

export { ButtonManager }