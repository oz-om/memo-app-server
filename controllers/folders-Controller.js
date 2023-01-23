const foldersModel = require("../models/folders-model");

exports.getFolders = (req, res) => {
  foldersModel
    .getFolders(req.body.ownerId)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

exports.addFolder = (req, res) => {
  const { ownerId, newFolder } = req.body;
  foldersModel
    .addFolder(ownerId, newFolder)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

exports.deleteFolder = (req, res) => {
  const { id } = req.body;
  foldersModel
    .deleteFolder(id)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

exports.renameFolder = (req, res) => {
  const { id, newName } = req.body;
  foldersModel
    .renameFolder(id, newName)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};
