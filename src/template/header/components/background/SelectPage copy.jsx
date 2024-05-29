import { useState, useEffect } from "react";
import Layer from "@/system/widgets/layer";
import { Button, Checkbox, } from 'antd';
import Dispatcher from "@/system/tools/dispatcher";


const SelectPage = ({ distanceToScreenLeft, pageId }) => {

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
    const [checkedList, setCheckedList] = useState([pageId]);   // 选中的页面
    const [checkAll, setCheckAll] = useState(false);   // 是否为全选
    const [design_dataCopy, setDesignDataCopy] = useState(design_data || {})  // 复制页面背景数据


    console.log(9999999999999999, design_data);
    useEffect(() => {
        if (!checkAll) {
            // 取消全选
            set()
        }
        set(checkedList)

    }, [checkedList])

    // 单选
    const onChange = (checkedValues,) => {
        console.log('单选', checkedValues);
        setCheckedList(checkedValues)
        if (checkedValues.length == pageList.length) {
            setCheckAll(true)
        } else {
            setCheckAll(false)
        }
    }

    // 全选
    const onCheckAllChange = (e) => {
        if (e.target.checked) {
            // 全选
            setCheckedList(() => {
                return pageList.map(item => {
                    return item.pid
                })
            })
            setCheckAll(true)
        } else {
            // 取消全选
            setCheckedList([pageId])
            setCheckAll(false)
        }
    }


    // 统一修改数据
    const set = (data) => {
        let obj = {}
        if (!data || !data.length) return
        // 其他情况参数赋值
        // obj = { ...design_dataCopy }

        // 取消全选参数赋值
        // if (data.length === 1 && data[0] === pageId) {
        //     obj = {}
        // }

        data.forEach(element => {
            obj[element] = bgData
        });

        console.log(obj, 333333333333333333);
        // 派发修改事件
        Dispatcher.dispatch('document_set', {
            args: [`design_data`, JSON.parse(JSON.stringify(obj))]
        });
        setDesignDataCopy(obj)

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
        border: '1px solid #E3E2E8'
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
                <Checkbox.Group
                    style={{
                        width: '100%',
                    }}
                    onChange={onChange}
                    value={checkedList}
                >
                    {pageList && pageList.length !== 0 &&
                        pageList.map(pageItem => {
                            return (
                                <div key={pageItem.pid} style={pageItemStyle}>
                                    {/* 当前页面无法编辑 */}
                                    {pageId === pageItem.pid ?
                                        <Checkbox value={pageItem.pid} disabled={true} checked={true}>{pageItem.label}</Checkbox>
                                        :
                                        <Checkbox value={pageItem.pid} checked={pageId === pageItem.pid}>{pageItem.label}</Checkbox>
                                    }
                                    <div style={previewStyle}>
                                        {
                                            design_dataCopy[pageItem.pid] ? (design_dataCopy[pageItem.pid].type === 'BackgroundColor' ?
                                                <div style={{ width: '100%', height: '100%', background: design_dataCopy[pageItem.pid].bgColor }}></div>
                                                :
                                                <img src={design_dataCopy[pageItem.pid].uri} style={{ width: '100%', height: '100%' }} />) : null
                                        }
                                    </div>
                                </div>

                            )
                        })
                    }


                </Checkbox.Group>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <Button type="primary">确定</Button>
                </div>
            </div>
        </Layer.open>
    )
}

export default SelectPage;