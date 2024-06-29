
import CustomControler from '@/components/page/attr/custom/custom_controler';

/**
 * @class {ImageCustomControler} 控件单独样式切换数据处理
 */
class ImageCustomControler extends CustomControler {
    constructor(props) {
        super(props);
    }

    /**
     * @method selectedThemeData 控件单独处理数据方法
     * @param {Object} themeData  新样式里的样式数据
     * @param {Object} state state对象
     * @return {Object} 设置的新数据
     */
    selectedThemeData(themeData, state) {
        let style = state.datas.data.theme_data.style || {};

        if (style.paddingHeight) {
            themeData.style.paddingHeight = style.paddingHeight;
        }

        return themeData;
    }

    /**
     * @method selectedData 控件单独处理数据方法
     * @param {Object} defCompont  新样式里的数据
     * @param {Object} compontData 只改样式后的数据
     * @param {Object} state state对象
     * @return {Object} 设置的新数据
     */
    selectedData(defCompont, compontData, state) {
        let {
            datas: {
                component: {
                    layout = {}
                },
                data: {
                    theme_data = {}
                }
            }
        } = state || {};
        let data = compontData.data,
            defData = defCompont.data;
        compontData.data = {
            ...defData,
            ...data
        }; //style数据中存在paddingHeight是要保留下来(列表内图片才有这个属性) 

        if (theme_data.style && theme_data.style.paddingHeight) {
            compontData.style.style.paddingHeight = theme_data.style.paddingHeight;
        } //layout数据中存在Height是要保留下来(列表内图片才有这个属性) 


        if (layout.height) {
            compontData.structure.layout.height = layout.height;
        }

        return compontData;
    }

}
export { ImageCustomControler }