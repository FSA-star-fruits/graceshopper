/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('POST route', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/auth/signup/', () => {
    beforeEach(() => {
      return User.create({
        email: 'cody@puppybook.com',
        password: '123',
        isAdmin: true
      })
    })

    it('POST /auth/signup', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .expect(500)
      expect(res.body).to.be.an('Object')
      expect(res.body.isAdmin).to.be.equal(undefined)
    })
  })
})
