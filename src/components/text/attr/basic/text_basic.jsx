
// 导入React库
import React from "react";

// 导入其他模块
import Basic from "@/components/page/attr/basic/basic";
import Widget from "@/system/widgets/widget";
import LinkControler from "@/system/function/link/link_controler";

class TextBasic extends Basic {
  constructor(controler) {
    super();
    /**@property controler 边框控制器实例 */

    this.controler = controler;
  }


  /**
   * @method  selectionContentSet 内容来源
   * @author sxt
   * @return {object} 内容来源属性结构
   */
  selectionContentSet() {
    return React.createElement(Widget.Radio, {
      title: "selectionContent",
      id: "",
      list: [{
        name: "custom",
        value: "custom"
      }, {
        name: "databaseData",
        value: "databaseData"
      }],
      value: this.state.selectionContent || "custom",
      change: this.controler.setContent.bind(this.controler)
    });
  }
  /**
  * @method dataText 数据源文本   
  * @param {object} 更改数据源内容
  */
  dataText() {
    const {
      dataSource = {},
      selectionContent
    } = this.state || {};
    let _value = window.public.lang["selectDataSource"];

    if (selectionContent == "databaseData") {
      if (dataSource.sourceType) {
        _value = dataSource.sourceText + ">" + dataSource.companyName || window.public.lang["pleaseChoose"] + ">" + _value;
      }

      return React.createElement(Widget.ShowInfo, {
        title: "dataSources",
        id: "",
        value: _value,
        click: this.controler.showDataSource.bind(this.controler)
      });
    }

    return null;
  }
  /**
  * @method links 设置链接
  * @param {object} 设置链接结构。
  */
  links() {
    let _link = this.state.link;

    let _text = LinkControler.linkText(_link);

    return React.createElement(Widget.ShowInfo, {
      title: "setUpLink",
      id: " ",
      value: _link ? _text : window.public.lang["addButtonLink"],
      click: this.controler.showLink.bind(this.controler)
    });
  }
  /**
     * @method  minimumHeight 文本最小的高度
     * @return {object} 文本的最小高度
     */
  minHeight() {
    let content = this.controler.getParentType(this.props.node, "em-List");
    let overflowPart = this.state.overflowPart || "automatic";

    if (content || overflowPart != "automatic") {
      return React.createElement(Widget.Range, {
        title: "height",
        id: "minHeight",
        unit: "rem",
        min: 1,
        max: 100,
        value: (this.state.layout || {}).height || 1,
        step: 1,
        change: this.controler.minHeight.bind(this.controler)
      });
    }
  }
  /**
    * @method  accordingNumber 文本显示行数
    * @return {object} 文本的最小高度
    */
  accordingNumber() {
    let content = this.controler.getParentType(this.props.node, "em-List");
    const {
      selectionContent
    } = this.state || {};

    if (selectionContent == "databaseData") {
      if (content) {
        return React.createElement(Widget.Range, {
          title: "accordingNumber",
          id: "accordingNumber",
          min: 1,
          max: 10,
          value: this.state.showRow || (this.state.layout || {}).showRow || 1,
          step: 1,
          change: this.controler.setAccordingNumber.bind(this.controler)
        });
      }
    }
  }
  /**
   * @method  overflowPart 文本显示方式  
   * @return {object}
   */


  overflowPart() {
    let content = this.controler.getParentType(this.props.node, "em-List");

    if (!content) {
      return React.createElement(Widget.Radio, {
        title: "overflowPart",
        id: "",
        list: [{
          name: "automatic",
          value: "automatic"
        }, {
          name: "overflowHiding",
          value: "overflowHiding"
        }, {
          name: "overflowScrolling",
          value: "overflowScrolling"
        }],
        value: this.state.overflowPart || "automatic",
        change: this.controler.setOverFlowPart.bind(this.controler, "overflowPart")
      });
    }
  }

}

export default TextBasic;
