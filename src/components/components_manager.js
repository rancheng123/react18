// 导入 components_map.json 文件
import componentsMap from './components_map.json';

let modules = null
// 动态导入处理函数
const dynamicImport = async (path, name) => {
  try {
    // console.log(path,name,'1111111');
    if(!modules){
      modules = import.meta.glob('../components/*/*.js')
    }
    // console.log(modules,'modules',path,name);
    // let Module = null
    const m = await modules[`./${path}.js`]
    return m ? m().then(mod => mod[name]) : null
    // modules[`./${path}.js`] && await modules[`./${path}.js`]().then((mod) => {
    //   Module = mod
    // })

    // 调用 comProxy 函数并传入模块中指定的导出
    // return comProxy(Module[name]);
  } catch (error) {
    console.error('err', error);
  }
};




/**
 * @function componentsManager 控件结构管理器
 * @author wyq
 * @date 2019-09-17
 * @param {strng} type 控件类型
 * @return {object} 指定对象 
 */

export default function componentsManager(type) {
  
  //检测类型是否是字符串
  if (typeof type == "string") {
    //检测类型中是否存在中划线
    if (type.indexOf("-") != -1) {
      type = type.split("-")[1];
    }

    const first = type.charAt(0);
    type = type.replace(first, first.toLowerCase());
    const {
      path,
      name
    } = componentsMap[type] || {};
    return path && name ? dynamicImport(path, name) : null;
  } else {
    return null;
  }
}
/**
 * @method comProxy 控件代理
 * @date 2019-10-09
 * @author wyq
 * @param {object} object 控件模块对象 
 */

function comProxy(object) {
  //处理对象
  const handler = {
    get(object, name) {
      if (name != "then") {
        //真对访问进行验证处理
        return (cate, type) => object[name] ? object[name](cate, type) : null;
      } else {
        return object[name];
      }
    }

  }; //返回代理对象

  return new Proxy(object, handler);
}