import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCars, removeCar} from '../store/cars'
import {fetchUsers} from '../store/userInfo'
import AdminCar from './Admin/AdminCar'
import AdminUser from './Admin/AdminUser'

export class Admin extends Component {
  constructor() {
    super()
    this.state = {
      on: true
    }
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    this.props.fetchCars()
    this.props.fetchUsers()
  }

  toggle() {
    this.setState({
      on: !this.state.on
    })
  }

  render() {
    return (
      <div>
        {this.state.on ? (
          <AdminCar
            toggle={this.toggle}
            cars={this.props.cars}
            removeCar={this.props.removeCar}
          />
        ) : (
          <AdminUser toggle={this.toggle} users={this.props.userInfo} />
        )}
      </div>
    )
  }
}

const mapState = state => ({
  cars: state.cars,
  userInfo: state.userInfo
})

const mapDispatch = dispatch => ({
  fetchCars: () => dispatch(fetchCars()),
  removeCar: carId => dispatch(removeCar(carId)),
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(Admin)
