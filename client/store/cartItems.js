import axios from 'axios'

// action types
const FETCH_ITEMS = 'FETCH_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const EMPTY_ITEM = 'EMPTY_ITEM'

// action creator
const fetchCartItems = items => ({
  type: FETCH_ITEMS,
  items
})

const addItem = car => ({
  type: ADD_ITEM,
  car
})
const removeItem = (item, idx) => ({
  type: REMOVE_ITEM,
  item,
  idx
})

const emptyItem = () => ({
  type: EMPTY_ITEM
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
export const emptyCartItem = () => {
  return dispatch => {
    dispatch(emptyItem())
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
    case EMPTY_ITEM:
      return {...state, orders: []}
    default:
      return state
  }
}

export default cartItems
