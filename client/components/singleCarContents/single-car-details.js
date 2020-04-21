import React from 'react'

/**
 * COMPONENT
 */
export const SingleCarDetails = props => {
  const singleCar = props.singleCar

  return (
    <div id="single-car-details">
      <table>
        <tr>
          <th>Engine Type</th>
          <td>{singleCar.EngineType}</td>
        </tr>
        <tr>
          <th>Interior Color</th>
          <td>{singleCar.InteriorColor}</td>
        </tr>
        <tr>
          <th>Stock Number</th>
          <td>{singleCar.StockNo}</td>
        </tr>
        <tr>
          <th>Exterior Color</th>
          <td>BLUE</td>
        </tr>
        <tr>
          <th>Transmission</th>
          <td>{singleCar.Transmission}</td>
        </tr>
        <tr>
          <th>Doors</th>
          <td>{singleCar.Doors}</td>
        </tr>
        <tr>
          <th>VIN</th>
          <td>{singleCar.VIN}</td>
        </tr>
        <tr>
          <th>VehicleID</th>
          <td>{singleCar.VehicleID}</td>
        </tr>
      </table>
    </div>
  )
}

export default SingleCarDetails
