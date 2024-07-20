import {useEffect, useState} from "react";
import {getFlowDetail} from "@/components/languages/view/html/canvas/api/index.js";
import './index.css'
import FlowNode from "@/components/languages/view/html/canvas/node/index.jsx";
var FlowCanvas = ()=>{

    var [flowDetail, setFlowDetail] = useState({
        id: null,
        name: '',
        nodes: []
    })


    useEffect(
        ()=>{


            //编辑时， 调取详情数据
            if(1){
                getFlowDetail().then((res)=>{
                    if(res.status === 200){
                        setFlowDetail(res.data)
                    }

                })

            }
            // 新建时，创建首个节点
            else{

            }


            console.log('componentDidMount')

            return ()=>{
                console.log('componentWillUnmount')
            }
         },
        // 空数组保证仅在组件挂载时执行一次
        []
    )

    return (
        <div className={'flowWrap'}>
                <div>
                    {flowDetail.name}
                </div>

                <div>
                    {flowDetail.nodes.map((node, index)=>{
                        return (
                            <FlowNode
                                key={index}
                                node={node}
                                onClick={()=>{

                                    flowDetail.nodes.forEach((node)=>{
                                        node.active = false
                                    })
                                    node.active = true
                                }}
                            ></FlowNode>

                        )
                    })}
                </div>
        </div>
)
}
export default FlowCanvas