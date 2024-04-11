
import MenuAttribute from "../menu_attribute.js";


const Setting = {
  async showTabContent(tab) {
    const list = this.group[tab];
    const element = this.ele.querySelector("#em-set-content"); //const design = MenuAttribute.design();
    //插入设计属性

    MenuAttribute.design({
      list: list,
      disableUnit: true,
      node: this.node,
      prefix: tab,
      publicAttr: this.publicAttr,
      element: element
    });
  }

};

export default Setting