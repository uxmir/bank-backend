const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const userRegisterController = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const isExisist = await userModel.findOne({ email });
    if (isExisist) {
      return res.status(422).json({
        message: "this email is exists",
        status: "Faild",
        success: false,
      });
    }
    const user = await userModel.create({
      email,
      name,
      password,
    });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);
    return res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "there is somthing error",
      status: "Faild",
      success: false,
      error,
    });
  }
};

module.exports = {
  userRegisterController,
};
