const router = require('express').Router()
const {User, Order, CartItem, Car} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
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
      where: {
        orderId: req.params.userId
      },
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
  try {
    await Order.create({
      userId: req.body.userId
    })
    await CartItem.create({
      carId: req.body.carId,
      orderId: req.body.userId,
      quantity: 1
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:cartItemId/mycart', async (req, res, next) => {
  try {
    const cartItemId = req.params.cartItemId

    if (cartItemId !== 'undefined') {
      const response = await CartItem.destroy({
        where: {
          id: cartItemId
        }
      })
      res.json(response)
    }
  } catch (error) {
    next(error)
  }
})
