const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cartItemId: {
    type: Sequelize.INTEGER
  },
  purchaseDate: {
    type: Sequelize.DATE
  },
  isCheckedOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

module.exports = Order
