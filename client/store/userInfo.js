import axios from 'axios'

/**
 * ACTION TYPES
 */
const ALL_USERS = 'ALL_USERS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const allUsers = users => ({type: ALL_USERS, users})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(allUsers(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ALL_USERS:
      console.log('action: ', action.users)
      return action.users
    default:
      return state
  }
}
