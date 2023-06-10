const webAdminMW = (req, res, next) => {
  if (req.user.role === "web-admin") {
    next();
  } else {
    res.status(401).send("Unauthorized access denied");
  }
};
module.exports = webAdminMW;
