const router = require('express').Router()
const {Car} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Car.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
