import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {logout} from '../store'
import {emptyCartItem} from '../store/cartItems'

const Navbar = ({
  handleClick,
  isLoggedIn,
  userID,
  cartItems,
  isAdmin,
  handleCart
}) => (
  <div>
    <h1>Grace Shopper</h1>
    <nav>
      {isLoggedIn ? (
        <div className="ui labeled menu">
          {/* The navbar will show these links after you log in */}

          <a className="item" href="/home">
            Home
          </a>
          <a className="item" href="/cars">
            Cars
          </a>

          <a className="item" href={`/users/${userID}/mycart`}>
            My Cart {cartItems.orders.length}
          </a>
          {isAdmin ? (
            <a className="item" href="/admin">
              Admin
            </a>
          ) : (
            ''
          )}
          <a className="right item" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="ui labeled menu">
          {/* The navbar will show these links before you log in */}
          <a className="item" href="/">
            Home
          </a>
          <a className="item" href="/cars">
            Cars
          </a>

          <a className="item" href="/guestcart">
            My Cart {cartItems.orders.length}
          </a>
          <a className="item" href="/signup" onClick={handleCart}>
            Sign Up
          </a>

          <a className="right item" href="/login" onClick={handleCart}>
            Login
          </a>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    userID: state.user.id,
    cartItems: state.cartItems
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(emptyCartItem())
      dispatch(logout())
    },
    handleCart() {
      dispatch(emptyCartItem())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
