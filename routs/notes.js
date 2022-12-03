const Router = require("express").Router();

const notesController = require("../controllers/notes-controller");

Router.get("/getNotes", notesController.getNotes);
module.exports = Router;
