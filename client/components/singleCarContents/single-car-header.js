import React from 'react'

/**
 * COMPONENT
 */
import './single-car-header.css'
export const SingleCarHeader = props => {
  const singleCar = props.singleCar
  return (
    <div id="single-car-header">
      <span>
        <h1>
          {singleCar.brand} {singleCar.name} {singleCar.year}
        </h1>
        <div id="single-car-header-price">
          <h3>${singleCar.price / 100}</h3>
        </div>
      </span>
    </div>
  )
}

export default SingleCarHeader
