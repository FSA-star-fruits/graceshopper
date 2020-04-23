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
    const items = await CartItem.findAll({
      include: [
        {
          model: Order
        },
        {
          model: Car
        }
      ]
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/mycart', async (req, res, next) => {
  console.log(req.body)
  try {
    await CartItem.create({
      carId: req.body.carId,
      orderId: req.body.userId,
      quantity: 1
    })
    await Order.create({
      userId: req.body.userId
    })
  } catch (err) {
    next(err)
  }
})
