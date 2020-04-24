import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotCartItems} from '../store/cartItems'

class MyCart extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const userID = this.props.match.params.userID
    this.props.getCartItems(userID)
  }

  handleClick(item) {
    const {cartItems} = this.props
    console.log('event >>>', event.target.name === 'add')
    console.log('item qty >>>', item.quantity)
    console.log('cartItems >>>', cartItems)
    switch (event.target.name) {
      case 'add':
        item.quantity++
        return this.setState({cartItems})
      default:
    }
  }

  render() {
    const {cartItems} = this.props

    if (cartItems.length === 0) {
      return (
        <div>
          <h2>Your Cart Is Currently Empty.</h2>
        </div>
      )
    }
    return (
      <div>
        <h2>Items in your cart: </h2>
        {cartItems.map((item, idx) => {
          return (
            <div key={item.car.id}>
              {idx}. {item.car.brand} {item.car.name} Qty: {item.quantity}
              <button
                type="button"
                name="add"
                onClick={() => this.handleClick(item)}
              >
                +
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
    }
  }
}

export default connect(mapState, mapDispatch)(MyCart)
