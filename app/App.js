import React from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import sparkle from './assets/sparkle.png'
import bufficorn from './assets/bufficorn.png'
import Balance from './components/Balance'
import Home from './views/Home'
import Claim from './views/Claim'
import Send from './views/Send'

const App = () => (
  <Router>
    <React.Fragment>
      <SparkleImg src={sparkle} />
      <TitleText>Crypto Flash</TitleText>
      <Content>
        <Balance />
        <br /><br />
        <Route exact path="/" component={Home}/>
        <Route path="/claim" component={Claim}/>
        <Route path="/send" component={Send}/>
      </Content>
      <BigSparkle src={sparkle} />
      <Bufficorn src={bufficorn} />
    </React.Fragment>
  </Router>
)

const Content = styled.div`
  text-align: center;
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

const BigSparkle = styled.img`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 150px;
`

const Bufficorn = styled.img`
  position: absolute;
  bottom: 5px;
  right: 200px;
  width: 80px;
  transform: scaleX(-1) rotate(60deg);
  filter: FlipH;
`

export default App