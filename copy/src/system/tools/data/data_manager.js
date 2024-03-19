import pageData from './page_data'
import component_data from './component_data'
import ComponentDecorator from './decorator/component_decorator';
import PageDecorator from './decorator/page_decorator';

console.log(ComponentDecorator)

/**
 * @function dataManager 数据管理器
 * @param {string} type 要获取的数据对象类型 
 * @return {object} 对应的数据对象
 */

function dataManager(type) {
  return type == "document" ? PageDecorator.init(pageData) : ComponentDecorator.init(component_data);
}

export default dataManager

//# sourceURL=webpack:///./system/tools/data/data_manager.js?