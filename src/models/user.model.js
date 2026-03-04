const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is not valid"],
    unique: [true, "this email is exists"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password is minimum 6 caracters"],
    select: false,
  },
},{
  timestamps:true
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ;
  }
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return;
  } catch (error) {
    console.error(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

