import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

export const Gallery = () => {
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
// import React from 'react'

// /**
//  * COMPONENT
//  */
// import './single-car-secondary-images.css'
// export const SingleCarSecondaryImage = (props) => {
//   const singleCar = props.singleCar

//   return (
//     <div id="single-car-secondary">
//       <div id="single-car-secondary-image">
//         <img src="https://i.imgur.com/A2mO6d2.jpg" />
//         <img src="https://i.imgur.com/T2jEldf.jpg" />
//         <img src="https://i.imgur.com/VKYd6Hh.jpg" />
//         <img src="https://i.imgur.com/JGp3n1k.jpg" />
//         <img src="https://i.imgur.com/gROVvb3.jpg" />
//       </div>
//     </div>
//   )
// }

// export default SingleCarSecondaryImage
