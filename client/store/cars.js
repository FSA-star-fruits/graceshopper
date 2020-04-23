import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CARS = 'GET_CARS'

/**
 * INITIAL STATE
 */
// const defaultCars = {}

/**
 * ACTION CREATORS
 */
const getCars = cars => ({
  type: GET_CARS,
  cars
})

/**
 * THUNK CREATORS
 */
export const fetchCars = () => async dispatch => {
  try {
    const res = await axios.get('/api/cars')
    dispatch(getCars(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_CARS:
      return action.cars
    default:
      return state
  }
}

// for adding fake cars
export const postCar = newCar => async dispatch => {
  // console.log('newCar: ', newCar)
  await axios.post('/api/add', newCar)
}
