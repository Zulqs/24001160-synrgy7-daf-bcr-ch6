const authController = require("./authController");
const usersController = require("./usersController");
const carsController = require("./carsController")
const logController = require("./logController")
const main = require("./main");
const v1 = require("./v1");

module.exports = {
  main,
  v1,
  authController,
  usersController,
  carsController,
  logController
};
