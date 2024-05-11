import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import App from '../../src/App'

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
