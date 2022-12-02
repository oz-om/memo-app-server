const db = require("mysql");
const connection = db.createConnection({
  host:"127.0.0.1",
  user:'root',
  password:'root',
  database: 'memo_app_db'
});

connection.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("connection to dataBase success")
  }
});

exports.getNotes = () => {
  return new Promise((resolve, reject)=> {
    const sql = "SELECT * FROM notes";
    connection.query(sql, (err, result)=> {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}