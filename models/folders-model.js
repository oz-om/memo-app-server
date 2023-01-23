const connection = require("../config/database");
const connectionError = {
  connection: false,
  msg: "can't connect to database",
};

exports.getFolders = (ownerId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, folder FROM categories WHERE user_id = ?";
    connection.connect((err) => {
      if (err) {
        console.log(err);
        return reject(connectionError);
      }
      connection.query(sql, [ownerId], (err, result) => {
        if (err) {
          console.log(err);
          connection.end();
          reject({
            res: false,
            msg: "something went wrong!",
          });
        } else {
          connection.end();
          resolve({
            res: true,
            folders: result,
          });
        }
      });
    });
  });
};

exports.addFolder = (ownerId, newFolder) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO categories (user_id, folder) VALUES (?,?)";
    connection.connect((err) => {
      if (err) {
        console.log(err);
        return reject(connectionError);
      }
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
  });
};

exports.deleteFolder = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM categories WHERE id = ?";
    connection.connect((err) => {
      if (err) {
        console.log(err);
        return reject(connectionError);
      }
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
  });
};

exports.renameFolder = (id, newName) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE categories SET folder = ? WHERE id = ?;";
    connection.connect((err) => {
      if (err) {
        console.log(err);
        return reject(connectionError);
      }
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
  });
};
