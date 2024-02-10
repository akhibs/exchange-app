const jwt = require("jsonwebtoken");

function verifyToken(token) {
  let user;

  try {
    const verifyUser = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
    user = verifyUser;
  } catch (err) {
    user = "invalid user";
  }

  return user;
}

module.exports = verifyToken;
