import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import LinkButton from '../components/LinkButton'
import EthSpinner from '../components/EthSpinner'
import getCredentials from '../utils'

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
    await createTempAccount(this.state.ethAmount)
    this.setState({
      linkGenerationPending: false,
      link: 'http://something.something'
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
      <div>LINKKKK</div>
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
    const { privateKey, walletContract } = await getCredentials()
    this.state.privateKey = privateKey
    this.state.walletContract = walletContract
  }

}

async function createTempAccount (ethAmount) {
  // TODO: create a temporary account and send it eth
  console.log(`CREATE ACCOUNT WITH ${ethAmount} ETH`)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

const TextInputStyled = styled(TextInput)`
  margin-right: 10px;
`

export default Send
