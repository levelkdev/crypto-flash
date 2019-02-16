import React from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import sparkle from './assets/sparkle.png'
import Home from './views/Home'
import Claim from './views/Claim'

const App = () => (
  <Router>
    <AppStyled>
      <SparkleImg src={sparkle} />
      <TitleText>Crypto Flash</TitleText>
      <Route exact path="/" component={Home}/>
      <Route path="/claim" component={Claim}/>
    </AppStyled>
  </Router>
)

const AppStyled = styled.div`
  
`

const TitleText = styled.span`
  padding-left: 15px;
  top: -16px;
  position: relative;
  font-size: 28px;
`

const SparkleImg = styled.img`
  width: 50px;
`

export default App