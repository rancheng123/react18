// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlipperAttribute", function() { return FlipperAttribute; });
// /* harmony import */ var _page_attr_attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../page/attr/attribute */ "./components/page/attr/attribute.js");
// /* harmony import */ var _flipper_config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flipper_config.json */ "./components/flipper/attr/flipper_config.json");
// var _flipper_config_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./flipper_config.json */ "./components/flipper/attr/flipper_config.json", 1);



import Attribute from '@/components/page/attr/attribute' ;
import flipper_config_json from './flipper/attr/flipper_config.json' ;


/**
 * @instance {FlipperAttribute} 翻屏组件属性面板公用实例
 * @date 2020-07-29
 * @author wyq
 * @version 1.0
 */
const FlipperAttribute = Attribute
/**@propery {object} config 组件属性配置 */

 FlipperAttribute.config = flipper_config_json;

export default FlipperAttribute