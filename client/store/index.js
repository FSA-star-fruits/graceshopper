import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cars from './cars'
import cartItems from './cartItems'
import singleCarReducer from './singleCar'

const reducer = combineReducers({
  user: user,
  cars: cars,
  cartItems: cartItems,
  singleCar: singleCarReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './singleCar'
export * from './cars'
export * from './cartItems'
