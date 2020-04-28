import React from 'react'
import {connect} from 'react-redux'
// import {fetchCars} from '../store/cars'
import {fetchCars, gotCartItems} from '../store'
import {Link} from 'react-router-dom'

import './AllCars.css'
export class AllCars extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getCars()
  }

  render() {
    const cars = this.props.cars
    if (!cars) {
      return <p>No Cars</p>
    }
    return (
      <div className="ui two column grid">
        <h2>Cars Instock</h2>
        <div className="two column row">
          {cars.map(car => {
            return (
              <div className="column" key={car.id}>
                <div className="ui segment" key={car.id}>
                  <Link to={`/cars/${car.id}`}>
                    <div id="car_badge">
                      <img src="https://i.imgur.com/f5Fidzs.png" />
                    </div>
                    <div className="car_image">
                      <img src={car.image} />
                    </div>
                    <div id="car_footer">
                      <div id="car_details">
                        <p>
                          {car.brand} {car.name} {car.year}
                        </p>
                      </div>
                      <div id="car_price">
                        <p>${car.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
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
