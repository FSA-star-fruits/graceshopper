/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Admin} from './Admin'
export {default as AdminAddCar} from './AdminAddCar'
export {default as AdminEditCar} from './AdminEditCar'
export {default as Faker} from './Faker'
export {default as MyCart} from './MyCart'
export {default as GuestCart} from './GuestCart'
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as SingleCar} from './single-car'
export {default as SingleCarHeader} from './singleCarContents/single-car-header'
export {
  default as SingleCarMainView
} from './singleCarContents/single-car-main-view'
export {
  default as SingleCarDetails
} from './singleCarContents/single-car-details'
export {
  default as SingleCarSecondaryImage
} from './singleCarContents/single-car-secondary-images'
export {Login, Signup} from './auth-form'
export {default as AllCars} from './AllCars'
