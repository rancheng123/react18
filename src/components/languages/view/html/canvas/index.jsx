
import FlowCanvas from "@/components/languages/view/html/canvas/flowCanvas/index.jsx";
import FlowDetail from "@/components/languages/view/html/canvas/flowDetail/index.jsx";
import {useState} from 'react'
import './index.css'
import Test from "@/components/languages/view/html/canvas/test/index.jsx";
var FlowIndex = ()=>{
    var [router, setRouter] = useState('flowCanvas')
    return (
        <div className={'flowIndex'}>
            <div onClick={()=>{
                if(router === 'flowCanvas'){
                    setRouter('flowDetail')
                }else{
                    setRouter('flowCanvas')
                }
            }}>
                {router}
            </div>

            <div onClick={()=>{
                setRouter('flowTest')
            }}>
                test
            </div>

            {(()=>{
                if(router === 'flowCanvas'){
                    return (
                        <FlowCanvas></FlowCanvas>
                    )
                }else if(router === 'flowDetail'){
                    return (
                        <FlowDetail />
                    )
                }else if(router === 'flowTest'){
                    return (
                        <Test />
                    )
                }
            })()}


        </div>
    )
}
export default FlowIndex