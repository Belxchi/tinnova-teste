const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("teste-tinnova", "postgres", "111", {
  host: "localhost",
  dialect: "postgres",
  logging: console.log,
});

module.exports = sequelize;
