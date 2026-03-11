const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "account is required in ledger"],
      index: true,
      immutable: true,
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transaction",
      required: [true, "transaction is required in ledger"],
      index: true,
      immutable: true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required in ledger"],
      immutable: true,
    },
    type: {
      type: String,
      enum: {
        values: ["CREADIT", "DEVIT"],
        required: [true, "ledger must be creadit or devit"],
      },
      immutable: true,
    },
  },
  {
    timestamps: true,
  },
);

function stopActionLedger() {
  throw new Error("Any action is not accepted in ledger");
}

ledgerSchema.pre("findOneAndUpdate", stopActionLedger);
ledgerSchema.pre("updateOne", stopActionLedger);
ledgerSchema.pre("deleteOne", stopActionLedger);
ledgerSchema.pre("remove", stopActionLedger);
ledgerSchema.pre("deleteMany", stopActionLedger);
ledgerSchema.pre("updateMany", stopActionLedger);
ledgerSchema.pre("findOneAndDelete", stopActionLedger);
ledgerSchema.pre("findOneAndReplace", stopActionLedger);

const ledgerModel = mongoose.model("ledger", ledgerSchema);

module.exports = ledgerModel;
