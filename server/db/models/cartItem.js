const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  carId: {
    type: Sequelize.STRING
  }
})

module.exports = CartItem
