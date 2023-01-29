const db = require("mysql2");
const config = require("./config");

const initQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(60) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT NOW()
    ) ENGINE=InnoDB;
  CREATE TABLE IF NOT EXISTS categories (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    folder VARCHAR(20) NOT NULL,
    user_id INT,
    CONSTRAINT owner_cat FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE CASCADE
    ) ENGINE=InnoDB;
  CREATE TABLE IF NOT EXISTS notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    category_id INT,
    title VARCHAR(255) NOT NULL,
    note TEXT NOT NULL,
    atTime DATETIME NOT NULL,
    bgColor  VARCHAR(20) NOT NULL DEFAULT "rgb(255,255,255)",
    color  VARCHAR(20) NOT NULL DEFAULT "rgb(0,0,0)",
    CONSTRAINT user_owner FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT cat_owner FOREIGN KEY (category_id) REFERENCES categories(id)
    ON UPDATE CASCADE ON DELETE CASCADE
    ) ENGINE=InnoDB;`;

const mode = process.env.NODE_ENV;

const connection = db.createConnection(config[mode]);
connection.connect((err) => {
  if (err) {
    console.log("failed to connect to database");
    console.log(err);
  } else {
    connection.query(initQuery, function (error) {
      if (error) {
        console.log("error while creating tables");
        console.log(error);
      } else {
        console.log("tables was created");
      }
    });
  }
});

module.exports = (from) => {
  const connection = db.createConnection(config[mode]);
  connection.connect(function (err) {
    if (err) {
      console.log(`connectionRequest Failed ${err.stack} from ${from}`);
    } else {
      console.log(`DB connectionRequest Successful ${connection.threadId} from ${from}`);
    }
  });
  return connection;
};
