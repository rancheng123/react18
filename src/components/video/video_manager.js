
import { getAsyncComponent, componentBasePath } from '@/config/async_import_components_config'

const importBasPath = 'video/'
/**
 * @module {VideoManager} 视频管理器模块
 */
const VideoManager = {
  getView(opts) {
    // return __webpack_require__("./components/video/view lazy recursive ^\\.\\/.*\\/.*_.*_view$")(`./${opts.type}/${opts.cate}_${opts.name}_view`).then(module => module[opts.name]);
    return getAsyncComponent(componentBasePath + importBasPath + `view/${opts.type}/${opts.cate}_${opts.name}_view.jsx`, module[opts.name])
  },

  getAttr() {
    return Promise.all(/*! import() | video_attribute */[__webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e("video_attribute")]).then(__webpack_require__.bind(null, /*! ./attr/video_attribute.js */ "./components/video/attr/video_attribute.js")).then(module => module.VideoAttribute);
  },

  getStyle(cate, type) {
    // return __webpack_require__("./components/video/style lazy recursive ^\\.\\/.*\\/.*_css\\.json$")(`./${type}/${cate}_css.json`).then(module => module.default);
    return getAsyncComponent(componentBasePath + importBasPath + `style/${type}/${cate}_css.json`)
  },

  getData(type) {
    return __webpack_require__("./components/video/data lazy recursive ^\\.\\/.*_data\\.json$")(`./${type}_data.json`).then(module => module.default);
  }

};
export { VideoManager }