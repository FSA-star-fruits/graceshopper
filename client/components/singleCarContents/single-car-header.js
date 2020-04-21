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
          {singleCar.Brand} {singleCar.Name} {singleCar.Year}
        </h1>
        <p>miles driven</p>
        <h3>{singleCar.Price}</h3>
        <button>BUY</button>
      </span>
    </div>
  )
}

export default SingleCarHeader
