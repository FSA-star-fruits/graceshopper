import axios from 'axios'

// action types
const FETCH_ITEMS = 'FETCH_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

// action creator
const fetchCartItems = items => ({
  type: FETCH_ITEMS,
  items
})

const addItem = car => ({
  type: ADD_ITEM,
  car
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

export const buildPostCartThunk = (
  carId,
  carItem,
  userId
) => async dispatch => {
  try {
    dispatch(addItem({car: carItem}))
    const cartObj = {
      carId: carId,
      userId: userId
      // quantity: quantity
    }
    await axios.post(`/api/users/${userId}/mycart`, cartObj)
  } catch (err) {
    console.error(err)
  }
}

export const tossCartItem = item => {
  return async dispatch => {
    dispatch(removeItem(item))
    await axios.delete(`/api/users/${item.id}/mycart`)
  }
}

// reducer
const cartItems = (state = {orders: [], client: []}, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {...state, orders: action.items}
    case ADD_ITEM:
      return {...state, orders: [...state.orders, action.car]}
    case REMOVE_ITEM:
      return state
    default:
      return state
  }
}

export default cartItems
