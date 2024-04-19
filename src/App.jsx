import { useState, useReducer } from 'react'
import Router from './routes'
import './App.css'
import Header from './template/header/header_controler'
import Content from './template/content/content_controler'

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
        return {...state, ...action}
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

  return (
    <div className='editorCon'>
      <Header />
      <Content load={props.load} />
      {/* <Router /> */}
    </div>
  )
}

export default App
