import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
<<<<<<< HEAD
<<<<<<< HEAD
import App from './App'
=======
import App from '../../src/App'
>>>>>>> 470503b (RN-000: 测试服务)
=======
import App from './App'
>>>>>>> f84b245 (RN-000: test ssr)

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
