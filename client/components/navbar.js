import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {gotCartItems} from '../store/cartItems'

const Navbar = ({handleClick, isLoggedIn, userID, cartItems}) => (
  <div>
    <h1>Grace Shopper</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>
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
              : ''}
            )
          </Link>
          <Link to="/add">Add</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/guestcart">My Cart ({cartItems.orders.length})</Link>
          <Link to="/add">Add</Link>
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
    userID: state.user.id,
    cartItems: state.cartItems
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getCartItems: userId => {
      dispatch(gotCartItems(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  getCartItems: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
