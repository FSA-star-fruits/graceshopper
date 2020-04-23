import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'

/**
 * INITIAL STATE
 */
// const defaultCars = {}

/**
 * ACTION CREATORS
 */
const addItem = item => ({
  type: ADD_ITEM,
  item
})

/**
 * THUNK CREATORS
 */
export const buildPostCartThunk = (carId, userId) => async dispatch => {
  try {
    //CREATE CART ITEM

    //OBJECT
    const cartObj = {carId, userId}

    await axios.post(`/api/users/:${userId}/mycart`, cartObj)
    //IF ORDER ADDS TO ORDER
    //ELSE CREATE ORDER
    //ADD TO USER ID
    // dispatch(addItem(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case ADD_ITEM:
      return state
    default:
      return state
  }
}
