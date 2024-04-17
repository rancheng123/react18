import History from "../../history";

/**
 * @instance Decorator 数据装饰器
 */

const Decorator = {
  /**
   * @method init 初始化方法
   * @param {Data} component 数据处理对象
   */
  init(component) {
    this.component = component;
  },

  /**
   * @method set 设置控件单个数据装饰器
   * @param {string|object} key 键或一个对象
   * @param {string|object} [value] 要设置的值
   */
  set(key, value) {
    //设置编辑状态
    window.public.editState = "edit";
    Decorator.component.set.call(this, key, value);
  },

  /**
   * @method addComponent 新增控件装饰方法
   * @param {object} componentData 控件数据
   * @param {number} index 插入位置
   * @param {function} fn 组件渲染完毕执行
   * @param {boolean} isrecord 是否把操作记录到历史记录中。 false 不记录，true 记录
   */
  addComponent(componentData, index, fn, isrecord) {
    //设置编辑状态
    window.public.editState = "edit";
    const newid = Decorator.component.addComponent.call(
      this,
      componentData,
      index,
      fn
    );

    //不等于false则把此操作记录到历史条目中 新增一条历史记录
    isrecord != false &&
      History.add({
        action: `${this.state.component.id}_removeComponent`,
        param: [newid],
      }); //返回控件id

    return newid;
  },

  /**
   * @methhod 往容器内一次性新增多个控件
   
   * @param {array} componentDatas 存放控件数据的数组
   * @param {number} index 要插入的位置
   * @param {function} fn 回调函数，控件全部新增完毕后执行
   * @returns {array} 新增控件的id
   */
  addComponents(componentDatas, index, fn) {
    //调用循环新增方法
    return Decorator.component.addComponents.call(
      this,
      componentDatas,
      index,
      fn
    );
  },

  /**
   * @method removeComponent 删除控件装饰方法
   * @date 2019-09-16
   
   * @param {string} id 控件id
   * @return {nummber} 删除成功则返回控件在父级中的位置索引，删除失败返回-1
   */
  removeComponent(id, fn, isrecord) {
    //设置编辑状态
    window.public.editState = "edit"; //不等于false则把此操作记录到历史条目中

    if (isrecord != false) {
      const data = Decorator.component.getComponentData(id);
      const index = Decorator.component.removeComponent.call(this, id, fn);
      History.add({
        action: `${this.state.component.id}_addComponent`,
        param: [data, index],
      });
      return index;
    }

    return Decorator.component.removeComponent.call(this, id, fn);
  },

  /**
   * @method removeComponents 一次删除多个控件
   
   * @param {array} idList 存放控件id的数组
   * @param {function} fn 回调函数，控件全部删除完毕后执行
   * @returns {array} 控件在容器内的位置
   */
  removeComponents(components, fn) {
    //调用循环删除方法
    return Decorator.component.removeComponents.call(this, components, fn);
  },
};

export default Decorator;
