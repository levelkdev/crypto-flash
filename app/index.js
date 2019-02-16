import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background: #e83e8c;
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
