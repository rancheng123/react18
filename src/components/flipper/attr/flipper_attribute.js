
import Attribute from '@/components/page/attr/attribute';
import flipper_config_json from './flipper_config.json';


/**
 * @instance {FlipperAttribute} 翻屏组件属性面板公用实例
 */
const FlipperAttribute = Object.create(Attribute)
/**@propery {object} config 组件属性配置 */

FlipperAttribute.config = flipper_config_json;

export { FlipperAttribute }