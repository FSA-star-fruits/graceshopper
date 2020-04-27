'use strict'

const db = require('../server/db')
const {Car, User, CartItem, Order} = require('../server/db/models')
// const {User} = require('../server/db/models/user')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: false}),
    User.create({email: 'john@email.com', password: '123', isAdmin: false}),
    User.create({email: 'murphy@email.com', password: '123', isAdmin: false}),
    User.create({email: 'admin@email.com', password: '123', isAdmin: true})
  ])

  console.log(`seeded ${users.length} users`)

  const cars = await Promise.all([
    Car.create({
      brand: 'Toyota',
      name: 'Sequoia',
      image: 'http://dummyimage.com/223x165.bmp/dddddd/000000',
      price: 10000,
      year: 2012,
      color: 'Indigo',
      isSold: true,
      inventory: 3
    }),
    Car.create({
      brand: 'Honda',
      name: 'Civic',
      image: 'http://dummyimage.com/223x165.bmp/dddddd/000000',
      price: 12000,
      year: 2013,
      color: 'black',
      isSold: true,
      inventory: 5
    }),
    Car.create({
      brand: 'Mini',
      name: 'Cooper',
      image: 'http://dummyimage.com/223x165.bmp/dddddd/000000',
      price: 13000,
      year: 2014,
      color: 'white',
      isSold: true,
      inventory: 7
    })
  ])

  console.log(`seeded ${cars.length} cars`)

  // const orders = await Promise.all([
  await Order.create({
    purchaseDate: null,
    isCheckedOut: false,
    userId: 1
  })
  await Order.create({
    purchaseDate: null,
    isCheckedOut: false,
    userId: 2
  })
  await Order.create({
    purchaseDate: null,
    isCheckedOut: false,
    userId: 3
  })
  await Order.create({
    purchaseDate: null,
    isCheckedOut: false,
    userId: 4
  })
  // ])

  console.log(`seeded orders`)

  const cartItems = await Promise.all([
    CartItem.create({
      quantity: 1,
      orderId: 1,
      carId: 1
    }),
    CartItem.create({
      quantity: 2,
      orderId: 1,
      carId: 2
    }),
    CartItem.create({
      quantity: 3,
      orderId: 2,
      carId: 3
    })
  ])

  console.log(`seeded ${cartItems.length} cartItems`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
