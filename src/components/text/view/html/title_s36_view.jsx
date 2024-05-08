import React from 'react';
import Util from "@/components/page/util/util.jsx";
import Component from "../components/component";


function s36() {
  var _this$props$context;

  let {
    state: {
      component: {
        id
      },
      data: {
        document_data = {}
      }
    }
  } = this;
  let {
    link,
    text = "",
    hidden,
    dataSource,
    overflowPart = "automatic",
    fontLabel
  } = document_data;
  const context = (_this$props$context = this.props.context) !== null && _this$props$context !== void 0 ? _this$props$context : {};

  let _daSource = dataSource && dataSource.companyField; //数据源存在时，给控件data-source的自定义属性，用于查找数据源 sxt 2020-12-16


  if (!Util.source) {
    if (dataSource && (dataSource.sign || dataSource.companyField == "publish_time" || dataSource.companyField == "add_time" || dataSource.companyField == "edit_time" || dataSource.companyField == "online_time" || dataSource.companyField == "offline_time")) {
      text = Util.timeTypeCont(id, document_data, 'text', context);
    } else {
      text = Util.getComponentText(id, document_data, 'text', context);
    }
  } else {
    text = Util.getComponentText(id, document_data, 'text', context);
  }

  let _text = text || "",
      textLineP = "textLineP"; //在编辑页面时,text无内容时,给个占位的文字


  if (!Util.source) {
    _text = text || "未定义";
  } //设置了h标签,并且不为not时,拼接h标签


  if (fontLabel && fontLabel != "not") {
    textLineP = "";

    let str = _text.replace(/<(h\d)/g, '<span').replace(/<\/(h\d)>/g, '</span>'); //获取并且替换标签为span 


    _text = `<${fontLabel} class="textLineP">${str}</${fontLabel}>`;
  }

  let detailIClassenlarge = Component.getDetailClass(_daSource);
  let hiddenClass = ""; //hidden存在,证明控件要隐藏

  if (hidden) {
    //预览时不返回结构,编辑页用class控件隐藏
    if (Util.source) {
      return null;
    } else {
      hiddenClass = "hidden";
    }
  }

  // return React.createElement(Util.linkDecorator, {
  //   link: Util.setLinkUrl(context.link, link),
  //   type: "html",
  //   id: id,
  //   className: `listTxt ${id}A ${overflowPart} ${hiddenClass} ${detailIClassenlarge}`
  // }, React.createElement("div", {
  //   className: textLineP ? textLineP : null,
  //   "data-source": _daSource,
  //   "data-companyLabelText": dataSource ? dataSource.companyLabelText : null,
  //   dangerouslySetInnerHTML: {
  //     __html: _text
  //   }
  // }));

  return (
    <Util.linkDecorator
      link={Util.setLinkUrl(context.link, link)}
      type="html"
      id={id}
      className={`listTxt ${id}A ${overflowPart} ${hiddenClass} ${detailIClassenlarge}`}
    >
      <div
        className={textLineP ? textLineP : null}
        data-source={_daSource}
        data-companylabeltext={dataSource ? dataSource.companyLabelText : null}
        dangerouslySetInnerHTML={{ __html: _text }}
      />
    </Util.linkDecorator>
  )
}
export default s36