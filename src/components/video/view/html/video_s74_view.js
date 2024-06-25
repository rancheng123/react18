// __webpack_require__.r(__webpack_exports__);
// /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s74", function() { return s74; });
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
// /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// /* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");

import React from 'react';
import Util from '@/components/page/util/util';
function s74() {
  let {
    state: {
      component: {
        id
      },
      data: {
        document_data: {
          imgUri,
          videoUri,
          videoType = "localUpload",
          dataRetain = '',
          quality,
          framework,
          autoplay,
          rePlay
        }
      }
    },
    props: {
      context
    }
  } = this;
  let lightbox = context && context.lightbox; //存在此属性，证明此视频在弹出容器中。

  let defPlay = autoplay || null;

  if (lightbox) {
    defPlay = null;
  }

  //在弹出容器中，视频禁止自动播放

  // return React.createElement("div", {
  //   id: id,
  //   className: id
  // }, videoType == "localUpload" ? React.createElement("div", {
  //   className: "videoBox"
  // }, React.createElement("video", {
  //   className: `${id}Vid video boxSiz`,
  //   poster: Util.imagePath({
  //     uri: imgUri,
  //     dataRetain,
  //     quality
  //   }) || null,
  //   "data-play": autoplay || null,
  //   autoplay: defPlay ? "autoplay" : null,
  //   controls: "controls",
  //   loop: rePlay || null
  // }, React.createElement("source", {
  //   src: videoUri || null,
  //   type: "video/mp4"
  // })), autoplay ? null : React.createElement("div", {
  //   className: "videoMask"
  // })) : React.createElement("div", {
  //   className: `${id}Vid video boxSiz`,
  //   dangerouslySetInnerHTML: {
  //     __html: framework
  //   }
  // }));

  return (
    <div id={id} className={id}>
      {videoType === "localUpload" ? (
        <div className="videoBox">
          <video
            className={`${id}Vid video boxSiz`}
            poster={
              Util.imagePath({
                uri: imgUri,
                dataRetain,
                quality
              }) || null
            }
            data-play={autoplay ? "true" : null}
            autoPlay={defPlay ? "autoplay" : null}
            controls="controls"
            loop={rePlay ? "loop" : null}
          >
            <source src={videoUri || null} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div
          className={`${id}Vid video boxSiz`}
          dangerouslySetInnerHTML={{ __html: framework }}
        />
      )}
    </div>
  )
}

export { s74 }