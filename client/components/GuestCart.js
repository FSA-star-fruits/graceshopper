import React, {Component} from 'react'
import {connect} from 'react-redux'
import {tossCartItem} from '../store/cartItems'

class GuestCart extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    console.log('GuestCart Props >>>>>', this.props)
  }

  handleRemove(item) {
    this.props.tossCartItem(item)
  }

  render() {
    const {orders} = this.props.cartItems
    const {cars} = this.props
    if (!orders[0]) {
      return (
        <div>
          <p>Your Cart Is Currently Empty.</p>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Items in your cart: </h2>
          {orders.map((item, idx = 0) => {
            return (
              <div key={idx}>
                {idx + 1}.{cars.filter(car => car.id === item.carId)[0].brand}{' '}
                {cars.filter(car => car.id === item.carId)[0].name}{' '}
                {item.quantity}
                <button
                  type="button"
                  onClick={() => {
                    this.handleRemove(item)
                  }}
                >
                  {' '}
                  REMOVE
                </button>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    cartItems: state.cartItems,
    cars: state.cars
  }
}
const mapDispatch = dispatch => {
  return {
    tossCartItem: item => {
      dispatch(tossCartItem(item))
    }
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
