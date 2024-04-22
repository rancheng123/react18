// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util';
export const Footer = function() {
  var _background$mouri, _background$mouri2, _background$mouri3;

  const {
    state: {
      component: {
        id,
        components
      },
      data: {
        document_data = {},
        theme_data = {}
      }
    }
  } = this,
        background = theme_data.background;
  let page = this.props.page,
      footerClass = "";

  if (page && Util.source) {
    let pageId = page.structure.id,
        footerShow = page.data.document_data[pageId].footerShow;

    if (footerShow == false) {
      footerClass = "mofootPadbtm";
    }
  }

  return (
    <footer id={id} className={`${footerClass}`} data-float={document_data.isFloat || null}>
      {
        background && (
          <div
            className='rowListBg lazyload'
            data-src={Util.imagePath({ ...background,
              uri: (_background$mouri = background.mouri) !== null && _background$mouri !== void 0 ? _background$mouri : background.uri
            })}
            data-webp={Util.webp(Util.imagePath({ ...background,
              uri: (_background$mouri2 = background.mouri) !== null && _background$mouri2 !== void 0 ? _background$mouri2 : background.uri
            }))}
          >
              {
                background.type == 'video' || background.motype == 'video' && (
                  <video 
                    src={(_background$mouri3 = background.mouri) !== null && _background$mouri3 !== void 0 ? _background$mouri3 : background.uri}
                    width='100%'
                    autoPlay='autoplay'
                    loop={true}
                    muted='muted'
                  />
                )
              }
            </div>
        )
      }
      <Util.children components={components} />
    </footer>
  )

  // return React.createElement("footer", {
  //   id: id,
  //   className: `${footerClass}`,
  //   "data-float": document_data.isFloat || null
  // }, background ? React.createElement("div", {
  //   className: "rowListBg lazyload",
  //   "data-src": Util.imagePath({ ...background,
  //     uri: (_background$mouri = background.mouri) !== null && _background$mouri !== void 0 ? _background$mouri : background.uri
  //   }),
  //   "data-webp": Util.webp(Util.imagePath({ ...background,
  //     uri: (_background$mouri2 = background.mouri) !== null && _background$mouri2 !== void 0 ? _background$mouri2 : background.uri
  //   }))
  // }, background.type == 'video' || background.motype == 'video' ? React.createElement("video", {
  //   src: (_background$mouri3 = background.mouri) !== null && _background$mouri3 !== void 0 ? _background$mouri3 : background.uri,
  //   width: "100%",
  //   autoPlay: "autoplay",
  //   loop: true,
  //   muted: "muted"
  // }) : null) : null, React.createElement(Util.children, {
  //   components: components
  // }));
}

