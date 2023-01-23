const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config");
const mode = process.env.NODE_ENV;

const clientUrl = process.env.CLIENT_URL;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, application/json");
  next();
});

app.use(express.json());
app.use(cookieParser());

const session = require("express-session");
const sqlSessionStor = require("express-mysql-session")(session);
const dbInfo = config[mode];
const options = {
  ...dbInfo,
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
const routes = {
  authRoute: require("./routs/auth-route"),
  notesRoute: require("./routs/notes"),
  folderRoute: require("./routs/foldersRoute"),
};

app.use("/", routes.authRoute);
app.use("/", routes.notesRoute);
app.use("/", routes.folderRoute);

const PORT = process.env.PORT || 4011;
app.listen(PORT, () => {
  console.log("server run at 4011");
});
