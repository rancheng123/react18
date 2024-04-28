
// 导入 React 库
import React from 'react';
// 导入其他模块，注意这里的路径需要根据你的项目结构进行相应的调整
import Resource from '../resource';
import Widget from '@/system/widgets/widget';

/**
 * @class {Resource} 图片资源库面板视图类
 */
export default class TemplateResource extends Resource {
  /**@property controler 图片资源控件制器实例 */
  constructor(controler) {
    super(controler);
    this.title = "模版资源";
    this.area = ["1000px", "auto"]; //this.controler=controler;
  }
  /**
   * @method render 图片资源组件方法
   * @return {object} 图片资源结构
   */
  //pageData.base+"/Edit/Images/userUpload/sid/"+pageData.siteId
  render(prop) {
    let _state = this.state || {};

    var picType = _state.type,
      _imgCate = '',
      _picIdx = '';

    if (picType == "wholeClassify") {
      //条件满足时将赋值 lw 2021-3-8
      _imgCate = "industry";
      _picIdx = _state.industry;
    } else {
      _imgCate = "language";
      _picIdx = _state.language;
    }

    // let _html = React.createElement("div", null, React.createElement("div", {
    //   className: "sysNav"
    // }, React.createElement("ul", {
    //   className: "sysCon"
    // }, this.imgNavList()), this.inputSearch()), React.createElement("div", {
    //   className: "sysPic wholeClassify"
    // }, React.createElement("div", {
    //   className: "picMina"
    // }, picType == "wholeClassify" || picType == "languageClassify" ? React.createElement("div", {
    //   className: "picCon"
    // }, React.createElement("ul", {
    //   className: "picNav pNav1"
    // }, React.createElement("li", null, window.public.lang['type'] + " :"), this.imageType(picType, _imgCate, _picIdx))) : "", React.createElement("div", {
    //   id: "imgSelect",
    //   className: "picImg imgEdit"
    // }, React.createElement("ul", {
    //   className: "demopicImg"
    // }, this.imgSelectList())))));

    let _html = (
      <div>
        <div className="sysNav">
          <ul className="sysCon">
            {this.imgNavList()}
            {this.inputSearch()}
          </ul>
        </div>
        <div className="sysPic wholeClassify">
          <div className="picMina">
            {(picType === "wholeClassify" || picType === "languageClassify") && (
              <div className="picCon">
                <ul className="picNav pNav1">
                  <li>{window.public.lang['type']} :</li>
                  {this.imageType(picType, _imgCate, _picIdx)}
                </ul>
              </div>
            )}
            <div id="imgSelect" className="picImg imgEdit">
              <ul className="demopicImg">
                {this.imgSelectList()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )

    return super.render(_html);
  }
  /**
   * @method imgSelectList 图片列表结构
   * @return {Object}  图片列表结构
   */
  imgSelectList() {
    let _state = this.state || {},
      _type = _state.type || "wholeClassify",
      _selectList = _state.templateList || [];

    if (_selectList.length >= 1) {
      // return _selectList.map((e, i) => {
      //   return React.createElement("li", {
      //     onClick: this.controler.selectImg.bind(this.controler, e),
      //     "data-url": e.url,
      //     "data-id": e.id,
      //     key: e.id
      //   }, e.recommend ? React.createElement("span", {
      //     className: "picTempNew"
      //   }, React.createElement("img", {
      //     src: "http://j.bjyyb.net/images/new.png"
      //   })) : null, React.createElement("img", {
      //     style: {
      //       width: "100%",
      //       height: "100%"
      //     },
      //     src: e.picname
      //   }), e.log == 1 ? React.createElement("div", {
      //     className: "Imgtemp"
      //   }, React.createElement("i", null, React.createElement("img", {
      //     src: "http://j.bjyyb.net/images/check1.png"
      //   })), React.createElement("div", {
      //     className: "btn btned"
      //   }, window.public.lang["used"])) : null, e.log >= 2 ? React.createElement("div", {
      //     className: "Imgtemp"
      //   }, React.createElement("i", null, React.createElement("img", {
      //     src: "http://j.bjyyb.net/images/checked.png"
      //   })), React.createElement("div", {
      //     className: "btn btned"
      //   }, window.public.lang["inUse"])) : null, React.createElement("div", {
      //     className: "opc"
      //   }, React.createElement("div", {
      //     className: "picTempBox"
      //   }, React.createElement("a", {
      //     className: "picTempButton"
      //   }, window.public.lang["selectThisTemplate"]), e.previewurl ? React.createElement("p", {
      //     onClick: this.controler.previewBtn.bind(this.controler, e.previewurl),
      //     className: "picTempPreview"
      //   }, window.public.lang["preview"]) : null), React.createElement("p", {
      //     className: "w"
      //   }, window.public.lang["numbering"], "\uFF1A", e.templatename), React.createElement("p", null, window.public.lang["designer"], "\uFF1A", e.designer), React.createElement("p", {
      //     className: "w"
      //   }, window.public.lang["applicableIndustry"], "\uFF1A", e.name), React.createElement("p", null, window.public.lang["usage"], "\uFF1A", e.attention)));
      // });
      return (
        _selectList.map((e, i) => {
          return (
            <li
              onClick={this.controler.selectImg.bind(this.controler, e)}
              data-url={e.url}
              data-id={e.id}
              key={e.id}
            >
              {e.recommend && (
                <span className="picTempNew">
                  <img src="http://j.bjyyb.net/images/new.png" />
                </span>
              )}
              <img
                style={{ width: "100%", height: "100%" }}
                src={e.picname}
              />
              {e.log === 1 && (
                <div className="Imgtemp">
                  <i>
                    <img src="http://j.bjyyb.net/images/check1.png" />
                  </i>
                  <div className="btn btned">
                    {window.public.lang["used"]}
                  </div>
                </div>
              )}
              {e.log >= 2 && (
                <div className="Imgtemp">
                  <i>
                    <img src="http://j.bjyyb.net/images/checked.png" />
                  </i>
                  <div className="btn btned">
                    {window.public.lang["inUse"]}
                  </div>
                </div>
              )}
              <div className="opc">
                <div className="picTempBox">
                  <a className="picTempButton">
                    {window.public.lang["selectThisTemplate"]}
                  </a>
                  {e.previewurl && (
                    <p onClick={this.controler.previewBtn.bind(this.controler, e.previewurl)} className="picTempPreview">
                      {window.public.lang["preview"]}
                    </p>
                  )}
                </div>
                <p className="w">
                  {window.public.lang["numbering"]}：{e.templatename}
                </p>
                <p>
                  {window.public.lang["designer"]}：{e.designer}
                </p>
                <p className="w">
                  {window.public.lang["applicableIndustry"]}：{e.name}
                </p>
                <p>
                  {window.public.lang["usage"]}：{e.attention}
                </p>
              </div>
            </li>
          );
        })      
      )

    } else {
      // return React.createElement("li", null, React.createElement("a", null, window.public.lang["noContent"]));
      return (
        <li>
          <a>{window.public.lang["noContent"]}</a>
        </li>
      )
    }
  }
  /**
   * @method imgNavList 分类项切换结构
   * @return {Object}  分类项切换结构
   */
  imgNavList() {
    let _state = this.state || {},
      _type = _state.type || "wholeClassify";

    return this.controler.tabs.map((e, i) => {
      // return React.createElement("li", {
      //   onClick: this.controler.setTab.bind(this.controler, "type", e),
      //   className: _type == e ? "on" : "",
      //   key: e
      // }, React.createElement("div", {
      //   id: e
      // }, window.public.lang[e]));
      return (
        <li onClick={this.controler.setTab.bind(this.controler, "type", e)} className={_type === e ? "on" : ""} key={e}>
          <div id={e}>{window.public.lang[e]}</div>
        </li>
      )
    });
  }
  /**
  * @method inputSearch 模板搜索结构
  * @return {Object}  
  * */
  inputSearch() {
    // return React.createElement("div", {
    //   className: "search-box"
    // }, React.createElement("input", {
    //   className: "pcInputTextStyle input-search",
    //   id: "search",
    //   type: "text",
    //   placeholder: window.public.lang["templateSearch"],
    //   value: this.state.key,
    //   onChange: this.controler.inputChange.bind(this.controler, "key")
    // }), React.createElement("i", {
    //   class: "c7p080BIc layer-close yiyingbaoicon icon-search",
    //   onClick: this.controler.search.bind(this.controler)
    // }, "\uE696"));
    return (
      <div className="search-box">
        <input
          className="pcInputTextStyle input-search"
          id="search"
          type="text"
          placeholder={window.public.lang["templateSearch"]}
          value={this.state.key}
          onChange={this.controler.inputChange.bind(this.controler, "key")}
        />
        <i className="c7p080BIc layer-close yiyingbaoicon icon-search" onClick={this.controler.search.bind(this.controler)}>\uE696</i>
      </div>
    )
  }

  /**
  * @method imageType 获取图片类型分类选项
  * @return {Object}  图片类型分类选项结构
  * */
  imageType(type, cate, idx) {
    var _typelist = "",
      _idx = idx || 0;

    if (type == "wholeClassify") {
      //模板分类为全部分类时 从pagedata全局变量中取值 lw 2021-3-8
      _typelist = pageData.Temp.industry;
    }

    if (type == "languageClassify") {
      //模板分类为语言分类时赋值 lw
      _typelist = pageData.Temp.languagers;
    }

    var _all = {
      id: "0",
      name: window.public.lang["whole"]
    };

    if (_typelist[0].id != "0") {
      //给数组第一项添加全部类型选项 lw
      _typelist.unshift(_all);
    }

    let _str = _typelist.map((e, i) => {
      // return React.createElement("li", {
      //   className: _idx == e.id ? "on" : "",
      //   key: i,
      //   onClick: this.controler.change.bind(this.controler, cate, e.id)
      // }, React.createElement("a", {
      //   href: "#!",
      //   id: e.id
      // }, e.name));
      return (
        <li
          className={_idx === e.id ? "on" : ""}
          key={i}
          onClick={this.controler.change.bind(this.controler, cate, e.id)}
        >
          <a href="#!" id={e.id}>
            {e.name}
          </a>
        </li>
      )
    });

    return _str;
  }

  /**
   * @method imageSpec 获取图片规格分类选项
   * @param {Object} n 属性组件的this
   * @param {String} type 当前分类选项类型
   * @param {Number} cate 当前选项id
   * @return {Object}  图片类型分类选项结构
   * */
  imageSpec() {
    let _state = this.state || {},
      _type = _state.type || "wholeClassify";

    if (_type == "wholeClassify") {
      // let _type=pageData.ImagesGallery.spec,
      //     _spec=_state.spec||0,
      //     _all={id:"0",name:window.public.lang["whole"]};
      // if(_type[0].id!="0"){
      //     _type.unshift(_all);
      // }
      let _spec = _state.spec || 0;

      let spec = [{
        id: "0",
        name: "全部"
      }, {
        id: "12",
        name: "其他"
      }, {
        id: "13",
        name: "2:1"
      }, {
        id: 14,
        name: "3:2"
      }];

      let _str = spec.map((e, i) => {
        let _id = e.id;
        // return React.createElement("li", {
        //   className: _spec == e.id ? "on" : "",
        //   key: `${e.id}spec`,
        //   onClick: this.controler.change.bind(this.controler, "spec", e.id)
        // }, React.createElement("a", {
        //   href: "javascript:;",
        //   id: e.id
        // }, e.name));
        return (
          <li
          className={_spec === e.id ? "on" : ""}
          key={`${e.id}spec`}
          onClick={this.controler.change.bind(this.controler, "spec", e.id)}
        >
          <a href="javascript:;" id={e.id}>
            {e.name}
          </a>
        </li>
        )
      });

      return _str;
    }
  }

}
