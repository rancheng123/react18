import {useEffect, useState, useCallback} from "react";
import {Select} from "antd";


const News = () => {

    let [languages, setLanguages] = useState([])

    useEffect( ()=>{
        new Promise((resolve)=>{
            console.log('requestData')
            setTimeout(()=>{
                var res = [
                    {
                        name: 'English'
                    },
                    {
                        name: 'Chinese'
                    },
                    {
                        name: 'French'
                    }
                ]
                resolve(res)
            },2000)
        }).then((res)=>{
            setLanguages(res)
        })
    },[])

    return (
        <div className={'languageSwitch'} defaultValue="English">
            {languages.map((language, index)=>{
                return (
                    <span className={'languageSwitchText'} key={index}>
                        <span className={'active'} value={language.name}>{language.name}</span>
                        {(()=>{
                            if(index !== (languages.length - 1)){
                                return (
                                    <span>
                                        |
                                    </span>
                                )
                            }
                        })()}

                    </span>

                )
            })}
        </div>
    )
}

export default News