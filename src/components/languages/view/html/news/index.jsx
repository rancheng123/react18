import {useEffect, useState, useCallback} from "react";
import {Select} from "antd";

const News = ({
                  isHasFlag,
                  isHasName,
                  type = 'tile',
                  value = '',
                  onChange = () =>{}
}) => {

    let [languages, setLanguages] = useState([])

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
        })
    },[])

    return (
        <div className={'languageSwitch'} defaultValue="English">
            {(()=>{
                // 平铺式
                if(type === 'tile'){
                    return (
                        <>
                            {languages.map((language, index)=>{
                                return (
                                    <span key={index}
                                          className={`${value === language.name ? 'selected' : ''}`}
                                          onClick={()=>{
                                              onChange(language.name)
                                          }}
                                    >
                                        {(()=>{
                                            if(isHasName){
                                                return (
                                                    <span className={'languageSwitchText'} value={language.name}>{language.name}</span>
                                                )
                                            }
                                        })()}

                                        {(()=>{
                                            if(isHasFlag){
                                                return (
                                                    <img className={'languageSwitchIcon'} src={language.flag} alt=""/>
                                                )
                                            }
                                        })()}

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
                        </>
                    )
                }
                else if (type === 'select')
                {
                    return (
                        <Select
                            value={value}
                            suffixIcon={(
                                <img src={(()=>{
                                    let match = languages.find((language)=>{
                                        return language.name === value
                                    })
                                    return match.flag
                                })()} alt=""/>
                            )}
                            style={{ width: '100%' }}
                        >
                            {languages.map((language, index)=>{
                                return  (
                                    <Select.Option
                                        key={index}
                                        onClick={(language)=>{
                                            onChange(language.name)
                                        }}
                                    >
                                        <img
                                            src={language.flag}
                                            alt=""/>
                                        {language.name}

                                    </Select.Option>
                                )
                            })}

                        </Select>
                    )
                }

            })()}

        </div>
    )
}

export default News