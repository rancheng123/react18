
import { getAsyncComponent, componentBasePath } from '@/config/async_import_components_config'

const importBasPath = 'messagepopup/'
const MessagepopupManager = {
    getView(opts) {
        console.log('messagepopup', opts);
        // return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then((module) => module.default);
        return getAsyncComponent(componentBasePath + importBasPath + `view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`)
    },

    // async getAttr() {
    //     return import("./attr/text_attribute.js").then((module) => module.TextAttribute);
    // },

    // getStyle(cate, type) {
    //     // return import(`./style/${type}/${cate}_css.json`).then((module) => module.default);
    //     return getAsyncComponent(componentBasePath + importBasPath + `style/${type}/${cate}_css.json`)
    // },

    getData(type) {
        console.log('messagepopup', type);
        return import(`./data/${type}_data.json`).then((module) => module.default);
    }

};
export { MessagepopupManager }