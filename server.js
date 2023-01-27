const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");

require("dotenv").config();

const clientUrl = process.env.CLIENT_URL;
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  }),
  cookie(),
  express.json(),
  express.urlencoded({ extended: true }),
);
app.set("trust proxy", 1);

const { isUser } = require("./middleware/isUser");
app.get("/", isUser, (req, res) => {
  if (req.isUser) {
    res.send({
      login: true,
      user: req.isUser,
    });
  } else {
    res.send({
      login: false,
    });
  }
});

const routes = {
  authRoute: require("./routs/auth-route"),
  notesRoute: require("./routs/notesRoute"),
  folderRoute: require("./routs/foldersRoute"),
};

app.use("/", routes.authRoute);
app.use("/", routes.notesRoute);
app.use("/", routes.folderRoute);

const PORT = process.env.PORT || 4011;
app.listen(PORT, () => {
  console.log("server run at 4011");
});
