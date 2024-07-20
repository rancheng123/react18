
import FlowCanvas from "@/components/languages/view/html/canvas/flowCanvas/index.jsx";
import FlowDetail from "@/components/languages/view/html/canvas/flowDetail/index.jsx";
import {useState} from 'react'
import './index.css'
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
            {(()=>{
                if(router === 'flowCanvas'){
                    return (
                        <FlowCanvas></FlowCanvas>
                    )
                }else if(router === 'flowDetail'){
                    return (
                        <FlowDetail />
                    )
                }
            })()}


        </div>
    )
}
export default FlowIndex