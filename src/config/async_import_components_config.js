// 将components 路径下的组件js 引入 方便以后调用
const componentsAsync = import.meta.glob(['../components/**/*.{jsx,js,json}', '../template/toolbar/**/*.{jsx,js,json}']);

// components 文件夹下路径
const componentBasePath = '../components/';
// template/toolbar 路径
const toolbarBasePath = '../template/toolbar/';
/**
  @params path 路径
  @params moduleName 导出文件的名字 如果不传选默认default
*/
async function getAsyncComponent(path, moduleName = 'default') {
  // console.log(componentsAsync[path])
  if (componentsAsync[path]) {
    return await componentsAsync[path]().then(module => module[moduleName])
  }
  return null
}

export {
  getAsyncComponent,
  componentsAsync,
  toolbarBasePath,
  componentBasePath,
}