exports.isUser = (req, res, next) => {
  if (req.session.isUser) {
    next();
  }
};
