const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const userRegisterController = async (req, res) => {
  const { email, password, name } = req.body;
  const isExists = await userModel.findOne({ email: email });
  if (isExists) {
    return res.status(422).json({
      message: "this email is exists",
      status: "Faild",
      success: false,
    });
  }
  const user = await userModel.create({
    email,
    password,
    name,
  });
  //jwt token
  const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token);
  res.status(201).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
};

module.exports = {
  userRegisterController,
};
