/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllCars} from './AllCars'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllCars', () => {
  let allCars

  beforeEach(() => {
    userHome = shallow(<AllCars cars={[]} />)
  })

  it('renders a message to begin listing cars in a h2', () => {
    expect(allCars.find('h2').text()).to.be.equal('Cars that Exist')
  })
})
