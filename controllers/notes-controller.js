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
