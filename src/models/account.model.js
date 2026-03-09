const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user is must for accountUSer"],
    index: true,
  },
  status: {
    type:String,
    enum: {
      values: ["ACTIVE", "FROZEN", "CLOSED"],
      message:"status must be ACTIVE OR FROZEN OR CLOSED",
      default:"ACTIVE"
    },
  },
  currency: {
    type: String,
    required: [true, "Crrency is required"],
    default: "BDT",
  },
});

accountSchema.index({ user: 1, status: 1 });
const accountModel = mongoose.model("account", accountSchema);
module.exports = accountModel;
