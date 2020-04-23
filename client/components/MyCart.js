import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotCartItems} from '../store/cartItems'

class MyCart extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const userID = this.props.match.params.userID
    this.props.getCartItems(userID)
  }

  render() {
    const cartItems = this.props.cartItems
    if (cartItems.length === 0) {
      return (
        <div>
          <p>Your Cart Is Currently Empty.</p>
        </div>
      )
    }
    return (
      <div>
        <h2>Items in your cart: </h2>
        {cartItems.map((item, idx) => {
          return (
            <div key={item.car.id}>
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

const mapDispatch = dispatch => {
  return {
    getCartItems: userID => {
      dispatch(gotCartItems(userID))
    }
  }
}

export default connect(mapState, mapDispatch)(MyCart)
