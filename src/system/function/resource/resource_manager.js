// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resourceManager", function() { return resourceManager; });
// // import {} from "../resource/image/image_resource_controler"
// function resourceManager(type) {
//   let _type = type.slice(0, 1).toUpperCase() + type.slice(1);

//   return __webpack_require__("./system/function/resource lazy recursive ^\\.\\/.*\\/.*_resource_controler$")(`./${type}/${type}_resource_controler`).then(module => {
//     return module[`${_type}ResourceControler`];
//   });
// }

// //# sourceURL=webpack:///./system/function/resource/resource_manager.js?

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
