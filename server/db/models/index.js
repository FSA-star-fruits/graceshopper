const db = require('../db')
const User = require('./user')
const Order = require('./order')
const CartItem = require('./cartItem')
const Car = require('./car')

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

Car.belongsTo(CartItem)
CartItem.hasOne(Car)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,

  Order,
  CartItem,
  db,
  Car
}
