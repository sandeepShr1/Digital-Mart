const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel");
const sendToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

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

// logout

exports.logout = catchAsyncError(async (req, res, next) => {
      res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
      });

      res.status(200).json({
            success: true,
            message: "Logged out",
      });
});

// Forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
            return next(new ErrorHandler("User not found", 404));
      }

      // Get ResetPassword Token
      const resetToken = user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false });

      const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

      const message = `Your password reset token is:- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

      try {
            await sendEmail({
                  email: user.email,
                  subject: `Ecommerce Password Recovery `,
                  message,
            })
            res.status(200).json({
                  success: true,
                  message: `Email sent to ${user.email} successfully`
            });

      } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return next(new ErrorHandler(
                  error.message, 500
            ))
      }
})