import axios from 'axios'

// initial state
const initialState = {orders: [], client: []}
// const initialState = []

// action types
const FETCH_ITEMS = 'FETCH_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const INCREMENT = 'INCREMENT'
const EMPTY_CART = 'EMPTY_CART'

// action creator
const fetchCartItems = items => ({
  type: FETCH_ITEMS,
  items
})
const addItem = car => ({
  type: ADD_ITEM,
  car
})
const increment = car => ({
  type: INCREMENT,
  car
})
const removeItem = item => ({
  type: REMOVE_ITEM,
  item
})
const emptyCart = () => ({
  type: EMPTY_CART
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

export const incremented = (userId, edits) => async dispatch => {
  try {
    if (userId) {
      const res = await axios.put(`/api/users/${userId}/mycart`, edits)
      dispatch(increment(res.data))
    } else {
      dispatch(increment(edits))
    }
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
    if (userId) {
      const cartObj = {
        carId: carId,
        userId: userId
      }
      const res = await axios.post(`/api/users/${userId}/mycart`, cartObj)
      dispatch(addItem(res.data))
    } else {
      const guestCartObj = {
        carId: carId,
        userId: userId,
        quantity: 1
      }

      dispatch(addItem(guestCartObj))
    }
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

export const emptiedCart = () => {
  return async dispatch => {
    dispatch(emptyCart())
  }
}

// reducer
const cartItems = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {...state, orders: action.items}
    case ADD_ITEM:
      return {...state, orders: [...state.orders, action.car]}
    case REMOVE_ITEM:
      return {
        ...state,
        orders: [
          ...state.orders.filter(order => order.carId !== +action.item.carId)
        ]
      }
    case INCREMENT:
      return {
        ...state,
        orders: [
          ...state.orders.filter(order => order.carId !== +action.car.carId),
          action.car
        ]
      }
    case EMPTY_CART:
      return {...state, orders: []}
    default:
      return state
  }
}

export default cartItems
