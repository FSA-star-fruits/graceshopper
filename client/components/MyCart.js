import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotCartItems, tossCartItem} from '../store/cartItems'

class MyCart extends Component {
  constructor() {
    super()
    // this.state = {}
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    const userID = this.props.match.params.userID
    this.props.getCartItems(userID)
    // console.log('cartItems >>>>>', this.props)
  }

  handleRemove(item) {
    this.props.tossCartItem(item)
    const userID = this.props.match.params.userID
    this.props.getCartItems(userID)
  }

  render() {
    const {cartItems} = this.props
    const orders = cartItems.orders

    if (orders.length === 0) {
      return (
        <div>
          <h2>Your Cart Is Currently Empty.</h2>
        </div>
      )
    }
    return (
      <div>
        <h2>Items in your cart: </h2>
        {orders.map((item, idx = 0) => {
          // console.log('item >>>>> car >>>>>', item, car)
          return (
            <div key={idx}>
              {idx + 1}.{item.car.brand} {item.car.name} {item.quantity}
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
    getCartItems: userID => {
      dispatch(gotCartItems(userID))
    },
    tossCartItem: item => {
      dispatch(tossCartItem(item))
    }
  }
}

export default connect(mapState, mapDispatch)(MyCart)
