const JWT = require("jsonwebtoken");
const SECRET_KEY = "thisisSecretKey";

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    JWT.verify(token, SECRET_KEY, (err, valid) => {
      if (err) {
        res.send({ message: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.send({ message: "Please send token with headers" });
  }
};

module.exports = verifyToken;
