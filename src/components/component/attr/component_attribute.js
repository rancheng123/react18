// 导入所需模块或文件
import PublicAttrManager from '../../page/attr/public_attr_manager';
import Attribute from '../../page/attr/attribute';
import componentConfig from './component_config.json';

/**
 * @instance {Attribute} 组件属性面板公用实例
 */
const ComponentAttribute = { ...Attribute };
/**@propery {object} config 组件属性配置 */

ComponentAttribute.config = componentConfig;


/**
 * @method addComponentBefore 控件新增之前执行
 * @param {object} component 控件数据
 */
// ComponentAttribute.addComponentBefore = function(component){
//     const {structure:{layout}} = component;
//     //如果关闭通屏，则把当前页面宽度赋给控件
//     if(layout && layout.width){ layout.width = window.public.minWidth; }
// }

/**
 * @method design 加载设计属性
 * @param {object} opts 参数对象
 */
ComponentAttribute.design = async function (opts) {
  //获取子级模块
  const {
    Design
  } = await __webpack_require__.e(/*! import() */ 986).then(__webpack_require__.bind(null, /*! ./design/design */ "./components/component/attr/design/design.js")); //获取父类模块

  const Parent = await PublicAttrManager.design(); //子类继承父类，并调用方法

  window.public.extends(Design, Parent).design(opts);
};
/**
 * @class {selectBox} 快速切换选择框
 */
ComponentAttribute.selectBox = async function (opts) {
  const {
    node: {
      current: {
        type
      }
    }
  } = opts;
  const SelectBox = await PublicAttrManager.selectBox(type);
  SelectBox && SelectBox.selectBox(opts);
};

export default ComponentAttribute
