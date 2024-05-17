import Util from "@/components/page/util/util";
import Dispatcher from "../dispatcher";
import Observer from "./observer";

/**
 * @function query 根据键值循环数据查找到对应数据
 * @param {string} key 键值
 * @param {object} component 控件结构数据
 * @param {object} data 控件属性数据
 * @param {function} fn 回调函数，在数据查找到后调用
 */
function query(key, component, data, fn) {
  console.log("query", key, component, data, fn);

  let newData = null; //循环键值

  key.split(".").forEach((e, i, list) => {
    if (i < list.length - 1) {
      //索引不为零且数据存在
      if (i != 0 && newData) {
        newData[e] ? (newData = newData[e]) : (newData = newData[e] = {});
      } else if (i == 0 && component && data) {
        //i等于零并且component 和 data数据都存在
        //判断是否存在控件数据
        newData =
          e == "component"
            ? component
            : (data[e] ? data[e] : (data[e] = {}), data[e]);
      } else {
        console.error("控件数据为undefined");
      }
    } //执行数据处理回调
    else {
      newData && fn && fn(newData, e);
    }
  });
}
/**
* @function render 渲染样式
* @param {object} component 控件结构数据 
* @param {object} theme_data 控件属性数据 
*/
function render(component, theme_data) {
  var _theme_data$document;

  const { id = "document" } = component,
    {
      public: { dom, type },
    } = window;
  theme_data =
    (_theme_data$document = theme_data.document) !== null &&
      _theme_data$document !== void 0
      ? _theme_data$document
      : theme_data; //解析样式

  const promise = Util.cssParser(
    component,
    theme_data,
    type == "pc" ? "html" : "mo"
  ); //获取控件样式节点

  promise.then((cssstr) => {
    let style = dom.querySelector(`#style_${id}`); //判断节点是否存在，存在直接赋值

    if (style) {
      //样式存在修改样式内容，样式不存在则删除style标签
      cssstr ? (style.innerText = cssstr) : style.remove();
    } else {
      //样式存在，往页内插入样式，否则不插入。
      if (cssstr) {
        //创建style节点
        style = dom.createElement("style");
        (style.id = `style_${id}`), (style.innerText = cssstr); //把样式插入到控件之前

        dom.querySelector(`#${id}`).before(style);
      }
    }
  });
}

const Data = {
  /**@property {array} dataTypes 数据类型 */
  dataTypes: [
    "document_data",
    "theme_data",
    "source_data",
    "menu_data",
    "animation_data",
  ],

  /**@property {array} dataNames 数据名称 */
  dataNames: [
    "dataQuery",
    "styleId",
    "sourceQuery",
    "menuQuery",
    "animationQuery",
  ],

  /**@property {array} dataCategories 数据分类*/
  dataCategories: ["data", "style", "source", "menu", "animation"],

  /**
   * @method dataHandler 数据处理模板方法
   * @param {string} key 键值
   * @param {function} opts.handler 回调处理函数
   */
  dataHandler(key, fn) {
    //判断是否为有效的键
    const isDot = key.indexOf(".") != -1; //判断修改的数据类型

    if (/theme_data|layout/.test(key)) {
      const {
        state: { component, data },
      } = this; //循环数据

      isDot ? query(key, component, data, fn) : fn(data, key); //更新样式

      render(component, data.theme_data);
    } else {
      isDot //更新ui
        ? this.setState(
          (state) => (query(key, state.component, state.data, fn), state)
        )
        : this.setState(
          (state) => (
            fn(state.data, key),
            {
              data: state.data,
            }
          )
        );
    }
  },

  /**
  * @method set 设置控件单个数据
  * @param {string|object} key 键或一个对象
  * @param {string|object} [value] 要设置的值
  */
  set(key, value) {
    console.log("set", key, value);
    let oldValue = null;

    if (typeof key == "string") {
      //调用数据处理方法
      value != undefined &&
        Data.dataHandler.call(this, key, (data, key) => {
          console.log("data", data, key);
          key != ""
            ? ((oldValue = data[key]), (data[key] = value))
            : ((oldValue = { ...data }), Object.assign(data, value));
          console.log("1111", oldValue);
        });
    } //如果key类型为object，则执行setState
    else if (/Object/.test(key.toString())) {
      this.setState(key);
    } //值无效则提示异常
    else {
      console.error("你输入的键值无效");
    }
    return oldValue;
  },

  /**
   * @method remove 控件删除单个数据
   * @param {string} key 键值
   * @return {number|string|array|object} 被删除的数据值
   */
  remove(key) {
    let value = null; //判断键值类型是否为字符串

    if (typeof key == "string") {
      //调用数据处理方法
      Data.dataHandler.call(this, key, (data, key) => {
        if (Array.isArray(data) == false) {
          (value = data[key]), delete data[key];
        } else {
          value = data.splice(key, 1);
        }
      });
    }

    return value;
  },

  /**
   * @method unrepeatId 避免重复id
   * @returns {string} 不重复的id
   */
  unrepeatId() {
    const id = window.public.createId(); //循环

    const element = window.public.dom.querySelector(`#${id}`); //判断id是否重复，不重复则停止循环返回id

    if (element == null) {
      return id;
    } //生成新id

    return window.public.createId("f", 7);
  },

  /**
  * @method serialize 循环序列化初始数据
  * @param {object} component 控件结构数据 
  * @param {object} data 控件属性数据 
  */
  serialize(component, data) {
    //创建id
    const id = this.unrepeatId(); //赋id

    component.id = id; //循环数据分类

    this.dataCategories.forEach((e, i) => {
      //判断数据是否存在
      if (component[e]) {
        //赋id
        component[this.dataNames[i]] = id; //判断newData中是否已有对应数据，没有则赋空对象

        if (!data[this.dataTypes[i]]) {
          data[this.dataTypes[i]] = {};
        } //赋数据

        data[this.dataTypes[i]][id] = component[e]; //删除对应的初始数据

        delete component[e]; //判断是否存在items数据。

        if (this.dataTypes[i] == "document_data" && component.structure.items) {
          //循环items数据
          data[this.dataTypes[i]][id].items = component.structure.items.map(
            (m) => {
              const id = window.public.createId("d"); //数据赋值并返回id

              data.document_data[id] = m || {};
              return id;
            }
          );
          delete component.structure.items;
        }
      }
    }); //合并数据

    Object.assign(component, component.structure, {
      id: id,
    });
    delete component.structure;
  },

  /**
   * @method copy 循环复制数据
   * @param {object} component 控件结构数据 
   * @param {object} data 控件属性数据 
   * @param {object} initData 要复制的初始属性数据
   * @param {boolean} unuseNewId  是否不使用新id
   */
  copy(component, data, initData, unuseNewId) {
    //unuseNewId 不为true会创建新id 为true不会创建新id
    const id = unuseNewId != true ? this.unrepeatId() : component.id; //赋id

    component.id = id; //循环数据

    this.dataTypes.forEach((e, i) => {
      const oid = component[this.dataNames[i]]; //判断初始数据中有无此数据

      if (oid && initData[e] && initData[e][oid]) {
        //数据为undefined，则给数据赋初始值
        if (data[e] == undefined) {
          data[e] = {};
        }

        component[this.dataNames[i]] = id;
        data[e][id] = initData[e][oid]; //判断数据是否存在items数据

        if (e == "document_data" && initData[e][oid].items) {
          //循环items数据
          data[e][id].items = initData[e][oid].items.map((m) => {
            //unuseNewId 不为true会创建新id 为true不会创建新id
            const id = unuseNewId != true ? window.public.createId("d") : m; //赋值并返回新id

            data[e][id] = initData[e][m] || {};
            return id;
          });
        }
      }
    });
  },

  /**
   * @method resolve 解析数据
   * @param {object} componentData 要解析的数据
   * @param {boolean} unuseNewId  是否不使用新id
   * @return {object} 解析后的数据 
   */
  resolve(componentData, unuseNewId) {
    const data = JSON.parse(JSON.stringify(componentData));
    let newData = Object.create(null);
    newData.data = {}; //深拷贝数据

    newData.component = componentData.structure ? data : data.component;
    this.eachComponentData(newData.component, (component) =>
      component.structure
        ? this.serialize(component, newData.data, unuseNewId)
        : this.copy(component, newData.data, data.data, unuseNewId)
    );
    return newData;
  },

  /**
  * @method addComponent 新增控件
  * @param {object} componentData 控件数据 
  * @param {number} index 插入位置
  * @param {function} fn 组件渲染完毕执行
  * @param unrender 不为true，表示要渲染ui，为true则不渲染ui
  * @param {boolean} unuseNewId 是否不创建新id
  * @return {object} 新增控件的数据
  */
  addComponent(componentData, index, fn, unrender, unuseNewId) {
    if (unuseNewId == false) {
      unuseNewId = false;
    } else {
      unuseNewId = true;
    }

    const {
      state: {
        component,
        component: { children, components = children },
      },
    } = this,
      newData = Data.resolve(componentData, unuseNewId),
      data = Dispatcher.dispatch("getData", {
        value: component,
      }); //判断是否存在新数据并且能否获取到对应控件数据

    if (newData && data) {
      //指定插入位置，则插入到指定位置，否则插入到最后
      components
        ? index != undefined && index >= 0
          ? components.splice(index, 0, newData.component)
          : components.push(newData.component)
        : (component.components = [newData.component]); //合并数据到站点数据中

      Data.dataTypes.forEach((e) => {
        //数据是否存在
        if (newData.data[e]) {
          //判断数据类型是否是object，不是重新赋值
          data.data[e] && /Object/.test(data.data[e].toString())
            ? Object.assign(data.data[e], newData.data[e])
            : (data.data[e] = newData.data[e]);
        }
      }); //unrender不为true，表示要渲染ui，为true则不渲染ui

      if (unrender != true) {
        //更新控件UI
        this.setState({
          component: component,
        });

        //监听控件节点是否加载完毕
        fn &&
          Object(Observer)(
            "add",
            component.id,
            newData.component.id,
            fn,
            newData.component
          );
      }

      return newData.component.id;
    }

    return "";
  },

  /**
   * @methhod 往容器内一次性新增多个控件
   * @param {array} componentDatas 存放控件数据的数组
   * @param {number} index 要插入的位置
   * @param {function} fn 回调函数，控件全部新增完毕后执行
   * @returns {array} 新增控件的id
   */
  addComponents(componentDatas, index, fn) {
    //循环新增
    if (Array.isArray(componentDatas)) {
      return componentDatas.map((componentData, i, coms) =>
        Data.addComponent.call(
          this,
          componentData,
          index != undefined ? index + i : undefined,
          fn,
          i != coms.length - 1 ? true : undefined
        )
      );
    } else {
      console.error("请输入一个合法的数组");
    }
  },

  /**
   * @method removeComponent 删除控件
   * @param {string} id 控件id
   * @return {number} 删除成功则返回控件在父级中的位置索引，删除失败返回-1
   */
  removeComponent(id, fn, unrender) {
    const {
      state: {
        component,
        component: { children, components = children },
      },
    } = this,
      data = Dispatcher.dispatch("getData", {
        value: component,
      }); //判断控件是否是容器

    if (components) {
      //容器内查找控件
      const index = components.findIndex((e) => e.id == id); //容器内是否存在要删除的控件

      if (index != -1) {
        //删除控件结构数据
        const recomponent = components.splice(index, 1); //递归删除数据

        Data.eachComponentData(recomponent[0], (component) =>
          Data.validate(component, data.data, (data, id) => delete data[id])
        ); //监听控件节点是否加载完毕

        fn &&
          Object(Observer)(
            "remove",
            component.id,
            recomponent[0].id,
            fn,
            index
          );
        !unrender &&
          this.setState({
            component: component,
          });
        return index;
      } else {
        console.error("控件中无此控件数据");
        return -1;
      }
    } else {
      console.error("控件不是容器");
      return -1;
    }
  },

  /**
   * @method removeComponents 一次删除多个控件
   * @param {array} components 存放控件数据的数组
   * @param {function} fn 回调函数，控件全部删除完毕后执行
   * @returns {array} 控件在容器内的位置
   */
  removeComponents(components, fn) {
    //循环删除
    if (Array.isArray(components)) {
      return components.map(({ id }, i, ids) =>
        Data.removeComponent.call(
          this,
          id,
          fn,
          i != ids.length - 1 ? true : undefined
        )
      );
    } else {
      console.error("请输入一个合法的数组");
    }
  },

  /**
  * @method eachComponentData 递归控件数据
  * @param {object} component 控件数据
  * @param {function} fn 执行回调函数  
  */
  eachComponentData(component, fn) {
    //执行回调函数，处理最外层数据
    const boolean = fn && fn(component); //在这里进行赋值，是考虑回调函数中有可能会更改component.components属性

    const components = component.components; //判断控件是否是容器控件

    if (boolean !== false && components && components.length) {
      //重写原方法
      const _eachComponentData = function (components, parent) {
        //循环控件
        for (let i = 0, len = components.length; i < len; i++) {
          //赋值
          const item = components[i]; //执行回调

          const boolean = fn && fn(item, i, parent); //赋值

          const len = (item.components || []).length; //判断控件是否是容器控件，并且内是否有子元素

          if (boolean !== false && len) {
            _eachComponentData(item.components, item);
          }
        }
      }; //调用重写方法

      _eachComponentData(components, component);
    }

    return boolean;
  },

  /**
   * @method validate 验证控件数据是否合法
   * @param {object} component 控件结构数据 
   * @param {object} data 控件属性数据
   * @param {function} [fn] 数据验证合法时执行的回调函数
   * @return {boolean} 控件数据是否合法，合法返回true，不合法返回false
   */
  validate(component, data, fn) {
    //循环验证数据
    return this.dataTypes.every((e, i) => {
      const id = component[this.dataNames[i]]; //如果id为undefined 则表示控件没有这个数据，所以返回true

      if (id == undefined) {
        return true;
      }

      let isComplete = data && data[e] && data[e][id] != undefined; //判断是不是document_data

      if (e == "document_data" && isComplete && data[e][id].items) {
        //检测控件items数据是否合法
        isComplete = data[e][id].items.every((m, i) => {
          //如果存在回调函数并且bool为true，执行回调函数，否则返回bool;
          return fn && data[e]
            ? fn(data[e], m, "items", i)
            : data[e][m] != undefined;
        });
      } //判断回调函数是否存在且data中是否存在对应数据

      if (fn && isComplete) {
        isComplete = fn(data[e], id, e, i);
      } //判断是否有对应id

      return isComplete;
    });
  },
}; //注册数据验证事件

Dispatcher.register("validate", Data.validate, Data);

export default Data;
