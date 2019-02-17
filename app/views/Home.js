import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import getCredentials from '../utils'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Link to="/send">
          <Button>Send Funds</Button>
        </Link>
      </div>
    )
  }

  async componentDidMount () {
    const { privateKey, walletContract } = await getCredentials()
    this.setState({
      privateKey,
      walletContract
    })
  }

}

export default Home
