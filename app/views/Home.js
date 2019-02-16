import React from 'react'
import styled from 'styled-components'
import Balance from '../components/Balance'
import SendFunds from '../components/SendFunds'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Balance />
        <br /><br />
        <SendFunds />
      </div>
    )
  }
}

export default Home
