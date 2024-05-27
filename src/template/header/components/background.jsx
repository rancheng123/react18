import { useEffect, useState, useMemo } from "react";
import Layer from "@/system/widgets/layer";
import { Button } from 'antd';
import Widget from '@/system/widgets/widget';
import styles from './background.module.less'
import Dispatcher from "@/system/tools/dispatcher";
/***
 * 背景修改结构
 * @param props.close 关闭弹窗的方法
 * 
 */
const Background = ({ close }) => {
    let _childrenPageId, pageId
    const documentData = Dispatcher.dispatch('document_get')
    console.log(documentData);
    const {
        component: {
            children
        },
        data: {
            design_data = {}
        }
    } = documentData;
    pageId = ((_childrenPageId = children[2].pageId) !== null && _childrenPageId !== void 0 ? _childrenPageId : children[1].pageId)


    const distanceToScreenLeft = useMemo(() => {
        const rect = document.getElementById('background').getBoundingClientRect()
        return rect.left - 300;
    }, [])



    // 初始化状态数据
    const [usePageStatus, setUsePageStatus] = useState(false)  // 应用替他页面弹窗是否打开状态
    const [type, setType] = useState(design_data && pageId ? (design_data[pageId] ? design_data[pageId].type : '') : '')   // 背景类型
    const [bgColor, setBgColor] = useState(design_data && pageId ? (design_data[pageId] ? design_data[pageId].bgColor : '') : '')   // 背景颜色

    // 背景类型点击事件
    const handBGTypeClick = (value) => {

        if (value === 'BackgroundColor') {
            // 展示颜色选择器 
            document.querySelector('#backgroundColor>.backgroundColor>.fcolorpicker-curbox').click()
        } else if (value === 'image') {

        }

        // 设置类型
        setType(value)
    }

    // 颜色选择器改变事件
    const colorPickerChange = (bgColor) => {
        Dispatcher.dispatch('document_set', {
            args: [`design_data.${pageId}`, {
                bgColor,
                type: 'BackgroundColor'
            }]
        });
        setBgColor(bgColor)
    }

    // 获取预览背景
    const getBGPreview = () => {
        switch (type) {
            case 'BackgroundColor':
                return (
                    <div style={{ height: '100%', backgroundColor: bgColor }}></div>
                )
            case 'image':
                return (
                    <div>图片预览</div>
                )
            default:
                break;
        }
    }


    // 应用至其他页面按钮事件
    const usePage = () => {
        setUsePageStatus(true)
    }
    return (
        <>
            <Layer.open
                titles={['页面背景']}
                area={[380]}
                offset={[distanceToScreenLeft, 60]}
                draggable
                close={close}
            >
                <div id={styles.globalBackground}>

                    <div className={styles.globalBackgroundTop}>

                        {getBGPreview() ? getBGPreview() : '点击下方按钮进行设置'}
                    </div>

                    <div className={styles.globalBackgroundMiddle}>
                        {/* 颜色选择器 */}
                        <Widget.ColorPicker
                            id="backgroundColor"
                            title="bgColor"
                            basic={true}
                            color={bgColor}
                            change={colorPickerChange}
                        />
                        {
                            typeList.map(item => {
                                return (
                                    <div key={item.type} className={styles.globalBackgroundMiddle_button} onClick={() => handBGTypeClick(item.type)}>
                                        <i className="iconfont" dangerouslySetInnerHTML={{ __html: item.iconName }}></i>
                                        {item.name}
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className={styles.globalBackgroundBottom}></div>

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <Button type="primary" onClick={usePage}>应用至其他页面</Button>
                    </div>
                </div>


            </Layer.open>

            {/* 页面选择框 */}
            {
                usePageStatus && <Layer.open
                    titles={['选择页面']}
                    area={[380, 186]}
                    offset={[distanceToScreenLeft - 380, 60]}
                    draggable
                    close={close}
                >
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <Button type="primary">确定</Button>
                    </div>
                </Layer.open>
            }

        </>


    )
}


const typeList = [
    {
        name: "图片",
        type: "image",
        iconName: "&#xe788;"
    },
    {
        name: "颜色",
        type: "BackgroundColor",
        iconName: "&#xe786;"
    }
]
export default Background