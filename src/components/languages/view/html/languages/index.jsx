import {useEffect, useState, useCallback} from "react";
import {Select} from "antd";

const News = ({
                  isHasFlag,
                  isHasName,
                  type = 'tile',
                  value = '',
                  onChange = () =>{},
                  languages = []
}) => {
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
                                    if(match){
                                        return match.flag
                                    }else{
                                        return ''
                                    }

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