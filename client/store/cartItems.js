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
const increaseQuantity = item => ({
  type: INCREASE_QUANTITY,
  item
})
const decreaseQuantity = item => ({
  type: DECREASE_QUANTITY,
  item
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

export const buildPostCartThunk = (
  carId,
  carItem,
  userId,
  quantity
) => async dispatch => {
  try {
    if (userId) {
      const cartObj = {
        carId: +carId,
        userId: userId,
        quantity: quantity,
        handle: true
      }
      if (quantity === 1) {
        const res = await axios.post(`/api/users/${userId}/mycart`, cartObj)
        dispatch(addItem(res.data))
      } else {
        const res = await axios.put(`/api/users/${userId}/mycart`, cartObj)
        dispatch(addItem(res.data))
      }
    } else {
      dispatch(
        addItem({carId: +carId, userId: null, quantity: quantity, car: carItem})
      )
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

export const emptyCartItem = () => {
  return dispatch => {
    dispatch(emptyItem())
  }
}

export const increaseQuantityCart = (item, value, userId, idx) => {
  return async dispatch => {
    if (value === true) {
      dispatch(increaseQuantity(item, idx))
    } else {
      dispatch(decreaseQuantity(item, idx))
    }
    if (userId) {
      const cartObj = {
        carId: item.car.id,
        userId: userId,
        handle: value
      }
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
      const noChangeItems = [
        ...state.orders.filter(order => order.carId !== action.car.carId)
      ]
      return {
        ...state,
        orders: [action.car, ...noChangeItems]
      }

    case REMOVE_ITEM:
      const newCart = state.orders.filter(
        order => order.carId !== +action.item.carId
      )
      return {...state, orders: newCart}

    case EMPTY_ITEM:
      return {...state, orders: [], client: []}

    case INCREASE_QUANTITY:
      action.item.quantity = action.item.quantity + 1
      state.orders[action.idx] = action.item
      return {
        ...state,
        orders: state.orders
      }

    case DECREASE_QUANTITY:
      action.item.quantity = action.item.quantity - 1
      state.orders[action.idx] = action.item
      return {
        ...state,
        orders: state.orders
      }
    default:
      return state
  }
}

export default cartItems
