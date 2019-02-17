import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import LinkButton from '../components/LinkButton'

class Send extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <TextInputStyled />
        <Button>Generate Link</Button>
        <br />
        <Link to="/">
          <LinkButton>Cancel</LinkButton>
        </Link>
      </div>
    )
  }
}

const TextInputStyled = styled(TextInput)`
  margin-right: 10px;
`

export default Send
