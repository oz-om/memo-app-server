const Router = require("express").Router();
const folderController = require("../controllers/folders-Controller");
const isUser = require("../controllers/isUser").isUser;

Router.post("/getFolders", isUser, folderController.getFolders);
Router.post("/addFolder", isUser, folderController.addFolder);
Router.post("/deleteFolder", isUser, folderController.deleteFolder);
Router.post("/renameFolder", isUser, folderController.renameFolder);
module.exports = Router;
