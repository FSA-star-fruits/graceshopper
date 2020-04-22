const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  isSold: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = CartItem
