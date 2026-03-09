const accountModel = require("../models/account.model");
const userAccountController = async (req, res) => {
  try {
    const user = req.user;
    const account = await accountModel.create({
      user: user._id,
    });

    return res.status(201).json({
      account,
    });
  } catch (error) {
    return res.status(500).json({
      message: "there is something wrong in account controller",
      success: false,
      status: "Failed",
      error
    });
  }
};

module.exports = {
  userAccountController,
};
