import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import EthSpinner from '../components/EthSpinner'
import getCredentials from '../utils'
import axios from 'axios'

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

  claimFunds () {
    this.setState({
      pending: true
    })
    const $this = this
    const ensSubdomain = 'account3.test'
    // TODO: do the whole fund claiming thing??
    return new Promise((resolve, reject) => {
      let accountAddressEndpoint = `${CREATE_ACCOUNT_SIGNER_API}/accountForEnsSubdomain`
      accountAddressEndpoint += '?'
      accountAddressEndpoint += 'ensSubdomain=' + ensSubdomain
      console.log(`Requesting ${accountAddressEndpoint}`)
      let reservedAddress
      axios.get(accountAddressEndpoint).then((res) => {
        console.log('RESPONSE: ', res)
        reservedAddress = res.data
      }).then(() => {
        // TODO: Sweep funds to reservedAddress
      }).then(() => {
        const ensSubdomain = 'account3.test'
        const refundAmount = 0
        const deviceSignature = '0x3aad30cf5c545632bc54353fbc992f0bc8b91c5e87a5e43cee5f199a7765ddad41781831a5a38dffecb6a343316bfa4de6263f9f7aa66dd8abf7e7d17c8e194a00'

        let accountAddressEndpoint = `${CREATE_ACCOUNT_SIGNER_API}/signCreateAccount`
        accountAddressEndpoint += '?'
        accountAddressEndpoint += 'ensSubdomain=' + ensSubdomain + '&'
        accountAddressEndpoint += 'refundAmount=' + refundAmount + '&'
        accountAddressEndpoint += 'deviceSignature=' + deviceSignature
        console.log(`Requesting ${accountAddressEndpoint}`)
        return axios.get(accountAddressEndpoint)
      }).then((res) => {
        console.log('RESPONSE: ', res)
      })
      .catch(function (error) {
        console.log(error);
      })
      
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
