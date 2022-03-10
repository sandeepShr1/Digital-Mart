const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel");
const sendToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Registering User
exports.registerUser = catchAsyncError(async (req, res, next) => {

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
      });

      const { name, email, password } = req.body;
      const user = await User.create({
            name, email, password,
            avatar: {
                  public_id: myCloud.public_id,
                  url: myCloud.secure_url,
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

      const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

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
});

// Reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
      // creating tokenHash
      const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

      const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
            return next(new ErrorHandler("Reset Password token is invalid or has been expire", 400))
      }

      if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Password does not match", 400))
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
      const user = await User.findById(req.user.id);

      res.status(200).json({
            success: true,
            user
      });
});

// Change user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

      if (!isPasswordMatched) {
            return next(new ErrorHandler("Old Password is Incorrect.", 400))
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
            return next(new ErrorHandler("Password does not match.", 400))
      }
      user.password = req.body.newPassword;

      await user.save();


      sendToken(user, 200, res);

});

// update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
      const newUserData = {
            name: req.body.name,
            email: req.body.email,
      };

      if (req.body.avatar !== "" && req.body.avatar !== "/Profile.png") {
            const user = await User.findById(req.user.id);

            const imageId = user.avatar.public_id;

            await cloudinary.v2.uploader.destroy(imageId);

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                  folder: "avatars",
                  width: 150,
                  crop: "scale",
            });

            newUserData.avatar = {
                  public_id: myCloud.public_id,
                  url: myCloud.secure_url,
            };
      }

      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
      });

      res.status(200).json({
            success: true,
      });
});
// Get all users(admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
      const users = await User.find();

      res.status(200).json({
            success: true,
            users
      })
});

// Get a user detail (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
      const user = await User.findById(req.params.id);

      if (!user) {
            return next(new ErrorHandler(`User not found with id ${req.params.id}`))
      }

      res.status(200).json({
            success: true,
            user,
      })
});

// update user details(admin)
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {

      const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
      }
      const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
      });

      res.status(200).json({
            success: true,
            user
      })

});

//delete a user

exports.deleteUser = catchAsyncError(async (req, res, next) => {
      const user = await User.findById(req.params.id);

      if (!user) {
            return next(new ErrorHandler("User not found", 404))
      }

      await user.remove();

      res.status(200).json({
            success: true,
            user
      })
})


