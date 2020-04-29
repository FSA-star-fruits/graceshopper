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

  // const cars = await Promise.all([
  await Car.create({
    brand: 'Hummer',
    name: 'H3',
    image: 'https://i.imgur.com/dKJsSUL.png',
    secondaryImage: [
      'https://i.imgur.com/tAtovX9.jpg',
      'https://i.imgur.com/16Q8Stj.jpg',
      'https://i.imgur.com/u7fhthH.jpg',
      'https://i.imgur.com/UQj9SDp.jpg',
      'https://i.imgur.com/lbpM1Ep.jpg'
    ],
    price: 1100000,
    year: 2012,
    color: 'Black',
    isSold: true,
    inventory: 3,
    engineType: '5-Cyl, 3.7 Liter',
    interiorColor: 'Black',
    transmission: 'Automatic, 4-Spd W/Overdrive'
  })
  await Car.create({
    brand: 'BMW',
    name: '3 Series',
    image: 'https://i.imgur.com/ootxfW2.png',
    secondaryImage: [
      'https://i.imgur.com/tAtovX9.jpg',
      'https://i.imgur.com/16Q8Stj.jpg',
      'https://i.imgur.com/u7fhthH.jpg',
      'https://i.imgur.com/UQj9SDp.jpg',
      'https://i.imgur.com/lbpM1Ep.jpg'
    ],
    price: 1200000,
    year: 2013,
    color: 'black',
    isSold: true,
    inventory: 5,
    engineType: '5-Cyl, 3.7 Liter',
    interiorColor: 'Black',
    transmission: 'Automatic, 4-Spd W/Overdrive'
  })

  await Car.create({
    brand: 'Mini',
    name: 'Cooper',
    image: 'https://i.imgur.com/8tckLWS.png',
    secondaryImage: [
      'https://i.imgur.com/tAtovX9.jpg',
      'https://i.imgur.com/16Q8Stj.jpg',
      'https://i.imgur.com/u7fhthH.jpg',
      'https://i.imgur.com/UQj9SDp.jpg',
      'https://i.imgur.com/lbpM1Ep.jpg'
    ],
    price: 1300000,
    year: 2014,
    color: 'white',
    isSold: true,
    inventory: 7,
    engineType: '5-Cyl, 3.7 Liter',
    interiorColor: 'Black',
    transmission: 'Automatic, 4-Spd W/Overdrive'
  })
  await Car.create({
    brand: 'Tesla',
    name: 'Model S',
    image: 'https://i.imgur.com/DjX30Ef.png',
    secondaryImage: [
      'https://i.imgur.com/tAtovX9.jpg',
      'https://i.imgur.com/16Q8Stj.jpg',
      'https://i.imgur.com/u7fhthH.jpg',
      'https://i.imgur.com/UQj9SDp.jpg',
      'https://i.imgur.com/lbpM1Ep.jpg'
    ],
    price: 1400000,
    year: 2019,
    color: 'white',
    isSold: true,
    inventory: 7,
    engineType: '5-Cyl, 3.7 Liter',
    interiorColor: 'Black',
    transmission: 'Automatic, 4-Spd W/Overdrive'
  })
  // ])

  // console.log(`seeded ${cars.length} cars`)
  console.log(`seeded cars`)

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
      price: 1100000
    }),
    CartItem.create({
      quantity: 1,
      orderId: 1,
      carId: 2,
      price: 1200000
    }),
    CartItem.create({
      quantity: 1,
      orderId: 2,
      carId: 3,
      price: 1300000
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
