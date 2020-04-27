import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addCar} from '../store/cars'

export class AdminAddCar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brand: '',
      name: '',
      image: '',
      price: '',
      year: '',
      color: '',
      interiorColor: '',
      engineType: '',
      stockNo: '',
      transmission: '',
      doors: '',
      vin: '',
      vehicleId: '',
      isSold: '',
      inventory: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const state = this.state
    const newCar = {
      brand: state.brand,
      name: state.name,
      image: state.image,
      price: state.price,
      year: state.year,
      color: state.color,
      interiorColor: state.interiorColor,
      engineType: state.engineType,
      stockNo: state.stockNo,
      transmission: state.transmission,
      doors: state.doors,
      vin: state.vin,
      vehicleId: state.vehicleId,
      isSold: false,
      inventory: state.inventory
    }
    this.props.addCar(newCar)
    this.props.history.push('/admin')
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="five wide field">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              name="brand"
              value={this.state.brand}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="image">Image:</label>
            <input
              type="text"
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="price">Price:</label>
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <br />
          </div>
          <div className="five wide field">
            <label htmlFor="year">Year:</label>
            <input
              type="text"
              name="year"
              value={this.state.year}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="color">Color:</label>
            <input
              type="text"
              name="color"
              value={this.state.color}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="interiorColor">Interior Color:</label>
            <input
              type="text"
              name="interiorColor"
              value={this.state.interiorColor}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="engineType">Engine Type:</label>
            <input
              type="text"
              name="engineType"
              value={this.state.engineType}
              onChange={this.handleChange}
            />
            <br />
          </div>
          <div className="five wide field">
            <label htmlFor="stockNo">StockNo:</label>
            <input
              type="text"
              name="stockNo"
              value={this.state.stockNo}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="transmission">Transmission:</label>
            <input
              type="text"
              name="transmission"
              value={this.state.transmission}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="doors">Doors:</label>
            <input
              type="text"
              name="doors"
              value={this.state.doors}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="vin">Vin:</label>
            <input
              type="text"
              name="vin"
              value={this.state.vin}
              onChange={this.handleChange}
            />
            <br />
          </div>
          <div className="four wide field">
            <label htmlFor="vehicleId">Vehicle Id:</label>
            <input
              type="text"
              name="vehicleId"
              value={this.state.vehicleId}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="inventory">Inventory:</label>
            <input
              type="text"
              name="inventory"
              value={this.state.inventory}
              onChange={this.handleChange}
            />
            <br />
          </div>

          <br />
        </form>
        <button className="ui primary button" type="submit">
          Add Car
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  addCar: newCar => dispatch(addCar(newCar))
})

export default connect(null, mapDispatch)(AdminAddCar)
