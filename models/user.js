const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures no duplicate emails
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageURL: {
    type: String,
    default: './Public/image.png', 
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
}, { timestamps: true });  // Timestamps added correctly here


userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString('hex');  // 'hex' added here
  const hashedPassword = createHmac("sha256", salt).update(user.password).digest('hex');  

  user.salt = salt;
  user.password = hashedPassword;

  next();
});

const User = model("user", userSchema);

module.exports = User;
