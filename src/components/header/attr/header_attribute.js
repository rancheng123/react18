// 导入模块
import Attribute from "@/components/page/attr/attribute";
import PublicAttrManager from "@/components/page/attr/public_attr_manager";
import headerConfig from "./header_config.json";

/**
 * @instance {HeaderAttribute} 头部控件属性模块
 */
const HeaderAttribute = Object.create(Attribute);
HeaderAttribute.config = headerConfig;
/**
 * @method 样式类读取方法
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


export { HeaderAttribute }
