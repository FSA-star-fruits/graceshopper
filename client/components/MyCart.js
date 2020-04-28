import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  gotCartItems,
  tossCartItem,
  increaseQuantityCart,
  checkoutUserCartOrder
} from '../store/cartItems'

import './MyCart.css'
class MyCart extends Component {
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
    const userID = this.props.match.params.userID
    this.props.getCartItems(userID)
  }

  handleQuantity(item, value, idx) {
    const userId = this.props.match.params.userID
    if (item.quantity <= 1 && value === false) {
      this.props.tossCartItem(item)
    } else {
      this.props.getincreaseQuantityCart(item, value, userId, idx)
    }
  }
  handleCheckOut(orders) {
    const userId = this.props.match.params.userID
    this.props.postCheckoutUserCartOrder(userId, orders)
  }

  render() {
    const {cartItems} = this.props
    const orders = cartItems.orders
    const userID = this.props.match.params.userID
    if (orders.length === 0) {
      return (
        <div>
          <h2>Your cart is currently empty. </h2>
          <div id="order_history">
            <Link to={`/users/${userID}/orderhistory`}>
              <button className="ui primary button" type="button">
                {' '}
                Order History
              </button>
            </Link>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Items in your cart: </h2>
          <h2>
            Total Price: $
            {orders.reduce(
              (accumulator, currentValue) =>
                currentValue.price * currentValue.quantity + accumulator,
              0
            )}
          </h2>

          {orders.map((item, idx = 0) => {
            return (
              <div id="cart_item" key={idx}>
                <img id="cart_image" src={item.car.image} />
                <h4>
                  {item.car.brand} {item.car.name} Price: {+item.price}
                </h4>

                <div id="cart_quantity">
                  <button
                    className="mini ui basic button"
                    type="button"
                    onClick={() => this.handleQuantity(item, false, idx)}
                  >
                    -
                  </button>
                  <div id="quantity_num">
                    <strong>{item.quantity}</strong>
                  </div>
                  <button
                    className="mini ui basic button"
                    type="button"
                    onClick={() => this.handleQuantity(item, true, idx)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    key={idx}
                    className="mini ui basic button"
                    type="button"
                    onClick={() => this.handleRemove(item)}
                  >
                    {' '}
                    X
                  </button>
                </div>
              </div>
            )
          })}
          <div id="checkout_button">
            <Link to={`/users/${userID}/checkout`}>
              <button
                className="ui primary button"
                type="button"
                onClick={() => this.handleCheckOut(orders)}
              >
                {' '}
                Check Out!
              </button>
            </Link>
          </div>
          <div id="order_history">
            <Link to={`/users/${userID}/orderhistory`}>
              <button className="ui primary button" type="button">
                {' '}
                Order History
              </button>
            </Link>
          </div>
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
  getincreaseQuantityCart: (item, value, userId, idx) => {
    dispatch(increaseQuantityCart(item, value, userId, idx))
  },
  postCheckoutUserCartOrder: (userId, orders) => {
    dispatch(checkoutUserCartOrder(userId, orders))
  }
})

export default connect(mapState, mapDispatch)(MyCart)
