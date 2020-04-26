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
    const userData = await Order.findOne({
      where: {
        userId: req.params.userId
      }
    })
    const orderId = userData.id

    const items = await CartItem.findAll({
      where: {
        orderId: orderId
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
    const userData = await Order.findOne({
      where: {
        userId: req.params.userId
      }
    })
    const orderId = userData.id

    await CartItem.create({
      carId: req.body.carId,
      orderId: orderId,
      quantity: 1
    })

    const item = await CartItem.findOne({
      where: {
        carId: req.body.carId,
        orderId: orderId,
        quantity: 1
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
    res.json(item)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/mycart', async (req, res, next) => {
  try {
    const userData = await Order.findOne({
      where: {
        userId: req.params.userId
      }
    })
    const orderId = userData.id

    const cartItem = await CartItem.findOne({
      where: {
        orderId: orderId,
        carId: req.body.carId
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
    cartItem.update(req.body)
    res.json(cartItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:cartItemId/mycart', async (req, res, next) => {
  try {
    const cartItemId = req.params.cartItemId
    const response = await CartItem.destroy({
      where: {
        id: cartItemId
      }
    })
    res.json(response)
  } catch (error) {
    next(error)
  }
})
