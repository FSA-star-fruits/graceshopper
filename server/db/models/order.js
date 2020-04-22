const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  cartItemId: {
    type: Sequelize.STRING
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
