import {useEffect, useState} from "react";


const useLanguageList = ()=>{
    let [languages, setLanguages] = useState([]);
    let [isDone, setIsDone] = useState(false)

    useEffect( ()=>{
        new Promise((resolve)=>{
            console.log('requestData')
            setTimeout(()=>{
                var res = [
                    {
                        name: 'English',
                        flag: 'https://files.axshare.com/gsc/28BWJM/d9/ad/a0/d9ada01fc1ea45489b26f0bba7874bc0/images/%E8%AF%AD%E7%A7%8D%E5%88%87%E6%8D%A2/u30.svg?pageId=ee8af6d0-32c5-4107-b1a5-3981cd00db52'
                    },
                    {
                        name: 'Chinese',
                        flag: 'https://files.axshare.com/gsc/28BWJM/d9/ad/a0/d9ada01fc1ea45489b26f0bba7874bc0/images/语种切换/u31.svg?pageId=ee8af6d0-32c5-4107-b1a5-3981cd00db52'
                    },
                    {
                        name: 'French',
                        flag: 'https://files.axshare.com/gsc/28BWJM/d9/ad/a0/d9ada01fc1ea45489b26f0bba7874bc0/images/语种切换/u32.svg?pageId=ee8af6d0-32c5-4107-b1a5-3981cd00db52'
                    }
                ]
                resolve(res)
            },2000)
        }).then((res)=>{
            setLanguages(res)

            setIsDone(true)
        })
    },[])

    return [
        languages,
        isDone
    ]
}

export default useLanguageList