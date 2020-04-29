import React from 'react'

/**
 * COMPONENT
 */
import './single-car-details.css'
export const SingleCarDetails = props => {
  const singleCar = props.singleCar

  return (
    <div id="table" className="ui stacked segment">
      <table className="ui table">
        <tbody>
          <tr>
            <td>Engine Type</td>
            <td>{singleCar.engineType}</td>
          </tr>
          <tr>
            <td>Interior Color</td>
            <td>{singleCar.interiorColor}</td>
          </tr>
          <tr>
            <td>Transmission</td>
            <td>{singleCar.transmission}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SingleCarDetails
