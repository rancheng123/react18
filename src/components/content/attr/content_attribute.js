// 导入所需的模块
import Attribute from "../../page/attr/attribute.js";
import contentConfig from "./content_config.json";
/**
 * @class {Attribute}内容面板属性控制器类
 * @version 1.0
 */

const ContentAttribute = Object.create(Attribute);
ContentAttribute.config = contentConfig;
