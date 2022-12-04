const Router = require("express").Router();

const notesController = require("../controllers/notes-controller");

Router.post("/getNotes", notesController.getNotes);
module.exports = Router;
