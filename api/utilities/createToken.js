const jwt = require("jsonwebtoken");

function createToken(
  username,
  password,
  id,
  email,
  dateOfBirth,
  country,
  phoneNumber,
  balance
) {
  const token = jwt.sign(
    { username, password, id, balance },
    process.env.TOKEN_PRIVATE_KEY,
    {
      expiresIn: "1d",
    }
  );

  return token;
}

module.exports = createToken;
