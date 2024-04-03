__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageAttribute", function() { return ImageAttribute; });
/* harmony import */ var dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dispatcher */ "./system/tools/dispatcher.js");
/* harmony import */ var _page_attr_attribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../page/attr/attribute */ "./components/page/attr/attribute.js");
/* harmony import */ var _image_config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image_config.json */ "./components/image/attr/image_config.json");
var _image_config_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./image_config.json */ "./components/image/attr/image_config.json", 1);
/* harmony import */ var attr_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! attr-manager */ "./components/page/attr/public_attr_manager.js");
/* harmony import */ var _system_function_resource_resource_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../system/function/resource/resource_manager */ "./system/function/resource/resource_manager.js");




//"../../../../system/function/resource/resource_manager"

/**
 * @class {Attribute} 内容面板属性控制器类
 * @author wyq
 * @version 1.0
 * @date 2019-09-18
 */

const ImageAttribute = Object.create(_page_attr_attribute__WEBPACK_IMPORTED_MODULE_1__["Attribute"]);
ImageAttribute.config = _image_config_json__WEBPACK_IMPORTED_MODULE_2__;
/**
 * @method 样式类读取方法
 * @author sxt
 * @date 2020-2-11
 */

ImageAttribute.custom = async function (opts) {
    const {
        node: {
            current: {
                type
            }
        }
    } = this;
    const custom = await attr_manager__WEBPACK_IMPORTED_MODULE_3__["PublicAttrManager"].custom(type);
    custom.custom(opts);
}; //addedComponent 的方法是拖拽完成后的回调方法 sxt 2020-2-5


ImageAttribute.addedComponent = function (id) {
    const li = document.querySelector(`#${id}-selectImage`); //新增控件时模拟点击更换图片按钮

    li && li.click();
};
/**
 * @method selectBefore 选中之前调用方法
 * @description 控制更换图片属性显示与隐藏
 * @date 2020-03-11
 * @author wyq
 * @param {object} node 节点对象
 * @param {object} config 配置对象
 */


ImageAttribute.selectBefore = function (node, config) {
    //如果类型等于pc，执行配置处理
    if (window.public.type == 'pc') {
        const {
            current: {
                id,
                skin
            }
        } = node;
        const {
            data: {
                document_data = {}
            }
        } = dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_get`);
        const value = document_data.selectionContent != 'databaseData' ? false : true; //如果是数据源则隐藏修改文本属性项，不是则不隐藏

        dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch('select_button', {
            args: [config, skin, 0, 'hidden', value]
        });
    }
}; //更换图片方法 sxt 2020-2-5


ImageAttribute.selectImage = function () {
    //当前数据存在时，
    if (this.node && this.node.current) {
        let id = this.node.current.id;
        Object(_system_function_resource_resource_manager__WEBPACK_IMPORTED_MODULE_4__["resourceManager"])("image").then(module => {
            module.resource({
                selected: function (datas) {
                    const {
                        ima_path,
                        w,
                        h
                    } = datas;
                    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_set`, {
                        args: [`document_data.uri`, ima_path]
                    });
                    dispatcher__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"].dispatch(`${id}_set`, {
                        args: ['component.layout.', {
                            width: Number(w),
                            height: Number(h)
                        }]
                    });
                }
            });
        });
    }
}; // /**
//  * @method design 加载设计属性
//  * @date 2019-11-15
//  * @author sxt
//  * @param {object} opts 参数对象
//  */
// ImageAttribute.design = async function(opts){
//     //获取子级模块
//     const {Design} = await import('./design/design');
//     //获取父类模块
//     const Parent = await PublicAttrManager.design();
//     //子类继承父类，并调用方法
//     window.public.extends(Design,Parent).design(opts);
// }
// ImageAttribute.setting = async function(opts){
//     const {node:{current:{type}}} = this;
//     //获取父类模块
// 	const imageSetting = await PublicAttrManager.setting(type);
// 	 imageSetting.setting(opts);
// }

//# sourceURL=webpack:///./components/image/attr/image_attribute.js?