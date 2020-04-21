const db = require('../db')
const User = require('./user')
const SingleCar = require('./singlecar')
const Order = require('./order')
const CartItem = require('./cartItem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Order.belongsTo(User)
User.hasOne(Order)

CartItem.belongsTo(Order)
Order.hasMany(CartItem)

SingleCar.belongsTo(CartItem)
CartItem.hasOne(SingleCar)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  SingleCar,
  Order,
  CartItem,
  db
}
