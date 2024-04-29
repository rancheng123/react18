
import { getAsyncComponent, componentBasePath } from '@/config/async_import_components_config'

const MenuManager = {
  getView(opts) {
    // return __webpack_require__("./components/menu/view lazy recursive ^\\.\\/.*\\/.*_.*_view$")(`./${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module[opts.name]);
    // return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then(module => module[opts.name]);
    return getAsyncComponent(`${componentBasePath}menu/view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`, opts.name)
  },

  getAttr() {
    // return Promise.all(/*! import() | menu_attribute */[__webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(20), __webpack_require__.e("menu_attribute")]).then(__webpack_require__.bind(null, /*! ./attr/menu_attribute.js */ "./components/menu/attr/menu_attribute.js")).then(module => module.MenuAttribute);
    return getAsyncComponent(componentBasePath + 'menu/attr/menu_attribute.js')
  },

  getControler() {
    return getAsyncComponent(componentBasePath + 'menu/controler/menu_controler.js', 'MenuControler')
    // return import('./controler/menu_controler').then(module => {
    //   return module.MenuControler
    // })
    // return __webpack_require__.e(/*! import() */ 1254).then(__webpack_require__.bind(null, /*! ./controler/menu_controler */ "./components/menu/controler/menu_controler.js")).then(module => module.MenuControler);
  },

  getStyle(cate, type) {
    // return __webpack_require__("./components/menu/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
    // return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
    return getAsyncComponent(`${componentBasePath}menu/style/${type}/${cate}_css.json`)
  },

  getData(type) {
    // return __webpack_require__("./components/menu/data lazy recursive ^\\.\\/.*_data\\.json$")(`./${type}_data.json`).then(module => module.default);
    return getAsyncComponent(`${componentBasePath}menu/${type}_data.json`)
  }

};

export { MenuManager }