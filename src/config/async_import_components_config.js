// 将components 路径下的组件js 引入 方便以后调用
const componentsAsync = import.meta.glob('../components/**/*.{jsx,js}');

export {
  componentsAsync
}