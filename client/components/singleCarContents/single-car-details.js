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
          <td>{singleCar.engineType}</td>
        </tr>
        <tr>
          <th>Interior Color</th>
          <td>{singleCar.interiorColor}</td>
        </tr>
        <tr>
          <th>Stock Number</th>
          <td>{singleCar.stockNo}</td>
        </tr>
        <tr>
          <th>Exterior Color</th>
          <td>BLUE</td>
        </tr>
        <tr>
          <th>Transmission</th>
          <td>{singleCar.transmission}</td>
        </tr>
        <tr>
          <th>Doors</th>
          <td>{singleCar.doors}</td>
        </tr>
        <tr>
          <th>VIN</th>
          <td>{singleCar.vin}</td>
        </tr>
        <tr>
          <th>VehicleID</th>
          <td>{singleCar.vehicleId}</td>
        </tr>
      </table>
    </div>
  )
}

export default SingleCarDetails
