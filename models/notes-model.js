const db = require("../config/database");

exports.getNotes = (owenId) => {
  return new Promise((resolve, reject) => {
    let connection = db("get_notes");
    const sql = "SELECT id, category_id, title, note, atTime, bgColor, color FROM notes WHERE user_id = ?";
    connection.query(sql, [owenId], (err, result) => {
      if (err) {
        console.log(err);
        connection.end();
        reject({
          state: false,
          msg: "something went wrong! please try again",
        });
      } else {
        connection.end();
        resolve({
          state: true,
          notes: result.reverse(),
        });
      }
    });
  });
};

exports.addNote = (ownerId, Note) => {
  const { title, note, category_id, atTime, bgColor, color } = Note;
  return new Promise((resolve, reject) => {
    let connection = db("add_note");
    const sql = "INSERT INTO notes (user_id,title,note,category_id,atTime,bgColor,color) VALUES (?,?,?,?,?,?,?)";
    connection.query(sql, [ownerId, title, note, category_id, atTime, bgColor, color], (err, res) => {
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
  const { noteId, newTitle, newNote, bgColor, color } = updatedNote;
  return new Promise((resolve, reject) => {
    let connection = db("update_note");
    const sql = "UPDATE notes SET note = ?, title = ?, bgColor=?, color=? WHERE id = ?";
    connection.query(sql, [newNote, newTitle, bgColor, color, noteId], (err) => {
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
    let connection = db("delete_note");
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

exports.changeCategory = (noteId, to) => {
  return new Promise((resolve, reject) => {
    let connection = db("change-category");
    let sql = "UPDATE notes SET category_id = ? WHERE id = ?";
    connection.query(sql, [to, noteId], (err) => {
      if (err) {
        console.log(err);
        reject({
          isChange: false,
          msg: "Opes! move note was failed!, something went wrong! pleas try again?",
        });
      } else {
        resolve({
          isChange: true,
          msg: "note was moved successfully",
        });
      }
    });
  });
};
