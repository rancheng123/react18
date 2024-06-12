import Layer from "@/system/widgets/layer";
import { Select } from 'antd';
import fontJson from './fonts.json'
import Dispatcher from "@/system/tools/dispatcher";
import { useState } from "react";
import Util from '@/components/page/util/util.jsx'
import { createRoot } from "react-dom/client";
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


    // 确定事件
    const ensure = async () => {
        Dispatcher.dispatch(`document_set`, {
            args: [`theme_data.SITE_HEADER.style.fontPageFamily`, familyData]
        });
        const win = window.public.win

        win.siteAsJson.masterPage.data.theme_data.SITE_HEADER.style.fontPageFamily = familyData

        // 模拟实现替换全局字体
        const res = await Util.loadComponent(window.public.type == 'pc' ? 'html' : 'mo', JSON.parse(JSON.stringify(win.siteAsJson)))
        createRoot(win.document.querySelector("#root")).render(res)
        console.log(Dispatcher.dispatch("getIframeData"));
    }


    const handleChange = (value) => {
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