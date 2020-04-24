import axios from 'axios'

// action types
const FETCH_ITEMS = 'FETCH_ITEMS'
const ADD_ITEM = 'ADD_ITEM'

// action creator
const fetchCartItems = items => ({
  type: FETCH_ITEMS,
  items
})

const addItem = car => ({
  type: ADD_ITEM,
  car
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

// reducer
const cartItems = (state = {orders: [], client: []}, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {...state, orders: action.items}
    case ADD_ITEM:
      return {...state, orders: [...state.orders, action.car]}
    default:
      return state
  }
}

export default cartItems
