import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  gotCartItems,
  tossCartItem,
  increaseQuantityCart
} from '../store/cartItems'

class CheckOut extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const userID = this.props.match.params.userID
    this.props.getCartItems(userID)
  }

  render() {
    const {cartItems} = this.props
    const orders = cartItems.orders

    return (
      <div>
        <h2>Thanks for purchasing the following items!: </h2>
        {orders.map((item, idx = 0) => {
          return (
            <div key={true}>
              {idx}. {item.car.brand} {item.car.name}
              {item.quantity}
            </div>
          )
        })}

        {orders[0] ? (
          <h3>{`Your order number is: ${orders[0].id}`}</h3>
        ) : (
          <p>Nope</p>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cartItems
  }
}

const mapDispatch = dispatch => ({
  //might need to use remove thunk to clear out users cart after rendering the summary of what they bought. OR can jus tnot render a summary of what they purchased?
  getCartItems: userID => {
    dispatch(gotCartItems(userID))
  },
  tossCartItem: item => {
    dispatch(tossCartItem(item))
  },
  getincreaseQuantityCart: (carId, value, userId) => {
    dispatch(increaseQuantityCart(carId, value, userId))
    dispatch(gotCartItems(userId))
  }
})

export default connect(mapState, mapDispatch)(CheckOut)
