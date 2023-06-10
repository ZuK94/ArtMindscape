const editorMW = (req, res, next) => {
  if (req.user.role === "editor" || req.user.role === "web-admin") {
    next();
  } else {
    res.status(401).send("Unauthorized access denied");
  }
};
module.exports = editorMW;
