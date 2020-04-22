import axios from 'axios'

const initialState = []

// action types
const FETCH_ITEMS = 'FETCH_ITEMS'

// action creator
const fetchCartItems = items => ({
  type: FETCH_ITEMS,
  items
})

// thunk creator
export const gotCartItems = userID => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userID}/mycart`)
    dispatch(fetchCartItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.items
    default:
      return state
  }
}
