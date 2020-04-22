const router = require('express').Router()
const {User, Order, CartItem, Car} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/mycart', async (req, res, next) => {
  try {
    const items = await Order.findAll({
      include: [
        {
          model: User
        },
        {
          model: CartItem,
          include: {
            model: Car
          }
        }
      ],
      where: {
        orderId: req.params.userId, // should work if userId === orderID
        isCheckedOut: false
      }
    })

    res.json(items)
  } catch (err) {
    next(err)
  }
})
