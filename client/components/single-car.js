import React, {Component} from 'react'
import {connect} from 'react-redux'

import {SingleCarHeader} from './singleCarContents/single-car-header'
import {SingleCarMainView} from './singleCarContents/single-car-main-view'
import {SingleCarDetails} from './singleCarContents/single-car-details'
import {SingleCarSecondaryImage} from './singleCarContents/single-car-secondary-images'

import {buildfetchSingleCarThunk} from '../store'

import {buildPostCartThunk} from '../store/cartItems'

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
    const carId = this.props.match.params.carID
    const userId = this.props.user.id
    const carItem = this.props.singleCar

    this.props.postAddToCart(carId, carItem, userId)
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
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  fetchSingleCar: carId => {
    dispatch(buildfetchSingleCarThunk(carId))
  },
  postAddToCart: (carId, carItem, userId) => {
    dispatch(buildPostCartThunk(carId, carItem, userId))
  }
})

export default connect(mapState, mapDispatch)(SingleCar)
