import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SingleCarHeader} from './singleCarContents/single-car-header'
import {SingleCarMainView} from './singleCarContents/single-car-main-view'
import {SingleCarDetails} from './singleCarContents/single-car-details'
import {SingleCarSecondaryImage} from './singleCarContents/single-car-secondary-images'
import store, {buildfetchSingleCarThunk, incremented, me} from '../store'
import {buildPostCartThunk, gotCartItems} from '../store/cartItems'

/**
 * COMPONENT
 */
export class SingleCar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    const carId = this.props.match.params.carID
    this.props.fetchSingleCar(carId)

    // this.unsubscribe = store.subscribe(() => {
    //   console.log('SingleCar new state ***', store.getState())
    // })
  }

  handleAddToCart() {
    const carId = this.props.match.params.carID
    const userId = this.props.user.id
    const carItem = this.props.singleCar
    const {cartItems} = this.props
    const orders = cartItems.orders

    const carInCart = orders.filter(order => order.carId === +carId)
    const notInCart = !carInCart.length

    if (userId) {
      if (notInCart) {
        this.props.postAddToCart(carId, carItem, userId)
      } else {
        const quantity = carInCart[0].quantity + 1
        this.props.increment(userId, {
          carId: +carId,
          quantity: quantity
        })
      }
      //  ********************* single-car.js & cartItems.js
      // } else {
      //   if (!cartItems.orders.length) {
      //     this.props.postAddToCart(carId, carItem, userId)
      //   } else {
      //     const quantity = carInCart[0].quantity + 1
      //     this.props.increment(userId, {
      //       carId: carId,
      //       quantity: quantity,
      //     })
      //   }
      // }
    }
  }

  render() {
    return (
      <div id="single-car">
        <button type="button" onClick={this.handleAddToCart}>
          ADD TO CART
        </button>
        <SingleCarHeader {...this.props} />
        <SingleCarMainView {...this.props} />
        <SingleCarSecondaryImage {...this.props} />
        <SingleCarDetails {...this.props} />
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    singleCar: state.singleCar,
    user: state.user,
    cartItems: state.cartItems
  }
}

const mapDispatch = dispatch => ({
  fetchSingleCar: carId => dispatch(buildfetchSingleCarThunk(carId)),
  getCartItems: userId => dispatch(gotCartItems(userId)),
  postAddToCart: (carId, carItem, userId) =>
    dispatch(buildPostCartThunk(carId, carItem, userId)),
  increment: (userId, edits) => dispatch(incremented(userId, edits)),
  getMe: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(SingleCar)
