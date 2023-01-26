const jwt = require("jsonwebtoken");

exports.isUser = (req, res, next) => {
  const key = process.env.JWT_KEY;
  const token = req.cookies.j_own;
  if (token) {
    jwt.verify(token, key, (err, user) => {
      if (err) {
        return res.json({
          login: false,
        });
      }
      const { username, email } = user;
      req.isUser = {
        username,
        email,
      };
      next();
    });
  } else {
    res.json({
      login: false,
    });
  }
};

exports.verify = (req, res, next) => {
  const key = process.env.JWT_KEY;
  const token = req.cookies.j_own;
  if (token) {
    jwt.verify(token, key, (err, user) => {
      if (err) {
        return res.json({
          login: false,
        });
      }
      req.userInfo = user;
      next();
    });
  }
};
