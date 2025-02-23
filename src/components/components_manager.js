// 导入 components_map.json 文件
import componentsMap from './components_map.json';

let modules = null
// 动态导入处理函数
const dynamicImport = async (path, name) => {
  try {
    if (!modules) {
      modules = import.meta.glob('../components/*/*.js')
    }
    const m = await modules[`./${path}.js`]
    return m ? m().then(mod => comProxy(mod[name])) : null
  } catch (error) {
    console.error('err', error);
  }
};


/**
 * @function componentsManager 控件结构管理器
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
