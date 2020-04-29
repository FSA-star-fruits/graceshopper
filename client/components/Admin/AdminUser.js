import React from 'react'

const AdminUser = props => {
  return (
    <div>
      <h1>All Users</h1>
      <button type="button" className="ui basic button" onClick={props.toggle}>
        View Cars
      </button>

      {props.users.length > 0 ? (
        <ul>
          {props.users.map(user => {
            return (
              <li key={user.id}>
                user id: {user.id}, email: {user.email}
              </li>
            )
          })}
        </ul>
      ) : (
        <div>
          <h2>There are no User</h2>
        </div>
      )}
    </div>
  )
}

export default AdminUser
