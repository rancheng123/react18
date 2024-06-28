import { getAsyncComponent, componentBasePath } from '@/config/async_import_components_config'
const importBasPath = 'languages/'

/**
 * @module {ButtonManager} 按钮管理器模块
 */
const LanguagesManager = {
    getView(opts) {
        // return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then(module => module[opts.name]);
        return getAsyncComponent(componentBasePath + importBasPath + `view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`, opts.name)
    },

    getAttr() {
        return import('./attr/languages_attribute.js').then(module => module.LanguagesAttribute);
    },

    getStyle(cate, type) {
        // return import(`./style/${type}/${cate}_css.json`).then(module => module.default);
        var res = getAsyncComponent(componentBasePath + importBasPath + `style/${type}/${cate}_css.json`)
        return res
    },

    getData(type) {
        return import(`./data/${type}_data.json`).then(module => module.default);
    }

};

export { LanguagesManager }