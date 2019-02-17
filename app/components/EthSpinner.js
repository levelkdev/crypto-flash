import React from 'react'
import ethImg from '../assets/eth.png'
import styled from 'styled-components'

class EthSpinner extends React.Component {
  render() {
    return (
      <EthSpinnerStyled src={ethImg} />
    )
  }
}

const EthSpinnerStyled = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  margin:-60px 0 0 -60px;
  -webkit-animation:spin 1.5s linear infinite;
  -moz-animation:spin 1.5s linear infinite;
  animation:spin 1.5s linear infinite;
`

export default EthSpinner
