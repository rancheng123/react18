// 导入 React 库
import React from 'react';
// 导入自定义的 util 模块
import Util from '@/components/page/util/util.jsx';
import Component from '../components/component'

export function s333() {
  const {
    component: {
      id,
      components
    },
    data: {
      document_data = {}
    },
    index = 0
  } = this.state;
  const {
    transition,
    speed,
    lefticon,
    righticon,
    newIcon,
    pause,
    isAutoplay,
    arrowUri1 = '',
    arrowUri2 = '',
    useSwitchArrow,
    useSwitchButton,
    heightType = 'fixed'
  } = document_data !== null && document_data !== void 0 ? document_data : {}; //����Ϊ�������Ը߶�ȫ������ԭ����class��������ȡ���� ��heightType == fixed��ʱ��Ϊ�̶��߶��ҷ���advanced-fixed���class��heightType ��ֵΪcustom��ʱ�򷵻����advanced-custom class�������������ƥ���ʱ���򷵻�advanced-fullScreen��2020/12/14    lw

  const classdatas = heightType == 'fixed' ? 'advanced-fixed' : heightType == 'custom' ? 'advanced-custom' : 'advanced-fullScreen';
  return React.createElement("div", {
    id: id,
    className: "advanced-slider"
  }, React.createElement("script", {
    type: "text/json",
    dangerouslySetInnerHTML: {
      __html: `{"transition":"${transition}","duration":${speed},"interval":${pause},"autoPlay":${isAutoplay}}`
    }
  }), React.createElement("ul", {
    className: 'advanced-content ' + classdatas
  }, components.map((e, i) => React.createElement("li", {
    className: `advanced-item${i != index ? '' : ' advanced-active'}`,
    "data-slide-index": i,
    key: e.id
  }, React.createElement(Util.component, {
    component: e
  })))), React.createElement(Component.arrow, {
    useSwitchArrow: useSwitchArrow,
    arrowUri1: arrowUri1,
    arrowUri2: arrowUri2,
    lefticon: lefticon,
    righticon: righticon,
    newIcon: newIcon
  }), React.createElement(Component.buttons, {
    useSwitchButton: useSwitchButton,
    components: components,
    index: index
  }));
}
