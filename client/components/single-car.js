import React, {Component} from 'react'
import {connect} from 'react-redux'

import {SingleCarHeader} from './singleCarContents/single-car-header'
import {SingleCarMainView} from './singleCarContents/single-car-main-view'
import {SingleCarDetails} from './singleCarContents/single-car-details'
import {SingleCarSecondaryImage} from './singleCarContents/single-car-secondary-images'

import {buildfetchSingleCarThunk} from '../store'

/**
 * COMPONENT
 */
export class SingleCar extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchSingleCar()
  }
  render() {
    const singleCar = this.props.singleCar
    console.log(this.props)
    return (
      <div id="single-car">
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

const mapDispatch = dispatch => {
  return {
    fetchSingleCar: () => dispatch(buildfetchSingleCarThunk())
  }
}

export default connect(mapState, mapDispatch)(SingleCar)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// }
