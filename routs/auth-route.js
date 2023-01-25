const Router = require("express").Router();

const authController = require("../controllers/auth-controller");

Router.post("/register", authController.register);
Router.post("/login", authController.login);
Router.get("/logout", authController.logout);

module.exports = Router;
