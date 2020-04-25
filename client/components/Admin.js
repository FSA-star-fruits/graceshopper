import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCars, removeCar} from '../store/cars'

export class Admin extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCars()
  }

  render() {
    return (
      <div>
        <h1>All Cars</h1>
        <Link to="/admin/add">
          <button type="button">Add Car</button>
        </Link>
        {this.props.cars.length > 0 ? (
          <div>
            {this.props.cars.map(car => {
              return (
                <div key={car.id}>
                  <Link to={`/cars/${car.id}`}>
                    <img
                      src={car.image}
                      style={{width: '150px', height: '150px'}}
                    />
                    <p>{car.brand}</p>
                    <p>{car.price}</p>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      this.props.removeCar(car.id)
                    }}
                  >
                    Remove
                  </button>

                  <Link to={`/admin/edit/${car.id}`}>
                    <button type="button">Edit</button>
                  </Link>
                  <hr />
                </div>
              )
            })}
          </div>
        ) : (
          <div>
            <h2>There are no cars</h2>
            <p>Please register your car</p>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  cars: state.cars
})

const mapDispatch = dispatch => ({
  fetchCars: () => dispatch(fetchCars()),
  removeCar: carId => dispatch(removeCar(carId))
})

export default connect(mapState, mapDispatch)(Admin)
