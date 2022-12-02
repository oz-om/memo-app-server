const Router = require("express").Router();

const notesController = require("../controllers/notes-controller");

Router.get("/", notesController.getNotes);
module.exports = Router;
