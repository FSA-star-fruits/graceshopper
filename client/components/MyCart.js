import React, {Component} from 'react'
import {connect} from 'react-redux'

class MyCart extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getCartItems()
  }

  render() {
    const cartItems = this.props.cartItems
    if (cartItems.length === 0) {
      return <p>Your Cart Is Currently Empty.</p>
    }
    return (
      <div>
        <h2>Items in your cart: </h2>
        {cartItems.map((item, idx) => {
          return (
            <div key={item.id}>
              {idx}. {item.brand} {item.name}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return (cartItems: state.cartItems)
}

const mapDispatch = dispatch => {
  return {
    getCartItems: () => {
      dispatch(fetchCartItems())
    }
  }
}

export default connect(mapState, mapDispatch)(MyCart)
