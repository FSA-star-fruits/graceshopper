const router = require('express').Router()
const {User, Order, CartItem} = require('../db/models')
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
    const items = await cartItems.findAll({
      include: {
        model: User
      },
      where: {
        orderId: req.params.userId,
        isCheckedOut: false
      }
    })
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/mycart', async (req, res, next) => {
  console.log(req.body)
  try {
    CartItem.create({
      carId: req.body.carID,
      orderId: req.body.userID
    })
    Order.create({
      userId: req.body.userID
    })
  } catch (err) {
    next(err)
  }
})
