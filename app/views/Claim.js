import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import EthSpinner from '../components/EthSpinner'
import getCredentials from '../utils'


class Claim extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pending: false,
      claimBalance: null,
      ensName: '',
      ensNameCreated: false
    }
  }

  fetchClaimBalance () {
    const pk = this.props.match.params.privateKey
    const $this = this
    this.setState({
      pending: true
    })
    // TODO: fetch the actual balance for pk
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        $this.setState({
          pending: false,
          claimBalance: '100'
        })
        resolve()
      }, 1000)
    })
  }

  componentDidMount () {
    this.fetchClaimBalance()
  }

  claimFunds () {
    this.setState({
      pending: true
    })
    const $this = this
    // TODO: do the whole fund claiming thing??
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        $this.props.history.push('/')
        resolve()
      }, 1000)
    })
  }

  renderPending () {
    return (
      <EthSpinner />
    )
  }

  renderClaimForm () {
    return (
      <React.Fragment>
        <Header>Choose a username:</Header>
        <TextInput /><AtSymbol>@</AtSymbol><EnsDomain>cryptoflash.eth</EnsDomain>
        <br /><br />
        <SubmitButton onClick={this.claimFunds.bind(this)}>
          Claim <ClaimBalance>{this.state.claimBalance} ETH</ClaimBalance>
        </SubmitButton>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div>
        {this.state.pending ? this.renderPending() : null}
        {!this.state.pending && this.state.claimBalance ? this.renderClaimForm() : null}
      </div>
    )
  }

  async componentDidMount () {
    const { privateKey, walletContract } = await getCredentials()
    this.state.privateKey = privateKey
    this.state.walletContract = walletContract
  }
}

const ClaimBalance = styled.span`
  font-weight: bold;
`

const SubmitButton = styled(Button)`
  width: 250px;
`

const Header = styled.div`
  font-size: 18px;
  padding: 20px;
`

const AtSymbol = styled.span`
  font-size: 28px;
  padding: 20px 0 20px 10px;
  color: #f6ff00;
  position: relative;
  top: 5px;;
`

const EnsDomain = styled.span`
  font-size: 28px;
  padding: 20px;
  color: white;
  position: relative;
  top: 3px;
  padding-left: 0;
`

export default withRouter(Claim)
