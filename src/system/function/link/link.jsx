
import React from "react";

// 导入其他模块
import Widget from "@/system/widgets/widget";
import Layer from "@/system/widgets/layer";

/**
 * @class {Link} 链接面板视图类
 */

class Link {
  constructor(controler) {
    this.controler = controler;
  }
  /**@property {object} state 获取最新的state属性 */


  get state() {
    return this.controler.state;
  }
  /**@property {object} state 获取最新的props属性 */


  get props() {
    return this.controler.props;
  }
  /**
   * @method render 挂载组件方法
   * @return {object} 待渲染的组件对象
   */
  // <div className="linkMain">
  // 			<ul className="linkSelect">
  // 				{this.linkList()}
  // 			</ul>
  // 			<div className="linkCon">
  // 				{this[this.state.tab](this.state.data)}
  // 			</div>
  // 		</div>
  // <LinkControler exclude = {opts.exclude} include = {opts.include}
  //                                 cancel = {opts.cancel ? opts.cancel : null} 
  //                                 ensure = {opts.ensure ? opts.ensure : null}
  //                                 group = {opts.group} initialData = {opts.initialData || {}} />


  render() {
    // return React.createElement(Layer.open, {
    //   titles: [window.public.lang["link"]],
    //   area: ["612px", "auto"],
    //   shade: [0.8, "#000000"],
    //   skin: "em-function-link",
    //   close: true,
    //   draggable: true,
    //   cancel: true,
    //   ensure: this.controler.ensure.bind(this.controler)
    // }, React.createElement("div", {
    //   className: "linkMain"
    // }, React.createElement("ul", {
    //   className: "linkSelect"
    // }, this.linkList()), React.createElement("div", {
    //   className: "linkCon"
    // }, this[this.state.tab](this.state.data, this.state))));
    return (
      <Layer.open
        titles={[window.public.lang["link"]]}
        area={["612px", "auto"]}
        shade={[0.8, "#000000"]}
        skin="em-function-link"
        close={this.controler.close.bind(this.controler)}
        draggable={true}
        cancel={this.controler.close.bind(this.controler)}
        ensure={this.controler.ensure.bind(this.controler)}
      >
        <div className="linkMain">
          <ul className="linkSelect">{this.linkList()}</ul>
          <div className="linkCon">
            {this[this.state.tab](this.state.data, this.state)}
          </div>
        </div>
      </Layer.open>
    )
  }


  /**
   * @method linkList 左侧链接项
   * @return {object} 左侧链接项结构
   */
  linkList() {
    let _state = this.state || {};

    let _str = this.controler.tabs.map((e, i) => {
      // return React.createElement("li", {
      //   onClick: this.controler.selectTab.bind(this.controler, e),
      //   "data-name": e,
      //   key: e,
      //   className: _state.tab == e ? "tabSelect on" : "tabSelect"
      // }, React.createElement("a", {
      //   href: "javascript:;"
      // }, React.createElement("font", null, window.public.lang[e])));

      return (
        <li
          onClick={this.controler.selectTab.bind(this.controler, e)}
          data-name={e}
          key={e}
          className={this.state.tab === e ? 'tabSelect on' : 'tabSelect'}
        >
          <a href="javascript:;">
            <font>{window.public.lang[e]}</font>
          </a>
        </li>
      )
    });

    return _str;
  }
  /**
   * @method noLink 无链接
   * @param {object} prop 属性对象
   * @return {object} 无链接组件结构
   */
  noLink() {
    // return React.createElement("div", {
    //   className: "noLink",
    //   "data-name": "noLink",
    //   id: "noLink"
    // }, React.createElement("img", {
    //   src: "http://j.bjyyb.net/pc/csimg.jpg"
    // }), React.createElement("font", null, window.public.lang["noAddLink"]), React.createElement("span", null, window.public.lang["addLink"]));

    return (
      <div className="noLink" data-name="noLink" id="noLink">
        <img src="http://j.bjyyb.net/pc/csimg.jpg" alt="" />
        <span>{window.public.lang["noAddLink"]}</span>
        <span>{window.public.lang["addLink"]}</span>
      </div>
    )
  }
  /**
   * @method pageAnchor 页面链接
   * @param {object} prop 属性对象
   * @return {object} 页面链接组件结构
   */
  pageAnchor(prop, state) {
    //linkTo //链接到  //navItem 导航项  templatePageQuick 模版页 languages:"新闻",product:"产品","download":"下载","essay":"文章",
    let linkToType = prop.linkToType || "menu",
      anchorType = prop.anchorType || "protogenesis",
      displayContent = prop.displayContent; //在初始赋值了，不用写默认值了 

    let list = state.list || [],
      newList = state.newList || [],
      itemsList = state.itemsList || [],
      newContentList = state.newContentList || [];

    if (newList.length >= 1) {
      list = newList;
    }

    if (newContentList.length >= 1) {
      itemsList = newContentList;
    } //{name:"templatePageQuick",value:"template"}, 内页暂时隐藏掉 


    return React.createElement("div", {
      className: "pageLink"
    }, React.createElement("ul", {
      className: "pcConAttDesign"
    }, React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.Radio, {
      title: "linkTo",
      value: linkToType,
      change: this.controler.setLinkTo.bind(this.controler, "linkToType"),
      id: "linkTo",
      list: [{
        name: "navItem",
        value: "menu"
      }, {
        name: "product",
        value: "product"
      }, {
        name: "content",
        value: "content"
      }]
    })), linkToType != "menu" && linkToType != "template" ? React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.Radio, {
      title: "displayContent",
      value: displayContent,
      change: this.controler.radioHandler.bind(this.controler, "displayContent"),
      id: "displayContent",
      list: [{
        name: "content",
        value: "content"
      }, {
        name: "classify",
        value: "classify"
      }]
    })) : null, React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.ComboBoxData, {
      change: this.controler.changePageList.bind(this.controler),
      isSearch: true,
      notAllowed: displayContent == "content" && linkToType != "menu" && linkToType != "template" ? "list" : false,
      title: "selectContentClassif",
      isShow: state.showList,
      setList: list,
      name: "name",
      className: "dataClassifyList",
      click: this.controler.clickPageList.bind(this.controler),
      select: this.controler.selectPageList.bind(this.controler),
      dataName: prop.pageName,
      dataId: prop.pageId
    })), displayContent == "classify" && (linkToType == "product" || linkToType == "content") ? null : React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.ComboBoxData, {
      change: this.controler.changeContentList.bind(this.controler),
      title: linkToType == "menu" || linkToType == "template" ? "selectAnchor" : "selectContentList",
      isShow: state.showContent,
      setList: itemsList,
      isSearch: true,
      name: "name",
      className: "dataContentList",
      click: this.controler.clickContentList.bind(this.controler),
      select: this.controler.selectContentList.bind(this.controler),
      dataName: prop.itemName,
      dataId: prop.itemId
    })), (linkToType == "menu" || linkToType == "template") && prop.itemId ? React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.Radio, {
      title: "anchorType",
      value: anchorType,
      change: this.controler.radioHandler.bind(this.controler, "anchorType"),
      id: "anchorType",
      list: [{
        name: "cartoon",
        value: "cartoon"
      }, {
        name: "protogenesis",
        value: "protogenesis"
      }]
    })) : null, (linkToType == "menu" || linkToType == "template") && prop.itemId && anchorType == "cartoon" ? React.createElement(Widget.Range, {
      title: "speed",
      value: prop.speed || 0,
      min: 0,
      max: 10,
      step: 0.1,
      change: this.controler.rangeHandler.bind(this.controler, "speed")
    }) : null, React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.Radio, {
      title: "openMode",
      value: prop.target || "_self",
      change: this.controler.radioHandler.bind(this.controler, "target"),
      id: "openMode",
      list: [{
        name: "self",
        value: "_self"
      }, {
        name: "blank",
        value: "_blank"
      }]
    }))));
  }
  /**
     * @method displayContentHtml 展示内容类型
     * @return {object} 展示内容类型结构
     */
  displayContentHtml() {
    let displayContent = this.state.displayContent || "content";
    let displayContentList = this.state.displayContentList || []; //displayContent[{name:"content",value:"content"},{name:"classify",value:"classify"},{name:"parameter",value:"parameter"}]

    // return React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Radio, {
    //   title: "displayContent",
    //   value: displayContent,
    //   change: this.controler.setDisplayContent.bind(this.controler, "displayContent"),
    //   id: "displayContent",
    //   isLang: true,
    //   list: displayContentList
    // }));
    return (
      <li className="pcAttList">
        <Widget.Radio
          title="displayContent"
          value={displayContent}
          change={() => this.controler.setDisplayContent("displayContent")}
          id="displayContent"
          isLang={true}
          list={displayContentList}
        />
      </li>
    )
  }
  /**
   * @method dataInput 公用input链接调取数据源面板
   * @param {object} prop 配置对象
   * @param {object} prop.data 当前数据
   * @param {string} prop.skin 父级class
   * @param {string} prop.title 标题
   * @param {string} prop.key  设置属性名称
   * @param {string} prop.placeholder 提示文本
   * @return {object} 公用input链接调取数据源面板组件结构
   */
  dataInput(prop) {
    let _readonly = "",
      _openClose = false,
      _link = prop.data || {};

    let _type = _link.type,
      _value = prop.data[prop.key]; //设置的属性值

    if (_link.dataSource) {
      let dataSource = _link.dataSource || {};

      if (dataSource.sourceType) {
        _value = dataSource.sourceText + ">" + dataSource.companyName + ">" + dataSource.companyValue;
        _readonly = "readonly", _openClose = true;
      }
    }

    // return React.createElement("div", {
    //   className: prop.skin || "pcAttList"
    // }, React.createElement("h5", {
    //   className: "pcConAttTitle "
    // }, window.public.lang[prop.title]), React.createElement("div", {
    //   className: "pcConAttCon"
    // }, React.createElement("p", {
    //   className: "dataText",
    //   onClick: this.controler.showDataSource.bind(this.controler, prop.data)
    // }, window.public.lang["sourceOfData"], React.createElement("a", {
    //   href: "#",
    //   className: "dataIcon"
    // })), React.createElement(Widget.Input, {
    //   title: "emailLink",
    //   value: _value || "",
    //   placeholder: window.public.lang[prop.placeholder],
    //   basic: true,
    //   change: this.controler.inputHandler.bind(this.controler, prop.key),
    //   readOnly: _readonly
    // }), _openClose ? React.createElement("span", {
    //   className: "formCancelButton",
    //   onClick: this.controler.showTextClose.bind(this.controler, prop.data)
    // }, "\u2573") : null));

    return (
      <div className={prop.skin || "pcAttList"}>
        <h5 className="pcConAttTitle">{window.public.lang[prop.title]}</h5>
        <div className="pcConAttCon">
          <p className="dataText" onClick={() => this.controler.showDataSource(prop.data)}>
            {window.public.lang["sourceOfData"]}
            <a href="#" className="dataIcon"></a>
          </p>
          <Widget.Input
            title="emailLink"
            value={_value || ""}
            placeholder={window.public.lang[prop.placeholder]}
            basic
            change={this.controler.inputHandler.bind(this.controler, prop.key)}
            readOnly={_readonly}
          />
          {_openClose && (
            <span className="formCancelButton" onClick={() => this.controler.showTextClose(prop.data)}>
              ◓
            </span>
          )}
        </div>
      </div>
    )
  }


  /**
   * @method externalLinks 外部链接
   * @param {object} prop 属性对象
   * @return {object} 外部链接组件结构
   */
  externalLinks(prop) {
    // return React.createElement("div", {
    //   className: "webLink"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Input, {
    //   title: "webLink",
    //   value: prop.url,
    //   placeholder: window.public.lang["inputWebLink"],
    //   change: this.controler.inputHandler.bind(this.controler, "url"),
    //   blur: this.controler.webLinkBlur.bind(this.controler, "url")
    // })), React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Radio, {
    //   title: "openMode",
    //   value: prop.target || "_self",
    //   change: this.controler.radioHandler.bind(this.controler, "target"),
    //   id: "openMode",
    //   list: [{
    //     name: "self",
    //     value: "_self"
    //   }, {
    //     name: "blank",
    //     value: "_blank"
    //   }]
    // })), React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Radio, {
    //   title: "nofollow",
    //   value: prop.nofollow || "closeOff",
    //   change: this.controler.radioHandler.bind(this.controler, "nofollow"),
    //   id: "nofollow1",
    //   list: [{
    //     name: "openTurn",
    //     value: "openTurn"
    //   }, {
    //     name: "closeOff",
    //     value: "closeOff"
    //   }]
    // }))));


    return (
      <div className="webLink">
        <ul className="pcConAttDesign">
          <li className="pcAttList">
            <Widget.Input
              title="webLink"
              value={prop.url}
              placeholder={window.public.lang["inputWebLink"]}
              change={this.controler.inputHandler.bind(this.controler, "url")}
              blur={this.controler.webLinkBlur.bind(this.controler, "url")}
            />
          </li>
          <li className="pcAttList">
            <Widget.Radio
              title="openMode"
              value={prop.target || "_self"}
              change={this.controler.radioHandler.bind(this.controler, "target")}
              id="openMode"
              list={[
                { name: "self", value: "_self" },
                { name: "blank", value: "_blank" }
              ]}
            />
          </li>
          <li className="pcAttList">
            <Widget.Radio
              title="nofollow"
              value={prop.nofollow || "closeOff"}
              change={this.controler.radioHandler.bind(this.controler, "nofollow")}
              id="nofollow1"
              list={[
                { name: "openTurn", value: "openTurn" },
                { name: "closeOff", value: "closeOff" }
              ]}
            />
          </li>
        </ul>
      </div>
    )
  }
  /**
   * @method email 电子邮件
   * @param {object} prop 属性对象
   * @return {object} 电子邮件组件结构
   */
  email(prop) {
    // return React.createElement("div", {
    //   className: "emailLink"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, React.createElement("li", {
    //   className: "pcAttList"
    // }, this.dataInput({
    //   data: prop,
    //   title: "emailLink",
    //   key: "recipient",
    //   placeholder: window.public.lang["inputEmailLink"]
    // })), React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Input, {
    //   title: "emailSubject",
    //   value: prop.mailTheme,
    //   placeholder: window.public.lang["inputEmailSubject"],
    //   change: this.controler.inputHandler.bind(this.controler, "mailTheme")
    // })), React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Textarea, {
    //   title: "presetContent",
    //   value: prop.presetContent,
    //   change: this.controler.inputHandler.bind(this.controler, "presetContent")
    // }))));

    return (
      <div className="emailLink">
        <ul className="pcConAttDesign">
          <li className="pcAttList">
            {this.dataInput({
              data: prop,
              title: "emailLink",
              key: "recipient",
              placeholder: window.public.lang["inputEmailLink"]
            })}
          </li>
          <li className="pcAttList">
            <Widget.Input
              title="emailSubject"
              value={prop.mailTheme}
              placeholder={window.public.lang["inputEmailSubject"]}
              change={this.controler.inputHandler.bind(this.controler, "mailTheme")}
            />
          </li>
          <li className="pcAttList">
            <Widget.Textarea
              title="presetContent"
              value={prop.presetContent}
              change={this.controler.inputHandler.bind(this.controler, "presetContent")}
            />
          </li>
        </ul>
      </div>
    )
  }
  /**
   * @method phone 电话号码
   * @param {object} prop 属性对象
   * return {object} 电话号码组件结构
   */
  phone(prop) {
    // return React.createElement("div", {
    //   className: "telLink"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, React.createElement("li", {
    //   className: "pcAttList"
    // }, this.dataInput({
    //   data: prop,
    //   title: "telLink",
    //   key: "phoneNumber",
    //   placeholder: window.public.lang["inputTelLink"]
    // })), React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement("p", {
    //   className: "cusAnchor"
    // }, React.createElement("span", null, window.public.lang["linkWarn"]), React.createElement("font", null, window.public.lang["clickLearnMore"])))));

    return (
      <div className="telLink">
        <ul className="pcConAttDesign">
          <li className="pcAttList">
            {this.dataInput({
              data: prop,
              title: "telLink",
              key: "phoneNumber",
              placeholder: window.public.lang["inputTelLink"]
            })}
          </li>
          <li className="pcAttList">
            <p className="cusAnchor">
              <span>{window.public.lang["linkWarn"]}</span>
              <font>{window.public.lang["clickLearnMore"]}</font>
            </p>
          </li>
        </ul>
      </div>
    )

  }
  /**
   * @method back 返回顶部
   * @param {object} prop 属性对象
   * return {object} 返回顶部组件结构
   */
  back(prop) {
    let _back = prop.back;
    // return React.createElement("div", {
    //   className: "backLink"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Select, {
    //   title: "backLink",
    //   value: _back,
    //   list: [{
    //     value: "top",
    //     name: window.public.lang["top"]
    //   }, {
    //     value: "bottom",
    //     name: window.public.lang["footer"]
    //   }, {
    //     value: "prev",
    //     name: window.public.lang["prevLink"]
    //   }],
    //   change: this.controler.selectHandler.bind(this.controler, "back", "backName")
    // })), React.createElement("li", {
    //   className: "pcAttList"
    // }, _back == "top" || _back == "bottom" ? React.createElement(Widget.Range, {
    //   title: "speed",
    //   value: prop.speed || 0,
    //   min: 0,
    //   max: 10,
    //   step: 0.1,
    //   change: this.controler.rangeHandler.bind(this.controler, "speed")
    // }) : null)));


    return (
      <div className="backLink">
        <ul className="pcConAttDesign">
          <li className="pcAttList">
            <Widget.Select
              title="backLink"
              value={_back}
              list={[
                { value: "top", name: window.public.lang["top"] },
                { value: "bottom", name: window.public.lang["footer"] },
                { value: "prev", name: window.public.lang["prevLink"] },
              ]}
              change={this.controler.selectHandler.bind(this.controler, "back", "backName")}
            />
          </li>
          {(_back === "top" || _back === "bottom") && (
            <li className="pcAttList">
              <Widget.Range
                title="speed"
                value={prop.speed || 0}
                min={0}
                max={10}
                step={0.1}
                change={this.controler.rangeHandler.bind(this.controler, "speed")}
              />
            </li>
          )}
        </ul>
      </div>
    )
  }
  /**
   * @method onlineConsulting 在线咨询
   * @param {object} prop 属性对象
   * return {object} 在线咨询组件结构
   */
  onlineConsulting(prop) {
    return React.createElement("div", {
      className: "onlineLink"
    }, React.createElement("ul", {
      className: "pcConAttDesign"
    }, React.createElement("li", {
      className: "pcAttList"
    }, React.createElement(Widget.Select, {
      title: "type",
      value: prop.consultValue,
      list: [{
        value: "qq",
        name: "QQ"
      }, {
        value: "skype",
        name: "Skype"
      }, {
        value: "whatsApp",
        name: window.public.lang["whatsApp"]
      }, {
        value: "whatsappPc",
        name: window.public.lang["whatsappPc"]
      }],
      change: this.controler.setConsulting.bind(this.controler, "consultValue", "consultName")
    })), React.createElement("li", {
      className: "pcAttList"
    }, prop.consultValue == "whatsApp" || prop.consultValue == "whatsappPc" ? this.dataInput({
      data: prop,
      title: "account",
      key: "account",
      placeholder: window.public.lang["inputAccount"]
    }) : React.createElement(Widget.Input, {
      title: "account",
      value: prop.account || "",
      placeholder: window.public.lang["inputAccount"],
      change: this.controler.inputHandler.bind(this.controler, "account")
    })), React.createElement("li", {
      className: "pcAttList"
    }, prop.consultValue == "skype" ? React.createElement(Widget.Radio, {
      title: "consultationMethods",
      value: prop.skypeMode || "voiceCall",
      change: this.controler.radioHandler.bind(this.controler, "skypeMode"),
      list: [{
        name: "voiceCall",
        value: "voiceCall"
      }, {
        name: "instantMessage",
        value: "instantMessage"
      }]
    }) : null), React.createElement("li", {
      className: "pcAttList"
    }, prop.consultValue == "whatsApp" || prop.consultValue == "whatsappPc" ? React.createElement(Widget.Textarea, {
      title: "presetContent",
      value: prop.presetContent,
      change: this.controler.inputHandler.bind(this.controler, "presetContent")
    }) : null)));
  }


  /**
   * @method download 下载
   * @param {object} prop 属性对象
   * return {object} 下载组件结构
   */
  download(prop) {
    // return React.createElement("div", {
    //   className: "download"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Button, {
    //   basic: true,
    //   btnName: prop.downloadName || window.public.lang["uploadFile"],
    //   click: this.controler.duenloadFile.bind(this.controler)
    // }))));
    return (
      <div className="download">
        <ul className="pcConAttDesign">
          <li className="pcAttList">
            <Widget.Button
              basic
              btnName={prop.downloadName || window.public.lang["uploadFile"]}
              click={() => this.controler.duenloadFile()}
            />
          </li>
        </ul>
      </div>
    )
  }
  /**
   * @method lightbox 弹出容器
   * @param {object} prop 属性对象
   * return {object} 弹出容器组件结构
   */
  lightbox(prop) {
    let _ejectList = this.controler.lightboxsList || [];

    // return React.createElement("div", {
    //   className: "lightbox"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Select, {
    //   title: "lightbox",
    //   value: prop.ejectBoxId,
    //   list: _ejectList || [],
    //   change: this.controler.selectHandler.bind(this.controler, "ejectBoxId", "ejectBoxName")
    // }))));

    return (
      <div className="lightbox">
        <ul className="pcConAttDesign">
          <li className="pcAttList">
            <Widget.Select
              title="lightbox"
              value={prop.ejectBoxId}
              list={_ejectList || []}
              change={this.controler.selectHandler.bind(this.controler, "ejectBoxId", "ejectBoxName")}
            />
          </li>
        </ul>
      </div>
    )
  }
  /**
   * @method  languageLinks 多语言链接
   * @param {object} prop 属性对象
   * return {object} 多语言链接
   */
  languageLinks(prop) {
    let languageList = this.state.languageList || [];
    // return React.createElement("div", {
    //   className: "lightbox"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Select, {
    //   title: "languageLinks",
    //   value: prop.languageType,
    //   list: languageList,
    //   change: this.controler.selectHandler.bind(this.controler, "languageType", "languageName")
    // }))));

    return (
      <div className="lightbox">
        <ul className="pcConAttDesign">
          <li className="pcAttList">
            <Widget.Select
              title="languageLinks"
              value={prop.languageType}
              list={languageList}
              change={this.controler.selectHandler.bind(this.controler, "languageType", "languageName")}
            />
          </li>
        </ul>
      </div>
    )
  }
  /**
   * @method  functionalLinks 功能链接
   * @param {object} prop 属性对象
   * return {object} 功能链接组件结构
   */
  functionalLinks(prop, state) {
    let componentType = state.componentType; //控件类型

    let _funArr = [{
      value: "bindPanel",
      name: window.public.lang["bindPanel"]
    }, {
      value: "lightboxClose",
      name: window.public.lang["lightboxClose"]
    }, {
      value: "skipMoreShopCart",
      name: window.public.lang["skipMoreShopCart"]
    }]; //控件类型为按钮时，显示购物相关的功能按钮;

    if (componentType == "em-Button") {
      _funArr = [{
        value: "bindPanel",
        name: window.public.lang["bindPanel"]
      }, {
        value: "lightboxClose",
        name: window.public.lang["lightboxClose"]
      }, {
        value: "addMoreShopCart",
        name: window.public.lang["addMoreShopCart"]
      }, {
        value: "skipMoreShopCart",
        name: window.public.lang["skipMoreShopCart"]
      }, {
        value: "emptyMoreShopCart",
        name: window.public.lang["emptyMoreShopCart"]
      }, {
        value: "inquiryMoreShopCart",
        name: window.public.lang["inquiryMoreShopCart"]
      }];
    }

    // return React.createElement("div", {
    //   className: "functionalLink"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Select, {
    //   title: "type",
    //   value: prop.functionalLinkType,
    //   list: _funArr,
    //   change: this.controler.selectHandler.bind(this.controler, "functionalLinkType", "functionalLinkName")
    // })), prop.functionalLinkType == "addMoreShopCart" || prop.functionalLinkType == "emptyMoreShopCart" ? React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Input, {
    //   title: "successText",
    //   value: prop.successText || "",
    //   placeholder: window.public.lang["successTextHelp"],
    //   change: this.controler.inputHandler.bind(this.controler, "successText")
    // })) : null));

    <div className="functionalLink">
      <ul className="pcConAttDesign">
        <li className="pcAttList">
          <Widget.Select
            title="type"
            value={prop.functionalLinkType}
            list={_funArr}
            change={this.controler.selectHandler.bind(this.controler, "functionalLinkType", "functionalLinkName")}
          />
        </li>
        {(prop.functionalLinkType === "addMoreShopCart" || prop.functionalLinkType === "emptyMoreShopCart") && (
          <li className="pcAttList">
            <Widget.Input
              title="successText"
              value={prop.successText || ""}
              placeholder={window.public.lang["successTextHelp"]}
              change={this.controler.inputHandler.bind(this.controler, "successText")}
            />
          </li>
        )}
      </ul>
    </div>
  }
  /**
   * @method  annexDownload 附件下载
   * @param {object} prop 属性对象
   * return {object} 附件下载组件结构
   */
  annexDownload(prop) {
    let annexType = prop.annexType || "link";
    // return React.createElement("div", {
    //   className: "pageLink"
    // }, React.createElement("ul", {
    //   className: "pcConAttDesign"
    // }, React.createElement("li", {
    //   className: "pcAttList"
    // }, React.createElement(Widget.Radio, {
    //   title: "annexDownload",
    //   value: annexType,
    //   change: this.controler.setAnnexType.bind(this.controler, "annexType"),
    //   id: "annexDownload",
    //   list: [{
    //     name: "openLinkLabel",
    //     value: "link"
    //   }, {
    //     name: "downloadAnnex",
    //     value: "download"
    //   }, {
    //     name: "previewAnnex",
    //     value: "preview"
    //   }]
    // })), React.createElement("li", {
    //   className: "pcAttList"
    // }, window.public.lang["annexDownloadHelp"])));

    return (
      <div className="pageLink">
        <ul className="pcConAttDesign">
          <li className="pcAttList">
            <Widget.Radio
              title="annexDownload"
              value={annexType}
              change={this.controler.setAnnexType.bind(this.controler, "annexType")}
              id="annexDownload"
              list={[
                { name: "openLinkLabel", value: "link" },
                { name: "downloadAnnex", value: "download" },
                { name: "previewAnnex", value: "preview" }
              ]}
            />
          </li>
          <li className="pcAttList">{window.public.lang["annexDownloadHelp"]}</li>
        </ul>
      </div>
    )
  }

}

export default Link