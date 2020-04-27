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
  handleQuantity(value, item, idx) {
    const userId = this.props.match.params.userID

    this.props.getincreaseQuantityCart(value, userId, item, idx)
  }
  // handleQuantity(carId, value) {
  //   this.props.getincreaseQuantityCart(carId, value, null)
  // }

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
              {item.quantity}
              <button
                className="ui basic button"
                type="button"
                onClick={() => this.handleQuantity(true, item, idx)}
              >
                +
              </button>
              <button
                className="ui basic button"
                type="button"
                onClick={() => this.handleQuantity(false, item, idx)}
              >
                -
              </button>
              <button
                key={idx}
                className="ui basic button"
                type="button"
                onClick={() => this.handleRemove(item)}
              >
                {' '}
                REMOVE
              </button>
            </div>
          )
        })}

        <Link to="/signup">
          <button className="ui primary button" type="button">
            {' '}
            Check Out!
          </button>
        </Link>
      </div>
    )
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
  getincreaseQuantityCart: (value, userId, item, idx) => {
    dispatch(increaseQuantityCart(value, userId, item, idx))
  }
})

export default connect(mapState, mapDispatch)(GuestCart)
