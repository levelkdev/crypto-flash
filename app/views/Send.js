import React from 'react'
import { Link } from 'react-router-dom'
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
        <Button>SEND</Button>
        <br />
        <Link to="/">
          <LinkButton>Cancel</LinkButton>
        </Link>
      </div>
    )
  }
}

export default Send
