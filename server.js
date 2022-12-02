const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const sqlSessionStor = require("express-mysql-session")(session);
const cookieParser = require("cookie-parser")
const options = {
  host:'127.0.0.1',
  user:'root',
  password: 'root',
  database:'memo_app_db',
  schema: {
		tableName: 'loggedIn',
		columnNames: {
			session_id: 'logged_id',
			expires: 'expires',
			data: 'data'
		}
	}
}
const sessionStor = new sqlSessionStor(options);
app.use(session({
  key:'userId',
  resave:false,
  saveUninitialized: false,
  secret:'strongSecretKey',
  store:sessionStor,
  cookie: {
    maxAge: 1000*60*60*24,
  }
}))
app.use(cors());
app.use(express.json());
app.use(cookieParser())

const authRoute = require("./routs/auth-route");
const notesRoute = require("./routs/notes");
const checkUserRoute = require("./routs/isUser");
app.use("/", authRoute);
app.use("/", notesRoute);
app.use("/", checkUserRoute);

const PORT = process.env.PORT || 4011
app.listen(PORT, () => {
  console.log("server run at 4011")
})

