const notesModel = require("../models/notes-model");

exports.getNotes = (req, res) => {
  notesModel
    .getNotes(req.body.ownerId)
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addNote = (req, res) => {
  notesModel
    .addNote(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.deleteNote = (req, res) => {
  notesModel
    .deleteNote(req.body.noteId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
