import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotCartItems, tossCartItem} from '../store/cartItems'
import store from '../store'

class MyCart extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleRemove = this.handleRemove.bind(this)
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

  render() {
    const {orders} = this.props.cartItems

    if (!orders[0]) {
      return (
        <div>
          <h2>Your Cart Is Currently Empty.</h2>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Items in your cart: </h2>
          {orders.map((item, idx) => {
            return (
              <div key={item.car.id}>
                {idx + 1}. {item.car.brand} {item.car.name} {item.quantity}
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
    cartItems: state.cartItems
  }
}

const mapDispatch = dispatch => {
  return {
    getCartItems: userID => {
      dispatch(gotCartItems(userID))
    },
    tossCartItem: item => {
      dispatch(tossCartItem(item))
    }
  }
}

export default connect(mapState, mapDispatch)(MyCart)
