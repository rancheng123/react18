import {useState, useEffect} from 'react'
export function useWindowSize(){
    var [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(()=>{
        var resizeFn = ()=>{
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', resizeFn)
        return ()=>{
            window.removeEventListener('resize', resizeFn)
        }
    },[])

    return [
        windowSize
    ]
}