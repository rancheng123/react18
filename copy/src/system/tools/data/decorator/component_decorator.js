import Decorator from "./decorator";
// import History from "../../history";


/**
 * @instance ComponentDecorator 控件数据装饰器
 */

const ComponentDecorator = {
  /**
   * @method init 初始化方法
   * @param {ComponentData} component 控件数据对象
   * @return {ComponentDecorator} 控件数据装饰器实例
   */
  init(component) {
    this.component = component;
    Decorator.init(component);
    return this;
  },

  /**
   * @method install 安装数据处理相关方法装饰器
   * @date 2020/03/06
   
   * @param {object} component  组件状态对象
   */
  install(component) {
    this.component.install.call(this, component);
  },

  /**
   * @method uninstall 安装数据处理相关方法装饰器
   * @date 2020/03/06
   
   * @param {object} component  组件状态对象
   */
  uninstall(component) {
    this.component.uninstall.call(this, component);
  },

  /**
   * @method get 获取控件数据装饰器
   
   * @param {array} [arguments] 参数集合
   * @param {object} [arguments.0] 控件结构数据 
   * @param {object} [arguments.1] 控件属性数据
   * @return {object} 控件全部数据（传递参数的话返回控件原始数据,数据完整，返回数据，不完整，返回空）
   */
  get() {
    return ComponentDecorator.component.get.apply(this, [...arguments]);
  },

  /**
   * @method remove 控件删除单个数据装饰器
   
   * @param {string} key 键值
   */
  remove(key) {
    //设置编辑状态
    window.public.editState = 'edit';
    ComponentDecorator.component.remove.call(this, key);
  }

};
ComponentDecorator.__proto__ = Decorator;

export default ComponentDecorator;