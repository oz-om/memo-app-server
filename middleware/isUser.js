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
      req.isUser = user;
      // {
      //   id: 30001,
      //   username: 'omoz',
      //   email: 'omzid@mail.com',
      //   iat: 1674681528,
      //   exp: 1674767928
      // }
      next();
    });
  } else {
    res.json({
      login: false,
    });
  }
};
