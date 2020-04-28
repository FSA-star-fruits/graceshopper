import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {gotBoughtCartItems} from '../store/cartItems'

import './OrderHistory.css'
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
    if (orders.length <= 0) {
      return (
        <div>
          <h2>You have not bought anything.....yet</h2>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Order History </h2>
          {orders.map((order, idx = 0) => {
            return (
              <div key={idx} id="order_history_date_item">
                <div id="order_history_date">
                  <h4>Purchased On </h4>
                  <h3>{order[0].order.purchaseDate.slice(0, 10)} </h3>
                  <h6>{order[0].order.purchaseDate.slice(11, 16)}</h6>
                </div>
                {order.map((item, secIdx = 0) => {
                  return (
                    <div id="order_item" key={`${idx}.${secIdx}`}>
                      <img id="cart_image" src={item.car.image} />
                      <h4>
                        {item.car.brand} {item.car.name}
                      </h4>

                      <div id="cart_quantity">
                        <div id="quantity_num">Quantity: {item.quantity}</div>
                      </div>
                    </div>
                  )
                })}
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

const mapDispatch = dispatch => ({
  getBoughtCartItems: userID => {
    dispatch(gotBoughtCartItems(userID))
  }
})

export default connect(mapState, mapDispatch)(OrderHistory)
