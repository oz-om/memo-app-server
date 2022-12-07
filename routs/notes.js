const Router = require("express").Router();

const notesController = require("../controllers/notes-controller");

Router.post("/getNotes", notesController.getNotes);
Router.post("/addNote", notesController.addNote);
Router.post("/deleteNote", notesController.deleteNote);
module.exports = Router;
