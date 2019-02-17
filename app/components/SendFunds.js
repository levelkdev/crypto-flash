import React from 'react'
import axios from 'axios'
import Button from './Button'

const CREATE_ACCOUNT_SIGNER_API = 'http://localhost:3000'

class SendFunds extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleClick () {
    const signerEndpoint = `${CREATE_ACCOUNT_SIGNER_API}/signCreateAccount`
    console.log(`Requesting ${signerEndpoint}`)
    axios.get(signerEndpoint).then((res) => {
      console.log('RESPONSE: ', res)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (
      <Button onClick={this.handleClick}>Send Funds</Button>
    )
  }
}

export default SendFunds
 
