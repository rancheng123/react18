__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentAttribute", function() { return ComponentAttribute; });
/* harmony import */ var attr_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! attr-manager */ "./components/page/attr/public_attr_manager.js");
/* harmony import */ var _page_attr_attribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../page/attr/attribute */ "./components/page/attr/attribute.js");
/* harmony import */ var _component_config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component_config.json */ "./components/component/attr/component_config.json");
var _component_config_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./component_config.json */ "./components/component/attr/component_config.json", 1);



/**
 * @instance {Attribute} 组件属性面板公用实例
 * @date 2019-11-13
 * @author wyq
 * @version 1.0
 */

const ComponentAttribute = Object.create(_page_attr_attribute__WEBPACK_IMPORTED_MODULE_1__["Attribute"]);
/**@propery {object} config 组件属性配置 */

ComponentAttribute.config = _component_config_json__WEBPACK_IMPORTED_MODULE_2__;
/**
 * @method addComponentBefore 控件新增之前执行
 * @date 2020-01-08
 * @author wyq
 * @param {object} component 控件数据
 */
// ComponentAttribute.addComponentBefore = function(component){
//     const {structure:{layout}} = component;
//     //如果关闭通屏，则把当前页面宽度赋给控件
//     if(layout && layout.width){ layout.width = window.public.minWidth; }
// }

/**
 * @method design 加载设计属性
 * @date 2019-11-15
 * @author wyq
 * @param {object} opts 参数对象
 */

ComponentAttribute.design = async function (opts) {
  //获取子级模块
  const {
    Design
  } = await __webpack_require__.e(/*! import() */ 986).then(__webpack_require__.bind(null, /*! ./design/design */ "./components/component/attr/design/design.js")); //获取父类模块

  const Parent = await attr_manager__WEBPACK_IMPORTED_MODULE_0__["PublicAttrManager"].design(); //子类继承父类，并调用方法

  window.public.extends(Design, Parent).design(opts);
};
/**
 * @class {selectBox} 快速切换选择框
 * @author eric
 * @version 1.0
 * @date 2020-02-21
 */


ComponentAttribute.selectBox = async function (opts) {
  const {
    node: {
      current: {
        type
      }
    }
  } = opts;
  const SelectBox = await attr_manager__WEBPACK_IMPORTED_MODULE_0__["PublicAttrManager"].selectBox(type);
  SelectBox && SelectBox.selectBox(opts);
};

//# sourceURL=webpack:///./components/component/attr/component_attribute.js?