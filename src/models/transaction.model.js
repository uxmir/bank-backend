const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "fromAccount is required"],
      index: true,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "fromAccount is required"],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "COMPLETED", "FAILED","REVERSED"],
        message:'status must be pending or completed or failed or reveresed'
      },
      default: "PENDING",
    },
    amount: {
      type: Number,
      required: [true, "number is required"],
      default: [0, "number must be positive"],
    },
    itempoitencyKey: {
      type: String,
      required: [true, "itempotency key is required for transaction"],
      index: true,
      unique:true
    },
  },
  {
    timestamps: true,
  },
);

const transactionModel=mongoose.model('transaction',transactionSchema)

module.exports=transactionModel