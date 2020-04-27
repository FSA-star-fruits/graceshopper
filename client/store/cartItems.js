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
const increaseQuantity = carId => ({
  type: INCREASE_QUANTITY,
  carId
})
const decreaseQuantity = carId => ({
  type: DECREASE_QUANTITY,
  carId
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

export const increaseQuantityCart = (carId, value, userId) => {
  return async dispatch => {
    if (value === true) {
      dispatch(increaseQuantity(carId))
    } else {
      dispatch(decreaseQuantity(carId))
    }
    if (userId) {
      const cartObj = {
        carId: carId,
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
      const incrementingItem = state.orders.filter(
        order => order.carId === +action.carId
      )[0]
      incrementingItem.quantity++
      return {
        ...state
      }

    case DECREASE_QUANTITY:
      const decrementingItem = state.orders.filter(
        order => order.carId === +action.carId
      )[0]
      decrementingItem.quantity--
      return {
        ...state
      }

    default:
      return state
  }
}

export default cartItems
