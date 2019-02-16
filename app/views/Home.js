import React from 'react'
import styled from 'styled-components'
import SendFunds from '../components/SendFunds'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <SendFunds />
      </div>
    )
  }
}

export default Home
