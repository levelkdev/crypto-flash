import React from 'react'
import { Link } from 'react-router-dom'
import Balance from '../components/Balance'
import Button from '../components/Button'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Link to="/send">
          <Button>SEND IT</Button>
        </Link>
      </div>
    )
  }
}

export default Home
