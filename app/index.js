import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background: #fe0672;
    color: white;
    font-family: sans-serif;
  }
`

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>,
  document.getElementById('root')
)
