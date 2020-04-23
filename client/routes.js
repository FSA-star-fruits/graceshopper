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
import {Login, Signup, UserHome, SingleCar, MyCart, Faker} from './components'
import {me} from './store'
import fetchSingleCar from './store/singleCar'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={UserHome} />
        <Route exact path="/mycart" component={MyCart} />
        <Route exact path="/users/:userID/mycart" component={MyCart} />
        <Route exact path="/cars" component={AllCars} />
        <Route exact path="/cars/:carID" component={SingleCar} />
        <Route exact path="/add" component={Faker} />

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

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
