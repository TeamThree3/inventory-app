const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Item = sequelize.define("item", {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  price: Sequelize.DOUBLE,
  category: Sequelize.STRING,
  image: Sequelize.STRING,
});

sequelize.sync();

module.exports = {
  db: sequelize,
  Item,
}