const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  cartItemId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  purchaseDate: {
    type: Sequelize.DATE
  },
  isCheckedOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: true
  }
})

module.exports = Order
