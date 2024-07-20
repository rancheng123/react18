import {useCallback} from 'react'
const Test = ()=>{

    var fn = ()=>{
        console.log('普通fn')
        debugger
    }


    /*
    React.memo()  通过校验Props中的数据的内存地址是否改变  来决定组件是否重新渲染组件。
    render时,便利队列，找到该函数，检查依赖是否改变


    依赖不变, 返回旧函数地址
    依赖变 ,  返回新函数地址
    */
    var memorizedFn = useCallback(()=>{
        console.log('缓存fn')
        debugger
    },[])


    return (
        <div>
            11
        </div>
    )
}
export default Test


//
// import {useCallBack,memo} from 'react';
// /**父组件**/
// const Parent = () => {
//     const [parentState,setParentState] = useState(0);  //父组件的state
//
//     return (<div>
//         <Button onClick={() => setParentState(val => val+1)}>
//             点击我改变父组件中与Child组件无关的state
//         </Button>
//         //将父组件的函数传入子组件
//         <Child fun={() => {
//             console.log("需要传入子组件的函数");
//         }}></Child>
//         <div>)
//             }
//
//             /**被memo保护的子组件**/
//             const Child = memo(() => {
//                 consolo.log("我被打印了就说明子组件重新构建了")
//                 return <div><div>
//             })
//
//
//
//             React.memo检测的是props中数据的栈地址是否改变。而父组件重新构建的时候，会重新构建父组件中的所有函数（旧函数销毁
//             ，新函数创建，等于更新了函数地址）,新的函数地址传入到子组件中被props检测到栈地址更新。也就引发了子组件的重新渲染。
//
//             所以，在上面的代码示例里面，子组件是要被重新渲染的。
//
