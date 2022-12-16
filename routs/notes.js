const Router = require("express").Router();

const notesController = require("../controllers/notes-controller");
const isUser = require("../controllers/isUser").isUser;

Router.post("/getNotes", isUser, notesController.getNotes);
Router.post("/addNote", isUser, notesController.addNote);
Router.post("/deleteNote", isUser, notesController.deleteNote);
Router.post("/updateNote", isUser, notesController.updateNote);
module.exports = Router;
