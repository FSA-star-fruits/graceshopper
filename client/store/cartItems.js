import axios from 'axios'

const initialState = []

// action types
const FETCH_ITEMS = 'FETCH_ITEMS'
const PLUS = 'PLUS'
const MINUS = 'MINUS'
const REMOVE_ITEMS = 'REMOVE_ITEMS'

// action creator
const fetchCartItems = items => ({
  type: FETCH_ITEMS,
  items
})

const incrementItems = items => ({
  type: PLUS,
  items
})

const decrementItems = items => ({
  type: MINUS,
  items
})

const removeItems = items => ({
  type: REMOVE_ITEMS,
  items
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

export const incrementedItems = cartItemId => async dispatch => {
  try {
    const res = await axios.put(`/api/cartItems/${cartItemId}/`)
    dispatch(incrementItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const decrementedItems = cartItemId => async dispatch => {
  try {
    const res = await axios.put(`/api/cartItems/${cartItemId}`)
    dispatch(decrementItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const removedItems = cartItemId => async dispatch => {
  try {
    const res = await axios.delete(`/api/cartItems/${cartItemId}`)
    dispatch(removeItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.items
    case PLUS:
      return [...state, action.items.quantity++]
    case MINUS:
      return [...state, action.items.quantity--]
    case REMOVE_ITEMS:
      return [...state].filter(item => item.id !== action.items.id)
    default:
      return state
  }
}
