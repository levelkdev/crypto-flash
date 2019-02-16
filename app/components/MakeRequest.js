import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const CREATE_ACCOUNT_SIGNER_API = 'http://localhost:3000'

class MakeRequest extends React.Component {
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
      <Button onClick={this.handleClick}>MAKE REQUEST</Button>
    )
  }
}

const Button = styled.div`
  background: #ffc107;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  display: inline-block;
`

export default MakeRequest
