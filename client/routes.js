import React, {Component} from 'react'
import {Provider} from 'react-redux'
import store from './store'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import AllCars from '../client/components/AllCars'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, SingleCar, MyCart} from './components'
import {me} from './store'
import fetchSingleCar from './store/singleCar'

class Routes extends Component {
  componentDidMount() {}

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={UserHome} />
        <Route path="/mycart" component={MyCart} />
        <Route exact path="/cars" component={AllCars} />
        <Route exact path="/cars/:carID" component={SingleCar} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

export default Routes
