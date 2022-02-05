const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel");


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
      const token = user.getJWTToken();

      res.status(200).json({
            success: true,
            user,
            token
      });
});