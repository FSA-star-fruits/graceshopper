const Sequelize = require('sequelize')
const db = require('../db')

const Car = db.define('car', {
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  interiorColor: {
    type: Sequelize.STRING
  },
  engineType: {
    type: Sequelize.STRING
  },
  stockNo: {
    type: Sequelize.INTEGER
  },
  transmission: {
    type: Sequelize.STRING
  },
  doors: {
    type: Sequelize.INTEGER
  },
  vin: {
    type: Sequelize.STRING
  },
  vehicleID: {
    type: Sequelize.INTEGER
  },
  isSold: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    validate: {
      notEmpty: true
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Car
