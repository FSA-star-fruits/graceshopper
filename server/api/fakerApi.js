const router = require('express').Router()
const {User} = require('../db/models')
const {Car} = require('../db/models')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    if (req.body.hasOwnProperty('Brand')) {
      console.log('carBodyy: ', req.body)
      const {
        brand,
        name,
        image,
        price,
        year,
        color,
        interiorColor,
        engineType,
        stockNo,
        transmission,
        doors,
        vin,
        vehicleId,
        isSold,
        inventory
      } = req.body
      const newCar = await Car.create({
        brand,
        name,
        image,
        price,
        year,
        color,
        interiorColor,
        engineType,
        stockNo,
        transmission,
        doors,
        vin,
        vehicleId,
        isSold,
        inventory
      })
      res.json(newCar)
    } else next()
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.body.hasOwnProperty('email')) {
      console.log('userBody: ', req.body)
      const {email, password} = req.body
      const newUser = await User.create({email, password})
      console.log('newUser: ', newUser)
      res.json(newUser)
    } else next()
  } catch (error) {
    next(error)
  }
})
