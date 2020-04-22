const chai = require('chai')
const expect = chai.expect
const Order = require('./order')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('Order model', () => {
  before('Synchronize the model', () => Order.sync({force: true}))
  beforeEach('Truncate data', () => Order.truncate())

  describe('Schema', () => {
    it('require "isCheckedOut" field', async () => {
      await expect(Order.create({isCheckedOut: 'null'})).to.be.rejected
    })
  })
})
