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

exports.createAccount = (data) => {
  const failed = {
    register: false,
    msg: "Opps! somthing went wrong!?",
  };
  const { username, email, password } = data;
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username = ? OR email = ? ";
    connection.query(sql, [username, email], (err, result) => {
      if (err) {
        console.log(err);
        return reject(failed);
      }
      if (result.length == 0) {
        const sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
        connection.query(sql, [username, email, password], (err, result) => {
          if (err) {
            console.log(err);
            return reject(failed);
          }
          return resolve({
            register: true,
            msg: "account created successfully",
          });
        });
      } else {
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
    const sql = "SELECT * FROM users WHERE username = ? OR email = ?";
    connection.query(sql, [email, email], (err, user) => {
      if (err) {
        return reject(err);
      }
      if (user.length > 0) {
        if (user[0].password == password) {
          const { id, username, email } = user[0];
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
          return reject({
            login: false,
            msg: "user/email or password is wrong!",
          });
        }
      } else {
        return reject({
          login: false,
          msg: "user not exists!",
        });
      }
    });
  });
};
