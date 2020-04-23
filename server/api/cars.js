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

router.get('/:carId', async (req, res, next) => {
  try {
    const id = req.params.carId

    const singleCar = await Car.findOne({
      where: {id: id}
    })

    res.json(singleCar.dataValues)
  } catch (err) {
    next(err)
  }
})
