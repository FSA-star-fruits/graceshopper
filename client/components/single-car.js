import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SingleCarHeader} from './singleCarContents/single-car-header'
import {SingleCarMainView} from './singleCarContents/single-car-main-view'
import {SingleCarDetails} from './singleCarContents/single-car-details'
import {SingleCarSecondaryImage} from './singleCarContents/single-car-secondary-images'
import {buildfetchSingleCarThunk, incremented} from '../store'
import {buildPostCartThunk} from '../store/cartItems'

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
    // console.log('props.cartItems >>>>>', this.props.cartItems)
  }

  handleAddToCart() {
    const carId = this.props.match.params.carID
    // const numCarId = +carId
    const userId = this.props.user.id
    const carItem = this.props.singleCar
    const {cartItems} = this.props
    const orders = cartItems.orders
    // console.log('order.carId >>>>>', typeof order.carId)
    // console.log('numCarId >>>>>', typeof numCarId)
    const carInCart = orders.filter(order => order.carId === +carId)
    const notInCart = !carInCart.length
    // console.log('carInCart >>>>>', carInCart)
    if (notInCart) {
      this.props.postAddToCart(carId, carItem, userId)
    } else {
      const quantity = carInCart[0].quantity + 1
      this.props.increment(userId, {
        carId: carId,
        quantity: quantity
      })
    }
  }

  render() {
    const singleCar = this.props.singleCar

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
    cartItems: state.cartItems,
    order: state.order
  }
}

const mapDispatch = dispatch => ({
  fetchSingleCar: carId => dispatch(buildfetchSingleCarThunk(carId)),
  postAddToCart: (carId, carItem, userId) =>
    dispatch(buildPostCartThunk(carId, carItem, userId)),
  increment: (userId, edits) => dispatch(incremented(userId, edits))
})

export default connect(mapState, mapDispatch)(SingleCar)
