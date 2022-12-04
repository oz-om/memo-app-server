const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  }),
);
app.use(express.json());
app.use(cookieParser());

const session = require("express-session");
const sqlSessionStor = require("express-mysql-session")(session);

const options = {
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "memo_app_db",
  schema: {
    tableName: "sessions",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
};
const sessionStor = new sqlSessionStor(options);
app.use(
  session({
    key: "auth",
    resave: false,
    saveUninitialized: false,
    secret: "strongSecretKey",
    store: sessionStor,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.get("/", (req, res) => {
  if (req.session.isUser) {
    res.send({
      login: true,
      user: req.session.isUser,
    });
  } else {
    res.send({
      login: false,
    });
  }
});
const authRoute = require("./routs/auth-route");
const notesRoute = require("./routs/notes");
app.use("/", authRoute);
app.use("/", notesRoute);

const PORT = process.env.PORT || 4011;
app.listen(PORT, () => {
  console.log("server run at 4011");
});
