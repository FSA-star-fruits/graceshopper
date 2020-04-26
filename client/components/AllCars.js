import React from 'react'
import {connect} from 'react-redux'
// import {fetchCars} from '../store/cars'
import store, {fetchCars, gotCartItems} from '../store'
import {Link} from 'react-router-dom'

export class AllCars extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.props.getCars()
    // store.subscribe(() => store.getState())
    // this.setState({user: this.props.user})
    // if (this.state.user.id) {
    //   this.props.getCartItems(this.state.user.id)
    // }
  }

  render() {
    const cars = this.props.cars
    if (!cars) {
      return <p>No Cars</p>
    }
    return (
      <div>
        <h2>Cars that Exist</h2>
        {cars.map(car => {
          return (
            <div key={car.id}>
              <Link to={`/cars/${car.id}`}>
                <img src={car.image} />
                <p>{car.name}</p>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cars: state.cars,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getCars: () => {
      dispatch(fetchCars())
    },
    getCartItems: userId => {
      dispatch(gotCartItems(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(AllCars)
