import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css' 

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
