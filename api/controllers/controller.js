const Model = require("../models/model");
const createToken = require("../utilities/createToken");
const verifyToken = require("../utilities/verifyToken");

exports.awake = async (req, res) => {
  console.log("new log");
  res.status(200);
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  let status;
  let token;
  let userId;

  const user = await Model.find({
    $and: [{ username: username }, { password: password }],
  });

  const userEmail = await Model.find({
    $and: [{ email: username }, { password: password }],
  });

  if (user.length > 0) {
    status = "okay";
    token = createToken(user[0].username, user[0].password, user[0]._id);
    userId = user[0]._id;
  } else if (userEmail.length > 0) {
    status = "okay";
    token = createToken(
      userEmail[0].username,
      userEmail[0].password,
      userEmail[0]._id
    );
    userId = userEmail[0]._id;
  } else {
    status = "user not found";
    token = undefined;
    userId = undefined;
  }

  res.status(200).json({
    status,
    token,
    userId,
  });
};

exports.signup = async (req, res) => {
  const { username, password, email, dateOfBirth, country, phoneNumber } =
    req.body;

  let status, token, userId;

  const sameUserName = await Model.find({ username: username });
  const sameEmail = await Model.find({ email: email });

  if (sameUserName.length > 0) {
    status = "username already in use";
    token = undefined;
    userId = undefined;
  } else if (sameEmail.length > 0) {
    status = "email already in use";
    userId = undefined;
    token = undefined;
  } else {
    status = "okay";
  }

  if (status === "okay") {
    const newUser = new Model({
      username: username,
      password: password,
      email: email,
      dateOfBirth: dateOfBirth,
      country: country,
      phoneNumber: phoneNumber,
      balance: 0,
      plan: "none",
      profit: 0,
      mineStatus: "not mining",
    });
    await newUser.save();
    token = createToken(newUser.username, newUser.password, newUser._id);
    userId = newUser._id;
  }

  res.status(200).json({
    status,
    token,
    userId,
  });
};

exports.protect = async (req, res) => {
  const { token, userId } = req.body;

  const tokenVerification = verifyToken(token);

  let status;
  if (tokenVerification.id === userId) {
    status = "okay";
  } else {
    status = "bad";
  }

  const user = await Model.find({ _id: tokenVerification.id });

  res.status(200).json({
    status,
    username: user[0].username,
    balance: user[0].balance,
    plan: user[0].plan,
    profit: user[0].profit,
    mineStatus: user[0].mineStatus,
  });
};
