import React from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import sparkle from './assets/sparkle.png'
import bufficorn from './assets/bufficorn.png'
import Home from './views/Home'
import Claim from './views/Claim'
import Send from './views/Send'
import getCredentials from './utils'
import web3 from './web3'
import formatBalance from './formatBalance'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Router>
        <React.Fragment>
          <SparkleImg src={sparkle} />
          <TitleText>Crypto Flash</TitleText>
          <Content>
            { this.state.ensName ? <Username>{this.state.ensName}@cryptoflash.eth</Username> : null }
            <StyledBalance>{ this.state.balance } ETH</StyledBalance>
            <br /><br />
            <Route exact path="/" component={Home}/>
            <Route path="/claim/:privateKey" component={Claim}/>
            <Route path="/send" component={Send}/>
          </Content>
          <BigSparkle src={sparkle} />
          <Bufficorn src={bufficorn} />
        </React.Fragment>
      </Router>
    )
  }

  async componentDidMount () {
    const { privateKey, walletAddress, walletContract, ensName } = await getCredentials()

    web3.eth.accounts.wallet.add(privateKey)

    let balance = 0
    if (walletContract) {
      balance = await web3.eth.getBalance(walletAddress)
    }

    this.setState({
      privateKey,
      walletContract,
      balance: formatBalance(balance),
      ensName
    })
  }

}

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

const StyledBalance = styled.div`
  font-size: 36px;
  font-weight: bold;
`

const Username = styled.div`

`

export default App
