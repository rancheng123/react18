__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/umd/react.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./components/page/util/util.js");


/**
 * @instance {Component} 控件公用HTML视图实例
 * @author wyq
 * @version 1.0
 * @date 2019-10-18
 */

const Component = {
  /**
   * @method box 控件外层包裹结构
   * @date 2019-11-4
   * @author wyq
   * @param {object} props 参数对象
   * @param {string} porps.id 控件id
   * @param {object} props.children 控件子节点集合
   * @return {object} 控件外层包裹结构
   */
  box(props) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: props.id,
      className: `${props.id} ImghidCont`
    }, props.children);
  },

  /**
   * @method enlargeImage 放大图片结构
   * @date 2020-08-29
   * @author wyq
   * @param {object} param0 参数对象
   * @param {object} param0.state 状态对象
   * @param {object} param0.props 属性对象
   */
  enlargeImage({
                 state,
                 props
               }) {
    const {
      component: {
        id
      },
      data: {
        document_data = {}
      }
    } = state;
    let context = props.context || {};
    let {
      imgArr = context.imgArr,
      uri,
      webp = uri,
      title = '',
      alt,
      dataRetain,
      quality,
      hoverAnimationClass = '',
      dataSource = {}
    } = document_data;
    let arr = Component.tags(id, imgArr, {
      uri,
      webp,
      alt,
      title
    }); //传递数据存在，并且selectionContent为自定义时，此时是列表自定义的图片数据 sxt 2020-11-11

    if (context && context.selectionContent == "custom") {
      dataRetain = context.dataRetain;
      quality = context.quality;
      arr.uri = context[dataSource.companyField || "thumb_img"];
      arr.title = context.title || "";
    }

    const src = Component.getImgZoomSrc(util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
      uri: arr.uri,
      dataRetain,
      quality
    }));
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "clearfix baguetteBox"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: src,
      "data-enlarge-webp": util__WEBPACK_IMPORTED_MODULE_1__["Util"].webp(src),
      "data-caption": arr.title,
      className: `imgHoverAn ${hoverAnimationClass} Imgbox`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component.image, {
      className: `${id}Img img`,
      state: state,
      context: props.context
    })));
  },

  /**
   * @method image 图片结构处理
   * @date 2020-2-28
   * @author sxt
   * @param {object} props 参数对象
   * @param {string} props.className 图片class
   * @param {object} props.state 控件数据
   * @param {object} props.context 数据源数据(只有列表内的图片才有此数据)
   * @return {object} 结构
   */
  image(props) {
    var _document_data$, _ref, _document_data$2;

    let context = props.context || {};
    let {
      component: {
        id,
        layout = {}
      },
      data: {
        document_data = {}
      }
    } = props.state || {};
    let {
      width = null,
      height = null
    } = layout;
    let {
      imgArr = context.imgArr,
      uri,
      webp = uri,
      alt,
      title,
      videoShow,
      dataSource = {},
      isWebp,
      hoverAnimationClass
    } = document_data;
    let isSwitch = hoverAnimationClass === 'switchInmage' || false; // 是否可切换

    if (isWebp === false) {
      isWebp = false;
    } else {
      isWebp = true;
    } //PC读PC值，移动读移动值，没有默认走PC值


    let quality = (_document_data$ = document_data[`${util__WEBPACK_IMPORTED_MODULE_1__["Util"].type}quality`]) !== null && _document_data$ !== void 0 ? _document_data$ : document_data.quality,
        dataRetain = (_ref = (_document_data$2 = document_data[`${util__WEBPACK_IMPORTED_MODULE_1__["Util"].type}dataRetain`]) !== null && _document_data$2 !== void 0 ? _document_data$2 : document_data.dataRetain) !== null && _ref !== void 0 ? _ref : '';
    let arr = Component.tags(id, imgArr, {
          uri,
          webp,
          alt,
          title,
          width,
          height,
          videoUrl: ""
        }),
        thumb = null;
    let dataSpesc = null;
    let companyField = dataSource.companyField;

    if (util__WEBPACK_IMPORTED_MODULE_1__["Util"].source && companyField == "thumb_img" && dataSource.selectContent == "autoBinding" && dataSource.type != "list") {
      //数据源开启并且类型为缩略图，且是绑定的数据源 ，类型不为列表 赋值属性用于绑定规格参数替换图片属性 sxt 2020-9-17
      dataSpesc = "thumb_img";
    }

    if (util__WEBPACK_IMPORTED_MODULE_1__["Util"].source) {
      thumb = util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
        uri: arr.uri,
        dataRetain,
        quality: 100
      }); //当图片中存在宽和高时，走占位路径 sxt  2020-5-27

      if (arr.width && arr.height) {
        thumb = `https:\/\/img.bjyyb.net/grey.png?x-oss-process=image/resize,m_fixed,w_${arr.width},h_${arr.height},limit_0`;
      }
    } else if (dataSource.type == "list" && context) {
      arr.uri = context[companyField];

      if (companyField == "thumb_img" && context.thumbImg) {
        arr.videoUrl = context.thumbImg["videoUrl"];
      }

      if (companyField == "banner" && context.bannerImg) {
        arr.videoUrl = context.bannerImg["videoUrl"];
      }
    } //传递数据存在，并且selectionContent为自定义时，此时是列表自定义的图片数据 sxt 2020-11-11


    if (context && context.selectionContent == "custom") {
      dataRetain = context.dataRetain;
      quality = context.quality;
      arr.uri = context[dataSource.companyField || "thumb_img"];
      arr.webp = context[dataSource.companyField || "thumb_img"];
      arr.title = context.title || "";
      arr.alt = context.description || "";
      arr.videoUrl = ""; //在预览时，拼接占位的图片路径

      if (util__WEBPACK_IMPORTED_MODULE_1__["Util"].source) {
        thumb = util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
          uri: arr.uri,
          dataRetain,
          quality: 100
        }); //当图片中存在宽和高时，走占位路径 sxt  2020-5-27

        if (context.img_width && context.img_height) {
          thumb = `https:\/\/img.bjyyb.net/grey.png?x-oss-process=image/resize,m_fixed,w_${context.img_width},h_${context.img_height},limit_0`;
        }
      }
    }

    arr.uri = util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
      uri: arr.uri,
      dataRetain,
      quality
    });
    arr.webp = util__WEBPACK_IMPORTED_MODULE_1__["Util"].webp(util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
      uri: arr.webp,
      dataRetain,
      quality
    })); //{arr.videoUrl?<span className={`videoMantle ${Util.source?"hidden":""}`} data-videosrc={arr.videoUrl||null}></span>:null}

    if (dataSource.type == "list" && isSwitch && util__WEBPACK_IMPORTED_MODULE_1__["Util"].source) {
      let coverSource = "img_path_arr";

      if (companyField == "banner") {
        coverSource = "img_path_arr_banner";
      }

      let uriSwitch = util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
            uri: `{$vo.${coverSource}.1}`,
            dataRetain,
            quality
          }),
          webpSwitch = util__WEBPACK_IMPORTED_MODULE_1__["Util"].webp(util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
            uri: `{$vo.${coverSource}.1}`,
            dataRetain,
            quality
          }));
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: `${props.className} lazyload <notempty name="vo.${coverSource}.1">firstImage</notempty>`,
        "data-specsimg": dataSpesc,
        "data-slidew": arr.width,
        "data-slideh": arr.height,
        width: arr.width || null,
        height: arr.height || null,
        alt: arr.alt,
        title: arr.title,
        "data-src": arr.uri,
        src: thumb || arr.uri,
        "data-webp": isWebp ? arr.webp : ""
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("notempty", {
        name: `vo.${coverSource}.1`
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: props.className + ' lazyload activeImage',
        "data-specsimg": dataSpesc,
        "data-source": coverSource || null,
        "data-slidew": arr.width || null,
        "data-slideh": arr.height || null,
        alt: arr.alt,
        title: arr.title,
        "data-src": uriSwitch,
        src: thumb || uriSwitch,
        "data-webp": isWebp ? webpSwitch : "",
        width: arr.width || null,
        height: arr.height || null
      })));
    } else {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: props.className + ' lazyload',
        "data-specsimg": dataSpesc,
        "data-slidew": arr.width,
        "data-slideh": arr.height,
        width: arr.width || null,
        height: arr.height || null,
        alt: arr.alt,
        title: arr.title,
        "data-src": arr.uri || "https://img.bjyyb.net/notImage.jpg",
        src: thumb || arr.uri || "https://img.bjyyb.net/notImage.jpg",
        "data-webp": isWebp ? arr.webp : ""
      }), arr.videoUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: `videoMantle ${util__WEBPACK_IMPORTED_MODULE_1__["Util"].source ? "hidden" : ""}`,
        "data-videosrc": arr.videoUrl || null,
        "data-videoshow": videoShow || null
      }) : null);
    }
  },

  /**
   * @method ampImage amp图片结构
   * @date 2020-03-14
   * @author wyq
   * @param {Object} props 参数对象
   * @param {string} props.className 图片class
   * @param {object} props.state 控件数据
   * @param {object} props.context 数据源数据(只有列表内的图片才有此数据)
   * @return {object} amp图片结构
   */
  ampImage(props) {
    var _document_data$moqual, _ref2, _document_data$modata;

    let context = props.context || {};
    let {
      component: {
        layout = {},
        id
      },
      data: {
        document_data = {}
      }
    } = props.state || {};
    let {
          width = 100,
          height = 100,
          currentHeight = 50
        } = layout,
        tap = null,
        role = null,
        imgNoBig = "true";
    let {
      imgArr = context.imgArr,
      uri,
      webp = uri,
      alt,
      title,
      effect,
      dataSource = {},
      isWebp
    } = document_data;

    if (isWebp === false) {
      isWebp = false;
    } else {
      isWebp = true;
    } //PC读PC值，移动读移动值，没有默认走PC值


    let quality = (_document_data$moqual = document_data.moquality) !== null && _document_data$moqual !== void 0 ? _document_data$moqual : document_data.quality,
        dataRetain = (_ref2 = (_document_data$modata = document_data.modataRetain) !== null && _document_data$modata !== void 0 ? _document_data$modata : document_data.dataRetain) !== null && _ref2 !== void 0 ? _ref2 : '';
    let arr = Component.tags(id, imgArr, {
      uri,
      webp,
      alt,
      title,
      width,
      height
    }); //let context={type:"slider",uri:"{$slide.uri}",alt:"{$slide.alt}",title:"{$slide.title}",width:"{$slide.width}",height:"{$slide.height}"};
    //传递数据存在，并且selectionContent为自定义时，此时是列表自定义的图片数据 sxt 2020-11-11

    if (context && context.selectionContent == "custom") {
      dataRetain = context.dataRetain;
      quality = context.quality;
      arr.uri = context[dataSource.companyField || "thumb_img"];
      arr.webp = context[dataSource.companyField || "thumb_img"];
      arr.title = context.title || "";
      arr.alt = context.description || "";
      arr.width = context.img_width;
      arr.height = context.img_height;
      effect = context.openListLink; //图片放大类型
    } //传过来的打开方式为图片放大时，走传过来的类型（只有列表开启放大会传过来）sxt 2021-7-1


    if (context && context.openListLink == "imgBig") {
      effect = "imgBig";
    }

    arr.uri = util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
      uri: arr.uri,
      dataRetain,
      quality
    });
    arr.webp = util__WEBPACK_IMPORTED_MODULE_1__["Util"].webp(util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
      uri: arr.webp,
      dataRetain,
      quality
    }));

    if (effect == "imgBig") {
      tap = 'on=tap:lightbox1', role = "button";
      imgNoBig = null;
    }

    let layoutType = "responsive"; //控件类型为浮动时，要单独计算宽高 sxt

    if (context.layoutType == "fixed") {
      let headerImgH = currentHeight,
          headerImgW = headerImgH * width / height;
      arr.height = headerImgH;
      arr.width = headerImgW;
      layoutType = "fixed";
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("amp-img", {
      alt: arr.alt,
      "custom-bind": tap,
      role: role,
      tabIndex: "0",
      "data-amp-auto-lightbox-disable": imgNoBig,
      layout: layoutType,
      width: arr.width || 100,
      height: arr.height || 100,
      src: arr.uri || "https://img.bjyyb.net/notImage.jpg",
      "aria-describedby": "imageDescription"
    }, arr.webp && isWebp ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("amp-img", {
      src: arr.webp || "https://img.bjyyb.net/notImage.jpg",
      "custom-bind": tap,
      alt: arr.title,
      role: role,
      tabIndex: "0",
      layout: layoutType,
      "aria-describedby": "imageDescription",
      "custom-fallback": "fallback",
      width: arr.width || 100,
      height: arr.height || 100
    }) : null));
  },

  /**
   * @method ampImage amp图片结构
   * @date 2020-03-14
   * @author wyq
   * @param {Object} props 参数对象
   * @param {string} props.className 图片class
   * @param {object} props.state 控件数据
   * @param {object} props.context 数据源数据(只有列表内的图片才有此数据)
   * @return {object} amp图片结构
   */
  mipImage(props) {
    var _document_data$moqual2, _ref3, _document_data$modata2;

    let context = props.context || {};
    let {
      component: {
        layout = {},
        id
      },
      data: {
        document_data = {}
      }
    } = props.state || {};
    let {
      width = 100,
      height = 100,
      currentHeight = 50
    } = layout;
    let {
      imgArr = context.imgArr,
      uri,
      webp = uri,
      alt,
      title,
      effect,
      dataSource = {},
      isWebp
    } = document_data;

    if (isWebp === false) {
      isWebp = false;
    } else {
      isWebp = true;
    } //PC读PC值，移动读移动值，没有默认走PC值


    let quality = (_document_data$moqual2 = document_data.moquality) !== null && _document_data$moqual2 !== void 0 ? _document_data$moqual2 : document_data.quality,
        dataRetain = (_ref3 = (_document_data$modata2 = document_data.modataRetain) !== null && _document_data$modata2 !== void 0 ? _document_data$modata2 : document_data.dataRetain) !== null && _ref3 !== void 0 ? _ref3 : '';
    let arr = Component.tags(id, imgArr, {
      uri,
      webp,
      alt,
      title,
      width,
      height
    }); //let context={type:"slider",uri:"{$slide.uri}",alt:"{$slide.alt}",title:"{$slide.title}",width:"{$slide.width}",height:"{$slide.height}"};
    //传递数据存在，并且selectionContent为自定义时，此时是列表自定义的图片数据 sxt 2020-11-11

    if (context && context.selectionContent == "custom") {
      dataRetain = context.dataRetain;
      quality = context.quality;
      arr.uri = context[dataSource.companyField || "thumb_img"];
      arr.webp = context[dataSource.companyField || "thumb_img"];
      arr.title = context.title || "";
      arr.alt = context.description || "";
      arr.width = context.img_width;
      arr.height = context.img_height;
      effect = context.openListLink; //图片放大类型
    } //传过来的打开方式为图片放大时，走传过来的类型（只有列表开启放大会传过来）sxt 2021-7-1


    if (context && context.openListLink == "imgBig") {
      effect = "imgBig";
    }

    arr.uri = util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
      uri: arr.uri,
      dataRetain,
      quality
    });
    arr.webp = util__WEBPACK_IMPORTED_MODULE_1__["Util"].webp(util__WEBPACK_IMPORTED_MODULE_1__["Util"].imagePath({
      uri: arr.webp,
      dataRetain,
      quality
    }));
    let layoutType = "responsive"; //控件类型为浮动时，要单独计算宽高 sxt

    if (context.layoutType == "fixed") {
      let headerImgH = currentHeight,
          headerImgW = headerImgH * width / height;
      arr.height = headerImgH;
      arr.width = headerImgW;
      layoutType = "fixed";
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("mip-img", {
      alt: arr.alt,
      tabIndex: "0",
      layout: layoutType,
      width: arr.width,
      height: arr.height,
      popup: effect == "imgBig" ? "" : null,
      src: arr.uri || "https://img.bjyyb.net/notImage.jpg",
      "aria-describedby": "imageDescription"
    }, arr.webp && isWebp ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("source", {
      srcSet: arr.webp,
      type: "image/webp"
    }) : null);
  },

  /**
   * @method tags 标签处理
   * @author wyq
   * @date 2020-07-02
   * @param {string} id 控件id
   * @param {string} prefix PHP变量
   * @param {object} arrs 数据
   */
  tags(id, prefix, arrs) {
    //是否存在前缀变量
    if (prefix) {
      let obj = {}; //循环数据中的键

      for (let item in arrs) {
        const value = arrs[item] || "";
        const isPhp = typeof value == "number" || value.indexOf(id) == -1; //如果值中已经拼了php标签，则不在拼php标签

        obj[item] = isPhp ? `{\$${prefix}.${item}}` : arrs[item];
      } //返回对象


      return obj;
    } //返回原始对象


    return arrs;
  },

  /**
   * @method getImgZoomSrc 获取原始格式图片路径
   * @date 2020-1-16 14：03
   * @author sxt
   * @return {String} 返回原始格式图片路径
   */
  getImgZoomSrc(src) {
    let _zoomSrc = src;

    if (src && src.indexOf("@!") != -1) {
      _zoomSrc = src.split("@!")[0];
    }

    return _zoomSrc;
  },

  /**
   * @method script json数据
   * @author wyq
   * @date 2020-11-30
   * @param {object} props 参数列表
   */
  script(props) {
    const {
      document_data: {
        clickcode = '',
        doublecode = '',
        submitcode = ''
      }
    } = props;

    if (clickcode || doublecode || submitcode) {
      const data = `{"clickcode":"${clickcode}","doublecode":"${doublecode}","submitcode":"${submitcode}"}`;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
        className: "button-code",
        type: "text/json",
        dangerouslySetInnerHTML: {
          __html: data
        }
      });
    } //返回空


    return null;
  }

};

//# sourceURL=webpack:///./components/image/view/components/component.js?