import React from 'react'

/**
 * COMPONENT
 */
import './single-car-secondary-images.css'
export const SingleCarSecondaryImage = props => {
  const singleCar = props.singleCar

  return (
    <div id="single-car-secondary">
      <div id="single-car-secondary-image">
        <img src="https://i.imgur.com/A2mO6d2.jpg" />
        <img src="https://i.imgur.com/T2jEldf.jpg" />
        <img src="https://i.imgur.com/VKYd6Hh.jpg" />
        <img src="https://i.imgur.com/JGp3n1k.jpg" />
        <img src="https://i.imgur.com/gROVvb3.jpg" />
      </div>
    </div>
  )
}

export default SingleCarSecondaryImage
