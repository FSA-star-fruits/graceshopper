const router = require('express').Router()
const {User} = require('../db/models')
const {Car} = require('../db/models')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    if (req.body.hasOwnProperty('brand')) {
      console.log('carBodyy: ', req.body)
      const {
        Brand,
        Name,
        Image,
        Price,
        Year,
        Color,
        InteriorColor,
        EngineType,
        StockNo,
        Transmission,
        Doors,
        VIN,
        VehicleId,
        isSold,
        inventory
      } = req.body
      console.log('Brand: ', Brand, Name, Price, isSold)
      const newCar = await Car.create({
        Brand,
        Name,
        Image,
        Price,
        Year,
        Color,
        InteriorColor,
        EngineType,
        StockNo,
        Transmission,
        Doors,
        VIN,
        VehicleId,
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
