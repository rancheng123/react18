// 导入所需的模块
import Attribute from "../../page/attr/attribute";
import contentConfig from "./content_config.json";
/**
 * @class {Attribute}内容面板属性控制器类
 */

const ContentAttribute = Object.create(Attribute);
ContentAttribute.config = contentConfig;
