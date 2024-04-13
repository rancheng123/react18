
import Attribute from '@/components/page/attr/attribute' ;
import flipper_config_json from './flipper_config.json' ;


/**
 * @instance {FlipperAttribute} 翻屏组件属性面板公用实例
 * @date 2020-07-29
 * @author wyq
 * @version 1.0
 */
const FlipperAttribute = Attribute
/**@propery {object} config 组件属性配置 */

 FlipperAttribute.config = flipper_config_json;

export { FlipperAttribute }