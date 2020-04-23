import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postUser} from '../store/user'
import {postCar} from '../store/cars'
const faker = require('faker') // this is broken...

const brand = () => {
  const brands = [
    'Acura',
    'Aston Martin',
    'Audi',
    'Bentley',
    'BMW',
    'Bugatti',
    ' Cadillac',
    'Chevrolet',
    'Chrysler',
    'Dodge',
    'Ferrari',
    'Ford',
    'Honda',
    'Hyundai',
    'Infiniti',
    'Jaguar',
    'Jeep',
    ' Kia',
    'Lamborghini',
    'Lexus',
    'Mazda',
    'Mercedes-Benz',
    'Mitsubishi',
    'Nissan',
    'Porsche',
    'Ram',
    'Subaru',
    'Tesla',
    'Toyota',
    'Volkswagen',
    'Volvo'
  ]
  return brands[Math.floor(Math.random() * 31)]
}

const year = () => {
  const num = Math.floor(Math.random() * 21)
  return num < 10 ? +('200' + num) : +('20' + num)
}

const randomEngine = () => {
  const engine = ['VEE', 'INLINE', 'STRAIGHT', 'VR and W', 'BOXER', 'ROTARY']
  return engine[Math.floor(Math.random() * 6)]
}

const randomTransmission = () => {
  const transmission = ['Automatic', 'Manual', 'CVT', 'Semi-automatic']
  return transmission[Math.floor(Math.random() * 4)]
}

const numOfDoors = () => {
  const doors = [4, 2]
  return doors[Math.floor(Math.random() * 2)]
}

const randomNum = () => {
  return 1 + Math.floor(Math.random() * 10)
}

export class Faker extends Component {
  constructor() {
    super()
    this.state = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      brand: brand(),
      name: brand(),
      image: faker.image.animals(),
      price: 500 + Math.floor(faker.commerce.price()),
      year: year(),
      color: faker.commerce.color(),
      interiorColor: faker.commerce.color(),
      engineType: randomEngine(),
      stockNo: randomNum(),
      transmission: randomTransmission(),
      doors: numOfDoors(),
      vin: faker.finance.iban(),
      vehicleId: faker.random.number(),
      isSold: faker.random.boolean(),
      inventory: randomNum()
    }
    this.userSubmit = this.userSubmit.bind(this)
    this.carSubmit = this.carSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  userSubmit(event) {
    event.preventDefault()
    const state = this.state
    const newUser = {
      email: state.email,
      password: state.password
    }
    this.props.postUser(newUser)
    this.setState({
      email: faker.internet.email(),
      password: faker.internet.password()
    })
  }

  carSubmit(event) {
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
      isSold: state.isSold,
      inventory: state.inventory
    }
    this.props.postCar(newCar)
    this.setState({
      brand: brand(),
      name: brand(),
      image: faker.image.animals(),
      price: 500 + Math.floor(faker.commerce.price()),
      year: year(),
      color: faker.commerce.color(),
      interiorColor: faker.commerce.color(),
      engineType: randomEngine(),
      stockNo: randomNum(),
      transmission: randomTransmission(),
      doors: numOfDoors(),
      vin: faker.finance.iban(),
      vehicleId: faker.random.number(),
      isSold: faker.random.boolean(),
      inventory: randomNum()
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        {/* Submit for User */}
        <form onSubmit={this.userSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />

          <button style={{backgroundColor: 'yellow'}} type="submit">
            Add User
          </button>
        </form>

        {/* Submit for Car */}
        <form onSubmit={this.carSubmit}>
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

          <label htmlFor="vehicleId">Vehicle Id:</label>
          <input
            type="text"
            name="vehicleId"
            value={this.state.vehicleId}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="isSold">Is Sold:</label>
          <input
            type="text"
            name="isSold"
            value={this.state.isSold}
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

          <button style={{backgroundColor: 'yellow'}} type="submit">
            Add Car
          </button>
        </form>

        <h3>You need to npm install to use the faker libary</h3>
        <p>You can edit any field</p>
        <p>When you click add it will refresh with new info</p>
        <p>Only one user/car is added when you click add</p>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  postUser: newUser => dispatch(postUser(newUser)),
  postCar: newCar => dispatch(postCar(newCar))
})

export default connect(null, mapDispatch)(Faker)
