import axios from 'axios'

// initial state
const initialState = {orders: [], client: []}
// const initialState = []

// action types
const FETCH_ITEMS = 'FETCH_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const INCREMENT = 'INCREMENT'

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
    const res = await axios.put(`/api/users/${userId}/mycart`, edits)
    dispatch(increment(res.data))
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
    const cartObj = {
      carId: carId,
      userId: userId
    }
    const res = await axios.post(`/api/users/${userId}/mycart`, cartObj)
    dispatch(addItem(res.data))

    // const cartObj = {
    //   carId: carId,
    //   userId: userId,
    // }
    // dispatch(addItem({car: carItem}))
    // await axios.post(`/api/users/${userId}/mycart`, cartObj)
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
const cartItems = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {...state, orders: action.items}
    case ADD_ITEM:
      return {...state, orders: [...state.orders, action.car]}
    //  ********************* single-car.js & cartItems.js
    case REMOVE_ITEM:
      // return {
      //   ...state,
      //   orders: [
      //     ...state.orders.filter((order) => order.carId !== +action.item.carId),
      //   ],
      // }
      return state
    case INCREMENT:
      return {
        ...state,
        orders: [
          ...state.orders.filter(order => order.carId !== +action.car.carId),
          action.car
        ]
      }
    default:
      return state
  }
}

export default cartItems
