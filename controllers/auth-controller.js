const authModel = require("../models/auth-model");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  authModel
    .createAccount(req.body)
    .then((user_id) => {
      authModel
        .initCategory(user_id)
        .then(() => {
          res.send({
            register: true,
            msg: "account created successfully",
          });
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.login = (req, res) => {
  authModel
    .login(req.body)
    .then((result) => {
      const key = process.env.JWT_KEY;
      const j_own = jwt.sign(result, key, {
        expiresIn: "24h",
      });
      const { id, ...user } = result;
      res.cookie("j_own", j_own, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.send({
        login: true,
        user,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.logout = (req, res) => {
  res.cookie("j_own", "outOfDate", {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    expires: new Date(Date.now() + 5 * 1000),
  });
  res.send({
    logout: true,
  });
};
