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

//login controller
const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "user is invalid please Sign up",
        success: false,
        status: "failed",
      });
    }
    //verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).josn({
        message: "password or email is invalid",
        success: false,
        status: "failed",
      });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);
    return res.status(200).json({
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
  userLoginController,
};
