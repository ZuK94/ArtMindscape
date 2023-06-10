const jwt = require("jsonwebtoken");
const { secretToken } = require("../configs/config");

const authMW = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    res.status(401).send("no token provided");
    return;
  }
  try {
    req.user = jwt.verify(token, secretToken);
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
module.exports = authMW;
