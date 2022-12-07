const db = require("mysql");
const connection = db.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "memo_app_db",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
});

exports.getFolders = (ownerId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT folder FROM folders WHERE ownerId = ?";
    connection.query(sql, [ownerId], (err, result) => {
      if (err) {
        reject({
          res: false,
          msg: "something went wrong!",
        });
      } else {
        let folders = [];
        result.forEach((folder) => {
          folders.push(folder.folder);
        });
        resolve({
          res: true,
          folders,
        });
      }
    });
  });
};

exports.addFolder = (ownerId, newFolder) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO folders (ownerId, folder) VALUES (?,?)";
    connection.query(sql, [ownerId, newFolder], (err) => {
      if (err) {
        reject({
          isAdd: false,
          msg: "something went wrong!",
        });
      } else {
        resolve({
          isAdd: true,
          msg: "folder created successfully",
        });
      }
    });
  });
};

exports.deleteFolder = (ownerId, folderName) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM folders WHERE ownerId = ? AND folder = ?";
    connection.query(sql, [ownerId, folderName], (err) => {
      if (err) {
        reject({
          isDeleted: false,
          msg: "something went wrong!",
        });
      } else {
        resolve({
          isDeleted: true,
          msg: "folder was deleted successfully",
        });
      }
    });
  });
};

exports.renameFolder = (ownerId, oldName, newName) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE folders SET folder = ? WHERE (folder = ?) AND (ownerId = ?);";
    connection.query(sql, [newName, oldName, ownerId], (err) => {
      if (err) {
        reject({
          isUpdate: false,
          msg: "something went wrong!",
        });
      } else {
        resolve({
          isUpdate: true,
          msg: "folder was renamed successfully",
        });
      }
    });
  });
};
