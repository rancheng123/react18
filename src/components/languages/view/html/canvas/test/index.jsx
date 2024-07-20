import { useCallback } from 'react';

function Test() {


    // 每次都声明新的函数实例
    var fn = () => {
        alert(1)
    }

    // 缓存函数的指针（保存第一次声明函数的指针，如果依赖不变化，一直返回旧的指针），（避免每次都重新创建实例， 优化性能）。
    fn = useCallback(fn, []);

    return (
        /*react 比对是浅比较，只比较指针， 不缓存指针的话，每次都是新的函数指针，每次都要更新子组件，耗费性能*/
        <Child onChoose={fn} />
    );
}

function Child(){
    return (
        <div></div>
    )
}


export default Test;