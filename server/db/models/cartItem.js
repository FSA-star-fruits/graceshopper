const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cart_Item', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = CartItem
