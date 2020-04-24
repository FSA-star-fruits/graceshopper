import React, {Component} from 'react'
import {connect} from 'react-redux'
import {tossCartItem} from '../store/cartItems'

class GuestCart extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {}

  handleRemove(item) {
    this.props.tossCartItem(item)
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
    }
    return (
      <div>
        <h2>Items in your cart: </h2>
        {orders.map((item, idx = 0) => {
          return (
            <div key={idx}>
              {idx}. {item.car.brand} {item.car.name}
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

const mapState = state => {
  return {
    cartItems: state.cartItems
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
