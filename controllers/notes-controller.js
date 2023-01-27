const notesModel = require("../models/notes-model");

exports.getNotes = (req, res) => {
  notesModel
    .getNotes(req.userInfo.id)
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.addNote = (req, res) => {
  notesModel
    .addNote(req.userInfo.id, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updateNote = (req, res) => {
  notesModel
    .updateNote(req.body)
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
