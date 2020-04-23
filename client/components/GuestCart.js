import React, {Component} from 'react'
import {connect} from 'react-redux'

export default class GuestCart extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h2>Items in your cart: show items stored in Sessions</h2>
        {/* <div key={item.car.id}>
               {idx + 1}. {item.car.Brand} {item.car.Name}
             </div> */}
      </div>
    )
  }
}
