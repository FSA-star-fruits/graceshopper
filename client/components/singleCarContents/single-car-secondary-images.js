import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

export const Gallery = props => {
  const carId = props.match.params.carID
  const images = {
    1: [
      'https://i.imgur.com/16Q8Stj.jpg',
      'https://i.imgur.com/u7fhthH.jpg',
      'https://i.imgur.com/lbpM1Ep.jpg',
      'https://i.imgur.com/UQj9SDp.jpg',
      'https://i.imgur.com/16Q8Stj.jpg'
    ],
    2: [
      'https://i.imgur.com/0ooPJI9.jpg',
      'https://i.imgur.com/KO4MOEK.jpg',
      'https://i.imgur.com/hkNA32p.jpg',
      'https://i.imgur.com/DCU8OBj.jpg',
      'https://i.imgur.com/JYHn7bZ.jpg'
    ],
    3: [
      'https://i.imgur.com/lTJCno1.jpg',
      'https://i.imgur.com/LaZDGud.jpg',
      'https://i.imgur.com/4jZX3m6.jpg',
      'https://i.imgur.com/wpETkmf.jpg',
      'https://i.imgur.com/GVpRjQe.jpg'
    ],
    4: [
      'https://i.imgur.com/ABWSlDq.jpg',
      'https://i.imgur.com/jYgGy7n.jpg',
      'https://i.imgur.com/2F5mRVp.jpg',
      'https://i.imgur.com/JsJ1Zqt.jpg',
      'https://i.imgur.com/ryJB0Hr.jpg'
    ]
  }
  const handleOnDragStart = e => e.preventDefault()
  const stagePadding = {
    paddingLeft: 450,
    paddingRight: 450
  }

  return (
    <AliceCarousel mouseTrackingEnabled stagePadding={stagePadding}>
      <img
        src={images[carId][0]}
        onDragStart={handleOnDragStart}
        className="yours-custom-class"
        style={{width: '90%', height: '90%'}}
      />
      <img
        src={images[carId][1]}
        onDragStart={handleOnDragStart}
        className="yours-custom-class"
        style={{width: '90%', height: '90%'}}
      />
      <img
        src={images[carId][2]}
        onDragStart={handleOnDragStart}
        className="yours-custom-class"
        style={{width: '90%', height: '90%'}}
      />
      <img
        src={images[carId][3]}
        onDragStart={handleOnDragStart}
        className="yours-custom-class"
        style={{width: '90%', height: '90%'}}
      />
      <img
        src={images[carId][4]}
        onDragStart={handleOnDragStart}
        className="yours-custom-class"
        style={{width: '90%', height: '90%'}}
      />
    </AliceCarousel>
  )
}

export default Gallery
