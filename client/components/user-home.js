import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllCars from './AllCars'
import {Link} from 'react-router-dom'
import {gotCartItems} from '../store/cartItems'
/**
 * COMPONENT
 */

import './user-home.css'
class UserHome extends Component {
  componentDidMount() {
    const {id} = this.props
    this.props.getCartItems(id)
  }

  render() {
    const {email} = this.props
    return (
      <div className="home">
        <div className="home_text">
          {email ? <h3>Welcome, {email}</h3> : <h3>Welcome!</h3>}
          <div className="home_image">
            <Link to="/cars">
              <img src="https://i.imgur.com/m2KqrJg.png" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id
  }
}
const mapDispatch = dispatch => {
  return {
    getCartItems: id => {
      dispatch(gotCartItems(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
