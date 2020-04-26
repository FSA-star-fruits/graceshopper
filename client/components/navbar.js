import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, emptyCartItem} from '../store'

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
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/cars">Cars</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to={`/users/${userID}/mycart`}>
            My Cart (
            {cartItems.orders.length
              ? cartItems.orders.reduce(
                  (accumulator, order) => accumulator + order.quantity,
                  0
                )
              : 0}
            )
          </Link>
          {isAdmin ? <Link to="/admin">Admin</Link> : ''}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/login">
            {/* JO: why include handleCart here??? */}
            {/* <Link to="/login" onClick={handleCart}> */}
            Login
          </Link>
          <Link to="/signup">
            {/* <Link to="/signup" onClick={handleCart}> */}
            Sign Up
          </Link>
          <Link to="/guestcart">
            My Cart (
            {cartItems.orders.length
              ? cartItems.orders.reduce(
                  (accumulator, order) => accumulator + order.quantity,
                  0
                )
              : 0}
            )
          </Link>
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
