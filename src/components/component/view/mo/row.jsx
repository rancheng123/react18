
// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util.jsx';

/**
 * @function Component 一行多列结构类
 * @date 2019-11-13
 * @author wyq
 * @return 一行多列结构
 */

function Component() {
  let {
    state: {
      component: {
        id,
        components
      },
      data: {
        document_data = {},
        theme_data = {}
      }
    },
    props: {
      context,
      clone
    }
  } = this;
  let Background = null;
  let navigationSlide = null;
  navigationSlide = this.state.component['navigation-slide'];
  const {
    background
  } = theme_data !== null && theme_data !== void 0 ? theme_data : {}; //如果是倒序，进行反转排序

  if (document_data.mosort == 'inverted') {
    components = [].concat(components).reverse();
  } //存在背景数据并且背景类型不是背景色


  if (background && (background.motype || background.type || 'BackgroundColor') != "BackgroundColor") {
    var _background$mouri, _background$mouri2, _background$mouri3;

    const isVideo = background.type == 'video' || background.motype == 'video';
    Background = React.createElement("div", {
      className: "rowListBg" + (isVideo ? '' : ' lazyload'),
      "data-src": isVideo ? null : Util.imagePath({ ...background,
        uri: (_background$mouri = background.mouri) !== null && _background$mouri !== void 0 ? _background$mouri : background.uri
      }),
      "data-webp": isVideo ? null : theme_data.isWebp === false ? null : Util.webp(Util.imagePath({ ...background,
        uri: (_background$mouri2 = background.mouri) !== null && _background$mouri2 !== void 0 ? _background$mouri2 : background.uri
      }))
    }, isVideo ? React.createElement("video", {
      src: (_background$mouri3 = background.mouri) !== null && _background$mouri3 !== void 0 ? _background$mouri3 : background.uri,
      width: "100%",
      playsInline: "playsinline",
      autoPlay: "autoplay",
      loop: true,
      muted: "muted"
    }) : null);
  } //组件开启浮动属性 sxt 2020-2-22


  return React.createElement("div", {
    navigationSlide: navigationSlide == 'true' ? 'true' : "",
    id: id,
    "data-fixed": document_data.isFloat || null,
    className: `${id} row_line ${Util.source ? '' : 'editColumn'} ${document_data.name}`
  }, Background, React.createElement(Util.children, {
    components: components,
    context: context,
    clone: clone
  }));
}

export default Component

//# sourceURL=webpack:///./components/component/view/mo/row.js?