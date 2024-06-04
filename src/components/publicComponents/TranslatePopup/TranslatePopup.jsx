import { Modal, Checkbox, Button, Spin } from 'antd';
import styles from './TranslatePopup.module.less'
import { useEffect, useState } from 'react';
import { getlangListAPI } from '@/api/translate'
/**
 * 翻译弹窗
 * @param {*} props.close  卸载弹框方法
 * 
 */
const TranslatePopup = ({ close }) => {


    // 初始化默认的翻译语言列表数据
    const [dataCopy, setdataCopy] = useState([])
    // 初始化要翻译的数据
    const [translateIngData, setTranslateIngData] = useState([])
    // 初始化翻译是否完成
    const [translateIsOK, setTranslateIsOK] = useState(false)


    useEffect(() => {
        const getTranslateList = async () => {
            await getlangListAPI().then(res => {
                console.log(res);
                let dataCopy = res.data.list;
                // 处理数据
                if (dataCopy.length % 3 == 1) {
                    dataCopy.push({ id: Date.now() + 'a', name: '' }, { id: Date.now() + 'b', name: '' })
                } else if (dataCopy.length % 3 == 2) {
                    dataCopy.push({ id: Date.now() + 'c', name: '' })
                }
                dataCopy.map(item => item.checked = false)
                setdataCopy(dataCopy)
            })
        }

        // 获取翻译的语言列表
        getTranslateList()
    }, [])






    // 单独选择怨言
    const handCheckboxChange = (event, id) => {
        setdataCopy(() => {
            return dataCopy.map(item => {
                if (item.id == id) {
                    return { ...item, checked: event.target.checked }
                } else {
                    return item
                }
            })
        })
    }

    // 全选
    const handCheckboxAll = (event) => {
        setdataCopy(() => {
            return dataCopy.map(item => {
                return { ...item, checked: event.target.checked }
            })
        })

    }

    // 点击翻译按钮事件
    const handTranslate = () => {
        // 获取勾选的语言列表
        const arr = dataCopy.filter(item => {
            if (item.name && item.checked) {
                return { ...item }
            }
        })
        if (!arr || arr.length == 0) {
            return alert('请选择要翻译的语言')
        }
        // 设置数据
        setTranslateIngData(() => {
            return arr.map(item => ({ ...item, status: 0 }))
        })

        // 调用翻译接口

        // 模拟翻译完成
        setTimeout(() => {
            setTranslateIsOK(true)
        }, 3000);
    }

    // 继续按钮事件
    const handContinue = () => {
        // 清空翻译中数据
        setTranslateIngData([])
    }

    const title = () => {
        return (
            <div>
                翻译
                <span style={{ color: '#999999' }}>（剩余字符数 10000）</span>
            </div>
        )
    }
    return (
        <>
            <Modal title={title()} open={true} footer={null} onCancel={close} maskClosable={false}>
                <div id={styles.translate_popup}>
                    <div className={styles.translate_popup_content}>

                        {/* 翻译弹框初始化页面 */}
                        {
                            translateIngData.length === 0 &&
                            <div>
                                <p className={styles.title}>翻译语言</p>
                                <div className={styles.selectAll}>
                                    <Checkbox onChange={handCheckboxAll}>
                                        全选
                                    </Checkbox>
                                </div>
                                <div className={styles.language} >
                                    {
                                        dataCopy.map(item => {
                                            return (
                                                <div className={styles.language_item} key={item.id}>
                                                    {
                                                        item.name && <Checkbox checked={item.checked} onChange={(event) => handCheckboxChange(event, item.id)}>
                                                            {item.name}
                                                        </Checkbox>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={styles.prompt}>
                                    <i className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe77a;' }}></i>
                                    提示：已翻译完成的，再次翻译会再次耗费您的字符数，请谨慎选择
                                </div>
                                <div className={styles.footer}>
                                    <Button type="primary" onClick={handTranslate}>翻译</Button>
                                    <Button onClick={close}>取消</Button>
                                </div>
                            </div>
                        }



                        {/* 翻译中结构 */}
                        {
                            translateIngData && translateIngData.length !== 0 && (
                                < div >
                                    <div className={styles.translateIng}>
                                        <div>
                                            {
                                                translateIsOK ? (
                                                    <>
                                                        <i style={{ color: '#52C41A' }} className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe781;' }}></i>
                                                        <p>翻译完成</p>
                                                    </>

                                                ) : (
                                                    <>
                                                        <Spin size="large" />
                                                        <p>翻译中...</p>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className={styles.translateIngList} >
                                        {
                                            translateIngData.map(item => {
                                                return <div key={item.name} className={styles.translateIngListItem} >
                                                    <div>
                                                        <i style={item.status === 2 ? { color: '#52C41A' } : (item.status === 3 ? { color: '#F5222D' } : null)} className="iconfont" dangerouslySetInnerHTML={{ __html: translateIconEnum[item.status] }}></i>
                                                        {item.name}
                                                    </div>
                                                    <div className={styles.translateIngListItemStatus} style={item.status === 2 ? { color: '#52C41A' } : (item.status === 3 ? { color: '#F5222D' } : null)} >
                                                        {translateStatusEnum[item.status]}
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>

                                    {
                                        translateIsOK && <div className={styles.translateIngFooter} >
                                            <Button type="primary" onClick={handContinue}>继续</Button>
                                            <Button onClick={close}>取消</Button>
                                        </div>
                                    }

                                </div>
                            )
                        }

                    </div>
                </div>
            </Modal >
        </>
    )
}

// 翻译状态文字枚举数据
const translateStatusEnum = {
    0: '待翻译',
    1: '翻译中',
    2: '翻译成功',
    3: '翻译失败'
}

// 翻译图标枚举数据
const translateIconEnum = {
    0: '&#xe77c;',
    1: '&#xe789;',
    2: '&#xe778;',
    3: '&#xe79f;'
}
export default TranslatePopup;