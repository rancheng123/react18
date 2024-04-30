
// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util';

export const Header = function () {
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
  // return React.createElement("header", {
  //   id: id,
  //   className: "auto-margin",
  //   "data-float": document_data.isFloat || null
  // }, background ? React.createElement("div", {
  //   className: "rowListBg lazyload",
  //   "data-src": Util.imagePath(background),
  //   "data-webp": Util.webp(Util.imagePath(background))
  // }, background.type == 'video' ? React.createElement("video", {
  //   src: background.uri,
  //   width: "100%",
  //   autoPlay: "autoplay",
  //   playsinline: "playsinline",
  //   muted: "muted",
  //   loop: true
  // }) : null) : null, React.createElement(Util.children, {
  //   components: components
  // }));

  return (
    <header
      id={id}
      className="auto-margin"
      data-float={document_data.isFloat || null}
    >
      {background ? (
        <div
          className="rowListBg lazyload"
          data-src={Util.imagePath(background)}
          data-webp={Util.webp(Util.imagePath(background))}
        >
          {background.type === 'video' ? (
            <video
              src={background.uri}
              width="100%"
              autoPlay="autoplay"
              playsInline="playsinline"
              muted="muted"
              loop={true}
            />
          ) : null}
        </div>
      ) : null}
      <Util.children components={components} />
    </header>
  )
}

