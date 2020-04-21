const Sequelize = require('sequelize')
const db = require('../db')

const SingleCar = db.define('singlecar', {
  Brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  InteriorColor: {
    type: Sequelize.STRING
  },
  EngineType: {
    type: Sequelize.STRING
  },
  StockNo: {
    type: Sequelize.INTEGER
  },
  Transmission: {
    type: Sequelize.STRING
  },
  Doors: {
    type: Sequelize.INTEGER
  },
  VIN: {
    type: Sequelize.STRING
  },
  VehicleID: {
    type: Sequelize.INTEGER
  },
  isSold: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = SingleCar
