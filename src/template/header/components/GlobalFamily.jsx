import Layer from "@/system/widgets/layer";
import { Select } from 'antd';
import fontJson from './fonts.json'
import Dispatcher from "@/system/tools/dispatcher";
import { useState } from "react";
/***
 * 全局字体修改结构
 * @param props.close 关闭弹窗的方法
 * 
 */
const GlobalFamily = ({ close }) => {

    let iframeData = Dispatcher.dispatch("getIframeData");

    // 字体数据
    const [familyData, setFamilyData] = useState(iframeData?.data?.theme_data?.SITE_HEADER?.style?.fontPageFamily || '')

    const rect = document.getElementById('fontFamily').getBoundingClientRect()
    const distanceToScreenLeft = rect.left - 200;

    console.log(iframeData);

    // 确定事件
    const ensure = () => {
        Dispatcher.dispatch(`document_set`, {
            args: [`theme_data.SITE_HEADER.style.fontPageFamily`, familyData]
        });

        console.log(Dispatcher.dispatch("getIframeData"));
    }


    const handleChange = (value) => {
        console.log(value);
        setFamilyData(value)
    }
    return (
        <Layer.open
            titles={['全局字体']}
            area={[380, 186]}
            offset={[distanceToScreenLeft, 60]}
            draggable
            close={close}
            cancel={close}
            ensure={ensure}
        >
            <div className="globalFamily" style={{ display: 'flex', alignItems: 'center', padding: '20px' }} >
                <span style={{ marginRight: '10px' }}>
                    字体
                </span>
                <Select
                    style={{
                        flex: 1,
                    }}
                    value={familyData}
                    options={fontJson}
                    onChange={handleChange}
                />
            </div>
        </Layer.open >
    )
}



export default GlobalFamily