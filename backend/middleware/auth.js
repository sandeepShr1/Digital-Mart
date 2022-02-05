const catchAsyncErrors = require("./catchAsyncErrors");
const jwtToken = require("jsonwebtoken")
const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler")

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
      const { token } = req.cookies;

      if (!token) {
            return next(new ErrorHandler("Please login to access this route", 401));
      }

      const decodedData = jwtToken.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodedData.id);
      next();
})

exports.authorizeRole = (...roles) => {
      return (req, res, next) => {

            if (!roles.includes(req.user.role)) {
                  return next(

                        new ErrorHandler(`Role: ${req.user.role} is not allowed to access!`, 401)
                  )
            };
            next();
      }
}