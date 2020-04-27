// /* global describe beforeEach it */
import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import GuestCart from './GuestCart'
import store from '../store/index'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('GuestCart', () => {
  let guestCart

  beforeEach(() => {
    guestCart = shallow(<GuestCart store={store} cartItems={[]} />)
  })

  it('indicate that the cart is empty in a h2 tag', () => {
    expect(guestCart.find('h2').text()).to.be.equal(
      'Items in your cart: show items stored in Sessions'
    )
  })
})
