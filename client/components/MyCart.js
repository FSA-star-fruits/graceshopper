import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  gotCartItems,
  tossCartItem,
  increaseQuantityCart
} from '../store/cartItems'

class MyCart extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleRemove = this.handleRemove.bind(this)
    this.handleQuantity = this.handleQuantity.bind(this)
  }

  componentDidMount() {
    const userID = this.props.match.params.userID
    if (userID) {
      this.props.getCartItems(userID)
    }
  }

  handleRemove(item) {
    this.props.tossCartItem(item)
    const userID = this.props.match.params.userID
    this.props.getCartItems(userID)
  }

  handleQuantity(carId, value) {
    const userId = this.props.match.params.userID
    this.props.getincreaseQuantityCart(carId, value, userId)
    const userID = userId
    this.props.getCartItems(userID)
  }

  render() {
    const {cartItems} = this.props
    const orders = cartItems.orders
    const userID = this.props.match.params.userID
    if (orders.length === 0) {
      return (
        <div>
          <h2>Your cart is currently empty. </h2>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Items in your cart: </h2>
          {orders.map((item, idx = 0) => {
            return (
              <div key={item.id}>
                {idx + 1}. {item.car.brand} {item.car.name} (Qty:{' '}
                {item.quantity})
                <button
                  type="button"
                  onClick={() => this.handleQuantity(item.car.id, true)}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => this.handleQuantity(item.car.id, false)}
                >
                  -
                </button>
                <button
                  key={idx}
                  type="button"
                  onClick={() => this.handleRemove(item)}
                >
                  {' '}
                  REMOVE
                </button>
              </div>
            )
          })}
          <Link to={`/users/${userID}/checkout`}>
            <button type="button"> Check Out!</button>
          </Link>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    cartItems: state.cartItems
  }
}

const mapDispatch = dispatch => ({
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

export default connect(mapState, mapDispatch)(MyCart)
