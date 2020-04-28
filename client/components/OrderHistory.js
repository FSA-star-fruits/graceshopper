import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {gotBoughtCartItems} from '../store/cartItems'

class OrderHistory extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const userID = this.props.match.params.userID
    this.props.getBoughtCartItems(userID)
  }

  render() {
    const {cartItems} = this.props
    const orders = cartItems.pastorders

    return (
      <div>
        <h2>Order History </h2>
        {orders.map((item, idx = 0) => {
          return (
            <div id="cart_item" key={idx}>
              <img id="cart_image" src={item.car.image} />
              <h2>
                {item.car.brand} {item.car.name}
              </h2>

              <div id="cart_quantity">
                <div id="quantity_num">Quantity: {item.quantity}</div>
              </div>
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

const mapDispatch = dispatch => ({
  getBoughtCartItems: userID => {
    dispatch(gotBoughtCartItems(userID))
  }
})

export default connect(mapState, mapDispatch)(OrderHistory)
