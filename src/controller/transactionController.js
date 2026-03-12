const transactionModel = require("../models/transaction.model");
const accountModel = require("../models/account.model");
const transactionController = async (req, res) => {
  try {
    const { fromAccount, toAccount, status, amount, itempoitencyKey } =
      req.body;
    if (!fromAccount || !toAccount || !status || !amount || !itempoitencyKey) {
      return res.status(400).json({
        message:
          "fromAccount,toAccount,status,amount, itempoitencyKey is required",
        success: false,
      });
    }
    const fAccount = await accountModel.findOne({
      _id: fromAccount,
    });
    const tAccount = await accountModel.findOne({
      _id: toAccount,
    });
    if (!fAccount || !tAccount) {
      return res.status(400).json({
        message: "faccount or taccount is not exists",
        success: false,
      });
    }
    const isTransactionExists = await transactionModel.findOne({
      itempoitencyKey: itempoitencyKey,
    });
    if (isTransactionExists) {
      if (isTransactionExists?.status === "COMPLETED") {
        return res.status(200).json({
          message: "Transaction has completed",
        });
      }
      if (isTransactionExists?.status === "PENDING") {
        return res.status(200).json({
          message: "Transaction still processing",
        });
      }
      if (isTransactionExists?.status === "FAILED") {
        return res.status(500).json({
          message: "Transaction has been failed",
        });
      }
      if (isTransactionExists?.status === "REVERSED") {
        return res.status(500).json({
          message: "Transaction is reversed please try again",
        });
      }
    }
    //checking account status
    if (fAccount?.status !== "ACTIVE" || tAccount?.status !== "ACTIVE") {
      return res.status(500).json({
        message: "fAccount or tAccount must be active",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "there is something wrong in transactionController",
      error,
    });
  }
};

module.exports = {
  transactionController,
};
