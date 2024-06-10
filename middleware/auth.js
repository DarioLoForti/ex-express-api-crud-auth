const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Token is missing");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      throw new Error("Token is invalid");
    }
    req.user = data;
    next();
  });
};
