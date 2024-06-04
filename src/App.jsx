import { useState, useReducer, useEffect } from 'react'
import Router from './routes'
import './App.css'
import Header from './template/header/header_controler'
import Content from './template/content/content_controler'

import { useDispatch, useSelector } from 'react-redux'
import { fetchToken } from '@/store/module/userStore'

function App(props) {
  const [count, setCount] = useState(0);
  const initState = {
    showHidden: true,
  }
  const reducers = (state, action) => {
    switch (action.type) {
      case 'showHidden':
        return {
          ...state,
          showHidden: action.showHidden
        }
      default:
        return { ...state, ...action }
    }
  }
  const [state, dispatch] = useReducer(reducers, initState);

  const setData = (data) => {
    dispatch({
      ...state,
      ...data,
    })
  }

  const hanlderIcon = (type) => {
    switch (type) {
      case "showHidden":
        setData({
          showHidden: !state.showHidden
        })
      default:
    }
  }


  // TODO模拟代码
  const [load, setLoad] = useState(false)
  const dispatchToken = useDispatch()
  const token = useSelector(state => state.userStore.token)
  const init = async () => {
    const timestamp = Math.floor(Date.now() / 1000);
    // 如果token不存在或者过期刷新token
    if (!token || token.expiration < timestamp) {
      await dispatchToken(fetchToken())
    }
    setLoad(true)
  }

  useEffect(() => {
    init()
  }, [])


  return (
    <div className='editorCon'>
      {load && <Header />}
      <Content load={props.load} />
      {/* <Router /> */}
    </div>
  )
}

export default App
