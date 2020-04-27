import axios from 'axios'

// initial state
const initialState = {orders: [], client: []}
// const initialState = []

// action types
const FETCH_ITEMS = 'FETCH_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const EMPTY_ITEM = 'EMPTY_ITEM'
const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
const DECREASE_QUANTITY = 'DECREASE_QUANTITY'

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
const emptyItem = () => ({
  type: EMPTY_ITEM
})

const increaseQuantity = (item, idx) => ({
  type: INCREASE_QUANTITY,
  item,
  idx
})

const decreaseQuantity = (item, idx) => ({
  type: DECREASE_QUANTITY,
  item,
  idx
})

// thunk creator
export const gotCartItems = userId => async dispatch => {
  try {
    if (userId) {
      const res = await axios.get(`/api/users/${userId}/mycart`)

      dispatch(fetchCartItems(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}

export const buildPostCartThunk = (carId, carItem, userId) => {
  return async dispatch => {
    try {
      if (userId !== undefined) {
        dispatch(addItem({id: carItem.id, car: carItem, quantity: 1}))
        const cartObj = {
          carId: carId,
          userId: userId
        }

        await axios.post(`/api/users/${userId}/mycart`, cartObj)
      } else {
        const item = {id: carItem.id, car: carItem, quantity: 1}

        dispatch(addItem(item))
      }
    } catch (err) {
      console.error(err)
    }
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

export const increaseQuantityCart = (value, userId, item, idx) => {
  return async dispatch => {
    if (value === true) {
      dispatch(increaseQuantity(item, idx))
    } else if (item.quantity === 1) {
      dispatch(removeItem(item))
    } else {
      dispatch(decreaseQuantity(item, idx))
    }

    const cartObj = {
      carId: item.carId,
      userId: userId,
      handle: value
    }
    if (userId !== undefined) {
      await axios.put(`/api/users/${userId}/mycart`, cartObj)
    }
  }
}

// reducer
const cartItems = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {...state, orders: [...action.items]}

    case ADD_ITEM:
      if (state.orders.length === 0) {
        return {...state, orders: [action.car]}
      } else {
        const found = state.orders.find(order => order.car.id === action.car.id)
        const index = state.orders.indexOf(found)

        if (found) {
          found.quantity = found.quantity + 1
          state.orders[index] = found

          return {...state, orders: state.orders}
        } else {
          return {...state, orders: [...state.orders, action.car]}
        }
      }

    case REMOVE_ITEM:
      const newCart = state.orders.filter(order => order.id !== action.item.id)
      return {...state, orders: newCart}

    case EMPTY_ITEM:
      return {...state, orders: [], client: []}

    case INCREASE_QUANTITY:
      action.item.quantity = action.item.quantity + 1
      state.orders[action.idx] = action.item
      return {...state, orders: state.orders}

    case DECREASE_QUANTITY:
      action.item.quantity = action.item.quantity - 1
      state.orders[action.idx] = action.item
      return {...state, orders: state.orders}
    default:
      return state
  }
}

export default cartItems
