
// 导入 React 模块
import React from "react";
// 导入 Util 模块
import Util from "@/components/page/util/util.jsx";

/**
 * @instance {Component} 控件公用HTML视图实例
 */

const Component = {
  /**
   * @method box 控件外层包裹结构
   * @param {object} props 参数对象
   * @param {string} porps.id 控件id
   * @param {object} props.children 控件子节点集合
   * @return {object} 控件外层包裹结构
   */
  box(props) {
    // return React.createElement("div", {
    //   id: props.id,
    //   className: `${props.id} ImghidCont`
    // }, props.children);
    return (
      <div
        id={props.id}
        className={`${props.id} ImghidCont`}
      >
        {props.children}
      </div>
    );
  },

  /**
   * @method enlargeImage 放大图片结构
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
    }); //传递数据存在，并且selectionContent为自定义时，此时是列表自定义的图片数据 

    if (context && context.selectionContent == "custom") {
      dataRetain = context.dataRetain;
      quality = context.quality;
      arr.uri = context[dataSource.companyField || "thumb_img"];
      arr.title = context.title || "";
    }

    const src = Component.getImgZoomSrc(Util.imagePath({
      uri: arr.uri,
      dataRetain,
      quality
    }));
    // return React.createElement("div", {
    //   className: "clearfix baguetteBox"
    // }, React.createElement("a", {
    //   href: src,
    //   "data-enlarge-webp": Util.webp(src),
    //   "data-caption": arr.title,
    //   className: `imgHoverAn ${hoverAnimationClass} Imgbox`
    // }, React.createElement(Component.image, {
    //   className: `${id}Img img`,
    //   state: state,
    //   context: props.context
    // })));

    return (
      <div className="clearfix baguetteBox">
        <a
          href={src}
          data-enlarge-webp={Util.webp(src)}
          data-caption={arr.title}
          className={`imgHoverAn ${hoverAnimationClass} Imgbox`}
        >
          <Component.image
            className={`${id}Img img`}
            state={state}
            context={props.context}
          />
        </a>
      </div>
    );
  },

  /**
   * @method image 图片结构处理
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


    let quality = (_document_data$ = document_data[`${Util.type}quality`]) !== null && _document_data$ !== void 0 ? _document_data$ : document_data.quality,
      dataRetain = (_ref = (_document_data$2 = document_data[`${Util.type}dataRetain`]) !== null && _document_data$2 !== void 0 ? _document_data$2 : document_data.dataRetain) !== null && _ref !== void 0 ? _ref : '';
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

    if (Util.source && companyField == "thumb_img" && dataSource.selectContent == "autoBinding" && dataSource.type != "list") {
      //数据源开启并且类型为缩略图，且是绑定的数据源 ，类型不为列表 赋值属性用于绑定规格参数替换图片属性
      dataSpesc = "thumb_img";
    }

    if (Util.source) {
      thumb = Util.imagePath({
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
    } //传递数据存在，并且selectionContent为自定义时，此时是列表自定义的图片数据 


    if (context && context.selectionContent == "custom") {
      dataRetain = context.dataRetain;
      quality = context.quality;
      arr.uri = context[dataSource.companyField || "thumb_img"];
      arr.webp = context[dataSource.companyField || "thumb_img"];
      arr.title = context.title || "";
      arr.alt = context.description || "";
      arr.videoUrl = ""; //在预览时，拼接占位的图片路径

      if (Util.source) {
        thumb = Util.imagePath({
          uri: arr.uri,
          dataRetain,
          quality: 100
        }); //当图片中存在宽和高时，走占位路径 

        if (context.img_width && context.img_height) {
          thumb = `https:\/\/img.bjyyb.net/grey.png?x-oss-process=image/resize,m_fixed,w_${context.img_width},h_${context.img_height},limit_0`;
        }
      }
    }

    arr.uri = Util.imagePath({
      uri: arr.uri,
      dataRetain,
      quality
    });
    arr.webp = Util.webp(Util.imagePath({
      uri: arr.webp,
      dataRetain,
      quality
    })); //{arr.videoUrl?<span className={`videoMantle ${Util.source?"hidden":""}`} data-videosrc={arr.videoUrl||null}></span>:null}

    if (dataSource.type == "list" && isSwitch && Util.source) {
      let coverSource = "img_path_arr";

      if (companyField == "banner") {
        coverSource = "img_path_arr_banner";
      }

      let uriSwitch = Util.imagePath({
        uri: `{$vo.${coverSource}.1}`,
        dataRetain,
        quality
      }),
        webpSwitch = Util.webp(Util.imagePath({
          uri: `{$vo.${coverSource}.1}`,
          dataRetain,
          quality
        }));
      return React.createElement(React.Fragment, null, React.createElement("img", {
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
      }), React.createElement("notempty", {
        name: `vo.${coverSource}.1`
      }, React.createElement("img", {
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
      return React.createElement(React.Fragment, null, React.createElement("img", {
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
      }), arr.videoUrl ? React.createElement("span", {
        className: `videoMantle ${Util.source ? "hidden" : ""}`,
        "data-videosrc": arr.videoUrl || null,
        "data-videoshow": videoShow || null
      }) : null);
    }
  },

  /**
   * @method ampImage amp图片结构
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
    //传递数据存在，并且selectionContent为自定义时，此时是列表自定义的图片数据 

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
    } //传过来的打开方式为图片放大时，走传过来的类型（只有列表开启放大会传过来）


    if (context && context.openListLink == "imgBig") {
      effect = "imgBig";
    }

    arr.uri = Util.imagePath({
      uri: arr.uri,
      dataRetain,
      quality
    });
    arr.webp = Util.webp(Util.imagePath({
      uri: arr.webp,
      dataRetain,
      quality
    }));

    if (effect == "imgBig") {
      tap = 'on=tap:lightbox1', role = "button";
      imgNoBig = null;
    }

    let layoutType = "responsive"; //控件类型为浮动时，要单独计算宽高

    if (context.layoutType == "fixed") {
      let headerImgH = currentHeight,
        headerImgW = headerImgH * width / height;
      arr.height = headerImgH;
      arr.width = headerImgW;
      layoutType = "fixed";
    }

    return React.createElement(React.Fragment, null, React.createElement("amp-img", {
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
    }, arr.webp && isWebp ? React.createElement("amp-img", {
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
    //传递数据存在，并且selectionContent为自定义时，此时是列表自定义的图片数据 

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
    } //传过来的打开方式为图片放大时，走传过来的类型（只有列表开启放大会传过来）


    if (context && context.openListLink == "imgBig") {
      effect = "imgBig";
    }

    arr.uri = Util.imagePath({
      uri: arr.uri,
      dataRetain,
      quality
    });
    arr.webp = Util.webp(Util.imagePath({
      uri: arr.webp,
      dataRetain,
      quality
    }));
    let layoutType = "responsive"; //控件类型为浮动时，要单独计算宽高 

    if (context.layoutType == "fixed") {
      let headerImgH = currentHeight,
        headerImgW = headerImgH * width / height;
      arr.height = headerImgH;
      arr.width = headerImgW;
      layoutType = "fixed";
    }

    return React.createElement("mip-img", {
      alt: arr.alt,
      tabIndex: "0",
      layout: layoutType,
      width: arr.width,
      height: arr.height,
      popup: effect == "imgBig" ? "" : null,
      src: arr.uri || "https://img.bjyyb.net/notImage.jpg",
      "aria-describedby": "imageDescription"
    }, arr.webp && isWebp ? React.createElement("source", {
      srcSet: arr.webp,
      type: "image/webp"
    }) : null);
  },

  /**
   * @method tags 标签处理
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
      return React.createElement("script", {
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

export default Component