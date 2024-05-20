// 定义并导出 resourceManager 函数
export function resourceManager(type) {
  // 将type的首字母大写
  let _type = type.slice(0, 1).toUpperCase() + type.slice(1);
  // 动态加载资源控制器模块
  return import(`./${type}/${type}_resource_controler`).then(module => {
    // 返回资源控制器
    return module[`${_type}ResourceControler`];
  });
}
