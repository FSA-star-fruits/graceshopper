import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, emptyCartItem, gotCartItems} from '../store'
import {Menu} from 'semantic-ui-react'

class Navbar extends Component {
  compoentDidMount() {
    const {userID} = this.props
    this.props.getCartItems(userID)
  }

  render() {
    const {isLoggedIn, cartItems, isAdmin, userID} = this.props
    return (
      <div>
        <h1>Grace Car Shopper</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              <Menu>
                <Menu.Item name="Home" as={Link} to="/home" />

                <Menu.Item name="Cars" as={Link} to="/cars" />
                <Menu.Item
                  name="Logout"
                  as={Link}
                  to="/login"
                  onClick={this.props.handleClick}
                />

                <Menu.Item
                  name={`Cart${
                    cartItems.orders[0]
                      ? cartItems.orders.reduce(
                          (accumulator, order) => accumulator + order.quantity,
                          0
                        )
                      : 0
                  })`}
                  as={Link}
                  to={`/users/${userID}/mycart`}
                />

                {isAdmin ? (
                  <Menu.Item name="Admin" as={Link} to="/admin" />
                ) : (
                  ''
                )}
              </Menu>
            </div>
          ) : (
            <div>
              <Menu>
                <Menu.Item name="Home" as={Link} to="/" />
                <Menu.Item name="Cars" as={Link} to="/cars" />
                <Menu.Item
                  name="Login"
                  as={Link}
                  to="/login"
                  onClick={this.props.handleCart}
                />

                <Menu.Item
                  name="Sign Up"
                  as={Link}
                  to="/signup"
                  onClick={this.props.handleCart}
                />
                <Menu.Item
                  name={`Cart${
                    cartItems.orders[0]
                      ? cartItems.orders.reduce(
                          (accumulator, order) => accumulator + order.quantity,
                          0
                        )
                      : 0
                  })`}
                  as={Link}
                  to="/guestcart"
                />
              </Menu>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}
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
    },
    getCartItems(userID) {
      dispatch(gotCartItems(userID))
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
