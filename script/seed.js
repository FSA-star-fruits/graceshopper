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
      image: 'https://i.imgur.com/dKJsSUL.png',
      price: 10000,
      year: 2012,
      color: 'Indigo',
      isSold: true,
      inventory: 3
    }),
    Car.create({
      brand: 'Honda',
      name: 'Civic',
      image: 'https://i.imgur.com/ootxfW2.png',
      price: 12000,
      year: 2013,
      color: 'black',
      isSold: true,
      inventory: 5
    }),
    Car.create({
      brand: 'Mini',
      name: 'Cooper',
      image: 'https://i.imgur.com/8tckLWS.png',
      price: 13000,
      year: 2014,
      color: 'white',
      isSold: true,
      inventory: 7
    }),
    Car.create({
      brand: 'Dodge',
      name: 'Dodger',
      image: 'https://i.imgur.com/DjX30Ef.png',
      price: 14000,
      year: 1931,
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
      carId: 1,
      price: 1000000
    }),
    CartItem.create({
      quantity: 1,
      orderId: 1,
      carId: 2,
      price: 1100000
    }),
    CartItem.create({
      quantity: 1,
      orderId: 2,
      carId: 3,
      price: 1200000
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
