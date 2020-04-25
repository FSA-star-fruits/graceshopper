const router = require('express').Router()
module.exports = router

// router.use('/singlecar', require('./singlecars'))
router.use('/users', require('./users'))
router.use('/cars', require('./cars'))

// for adding fake data
router.use('/add', require('./fakerApi'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
