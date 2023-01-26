const Router = require("express").Router();
const folderController = require("../controllers/folders-Controller");
const verify = require("../middleware/isUser").verify;

Router.post("/getFolders", verify, folderController.getFolders);
Router.post("/addFolder", verify, folderController.addFolder);
Router.post("/deleteFolder", verify, folderController.deleteFolder);
Router.post("/renameFolder", verify, folderController.renameFolder);
module.exports = Router;
