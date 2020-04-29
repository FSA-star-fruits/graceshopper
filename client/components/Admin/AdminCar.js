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
      <hr />
      {props.cars.length > 0 ? (
        <div>
          <div className="ui four column grid">
            {props.cars.map(car => {
              return (
                <div className="column" key={car.id}>
                  <Link to={`/cars/${car.id}`}>
                    <img src={car.image} style={{height: '50%'}} />
                    <p>{car.brand}</p>
                    <p>${car.price / 100}</p>
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
