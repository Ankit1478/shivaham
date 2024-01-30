const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const decodeValue = jwt.verify(token, JWT_SECRET);
  if (decodeValue.username) {
    req.username = decodeValue.username;
    next();
  } else {
    res.status(403).json({
      Msg: "wrong user",
    });
  }
}

module.exports = userMiddleware;
