import React from 'react'
import {Link} from 'react-router-dom'

const AdminCar = props => {
  return (
    <div>
      <h1>Inventory</h1>
      <button type="button" className="ui basic button" onClick={props.toggle}>
        View Users
      </button>
      <hr />
      <Link to="/admin/add">
        <button type="button" className="ui basic button">
          Add Car
        </button>
      </Link>
      {props.cars.length > 0 ? (
        <div>
          {props.cars.map(car => {
            return (
              <div key={car.id}>
                <Link to={`/cars/${car.id}`}>
                  <img src={car.image} style={{width: '20%', height: '20%'}} />
                  <p>{car.brand}</p>
                  <p>{car.price}</p>
                </Link>

                <button
                  type="button"
                  className="ui basic button"
                  onClick={() => {
                    props.removeCar(car.id)
                  }}
                >
                  Remove
                </button>

                <Link to={`/admin/edit/${car.id}`}>
                  <button type="button" className="ui basic button">
                    Edit
                  </button>
                </Link>
                <hr />
              </div>
            )
          })}
        </div>
      ) : (
        <div>
          <h2>There are no cars</h2>
          <p>Please register your car</p>
        </div>
      )}
    </div>
  )
}

export default AdminCar
