import Decorator from './decorator';
import History from '../../history'


/**
 * @instance PageDecorator 页面数据装饰器
 */

const PageDecorator = {
  /**
   * @method init 初始化方法
   
   * @date 2020-03-06
   * @param {PageData} component 页面数据处理对象
   */
  init(component) {
    this.component = component;
    Decorator.init(component);
    return this;
  },

  /**
   * @method install 安装数据处理相关方法装饰器
   
   * @param {object} component  组件状态对象
   */
  install(component) {
    this.component.install.call(this, component);
  },

  /**
   * @method uninstall 安装数据处理相关方法装饰器
   
   * @param {object} component  组件状态对象
   */
  uninstall(component) {
    this.component.uninstall.call(this, component);
  },

  /**
   * @function getPageData 获取当前页面数据
   
   * @param {String} [id] 当前页面id
   * @return {Object} 当前页面数据
   */
  getPageData(id) {
    return PageDecorator.component.getPageData.call(this, id);
  },

  /**
   * @function getIfimeData 获取IfimeData数据
   
   * @return {Object} 页面数据
   */
  getIframeData() {
    return PageDecorator.component.getIframeData.call(this);
  },

  /**
   * @method getData 获取控件的属性数据装饰器
   * @date 2019-10-24
   
   * @param {object} component 控件结构数据 
   * @param {string} pageId 页面id 
   * @return {object} 对应属性数据
   */
  getData(component, pageId) {
    return PageDecorator.component.getData.call(this, component, pageId);
  },

  /**
   * @method setData 新增一条属性和样式数据装饰器
   
   * @param {string} id 控件id
   * @param {string} key 键 
   * @param {string} value 值 
   */
  addData(id, key, value) {
    window.public.editState = 'edit';
    History.add({
      action: 'removeData',
      param: [id, key]
    });
    PageDecorator.component.addData.call(this, id, key, value);
  },

  /**
   * @method removeData 删除一条属性和样式数据装饰器
   * @date 2019-11-23
   
   * @param {string} id 控件id 
   * @param {string} key 键 
   */
  removeData(id, key) {
    window.public.editState = 'edit';
    PageDecorator.component.removeData.call(this, id, key);
  }

};
PageDecorator.__proto__ = Decorator;

export default PageDecorator

//# sourceURL=webpack:///./system/tools/data/decorator/page_decorator.js?