import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllCars from './AllCars'
import {gotCartItems} from '../store/cartItems'
/**
 * COMPONENT
 */

class UserHome extends Component {
  componentDidMount() {
    const {id} = this.props
    this.props.getCartItems(id)
  }

  render() {
    const {email} = this.props
    return (
      <div>
        {email ? <h3>Welcome, {email}</h3> : <h3>Welcome!</h3>}
        <h3>2020 Jaguar E-pace</h3>
        <p>Starting at $39,950</p>
        <p>MPG: Up to 21 city/ 28 Highway</p>
        <p>Horsepower: 246 to 296 hp</p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQ57PaEpZbPxFjGe-3y2T-LevyR3AAfBab55eGD6ld7QlMHfd_&usqp=CAU" />
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
