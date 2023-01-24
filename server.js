const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config/config");
const mode = process.env.NODE_ENV;

app.use(express.json());

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
    name: "auth",
    key: "auth",
    resave: false,
    saveUninitialized: false,
    secret: "strongSecretKey",
    store: sessionStor,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
    },
  }),
);
const clientUrl = process.env.CLIENT_URL;
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
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
