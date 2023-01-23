const authModel = require("../models/auth-model");

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
      req.session.isUser = result.user;
      res.send(result);
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
