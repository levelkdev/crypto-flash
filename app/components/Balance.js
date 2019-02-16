import React from 'react'
import styled from 'styled-components'

class Balance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <StyledBalance>$7,003</StyledBalance>
    )
  }
}

const StyledBalance = styled.div`
  font-size: 36px;
  font-weight: bold;
`

export default Balance
