const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel");
const sendToken = require("../utils/generateToken")


// Registering User
exports.registerUser = catchAsyncError(async (req, res, next) => {
      const { name, email, password } = req.body;
      const user = await User.create({
            name, email, password,
            avatar: {
                  public_id: "public",
                  url: "profilePictureUrl"
            }
      });

      sendToken(user, 201, res);
});

// login user

exports.loginUser = catchAsyncError(async (req, res, next) => {
      const { email, password } = req.body;
      // checking if user has given password and email both

      if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & Password", 400));
      }
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
      }

      const isPasswordMatched = await user.comparePassword(password);
      console.log(isPasswordMatched)

      if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401))
      }

      sendToken(user, 200, res);

})