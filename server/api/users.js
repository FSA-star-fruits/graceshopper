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
  try {
    // CartItem.create().then((cartitem) => {
    //   Order.create().then((order) => {
    //     cartitem.setOrder(order)
    //   })
    // })
    //create cartItem
    Order.create({
      userId: 1
    })
  } catch (err) {
    next(err)
  }
})
