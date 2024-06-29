
// 导入所需的模块
import Attribute from '@/components/page/attr/attribute';
import languagesConfig from './languages_config.json';
import PublicAttrManager from '@/components/page/attr/public_attr_manager';
import Dispatcher from '@/system/tools/dispatcher';


/**
 * @class {Attribute}内容面板属性控制器类
 */
const LanguagesAttribute = Object.create(Attribute);

LanguagesAttribute.config = languagesConfig;
/**
 * @method 样式类读取方法
 */
LanguagesAttribute.custom = async function (opts) {
    const {
        node: {
            current: {
                type
            }
        }
    } = this;
    const custom = await PublicAttrManager.custom(type);
    custom.custom(opts);
};

LanguagesAttribute.newCustom = async function (opts) {
    const {
        node: {
            current: {
                type
            }
        }
    } = this;
    const custom = await PublicAttrManager.custom(type);
    custom.custom(opts);
};


/**
 * @method selectBefore 选中之前调用
 * @param {object} node 控件对象
 * @param {object} config 配置对象
 */
LanguagesAttribute.selectBefore = function (node, config) {
    const data = Dispatcher.dispatch(`${node.current.id}_get`);
    const {
        data: {
            theme_data
        }
    } = data !== null && data !== void 0 ? data : {
        data: {}
    };
    const {
        style: {
            marginLeft,
            marginRight
        }
    } = theme_data !== null && theme_data !== void 0 ? theme_data : {
        style: {}
    };

    if (marginLeft == 'auto' && marginRight == 'auto') {
        config.dots.btns = config.dots.btns.slice(0, 1);
    }
};


export { LanguagesAttribute }