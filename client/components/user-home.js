import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllCars from './AllCars'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
