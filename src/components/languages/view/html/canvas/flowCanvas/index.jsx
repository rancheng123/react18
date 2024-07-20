import FlowStatus from "@/components/languages/view/html/canvas/flowStatus/index.jsx";
import FlowNode from "@/components/languages/view/html/canvas/node/index.jsx";
import flowCanvasContext from "@/components/languages/view/html/canvas/context.js";
import './index.css'
import {useFlowDetail} from "@/components/languages/view/html/canvas/hooks/flow.js";
import {useRef, useReducer, useState, useCallback} from 'react'
import {useWindowSize} from "@/components/languages/view/html/canvas/hooks/windowSize.js";


/*

useState, useReducer
相同点：
    都是管理状态

不同点
    useState          状态之间 无  依赖关系
    useReducer        状态之间 有  依赖关系


*/


const FlowCanvas = ()=>{
    var [flowDetail, setFlowDetail] = useFlowDetail(1)
    var flowCanvasRef = useRef()

    var [flowState1, setFlowState1] = useState(0)

    var [state, dispatch] = useReducer((state, action)=>{
        switch (action.type) {
            case 'increment':
                return {count: state.count + 1};
            case 'decrement':
                return {count: state.count - 1};
            default:
                throw new Error();
        }
    },{
        count: 0
    })




    //*******注意点： 虽然这个值没有被用到，但是 每次window.onresize后，会调用主函数
    var [windowSize] = useWindowSize()

    var locked = flowDetail.status === 1

    var onNodeClick = (node) => {

        if(locked){
            return
        }

        flowDetail.nodes.forEach((node) => {
            node.active = false
        })
        node.active = true


        /*
        错误的写法
            setFlowDetail(flowDetail)
        原因
            浅比较 检测不到属性值的变化， 所以不会触发更新
        */

        // 正确的写法， 使用新的对象来替代旧的对象
        setFlowDetail(
            {
                ...flowDetail
            }
        )
    }

    onNodeClick = useCallback(onNodeClick,[flowDetail])

    var flowCanvasContextValue = {
        flowCanvasRef,
        userName: 'rancheng',
        onDelete: (deleteNode)=>{
            flowDetail.nodes.forEach((node, index)=>{
                if (node.id === deleteNode.id) {
                    flowDetail.nodes.splice(index, 1)
                }
            })
            setFlowDetail({
                ...flowDetail
            })
        },
        onEdit: (currentNode)=>{
            currentNode.data.todayVisitors = 20
            setFlowDetail({
                ...flowDetail
            })
        }
    }

    return (
        <flowCanvasContext.Provider value={flowCanvasContextValue}>

            <div>
                {flowCanvasContextValue.userName}
            </div>
            <>
                Count: {state.count}
                <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            </>


            <div className={'flowWrap'}
                ref={flowCanvasRef}
            >
                <div className={'topBar'}>
                    <div>
                        {flowDetail.name}
                    </div>
                    <FlowStatus
                        status={flowDetail.status}
                    ></FlowStatus>

                    <div onClick={()=>{
                        setFlowState1(flowState1+=1)
                    }}>
                        {flowState1}
                    </div>



                </div>

                {/*节点 start*/}
                <div>
                    {flowDetail.nodes.map((node, index) => {
                        return (
                            <FlowNode
                                key={index}
                                node={node}
                                locked={locked}
                                onClick={onNodeClick}
                            ></FlowNode>

                        )
                    })}
                </div>
                {/*节点 end*/}
            </div>
        </flowCanvasContext.Provider>

    )
}
export default FlowCanvas