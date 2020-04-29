import axios from 'axios'

// initial state
const initialState = {orders: [], pastorders: []}
// const initialState = []

// action types
const FETCH_ITEMS = 'FETCH_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const EMPTY_ITEM = 'EMPTY_ITEM'
const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
const CHECKOUT = 'CHECKOUT'
const GET_PAST = 'GET_PAST'

// action creator
const fetchCartItems = items => ({
  type: FETCH_ITEMS,
  items
})
const fetchOrderHistory = items => ({
  type: GET_PAST,
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

const checkout = () => ({
  type: CHECKOUT
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

export const gotBoughtCartItems = userId => async dispatch => {
  try {
    if (userId) {
      const res = await axios.get(`/api/users/${userId}/orderhistory`)
      dispatch(fetchOrderHistory(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}

export const buildPostCartThunk = (
  carId,
  carItem,
  userId,
  quantity,
  price
) => async dispatch => {
  try {
    if (userId) {
      const cartObj = {
        carId: +carId,
        userId: userId,
        quantity: quantity,
        price: price,
        handle: true
      }
      if (quantity <= 1) {
        const res = await axios.post(`/api/users/${userId}/mycart`, cartObj)
        dispatch(addItem(res.data))
      } else {
        const res = await axios.put(`/api/users/${userId}/mycart`, cartObj)
        dispatch(addItem(res.data))
      }
    } else {
      dispatch(
        addItem({
          carId: +carId,
          userId: null,
          quantity: quantity,
          price: price,
          car: carItem
        })
      )
    }
  } catch (err) {
    console.error(err)
  }
}

// JO made a change on April 29
export const tossCartItem = (item, userId) => {
  return async dispatch => {
    dispatch(removeItem(item))

    await axios.delete(`/api/users/${userId}/mycart/${item.id}`)
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
        quantity: item.quantity,
        price: item.price,
        handle: value
      }
      await axios.put(`/api/users/${userId}/mycart`, cartObj)
    }
  }
}

export const checkoutUserCartOrder = (userId, orders) => {
  return async dispatch => {
    dispatch(checkout())
    const checkoutObj = {
      userId: userId,
      orders: orders
    }

    await axios.put(`/api/users/${userId}/checkout`, checkoutObj)
  }
}

// reducer
const cartItems = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {...state, orders: [...action.items]}

    case GET_PAST:
      return {...state, pastorders: [...state.pastorders, ...action.items]}

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
      return {...state, orders: []}

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
    case CHECKOUT:
      return initialState
    default:
      return state
  }
}

export default cartItems
