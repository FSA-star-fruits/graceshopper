import React, {Component} from 'react'
import {connect} from 'react-redux'

class GuestCart extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const {cartItems} = this.props

    const orders = cartItems.orders
    if (orders.length === 0) {
      return (
        <div>
          <p>Your Cart Is Currently Empty.</p>
        </div>
      )
    }
    return (
      <div>
        <h2>Items in your cart: </h2>
        {orders.map((item, idx = 0) => {
          return (
            <div key={idx}>
              {idx}. {item.car.brand} {item.car.name}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cartItems
  }
}

export default connect(mapState, null)(GuestCart)
