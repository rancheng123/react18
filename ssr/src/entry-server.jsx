import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
<<<<<<< HEAD
import App from './App'
=======
import App from '../../src/App'
>>>>>>> 470503b (RN-000: 测试服务)

/**
 * @param {string} url
 * @param {string} [ssrManifest]
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 */
export function render(url, ssrManifest, options) {
  return renderToPipeableStream(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    options
  )
}
