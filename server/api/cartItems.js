const router = require('express').Router()
const {CartItem} = require('../db/models')
module.exports = router

router.put(`/cartItems/:cartItemId`, async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.cartItemId)
    cartItem.update(req.body)
    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})
