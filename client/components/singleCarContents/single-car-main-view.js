import React from 'react'

/**
 * COMPONENT
 */
import './single-car-main-view.css'
export const SingleCarMainView = props => {
  const singleCar = props.singleCar

  return (
    <div id="single-car-main">
      <div id="single-car-main-image">
        <img src="https://i.imgur.com/rQhOLsc.png" />
      </div>
    </div>
  )
}

export default SingleCarMainView
