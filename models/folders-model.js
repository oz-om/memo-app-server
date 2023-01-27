const db = require("../config/database");

exports.getFolders = (ownerId) => {
  return new Promise((resolve, reject) => {
    let connection = db("get_folder");
    const sql = "SELECT id, folder FROM categories WHERE user_id = ?";
    connection.query(sql, [ownerId], (err, result) => {
      if (err) {
        console.log(err);
        connection.end();
        reject({
          state: false,
          msg: "something went wrong, please try again!",
        });
      } else {
        connection.end();
        resolve({
          state: true,
          folders: result.reverse(),
        });
      }
    });
  });
};

exports.addFolder = (ownerId, newFolder) => {
  return new Promise((resolve, reject) => {
    let connection = db("add_folder");
    const sql = "INSERT INTO categories (user_id, folder) VALUES (?,?)";
    connection.query(sql, [ownerId, newFolder], (err, result) => {
      if (err) {
        console.log(err);
        connection.end();
        reject({
          isAdd: false,
          msg: "something went wrong!",
        });
      } else {
        connection.end();
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
    let connection = db("delete_folder");
    const sql = "DELETE FROM categories WHERE id = ?";
    connection.query(sql, [id], (err) => {
      if (err) {
        console.log(err);
        connection.end();
        reject({
          isDeleted: false,
          msg: "something went wrong!",
        });
      } else {
        connection.end();
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
    let connection = db("rename_folder");
    const sql = "UPDATE categories SET folder = ? WHERE id = ?;";
    connection.query(sql, [newName, id], (err) => {
      if (err) {
        console.log(err);
        connection.end();
        reject({
          isUpdate: false,
          msg: "something went wrong!",
        });
      } else {
        connection.end();
        resolve({
          isUpdate: true,
          msg: "folder was renamed successfully",
        });
      }
    });
  });
};
