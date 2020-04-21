const router = require('express').Router()
const {SingleCar} = require('../db/models')
module.exports = router

router.get('/:carID', async (req, res, next) => {
  try {
    const id = req.params.carID
    const singleCar = await SingleCar.findOne({
      where: {id: id},
    })

    res.json(singleCar.dataValues)
  } catch (err) {
    next(err)
  }
})
