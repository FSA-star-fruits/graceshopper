import axios from 'axios'

const initialState = []

// action types
const FETCH_ITEMS = 'FETCH_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'

// action creator
const fetchCartItems = items => ({
  type: FETCH_ITEMS,
  items
})

const removeItem = item => ({
  type: REMOVE_ITEM,
  item
})

// thunk creator
export const gotCartItems = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/mycart`)
    dispatch(fetchCartItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const tossCartItem = item => {
  return async dispatch => {
    await axios.delete(`/api/users/${item.id}/mycart`)

    dispatch(removeItem(item))
  }
}

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.items
    case REMOVE_ITEM:
      return state
    default:
      return state
  }
}
