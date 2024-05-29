
import { useState, useEffect } from "react";
import Layer from "@/system/widgets/layer";
import { Button, Checkbox, } from 'antd';
import Dispatcher from "@/system/tools/dispatcher";

const SelectPage = ({ distanceToScreenLeft, pageId, close }) => {

    // 获取页面数据
    const documentData = Dispatcher.dispatch('document_get')
    const {
        data: {
            document_data: {
                MAIN_MENU = {}
            },
            design_data = {}
        }
    } = documentData; //获取页面数据

    // 获取当前模板的所有页面数据
    const pageList = JSON.parse(JSON.stringify([...(MAIN_MENU.items || []), ...(MAIN_MENU.tempitems || [])]));


    // 获取当前编辑的背景数据
    const bgData = JSON.parse(JSON.stringify((design_data[pageId] || {})));


    // 初始化状态数据
    const [pageListCopy, setpageListCopy] = useState(() => {
        return pageList.map(item => {
            return {
                pid: item.pid,
                label: item.label,
                checked: item.pid === pageId
            }
        })
    });   // 渲染的页面数据结构
    const [checkAll, setCheckAll] = useState(false);   // 是否为全选
    const [design_dataCopy, setDesignDataCopy] = useState(design_data || {})  // 复制页面背景数据


    useEffect(() => {
        const bool = pageListCopy.every(item => {
            return item.checked === true
        })
        setCheckAll(bool)
    }, [pageListCopy])


    // 单选
    const onChange = (event) => {
        const id = event.target.value;
        const checked = event.target.checked;

        Dispatcher.dispatch('document_set', {
            args: [`design_data.${id}`, checked ? bgData : {}]
        });


        // 更新视图
        setpageListCopy(pageListCopy.map(item => {
            if (item.pid === id) {
                return {
                    ...item,
                    checked: checked
                }
            } else {
                return { ...item }
            }
        }))

    }

    // 全选
    const onCheckAllChange = (event) => {
        const checked = event.target.checked

        let obj = {}
        pageListCopy.forEach(element => {
            if (element.pid === pageId) return
            checked ? obj[element.pid] = bgData : obj[element.pid] = {}
        });

        Dispatcher.dispatch('document_set', {
            args: [`design_data.`, obj]
        });

        // 更新全选状态
        setCheckAll(checked)
        // 更新视图
        setpageListCopy(pageListCopy.map(item => {
            if (item.pid === pageId) {
                return { ...item }
            } else {
                return {
                    ...item,
                    checked: event.target.checked
                }
            }
        }))

    }


    // 样式
    const pageItemStyle = {
        width: '100%',
        margin: '14px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }

    const previewStyle = {
        width: '140px',
        height: '58px',
        border: '1px solid #E3E2E8',
        textAlign: 'center',
        lineHeight: '58px',
    }


    return (
        <Layer.open
            titles={['选择页面']}
            area={[380, 554]}
            offset={[distanceToScreenLeft - 380, 60]}
            draggable
            close={close}
        >
            <div style={{ padding: '10px 20px', height: "500px", overflowY: "scroll" }}>
                <div style={pageItemStyle}>
                    <Checkbox value="all" onChange={onCheckAllChange} checked={checkAll}>全选</Checkbox>
                </div>
                {
                    pageListCopy && pageListCopy.length !== 0 && pageListCopy.map(pageItem => {
                        return (
                            <div key={pageItem.pid} style={pageItemStyle}>
                                {
                                    pageId === pageItem.pid ?
                                        <Checkbox value={pageItem.pid} disabled={true} checked={true}>{pageItem.label}</Checkbox>
                                        :
                                        <Checkbox value={pageItem.pid} onChange={onChange} checked={pageItem.checked}>{pageItem.label}</Checkbox>
                                }
                                <div style={previewStyle}>
                                    {
                                        design_dataCopy[pageItem.pid] ? (design_dataCopy[pageItem.pid].type === 'BackgroundColor' ?
                                            <div style={{ width: '100%', height: '100%', background: design_dataCopy[pageItem.pid].bgColor }}></div>
                                            :
                                            design_dataCopy[pageItem.pid].uri && <img src={design_dataCopy[pageItem.pid].uri} style={{ width: '100%', height: '100%' }} />) : null
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <Button type="primary">确定</Button>
                </div>
            </div>
        </Layer.open>
    )
}

export default SelectPage;
