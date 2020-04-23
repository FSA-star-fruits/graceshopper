import React from 'react'

/**
 * COMPONENT
 */
export const SingleCarHeader = props => {
  const singleCar = props.singleCar
  return (
    <div id="single-car-header">
      <span>
        <h1>
          {singleCar.brand} {singleCar.name} {singleCar.year}
        </h1>
        <p>miles driven</p>
        <h3>{singleCar.price}</h3>
      </span>
    </div>
  )
}

export default SingleCarHeader
