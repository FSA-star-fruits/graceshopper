const Sequelize = require('sequelize')
const db = require('../db')

// const CartItem = db.define('cartItem', {
//   carId: {
//     type: Sequelize.INTEGER,
//   },
// })

const CartItem = db.define(
  'cart_Item',
  {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
    //     selfGranted: DataTypes.BOOLEAN
  }
  // , { timestamps: false }
)

module.exports = CartItem
