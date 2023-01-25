const Router = require("express").Router();
const folderController = require("../controllers/folders-Controller");

Router.post("/getFolders", folderController.getFolders);
Router.post("/addFolder", folderController.addFolder);
Router.post("/deleteFolder", folderController.deleteFolder);
Router.post("/renameFolder", folderController.renameFolder);
module.exports = Router;
