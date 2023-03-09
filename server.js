const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
require("dotenv").config();
const filesUpload = require("express-fileupload");
const axios = require("axios");
const BodyForm = require("form-data");

const clientUrl = process.env.CLIENT_URL;
console.log(clientUrl);
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  }),
  cookie(),
  express.json(),
  express.urlencoded({ extended: true }),
  filesUpload(),
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

app.post("/upload", async (req, res) => {
  if (!req.files) {
    res.status(500).json({
      upload: false,
      msg: "pleas select an image to upload",
    });
    return;
  }

  const img = req.files.file;
  const form = new BodyForm();

  form.append("file", img.data, {
    filename: img.name,
    contentType: img.mimetype,
    knownLength: img.size,
  });

  try {
    const data = await axios({
      url: "https://telegra.ph/upload",
      method: "POST",
      headers: {
        ...form.getHeaders(),
      },
      data: form,
    });
    res.status(200).json({
      upload: true,
      msg: "upload succefully",
      imgUrl: "https://telegra.ph" + data.data[0].src,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      upload: false,
      msg: "Error uploading file",
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
