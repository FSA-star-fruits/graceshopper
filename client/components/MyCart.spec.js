// /* global describe beforeEach it */
import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MyCart from './MyCart'
import store from '../store/index'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('MyCart', () => {
  let myCart

  beforeEach(() => {
    myCart = shallow(<MyCart store={store} cartItems={[]} />)
  })

  it('indicate that the cart is empty in a h2 tag', () => {
    expect(myCart.find('h2').text()).to.be.equal(
      'Your Cart Is Currently Empty.'
    )
  })
})

//   beforeEach(() => {
//     myCart = shallow(
//       <MyCart
//         store={store}
//         cartItems={[
//           {
//             id: 1,
//             quantity: 1,
//             createdAt: '2020-04-22T20:40:19.660Z',
//             updatedAt: '2020-04-22T20:40:19.660Z',
//             orderId: 3,
//             carId: 5,
//             order: {
//               id: 3,
//               purchaseDate: null,
//               isCheckedOut: false,
//               createdAt: '2020-04-22T20:40:19.660Z',
//               updatedAt: '2020-04-22T20:40:19.660Z',
//               userId: 1,
//             },
//             car: {
//               id: 5,
//               Brand: 'Toyota',
//               Name: 'Corolla',
//               Image: 'imgUrl',
//               Price: 100,
//               Year: 2000,
//               Color: 'black',
//               InteriorColor: null,
//               EngineType: null,
//               StockNo: null,
//               Transmission: null,
//               Doors: null,
//               VIN: null,
//               VehicleID: null,
//               isSold: false,
//               inventory: 2,
//               createdAt: '2020-04-22T20:40:19.660Z',
//               updatedAt: '2020-04-22T20:40:19.660Z',
//             },
//           },
//         ]}
//       />
//     )
//   })
//   it('renders the car in the cart in an h2', () => {
//     expect(myCart.find('h2').text()).to.be.equal('Items in your cart:')
//   })
