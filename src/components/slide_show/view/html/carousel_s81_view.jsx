// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util.jsx';
import Component from '../components/component'

function getMaskHtml(component, className, useSwitchArrow, lefticon, righticon, newIcon) {
  return React.createElement("div", {
    className: `bx-controls bx-has-controls-direction bx-has-pager ${className || ""}`
  }, useSwitchArrow && !newIcon ? React.createElement("div", {
    className: "bx-controls-direction"
  }, React.createElement("a", {
    className: "bx-prev"
  }, "Prev"), React.createElement("a", {
    className: "bx-next"
  }, "Next")) : useSwitchArrow && newIcon ? React.createElement("div", {
    className: "advanced-arrow"
  }, React.createElement("div", {
    className: "left-arrow left-icon"
  }, React.createElement("i", {
    className: "yiyingbaoicon icon"
  }, (lefticon === null || lefticon === void 0 ? void 0 : lefticon.iconName) || '')), React.createElement("div", {
    className: "right-arrow right-icon"
  }, React.createElement("i", {
    className: "yiyingbaoicon icon"
  }, (righticon === null || righticon === void 0 ? void 0 : righticon.iconName) || ''))) : null, React.createElement("div", {
    className: "bx-pager bx-default-pager"
  }, React.createElement("div", {
    className: "bx-pager-item"
  }, React.createElement("a", {
    className: "bx-pager-link active"
  }, 1)), React.createElement("div", {
    className: "bx-pager-item"
  }, React.createElement("a", {
    className: "bx-pager-link active"
  }, 2)), React.createElement("div", {
    className: "bx-pager-item"
  }, React.createElement("a", {
    className: "bx-pager-link active"
  }, 3))));
}
/**
     * @method children 循环获取列表子控件结构
     * @date 2019-01-02
     * @author sxt
     * @param {object} props 参数列表
     * @param {object} props.components 子控件结构数据集合
     * @param {string} props.id 控件id
     * @param {Boolean} props.isSource 是否是数据源
     * @param {String} props.companyField 数据源具体类型
     * @return {object} 列表子控件结构 
     */


function children(props) {
  const {
    components,
    id,
    isSource,
    companyField,
    slidedata
  } = props; //不是数据源时

  if (!isSource) {
    return components.map((e, i) => {
      //不是预览页面时
      if (!Util.source) {
        return React.createElement(Util.component, {
          key: `${e.id}`,
          component: e
        });
      } else {
        return React.createElement("li", {
          key: `${e.id}`
        }, React.createElement(Util.component, {
          component: e
        }));
      }
    });
  } else {
    return React.createElement("yq-volist", {
      name: `${slidedata}`,
      id: "slide"
    }, React.createElement("li", null, React.createElement(Util.component, {
      component: components[0],
      context: {
        type: "slider",
        imgArr: 'slide'
      }
    })));
  }
}

export function s81() {
  //isAutoplay 自动播放 pause//播放间隔  speed//动画时长  useSwitchArrow切换箭头显示的属性
  let {
    state: {
      component: {
        id,
        components
      },
      data: {
        document_data: {
          isAutoplay,
          pause,
          touchSlide,
          fullScreen,
          speed,
          selectionContent,
          dataSource = {},
          slidedata,
          useSwitchArrow = true,
          lefticon,
          righticon,
          newIcon
        },
        theme_data: {}
      }
    }
  } = this;
  let _isSource = false; //轮播开启了数据源，并且数据源的companyField的属性存在时

  let companyField = dataSource.companyField;

  if (selectionContent == "databaseData" && companyField) {
    _isSource = true;
  }

  return React.createElement(Component.box, {
    id: id
  }, React.createElement("div", {
    className: `${id}cS caroSt`
  }, !Util.source ? React.createElement("div", {
    className: "bxEditSlide"
  }, React.createElement("ul", {
    className: "carouselBox bxslider",
    "data-pause": pause,
    "data-touchslide": touchSlide,
    "data-play": isAutoplay,
    "data-speed": speed
  }, children({
    components: components,
    id: id
  }))) : React.createElement("ul", {
    "data-full": fullScreen,
    className: "carouselBox bxslider slideBxSlider",
    "data-pause": pause,
    "data-touchslide": touchSlide,
    "data-controls": useSwitchArrow,
    "data-play": isAutoplay,
    "data-preicon": lefticon === null || lefticon === void 0 ? void 0 : lefticon.iconName,
    "data-nexticon": righticon === null || righticon === void 0 ? void 0 : righticon.iconName,
    "data-speed": speed
  }, children({
    components: components,
    id: id,
    isSource: _isSource,
    companyField: companyField,
    slidedata: slidedata
  })), !Util.source ? getMaskHtml(components, "", useSwitchArrow, lefticon, righticon, newIcon) : null));
}
