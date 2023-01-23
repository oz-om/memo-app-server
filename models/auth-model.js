const db = require("../config/database");
const failed = {
  register: false,
  msg: "Opps! somthing went wrong!?",
};

exports.createAccount = (data) => {
  const { username, email, password } = data;
  return new Promise((resolve, reject) => {
    let connection = db("create_new_user");
    const sql = "SELECT * FROM users WHERE username = ? OR email = ? ";
    connection.query(sql, [username, email], (err, result) => {
      if (err) {
        console.log(err);
        connection.end();
        return reject(failed);
      }
      if (result.length == 0) {
        const sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
        connection.query(sql, [username, email, password], (err, result) => {
          if (err) {
            console.log(err);
            connection.end();
            return reject(failed);
          }
          return resolve(result.insertId);
        });
      } else {
        connection.end();
        return reject({
          register: false,
          msg: "user already exist!",
        });
      }
    });
  });
};

exports.login = (data) => {
  const { email, password } = data;
  return new Promise((resolve, reject) => {
    let connection = db("login_user");
    const sql = "SELECT * FROM users WHERE username = ? OR email = ?";
    connection.query(sql, [email, email], (err, user) => {
      if (err) {
        console.log(err);
        connection.end();
        return reject(err);
      }
      if (user.length > 0) {
        if (user[0].password == password) {
          const { id, username, email } = user[0];
          connection.end();
          return resolve({
            login: true,
            msg: "login success",
            user: {
              id,
              username,
              email,
            },
          });
        } else {
          connection.end();
          return reject({
            login: false,
            msg: "user/email or password is wrong!",
          });
        }
      } else {
        connection.end();
        return reject({
          login: false,
          msg: "user not exists!",
        });
      }
    });
  });
};

exports.initCategory = (ownerId) => {
  return new Promise((resolve, reject) => {
    let connection = db("init_categories");
    const sql = `INSERT INTO categories (folder, user_id) VALUES (?,?)`;
    connection.query(sql, ["uncategorized", ownerId], (err) => {
      if (err) {
        console.log(err);
        connection.end();
        return reject(failed);
      }
      connection.end();
      return resolve({
        createCategory: true,
      });
    });
  });
};
