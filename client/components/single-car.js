import React, {Component} from 'react'
import {connect} from 'react-redux'
import {buildfetchSingleCarThunk, buildPostCartThunk} from '../store'

import {SingleCarHeader} from './singleCarContents/single-car-header'
import {SingleCarMainView} from './singleCarContents/single-car-main-view'
import {SingleCarDetails} from './singleCarContents/single-car-details'
import {SingleCarSecondaryImage} from './singleCarContents/single-car-secondary-images'

/**
 * COMPONENT
 */
export class SingleCar extends Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    const carId = this.props.match.params.carID
    this.props.fetchSingleCar(carId)
  }

  handleAddToCart() {
    // JO: clean up vars, if time permits
    const carId = this.props.match.params.carID
    const carItem = this.props.singleCar
    const userId = this.props.user.id
    const {orders} = this.props.cartItems
    let quantity = 1
    let itemClicked = []

    if (orders.length) {
      itemClicked = orders.filter(order => order.carId === +carId)
    }
    if (itemClicked.length) {
      quantity = itemClicked[0].quantity + 1
    }

    this.props.postAddToCart(carId, carItem, userId, quantity)
  }

  render() {
    return (
      <div id="single-car">
        <button
          className="ui primary button"
          type="button"
          onClick={this.handleAddToCart}
        >
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
  fetchSingleCar: carId => {
    dispatch(buildfetchSingleCarThunk(carId))
  },
  postAddToCart: (carId, carItem, userId, quantity) => {
    dispatch(buildPostCartThunk(carId, carItem, userId, quantity))
  }
})

export default connect(mapState, mapDispatch)(SingleCar)
