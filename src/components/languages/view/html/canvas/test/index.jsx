import React, { useCallback, useState } from 'react';
/*
useCallback
    作用
        记住函数的引用，优化性能（避免在每次渲染时都创建一个新的函数实例）。


使用场景：




*/
function Test() {
    var fn = () => {
        console.log('This function is memoized and will not change unless its dependencies change.');
    }
     //fn = useCallback(fn, []); // 第二个参数是依赖项数组，这里为空数组意味着该函数不依赖于任何 props 或 state，所以它将在组件的整个生命周期中保持不变
    var [state1, setState1] = useState(0)

    return (
        <div>
            <div onClick={()=>{
                setState1(state1+=1)
            }}>
                {state1}
            </div>
            <ChildComponent onButtonClick={fn} />
        </div>
    );
}

function ChildComponent({ onButtonClick }) {
    return <button onClick={onButtonClick}>Click me</button>;
}

export default Test;

/*
在这个例子中，memoizedCallback 函数在 ParentComponent 中定义，并通过 ChildComponent 的 prop onButtonClick
传递。由于 useCallback 的第二个参数是一个空数组，意味着该函数不依赖于任何外部值，因此它将在整个组件的生命周期中保持不变，
避免了不必要的重复定义，从而提高了性能。

*/