const Router = require("express").Router();
// const parser = require("body-parser").urlencoded({extended:true})

const authController = require("../controllers/auth-controller");

Router.post("/register", authController.register)
Router.post("/login", authController.login)

module.exports = Router;

