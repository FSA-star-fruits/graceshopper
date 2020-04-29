import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCar} from '../../store/cars'
import {buildfetchSingleCarThunk} from '../../store/singleCar'

class AdminEditCar extends Component {
  constructor() {
    super()
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

  componentDidMount() {
    const carId = this.props.match.params.carId
    this.props.buildfetchSingleCarThunk(carId)
  }

  handleSubmit(event) {
    event.preventDefault()
    const carId = this.props.match.params.carId
    const state = this.state
    const editCar = {
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
      isSold: state.isSold,
      inventory: state.inventory
    }
    this.props.updateCar(carId, editCar)
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
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            name="brand"
            defaultValue={this.props.singleCar.brand}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            defaultValue={this.props.singleCar.name}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="image">Image:</label>
          <input
            type="text"
            name="image"
            defaultValue={this.props.singleCar.image}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            defaultValue={this.props.singleCar.price}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="year">Year:</label>
          <input
            type="text"
            name="year"
            defaultValue={this.props.singleCar.year}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="color">Color:</label>
          <input
            type="text"
            name="color"
            defaultValue={this.props.singleCar.color}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="interiorColor">Interior Color:</label>
          <input
            type="text"
            name="interiorColor"
            defaultValue={this.props.singleCar.interiorColor}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="engineType">Engine Type:</label>
          <input
            type="text"
            name="engineType"
            defaultValue={this.props.singleCar.engineType}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="stockNo">StockNo:</label>
          <input
            type="text"
            name="stockNo"
            defaultValue={this.props.singleCar.stockNo}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="transmission">Transmission:</label>
          <input
            type="text"
            name="transmission"
            defaultValue={this.props.singleCar.transmission}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="doors">Doors:</label>
          <input
            type="text"
            name="doors"
            defaultValue={this.props.singleCar.doors}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="vin">Vin:</label>
          <input
            type="text"
            name="vin"
            defaultValue={this.props.singleCar.vin}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="vehicleId">Vehicle Id:</label>
          <input
            type="text"
            name="vehicleId"
            defaultValue={this.props.singleCar.vehicleId}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="isSold">Is Sold:</label>
          <input
            type="text"
            name="isSold"
            defaultValue={this.props.singleCar.isSold}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="inventory">Inventory:</label>
          <input
            type="text"
            name="inventory"
            defaultValue={this.props.singleCar.inventory}
            onChange={this.handleChange}
          />
          <br />

          <button className="ui primary button" type="submit">
            Enter
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  singleCar: state.singleCar
})

const mapDispatch = dispatch => ({
  updateCar: (carId, editCar) => {
    return dispatch(updateCar(carId, editCar))
  },
  buildfetchSingleCarThunk: carId => {
    return dispatch(buildfetchSingleCarThunk(carId))
  }
})

export default connect(mapState, mapDispatch)(AdminEditCar)
