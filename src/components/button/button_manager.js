import { getAsyncComponent, componentBasePath } from '@/config/async_import_components_config'

const importBasPath = 'button/'

/**
 * @module {ButtonManager} 按钮管理器模块
 */
const ButtonManager = {
  getView(opts) {
    // return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then(module => module[opts.name]);
    return getAsyncComponent(componentBasePath + importBasPath + `view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`, opts.name)
  },

  getAttr() {
    return import('./attr/button_attribute.js').then(module => module.ButtonAttribute);
  },

  getStyle(cate, type) {
    // return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
    return getAsyncComponent(componentBasePath + importBasPath + `style/${type}/${cate}_css.json`)
  },

  getData(type) {
    return import(`./data/${type}_data.json`).then(module => module.default);
  }

};

export { ButtonManager }