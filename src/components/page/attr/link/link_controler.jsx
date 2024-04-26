// 导入 React 库
import {useState} from "react";
import Widget from "@/system/widgets/widget"; // 导入 Widget
import { Input } from "antd";

/**
 * @Description: 链接控制器
 */
export function LinkContainer(props) {

    // 链接类型
    const [linkType, setLinkType] = useState('not')
    // 是否新窗口打开的数据
    const [openNewStatus, setOpenNewStatus] = useState('yes')
    // 是否传递权重的数据
    const [weightStatus, setWeightStatus] = useState('yes')


    // 链接类型数据
    const linkTypeList = [
        {
            name: 'not',
            value: 'not',
            title: '无'
        },
        {
            name: 'inside',
            value: 'inside',
            title: '站内页面'
        },
        {
            name: 'outside',
            value: 'outside',
            title: '站外链接'
        },
    ]

    // 单选框数据
    const statusList = [
        {
            name: 'yes',
            value: 'yes',
            title: '是'
        },
        {
            name: 'no',
            value: 'no',
            title: '否'
        },
    ]



    // 链接改变方法类型
    const change = (event)=> {
        setLinkType(event.target.value)
    }

    // 新窗口单选框发生改变
    const openNewStatusChange = (event)=>{
        setOpenNewStatus(event.target.value)
    }

    // 是否传递权重发生改变
    const weightStatusChange = (event)=>{
        setWeightStatus(event.target.value)
    }

    return (
        <div style={{padding: '20px'}}>
            <div style={{width:'100%'}}>
                <Widget.Radio
                    basic={true}
                    list={linkTypeList}
                    value={linkType}
                    change={change}
                />
                {linkType !== "not" && (
                    <ul>
                        <li style={{display:'flex',alignItems: 'center', margin:'10px 0'}}>
                            <div style={{width:'84px',textAlign:'right',marginRight:'10px',flex:'none'}}>网址</div>
                            <Input/>
                        </li>

                        <li style={{display:'flex',alignItems: 'center', margin:'10px 0'}}>
                            <div style={{width:'84px',textAlign:'right',marginRight:'10px',flex:'none'}}>新窗口打开</div>
                            <Widget.Radio
                                basic={true}
                                list={statusList}
                                value={openNewStatus}
                                change={openNewStatusChange}
                            />
                        </li>
                        {
                            linkType === "outside" && (
                                <li style={{display:'flex',alignItems: 'center', margin:'10px 0'}}>
                                    <div style={{width:'84px',textAlign:'right',marginRight:'10px',flex:'none'}}>是否传递权重</div>
                                    <Widget.Radio
                                        basic={true}
                                        list={statusList}
                                        value={weightStatus}
                                        change={weightStatusChange}
                                    />
                                </li>
                            )
                        }
                        <div style={{fontWeight: '400',fontSize: '12px',color:' #666666'}}>
                            注：可填写完整链接，也可只填写除域名外的部分如/products.html
                        </div>
                    </ul>
         
                )}
            </div>
        </div>
    )
}