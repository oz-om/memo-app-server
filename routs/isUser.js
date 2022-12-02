const Router = require("express").Router();
const isUser = require("../controllers/isUser");
Router.get('/isuser', isUser.isUser)
module.exports = Router
