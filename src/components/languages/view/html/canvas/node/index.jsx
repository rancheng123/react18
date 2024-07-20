import './index.css'
import Jilian from "@/components/languages/view/html/canvas/node/jilian/index.jsx";
import {useContext, useMemo} from 'react'
import {NodeConfig} from "@/components/languages/view/html/canvas/const.js";
import flowCanvasContext from "@/components/languages/view/html/canvas/context.js";
const FlowNode = (props)=>{


    var actions = useContext(flowCanvasContext)



    /* useMemo 性能优化  start */
        /*
         只要有页面更新，就会调用主函数，如果结果值一样，频繁的被调用多次，等于浪费了很多的性能。
         如果计算量较大，更加明显
        */

        // 1. 不推荐的写法（性能差）
        var totalVisitors = props.node.data.todayVisitors + props.node.data.yesterdayVisitors
        console.log('每次更新，都被调用')

        // 2. 推荐的写法（性能高）
        var memorizedTotalVisitors = useMemo(()=>{
            console.log('只有监听数组的值有变化时，才被调用')
            return props.node.data.todayVisitors + props.node.data.yesterdayVisitors
        },
            //被监听的依赖值，有利于优化高开销的计算
            [props.node.data.todayVisitors, props.node.data.yesterdayVisitors]
        )

    /* useMemo 性能优化  end */


    return (
        <div className={(()=>{
            var res = 'flowNode'
            if(props.node.active){
                res += ' active'
            }
            if(props.locked){
                res += ' locked'
            }
            return res
        })()} style={{
            top: props.node.top,
            left: (()=>{
                var res = (actions.flowCanvasRef.current.offsetWidth - NodeConfig.width) /2
                return res
            })(),
            width: NodeConfig.width
        }}
             onClick={()=>{
                 props.onClick(props.node)
             }}
        >
            <div>
                {props.node.name}
            </div>
            <div>
                <div>
                    {props.node.data.msg}
                </div>
                <div>
                    {totalVisitors},
                    {memorizedTotalVisitors}
                </div>

            </div>


            {(()=>{
                if(props.node.active){
                    return (
                        <Jilian
                            {...props}
                        ></Jilian>
                    )
                }

            })()}


        </div>
    )
}
export default FlowNode