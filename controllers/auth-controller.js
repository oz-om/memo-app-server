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
      res.cookie("j_own", j_own);
      res.send({
        login: true,
        user,
        j_own,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send({
        logout: false,
        msg: "something went wrong, pleas try agin!",
      });
    } else {
      res.send({
        logout: true,
      });
    }
  });
};
