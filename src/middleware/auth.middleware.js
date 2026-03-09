const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "unauthorized token",
      success: false,
      status: "failed",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({
      message: "there is something wrong in token",
      success: false,
      status: "failed",
    });
  }
};

module.exports={
authMiddleware
}