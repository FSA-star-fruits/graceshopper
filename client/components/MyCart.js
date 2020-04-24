import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotCartItems, tossCartItem} from '../store/cartItems'

class MyCart extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    const userID = this.props.match.params.userID
    this.props.getCartItems(userID)
  }

  handleRemove(item) {
    this.props.tossCartItem(item)
    const userID = this.props.match.params.userID
    this.props.getCartItems(userID)
  }

  render() {
    const {cartItems} = this.props
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
