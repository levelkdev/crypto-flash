import React from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import EthSpinner from '../components/EthSpinner'
import getCredentials from '../utils'

class Claim extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      claimBalance: null,
      ensName: '',
      ensNameCreated: false
    }
  }

  fetchClaimBalance () {
    const pk = this.props.match.params.privateKey
    const $this = this
    // TODO: fetch the actual balance for pk
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        $this.setState({
          claimBalance: '100'
        })
        resolve()
      }, 2000)
    })
  }

  componentDidMount () {
    this.fetchClaimBalance()
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
        <SubmitButton>
          Claim <ClaimBalance>{this.state.claimBalance} ETH</ClaimBalance>
        </SubmitButton>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div>
        {!this.state.claimBalance ? this.renderPending() : this.renderClaimForm()}
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

export default Claim
