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

exports.getNotes = (owenId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM notes WHERE ownerId = ?";
    connection.query(sql, [owenId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.addNote = (Note) => {
  const { ownerId, title, note, folder, atTime, bgColor, color } = Note;
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO notes (ownerId,title,note,folder,atTime,bgColor,color) VALUES (?,?,?,?,?,?,?)";
    connection.query(sql, [ownerId, title, note, folder, atTime, bgColor, color], (err, res) => {
      if (err) {
        reject({
          isPush: false,
          msg: "Opes! something went wrong! pleas try again?",
        });
      } else {
        resolve({
          isPush: true,
          noteId: res.insertId,
          msg: "note was add successfully",
        });
      }
    });
  });
};

exports.updateNote = (updatedNote) => {
  const { newTitle, newNote, id, bgColor, color } = updatedNote;
  return new Promise((resolve, reject) => {
    const sql = "UPDATE notes SET note = ?, title = ?, bgColor=?, color=? WHERE id = ?";
    connection.query(sql, [newNote, newTitle, bgColor, color, id], (err) => {
      if (err) {
        console.log(err);
        reject({
          isUpdate: false,
          msg: "Opes! something went wrong! pleas try again?",
        });
      } else {
        resolve({
          isUpdate: true,
          msg: "note was update successfully",
        });
      }
    });
  });
};

exports.deleteNote = (noteId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM notes WHERE id = ?";
    connection.query(sql, [noteId], (err) => {
      if (err) {
        reject({
          deleted: false,
          msg: "Opes! Something went wrong! pleas try again?",
        });
      } else {
        resolve({
          deleted: true,
          msg: "deleted success",
        });
      }
    });
  });
};
