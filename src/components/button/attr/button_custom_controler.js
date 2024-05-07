
import CustomControler from "@/components/page/attr/custom/custom_controler";
/**
 * @class {ButtonCustomControler} 控件单独样式切换数据处理
 */
class ButtonCustomControler extends CustomControler {
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
    let data = compontData.data,
      defData = defCompont.data;
    compontData.data = {
      ...defData,
      ...data
    };
    return compontData;
  }

}

export default ButtonCustomControler
