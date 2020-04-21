import React from 'react'
import {Provider} from 'react-redux'
import store from './store'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import AllCars from '../client/components/AllCars'

const Routes = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <main>
            <h1>Look at all the cars</h1>
            <Route exact path="/cars" component={AllCars} />
          </main>
        </div>
      </Router>
    </Provider>
  )
}

export default Routes
