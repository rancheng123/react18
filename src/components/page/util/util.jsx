
// 导入 React 库
import React, { useState, useEffect } from 'react';
// 导入自定义的 dispatcher 模块
import Dispatcher from '@/system/tools/dispatcher';
// 导入自定义的 component 模块
import ComponentDecorator from '@/system/tools/component';
// 导入自定义的 components_manager 模块
import componentsManager from '@/components/components_manager';
// 导入自定义的 link_decorator 模块
import LinkDecorator from './link_decorator';
// 导入自定义的 image_path 模块
import ImagePath from './image_path';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

let Components = null;
/**
 * @function getComponent 获取对应组件
 * @param {string} componentType 控件类型 
 * @param {string} type 结构类型 html amp mip 
 * @return {class} 对应控件类 
 */
async function getComponent(componentType, type, skin = '') {

  let [one, cate, name] = skin.split('.');
  const keyName = skin ? `${cate}_${name}` : componentType; //类型产生变化，初始化Components

  if (Util.istype) {
    Components = Object.create(null);
  }

  if (Components[keyName] == undefined) {
    const module = await componentsManager(componentType); //判断是否获取到了工厂对象
    if (module) {
      cate = window.humpJoin(cate, '_'); //获取视图类
      const View = await module.getView({
        type,
        name,
        cate
      });
      const Controler = module.getControler ? await module.getControler(type) : null;
      Components[keyName] = ComponentDecorator(View, Controler);
    }
  }
  return Components[keyName] || null;
}

/**
 * @function getChild 获取子组件
 * @param {object} component 控件结构数据 
 * @param {object} data 控件属性数据 
 * @param {object} page 当前页面数据
 * @param {string} type 结构类型 html amp mip 
 * @param {object} context 上下文数据。父级向子级传递数据时用
 * @param {boolean} clone 是否复制节点
 * @param {object} props 属性对象 
 */
async function getChild(component, data, page, type, context, clone, props) {
  //验证控件数据是否合法
  if (Dispatcher.dispatch("validate", {
    args: [component, data]
  })) {
    let {
      id,
      componentType,
      skin
    } = component,
      list = [];

    //获取控件结构
    const Component = await getComponent(componentType, type, skin);

    if (Component) {
      //获取控件数据
      const {
        data: comdata
      } = Dispatcher.dispatch("get", {
        args: [component, data]
      }); //获取控件样式

      const style = await Util.cssParser(component, comdata.theme_data, type); //解析样式

      // style && list.push(React.createElement("style", {
      //   key: `style_${id}`,
      //   id: `style_${id}`,
      //   dangerouslySetInnerHTML: {
      //     __html: style
      //   }
      // })); 

      style && list.push(
        <style
          key={`style_${id}`}
          id={`style_${id}`}
          dangerouslySetInnerHTML={{
            __html: style
          }}
        />
      );

      //判断是否存在子数据

      list.push(React.createElement(Component, _extends({
        key: id,
        component: component,
        data: comdata,
        page: page,
        context: context,
        clone: clone
      }, props)));

      // list.push(
      //   <Component
      //     key={id}
      //     component={component}
      //     data={comdata}
      //     page={page}
      //     context={context}
      //     clone={clone}
      //     {...props}
      //   />
      // );

      return list;
    }
  }

  return null;
}
/**
 * @instance {Util} 核心工具实例
 */
const Util = {
  type: '',

  /**@property ptype 上一次的页面类型 */
  ptype: '',

  /**@property istype 页面类型是否发生变化 true 发生变化 false 未发生变化 */
  istype: false,
  pid: '',

  /**
   * @method loadComponent 加载控件
   * @param {string} type 结构类型 html amp mip 
   * @param {object} sitedata 站点数据
   * @return {object} 控件结构 
   */
  async loadComponent(type, sitedata) {
    console.log('加载');
    let {
      masterPage: {
        structure,
        data
      },
      pages
    } = sitedata; //存储页面结构类型 

    this.type = type, this.pid = structure.children[2].pageId; //上一次类型与当前类型不同，返回true，相同返回false

    this.istype = type != this.ptype ? (this.ptype = type, true) : false;

    //获取页面结构
    const Page = await getComponent("document", type);
    //获取控件样式
    const style = await Util.cssParser(structure, data.theme_data.document, type);

    // return React.createElement(React.Fragment, null, style ? React.createElement("style", {
    //   id: "style_document",
    //   dangerouslySetInnerHTML: {
    //     __html: style
    //   }
    // }) : null, React.createElement(Page, {
    //   component: structure,
    //   data: data,
    //   pages: pages
    // }));

    return (
      <>
        {style ? <style id="style_document" dangerouslySetInnerHTML={{ __html: style }} /> : null}
        <Page component={structure} data={data} pages={pages} />
      </>
    )
  },

  /**
   * @method children 获取子控件
   * @param {object} props 参数对象
   * @param {object} props.components 存放控件数据的集合
   * @param {object} [props.page] 页面当前数据
   * @return {array} 存放子结构的数组 
   */
  children({
    components,
    page,
    context,
    clone,
    props
  }) {

    //判断是否存在子控件
    if (components && components.length) {
      //循环控件 
      return components.map(component => {
        //数据类型是否为content
        if (component.componentType == "em-Content") {
          //把数据切换为只包含content部分的当前页面数据
          component = page.structure;
        } //判断是否存在数据


        // return React.createElement(Util.component, {
        //   component: component,
        //   page: page,
        //   key: `${component.id}${component.skin}`,
        //   context: context,
        //   clone: clone,
        //   props: props
        // });

        return (
          <Util.component
            component={component}
            page={page}
            key={`${component.id}${component.skin}`}
            context={context}
            clone={clone}
            props={props}
          />
        )
      });
    }

    return null;
  },

  /**
   * @method cssParser css解析器
   * @param {object} component 控件结构数据
   * @param {object} themeData 控件样式数据
   * @param {string} type 结构类型 html amp mip 
   * @return {string} 解析后的css 
   */
  async cssParser(component, themeData, type) {
    // const module = await __webpack_require__.e(/*! import() */ 1326).then(__webpack_require__.bind(null, /*! ./css */ "./components/page/util/css.js"));
    const module = await import('./css.js').then(module => module.default);
    return module(component, themeData, type);
  },

  linkDecorator(prop) {
    return LinkDecorator[prop.type || 'html'](prop);
  },

  imagePath(prop) {
    return ImagePath.imageUri(prop);
  },

  /**
   * @method component 获取单个控件结构
   * @param {object} param0  参数对象
   * @param {object} param0.component 控件数据
   * @param {object} param0.context 控件上下文对象 用于控件之间的数据传递
   * @param {boolean} param0.clone 标识控件是否复制的
   * @param {object} param0.props 属性对象
   * @param {object} [param0.page] 页面当前数据 
   * @return {object} 控件结构
   */
  component({
    component,
    page,
    context,
    clone,
    props = {}
  }) {
    //判断是否存在控件数据
    if (component) {
      const [childs, setChilds] = useState(null); //结构加载完毕以后执行一次

      useEffect(() => {
        const {
          data
        } = Dispatcher.dispatch('getData', {
          value: component
        });

        //获取控件结构
        const promise = getChild(component, data, page, Util.type, context, clone, props);

        promise.then(childs => setChilds(clone ? childs[1] || childs[0] : childs));
      }, [context]);

      //返回控件
      return childs;
    }

    //返回空
    return null;
  },

  /**
   * @method setLinkUrl 设置下载链接的数据
   * @param {Objeict}  contink  列表返回的链接数据
   * @param {Objeict}  link     控件本身设置的链接数据
   * @return {String} 设置链接的数据 
   */
  setLinkUrl(contink, link) {
    return contink !== null && contink !== void 0 ? contink : link;
  },

  /**
   * @method webp 图片后缀更换为webp格式
   * @param {string} uri 图片路径
   * @return {string} 开启webp 返回替换后的路径。 未开启webp，返回原始路径
   */
  webp(uri) {
    return uri;
  },

  /**
  * @method getComponentText 文本按钮，公用处理方法
  * @param {string} id 控件id
  * @param {Object} data 控件document_data的数据
  * @param {string} key 键值，修改的属性
  * @param {Object} context 父级传过的的数据
  * @return {string} 返回文本按钮的文本字段
  */
  getComponentText(id, data, key, context) {
    let {
      dataSource
    } = data; //数据源存在并且选择了companyField(数据源类型)

    if (dataSource && dataSource.companyField) {
      let companyField = dataSource.companyField;
      let keyValue = data[key];
      let text = context[companyField];

      if (text == undefined) {
        text = "";
      } //控件是列表数据源时，并且传过来了列表数据时 获取数据中的内容 sxt 2020-2-28


      if (dataSource.type == "list" && context) {
        keyValue = `${dataSource.companyLabelText || ""}${text}`;
      } //类型为数据源并且列表数据是自定义时，读取传过来的值 sxt 2020-11-10


      if (context && context.selectionContent == "custom") {
        keyValue = text;
      }

      return keyValue;
    } else {
      return data[key];
    }
  },

  /**
    * @method getComponentText 时间戳转化
    */
  dateFormat(pattern = 'y-M-d', time, lang, opts) {
    let _date = new Date(Number(time) * 1000 || new Date().getTime()),
      //获取日期对象
      param = {
        hour12: true
      };

    if (opts) {
      const name = {
        y: "year",
        M: "month",
        d: "day",
        h: "hour",
        m: "minute",
        s: "second"
      };

      if (opts.param) {
        param = opts.param;
      }

      pattern.split(/[\s-:/.]?/g).forEach(e => {
        param[name[e]] = opts[e] || "numeric";
      });
    }

    let _dateTime = _date.toLocaleString("en-US", param);

    if (lang != "en-US") {
      _dateTime = _dateTime.split(", "); //分隔本地化的日期字符串
      //分隔时间部分和分隔年月日部分 

      const _d = _dateTime[0].split(/\/|-/),
        _t = _dateTime[1] ? _dateTime[1].split(":") : [],
        _s = _t[2] ? _t[2].split(" ") : []; //把年月日时间通过指定的键存储起来


      let _data = {
        y: _d[2],
        M: _d[0],
        d: _d[1],
        h: _t[0],
        m: _t[1],
        s: _s[0]
      }; //如果使用的是12小时，则在小时前边加上时段

      if (param.hour12) {
        _data.h = (_s[1] == "AM" ? "上午" : "下午") + _data.h;
      } //通过替换日期表达式返回指定格式的日期字符串


      return pattern.replace(/[yMdhms]?/g, r => {
        if (!_data[r]) {
          return "";
        }

        return _data[r].length == 1 ? "0" + _data[r] : _data[r];
      });
    }

    return _dateTime;
  },

  isNumeric(str) {
    //判断是否全是数字
    return /^\d+$/.test(str);
  },

  timeTypeCont(id, data, key, context) {
    let {
      dataSource
    } = data; //数据源存在并且选择了companyField(数据源类型)

    if (dataSource && dataSource.companyField) {
      let companyField = dataSource.companyField;
      let keyValue = data[key];
      let text = context[companyField];
      let lang = "";

      if (text == undefined) {
        text = "";

        if (keyValue) {
          //这里可能返回 暂无数据的字符串或者时间戳的字符串，所以需要区分
          if (this.isNumeric(keyValue)) {
            if (dataSource.sign == "y-M-d h:m:s") {
              lang = "zh-CN";
              keyValue = this.dateFormat(dataSource.sign, keyValue, "", {
                param: {
                  hour12: false
                }
              });
            } else if (dataSource.sign == "M d, Y") {
              lang = "en-US";
              keyValue = this.dateFormat("M d y", keyValue, "en-US", {
                M: "short"
              });
            } else {
              keyValue = this.dateFormat(dataSource.sign ? dataSource.sign : "y-M-d", keyValue);
            }
          }
        }
      } else {
        if (dataSource.sign == "y-M-d h:m:s") {
          lang = "zh-CN";
          text = this.dateFormat(dataSource.sign, text, "", {
            param: {
              hour12: false
            }
          });
        } else if (dataSource.sign == "M d, Y") {
          lang = "en-US";
          text = this.dateFormat("M d y", text, "en-US", {
            M: "short"
          });
        } else {
          text = this.dateFormat(dataSource.sign ? dataSource.sign : "y-M-d", text);
        }
      } //控件是列表数据源时，并且传过来了列表数据时 获取数据中的内容 sxt 2020-2-28


      if (dataSource.type == "list" && context) {
        keyValue = `${dataSource.companyLabelText || ""}${text}`;
      } //类型为数据源并且列表数据是自定义时，读取传过来的值 sxt 2020-11-10


      if (context && context.selectionContent == "custom") {
        keyValue = text;
      }

      return keyValue;
    } else {
      return data[key];
    }
  }

};

export default Util