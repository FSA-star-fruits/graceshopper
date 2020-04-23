import React, {Component} from 'react'
import {connect} from 'react-redux'

import {SingleCarHeader} from './singleCarContents/single-car-header'
import {SingleCarMainView} from './singleCarContents/single-car-main-view'
import {SingleCarDetails} from './singleCarContents/single-car-details'
import {SingleCarSecondaryImage} from './singleCarContents/single-car-secondary-images'

import {buildfetchSingleCarThunk} from '../store'

import {buildPostCartThunk} from '../store/addItem'

/**
 * COMPONENT
 */
export class SingleCar extends Component {
  constructor(props) {
    super(props)

    this.handleAddToCart = this.handleAddToCart.bind(this)
  }
  componentDidMount() {
    const carId = this.props.match.params.carId
    this.props.fetchSingleCar(carId)
  }
  handleAddToCart() {
    const carId = 1
    const userId = 1
    this.props.postAddToCart(carId, userId)
  }

  render() {
    const singleCar = this.props.singleCar
    console.log(this.props)
    return (
      <div id="single-car">
        <button onClick={this.handleAddToCart}>ADD TO CART</button>
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
    singleCar: state.singleCar
  }
}

const mapDispatch = dispatch => ({
  fetchSingleCar: carId => dispatch(buildfetchSingleCarThunk(carId)),
  postAddToCart: (carId, userId) => dispatch(buildPostCartThunk(carId, userId))
})

export default connect(mapState, mapDispatch)(SingleCar)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// }
