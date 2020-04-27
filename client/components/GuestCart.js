import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  gotCartItems,
  tossCartItem,
  increaseQuantityCart
} from '../store/cartItems'

class GuestCart extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleRemove = this.handleRemove.bind(this)
    this.handleQuantity = this.handleQuantity.bind(this)
  }

  componentDidMount() {
    const userID = this.props.match.params.userID
    this.props.getCartItems(userID)
  }

  handleRemove(item) {
    this.props.tossCartItem(item)
  }

  handleQuantity(item, value, idx) {
    if (item.quantity > 1) {
      this.props.getincreaseQuantityCart(item, value, null, idx)
    } else {
      this.props.tossCartItem(item)
    }
  }

  render() {
    const {cartItems} = this.props
    const orders = cartItems.orders
    if (orders.length === 0) {
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
                {idx + 1}. {item.car.brand} {item.car.name} (Qty:{' '}
                {item.quantity})
                <button
                  type="button"
                  onClick={() => this.handleQuantity(item, true, idx)}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => this.handleQuantity(item, false, idx)}
                >
                  -
                </button>
                <button type="button" onClick={() => this.handleRemove(item)}>
                  {' '}
                  REMOVE
                </button>
              </div>
            )
          })}
          <Link to="/signup">
            <button type="button"> Check Out!</button>
          </Link>
        </div>
      )
    }
  }
}

const mapState = state => ({
  cartItems: state.cartItems
})

const mapDispatch = dispatch => ({
  getCartItems: userID => {
    dispatch(gotCartItems(userID))
  },
  tossCartItem: item => {
    dispatch(tossCartItem(item))
  },
  getincreaseQuantityCart: (item, value, userId, idx) => {
    dispatch(increaseQuantityCart(item, value, userId, idx))
  }
})

export default connect(mapState, mapDispatch)(GuestCart)
