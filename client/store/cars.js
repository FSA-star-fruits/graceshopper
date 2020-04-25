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

export const addCar = newCar => async dispatch => {
  try {
    await axios.post('/api/cars', newCar)
    const {data} = await axios.get('/api/cars')
    dispatch(getCars(data))
  } catch (error) {
    console.error(error)
  }
}

export const removeCar = carId => async dispatch => {
  try {
    await axios.delete(`/api/cars/${carId}`)
    const {data} = await axios.get('/api/cars')
    dispatch(getCars(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateCar = (carId, editCar) => async dispatch => {
  try {
    await axios.put(`/api/cars/${carId}`, editCar)
    const {data} = await axios.get('/api/cars')
    dispatch(getCars(data))
  } catch (error) {
    console.error(error)
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
  await axios.post('/api/add', newCar)
}
