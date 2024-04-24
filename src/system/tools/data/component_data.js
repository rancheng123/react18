import Dispatcher from "../dispatcher";
import Data_Data from './data'

/**
 * @instance ComponentData 控件数据处理
 */

const ComponentData = {
  /**
   * @method install 安装数据处理相关方法
   * @date 2019/09/16
   
   * @param {object} component  组件状态对象
   */
  install(component) {
    const id = component.state.component.id; //如果未注册行为则调用注册方法
    if (Dispatcher.has(id + '_set') == false) {
      Dispatcher.register(id + "_set", this.set, component);
      Dispatcher.register(id + "_get", this.get, component);
      Dispatcher.register(id + "_remove", this.remove, component);
      Dispatcher.register(id + "_addComponent", this.addComponent, component);
      Dispatcher.register(id + "_removeComponent", this.removeComponent, component);
      Dispatcher.register(id + "_addComponents", this.addComponents, component);
      Dispatcher.register(id + "_removeComponents", this.removeComponents, component);
    }
  },

  /**
   * @method uninstall 安装数据处理相关方法
   * @date 2019/09/16
   
   * @param {object} component  组件状态对象
   */
  uninstall(component) {
    const id = component.state.component.id; //如果已经注册行为则取消注册

    if (Dispatcher.has(id + '_set')) {
      Dispatcher.unregister(id + "_set");
      Dispatcher.unregister(id + "_get");
      Dispatcher.unregister(id + "_remove");
      Dispatcher.unregister(id + "_addComponent");
      Dispatcher.unregister(id + "_removeComponent");
      Dispatcher.unregister(id + "_addComponents");
      Dispatcher.unregister(id + "_removeComponents");
    }
  },

  /**
   * @method get 获取控件数据
   * @date 2019-09-16
   
   * @param {object|boolean} [component] 控件结构数据  是否返回源对象
   * @return {object} 控件全部数据（传递参数的话返回控件原始数据,数据完整，返回数据，不完整，返回空）
   */
  get(component) {
    //判断是否传递参数
    if (typeof component == 'object') {
      const {
        data
      } = Dispatcher.dispatch('getData', {
        value: component
      }); //定义初始数据

      let newData = {
        component: component,
        data: {}
      };
      const isComplete = ComponentData.validate(component, data, (data, id, type) => {
        if (type == "items") {
          newData.data.items ? newData.data.items[id] = data[id] : newData.data.items = {
            [id]: data[id]
          };
          return true;
        }

        newData.data[type] = data[id];
        return true;
      });
      return isComplete ? newData : null;
    } //是否存在状态对象


    if (this.state) {
      //控件数据
      const newData = {
        component: this.state.component,
        data: this.state.data
      }; //是否返回源对象。默认返回新对象。true 返回源对象

      return component != true ? JSON.parse(JSON.stringify(newData)) : newData;
    }

    return null;
  },

  /**
   * @method getComponentData 获取控件数据
   * @param {string} id 控件id
   * @param {boolean} issource 是否返回原始数据 true 返回原始数据 false 返回递归处理后的数据
   * @return {object} 控件全部数据
   */
  getComponentData(id, issource) {
    const {
      component
    } = Dispatcher.dispatch(`${id}_get`);
    const {
      data
    } = Dispatcher.dispatch('getData', {
      value: component
    }); //判断返回原始数据还是普通递归数据

    return issource != true ? this.getComponentUnsourceData(component, data) : this.getComponentSourceData(component, data);
  },

  /**
   * @method getComponentSourceData 获取控件原始数据
   * @date 2020-03-27
   
   * @param {object} component 控件结构数据
   * @param {object} data 控件属性数据
   * @return {object} 控件原始数据
   */
  getComponentSourceData(component, data) {
    let newComponent = JSON.parse(JSON.stringify(component)); //递归控件数据

    this.eachComponentData(newComponent, (component, i, parent) => {
      component.structure = {
        ...component
      }; //删除id

      delete component.structure.id; //数据验证

      ComponentData.validate(component, data, (data, id, type, i) => {
        //数据是不是items数据
        if (type == 'items') {
          component.structure.items ? component.structure.items[i] = data[id] : component.structure.items = [data[id]];
          return true;
        }

        delete component.structure[this.dataNames[i]];
        component[this.dataCategories[i]] = data[id];
        return true;
      }); //如果控件是基本控件或者内部没有子控件，则循环清除掉除structure之外的所有属性

      if ((component.components || []).length == 0) {
        for (let key in component) {
          this.dataCategories.indexOf(key) == -1 && key != 'structure' && delete component[key];
        }
      } //如果父级存在，则循环删除掉父级除structure之外的所有属性


      if (parent) {
        for (let key in parent) {
          this.dataCategories.indexOf(key) == -1 && key != 'structure' && delete parent[key];
        }
      }
    });
    return JSON.parse(JSON.stringify(newComponent));
  },

  /**
   * @method getComponentUnsourceData 获取控件所有数据
   * @date 2020-03-27
   
   * @param {object} component 控件结构数据
   * @param {object} data 控件数据
   * @return {object} 控件所有数据
   */
  getComponentUnsourceData(component, data) {
    let newData = {
      component: component,
      data: {}
    }; //递归循环数据

    this.eachComponentData(component, component => {
      //循环赋数据
      ComponentData.validate(component, data, (data, id, type) => {
        //类型items，赋items的数据到document_data中
        if (type == "items") {
          newData.data.document_data ? newData.data.document_data[id] = data[id] : newData.data.document_data = {
            [id]: data[id]
          };
          return true;
        } //数据赋默认值


        if (newData.data[type] == undefined) {
          newData.data[type] = {};
        } //赋值


        newData.data[type][id] = data[id];
        return true;
      });
    }); //返回数据

    return JSON.parse(JSON.stringify(newData));
  },

  /**
   * @method validates 递归验证控件数据是否合法
   * @date 2019-09-17
   
   * @param {object} component 控件结构数据 
   * @return {boolean} 控件数据是否合法，合法返回true，不合法返回false
   */
  validates(component) {
    const data = Dispatcher.dispatch("getData", {
      value: component
    });
    return this.eachComponentData(component, component => this.validate(component, data.data));
  }

}; //继承Data

ComponentData.__proto__ = Data_Data; //注册获取数据事件

Dispatcher.register("get", ComponentData.get, ComponentData); //注册获取控件详细数据事件（容器控件会包含所有子级控件数据）

Dispatcher.register("getComponentData", ComponentData.getComponentData, ComponentData);

export default ComponentData;
