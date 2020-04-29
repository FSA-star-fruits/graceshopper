import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

export const Gallery = props => {
  const handleOnDragStart = e => e.preventDefault()
  const stagePadding = {
    paddingLeft: 450,
    paddingRight: 450
  }

  return (
    <AliceCarousel mouseTrackingEnabled stagePadding={stagePadding}>
      <img
        src="https://i.imgur.com/A2mO6d2.jpg"
        onDragStart={handleOnDragStart}
        className="yours-custom-class"
        style={{width: '90%', height: '90%'}}
      />
      <img
        src="https://i.imgur.com/A2mO6d2.jpg"
        onDragStart={handleOnDragStart}
        className="yours-custom-class"
        style={{width: '90%', height: '90%'}}
      />
      <img
        src="https://i.imgur.com/A2mO6d2.jpg"
        onDragStart={handleOnDragStart}
        className="yours-custom-class"
        style={{width: '90%', height: '90%'}}
      />
      <img
        src="https://i.imgur.com/A2mO6d2.jpg"
        onDragStart={handleOnDragStart}
        className="yours-custom-class"
        style={{width: '90%', height: '90%'}}
      />
      <img
        src="https://i.imgur.com/A2mO6d2.jpg"
        onDragStart={handleOnDragStart}
        className="yours-custom-class"
        style={{width: '90%', height: '90%'}}
      />
    </AliceCarousel>
  )
}

export default Gallery
