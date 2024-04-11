// 导入模块
import Attribute from "@/components/page/attr/attribute";
import PublicAttrManager from ".@/components/page/public_attr_manager.js";
import headerConfig from "./header_config.json";

/**
 * @instance {HeaderAttribute} 头部控件属性模块
 * @author wyq
 * @version 1.0
 * @date 2019-10-30
 */

const HeaderAttribute = Attribute;
HeaderAttribute.config = headerConfig;
/**
 * @method 样式类读取方法
 * @author wyq
 * @date 2021-2-23 
 */

HeaderAttribute.custom = async function (opts) {
  const {
    node: {
      current: {
        type
      }
    }
  } = this;
  const custom = await PublicAttrManager.custom(type);
  custom.custom(opts);
};

//# sourceURL=webpack:///./components/header/attr/header_attribute.js?