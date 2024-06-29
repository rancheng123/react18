import CustomControler from "@/components/page/attr/custom/custom_controler";
import React from "react";
/**
 * @class {ButtonCustomControler} 控件单独样式切换数据处理
 */
class LanguagesCustomControler extends CustomControler {
  constructor(props) {
    super(props);
  }
  /**
   * @method selectedData 控件单独处理数据方法
   * @param {Object} defCompont  新样式里的数据
   * @param {Object} compontData 只改样式后的数据
   * @param {Object} state state对象
   * @return {Object} 设置的新数据
   */
  selectedData(defCompont, compontData, state) {

    debugger
    let data = compontData.data,
      defData = defCompont.data;
    compontData.data = {
      ...defData,
      ...data,
    };
    return compontData;
  }
  static custom(opts) {
    const {
      node,
      element,
      config,
      root
    } = opts;
    root.render(React.createElement(this, {
      id: node.current.id,
      node: node,
      config: config
    }));
  }
}

export { LanguagesCustomControler };
