import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import LinkButton from '../components/LinkButton'
import EthSpinner from '../components/EthSpinner'
import getCredentials from '../utils'
import web3 from '../web3'

const CLAIM_URL = 'http://localhost:1234/claim/'

class Send extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ethAmount: '',
      linkGenerationPending: false,
      link: null
    }
  }

  async generateLink () {
    this.setState({
      linkGenerationPending: true
    })
    const link = await createTempAccount(
      this.deviceAddress,
      this.state.ethAmount,
      this.walletContract
    )
    this.setState({
      linkGenerationPending: false,
      link
    })
  }

  updateEthAmount (evt) {
    this.setState({
      ethAmount: evt.target.value
    })
  }

  renderForm () {
    return (
      <React.Fragment>
        <TextInputStyled value={this.state.ethAmount} onChange={this.updateEthAmount.bind(this)} />
        <Button onClick={this.generateLink.bind(this)}>Generate Link</Button>
        <br />
        <Link to="/">
          <LinkButton>Cancel</LinkButton>
        </Link>
      </React.Fragment>
    )
  }

  renderPending () {
    return (
      <EthSpinner />
    )
  }

  renderLink () {
    return (
      <div>{this.state.link}</div>
    )
  }

  render() {
    return (
      <div>
        {!this.state.linkGenerationPending && !this.state.link ? this.renderForm() : null}
        {this.state.linkGenerationPending ? this.renderPending() : null}
        {this.state.link ? this.renderLink() : null}
      </div>
    )
  }

  async componentDidMount () {
    const { deviceAddress, walletContract } = await getCredentials()
    this.deviceAddress = deviceAddress
    this.walletContract = walletContract
  }

}

async function createTempAccount (senderAddress, ethAmount, walletContract) {
  const weiAmount = ethAmount * 10 ** 18

  // TODO: don't use timestamp for randomness...
  console.log(`Creating temp account and sending ${weiAmount} wei from sender ${senderAddress}`)
  const { address, privateKey } = await web3.eth.accounts.create(Date.now().toString())

  const txReceipt = await walletContract.executeTransaction(
    address,
    web3.utils.toBN(weiAmount),
    web3.utils.utf8ToHex(''),
    { from: senderAddress }
  )

  console.log(`Created account ${address} : ${privateKey}`)
  console.log('txReceipt: ', txReceipt)
  const claimLink = CLAIM_URL + privateKey
  console.log(claimLink)
  return claimLink
}

const TextInputStyled = styled(TextInput)`
  margin-right: 10px;
`

export default Send
