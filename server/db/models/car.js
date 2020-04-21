const Sequelize = require('sequelize')
const db = require('../db')
//Brand, Name, Image, Price, Year, Color, isNew
const Car = db.define('car', {
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://firstsiteguide.com/wp-content/uploads/2017/07/featured-image-in-wordpress-1-640x400.png'
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  year: {
    type: Sequelize.INTEGER
  },
  color: {
    type: Sequelize.STRING
  },
  isNew: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Car
