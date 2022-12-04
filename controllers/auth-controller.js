const authModel = require("../models/auth-model");

exports.register = (req, res) => {
  authModel
    .createAccount(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.login = (req, res) => {
  authModel
    .login(req.body)
    .then((result) => {
      req.session.isUser = result.user;
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
