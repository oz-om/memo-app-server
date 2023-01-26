const Router = require("express").Router();

const notesController = require("../controllers/notes-controller");
const verify = require("../middleware/isUser").verify;

Router.get("/getNotes", verify, notesController.getNotes);
Router.post("/addNote", verify, notesController.addNote);
Router.post("/deleteNote", verify, notesController.deleteNote);
Router.post("/updateNote", verify, notesController.updateNote);
module.exports = Router;
