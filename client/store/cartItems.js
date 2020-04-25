import axios from 'axios'

// action types
const FETCH_ITEMS = 'FETCH_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const ADD_ITEM_GUEST = 'ADD_ITEM_GUEST'
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

const addItemGuest = car => ({
  type: ADD_ITEM_GUEST,
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
  userId
) => async dispatch => {
  try {
    if (userId !== undefined) {
      dispatch(addItem({car: carItem}))
      const cartObj = {
        carId: carId,
        userId: userId
      }

      await axios.post(`/api/users/${userId}/mycart`, cartObj)
    } else {
      const item = {id: carItem.id, car: carItem, quantity: 1}

      dispatch(addItemGuest(item))
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

    const cartObj = {
      carId: carId,
      userId: userId,
      handle: value
    }
    if (userId !== undefined) {
      await axios.put(`/api/users/${userId}/mycart`, cartObj)
    }
  }
}

// reducer
const cartItems = (state = {orders: [], client: []}, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {...state, orders: action.items}
    case ADD_ITEM:
      return {...state, orders: [...state.orders, action.car]}
    case ADD_ITEM_GUEST:
      if (state.orders.length === 0) {
        return {...state, orders: [action.car]}
      } else {
        const found = state.orders.find(order => order.id === action.car.id)
        const index = state.orders.indexOf(found)
        if (found !== undefined) {
          found.quantity = found.quantity + 1
          console.log(state.orders[index])
          state.orders[index] = found
          return state
        } else {
          return {...state, orders: [...state.orders, action.car]}
        }
      }
    case REMOVE_ITEM:
      const newCart = state.orders.filter(order => order.id !== action.item.id)
      return {...state, orders: newCart}
    case EMPTY_ITEM:
      return {...state, orders: []}
    case INCREASE_QUANTITY:
      const found = state.orders.find(order => order.id === action.carId)
      const index = state.orders.indexOf(found)
      if (found !== undefined) {
        found.quantity = found.quantity + 1
        state.orders[index] = found
        return state
      }
    case DECREASE_QUANTITY:
      const foundDecrease = state.orders.find(
        order => order.id === action.carId
      )
      const indexDecrease = state.orders.indexOf(found)
      if (foundDecrease !== undefined) {
        foundDecrease.quantity = foundDecrease.quantity - 1
        state.orders[indexDecrease] = foundDecrease
        return state
      }
    default:
      return state
  }
}

export default cartItems
