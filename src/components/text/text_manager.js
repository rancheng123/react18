
const TextManager = {
  getView(opts) {
    return import(`./view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`).then((module) => module.default);
  },

  async getAttr() {
    return import("./attr/text_attribute.js").then((module) => module.TextAttribute);
  },

  getStyle(cate, type) {
    return import(`./style/${type}/${cate}_css.json`).then((module) => module.default);
  },

  getData(type) {
    return import(`./data/${type}_data.json`).then((module) => module.default);
  }

};
export { TextManager }