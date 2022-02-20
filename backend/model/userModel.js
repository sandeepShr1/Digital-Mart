const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, "Please enter your name!"],
            maxlength: [30, "Name cannot exceed 30!"],
            minlength: [4, "Name must be more than 4 characters"]
      },
      email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            validate: [validator.isEmail, "Please enter valid email."]
      },
      password: {
            type: String,
            required: [true, "Please enter your password."],
            minlength: [8, "Password must have more than 8 characters."],
            select: false,
      },
      avatar: {
            public_id: {
                  type: String,
                  required: true
            },
            url: {
                  type: String,
                  required: true
            }

      },
      createdAt: {
            type: Date,
            default: Date.now
      },
      role: {
            type: String,
            default: "user"
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date
});

userSchema.pre("save", async function (next) {

      if (!this.isModified("password")) {
            next();
      }

      this.password = await bcrypt.hash(this.password, 10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
      return jwtToken.sign({
            id: this._id
      },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE })
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
}

// Generating Password Rest Token
userSchema.methods.getResetPasswordToken = function () {
      // Generating Token
      const resetToken = crypto.randomBytes(20).toString("hex");

      // Hashing and adding resetPasswordToken to userSchema
      this.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

      this.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

      return resetToken;

}

module.exports = mongoose.model("User", userSchema);