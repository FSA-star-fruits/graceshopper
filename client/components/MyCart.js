import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  gotCartItems,
  tossCartItem,
  increaseQuantityCart
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
    if (userID) {
      this.props.getCartItems(userID)
    }
  }

  handleRemove(item) {
    this.props.tossCartItem(item)
    const userID = this.props.match.params.userID
    this.props.getCartItems(userID)
  }
  handleQuantity(value, item, idx) {
    const userId = this.props.match.params.userID

    this.props.getincreaseQuantityCart(value, userId, item, idx)
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
              <div id="cart_item" key={idx}>
                <img id="cart_image" src={item.car.image} />
                <h4>
                  {item.car.brand} {item.car.name}
                </h4>

                <div id="cart_quantity">
                  <button
                    className="mini ui basic button"
                    type="button"
                    onClick={() => this.handleQuantity(false, item, idx)}
                  >
                    -
                  </button>
                  <div id="quantity_num">
                    <strong>{item.quantity}</strong>
                  </div>
                  <button
                    className="mini ui basic button"
                    type="button"
                    onClick={() => this.handleQuantity(true, item, idx)}
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
              <button className="ui primary button" type="button">
                {' '}
                Check Out!
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
  getincreaseQuantityCart: (value, userId, item, idx) => {
    dispatch(increaseQuantityCart(value, userId, item, idx))
  }
})

export default connect(mapState, mapDispatch)(MyCart)
