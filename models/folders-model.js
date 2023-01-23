const connection = require("../config/database");

exports.getFolders = (ownerId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, folder FROM categories WHERE user_id = ?";
    connection.query(sql, [ownerId], (err, result) => {
      if (err) {
        reject({
          res: false,
          msg: "something went wrong!",
        });
      } else {
        resolve({
          res: true,
          folders: result,
        });
      }
    });
  });
};

exports.addFolder = (ownerId, newFolder) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO categories (user_id, folder) VALUES (?,?)";
    connection.query(sql, [ownerId, newFolder], (err, result) => {
      if (err) {
        reject({
          isAdd: false,
          msg: "something went wrong!",
        });
      } else {
        resolve({
          isAdd: true,
          id: result.insertId,
          msg: "folder created successfully",
        });
      }
    });
  });
};

exports.deleteFolder = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM categories WHERE id = ?";
    connection.query(sql, [id], (err) => {
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

exports.renameFolder = (id, newName) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE categories SET folder = ? WHERE id = ?;";
    connection.query(sql, [newName, id], (err) => {
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
