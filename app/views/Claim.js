import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import EthSpinner from '../components/EthSpinner'
import getCredentials from '../utils'
import axios from 'axios'
import web3 from '../web3'
import config from '../../configs/config.js'
import { getEnsLabelHash } from '@netgum/utils'

const { soliditySha3 } = web3.utils
const { sign } = web3.eth

const CREATE_ACCOUNT_SIGNER_API = 'http://localhost:3000'

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

  async fetchData () {
    const pk = this.props.match.params.privateKey
    const $this = this

    this.setState({
      pending: true
    })

    const { privateKey, walletContract } = await getCredentials()
    this.setState({
      privateKey,
      walletContract
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
    this.fetchData()
  }

  updateEnsName (evt) {
    this.setState({
      ensName: evt.target.value
    })
  }

  async claimFunds () {
    this.setState({
      pending: true
    })
    const $this = this
    const ensSubdomain = 'account3.test'
    const refundAmount = 0
    const { privateKey, deviceAddress, walletContract } = await getCredentials()

    return new Promise(async (resolve, reject) => {
      let accountAddressEndpoint = `${CREATE_ACCOUNT_SIGNER_API}/accountForDevice`
      accountAddressEndpoint += '?'
      accountAddressEndpoint += 'device=' + deviceAddress
      console.log(`Requesting ${accountAddressEndpoint}`)
      let reservedAddress
      const accountAddressRes = await axios.get(accountAddressEndpoint)
      console.log('RESPONSE: ', accountAddressRes)
      reservedAddress = accountAddressRes.data
      
      // TODO: Sweep funds to reservedAddress

      const message = soliditySha3(
        config.accountProviderAddress,
        '0x0ed641b2', //getMethodSignature('createAccount', 'bytes32', 'uint256', 'bytes'),
        getEnsLabelHash(ensSubdomain),
        refundAmount,
      )

      const deviceSignature = await sign(message, deviceAddress)

      let createAccountEndpoint = `${CREATE_ACCOUNT_SIGNER_API}/signCreateAccount`
      createAccountEndpoint += '?'
      createAccountEndpoint += 'ensSubdomain=' + ensSubdomain + '&'
      createAccountEndpoint += 'refundAmount=' + refundAmount + '&'
      createAccountEndpoint += 'deviceSignature=' + deviceSignature
      console.log(`Requesting ${createAccountEndpoint}`)
      let createAccountResponse = await axios.get(createAccountEndpoint)
      console.log('RESPONSE: ', res)

      // setTimeout(() => {
      //   $this.props.history.push('/')
      //   resolve()
      // }, 1000)
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
        <TextInput value={this.state.ensName} onChange={this.updateEnsName.bind(this)}  /><AtSymbol>@</AtSymbol><EnsDomain>cryptoflash.eth</EnsDomain>
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
