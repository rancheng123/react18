import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../../src/App'

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
