const ErrorHandler = require("../utils/errorHandler");


module.exports = (err, req, res, next) => {
      err.statusCode = err.statusCode || 500;
      err.message = err.message || "Internal Server Error";

      // Wrong MongoDB id error
      if (err.name === "CastError") {
            const message = `Resource not found. Invalid: ${err.path}`;
            err = new ErrorHandler(message, 400);
      }

      // Mongoose duplicate key error
      if (err.code === 11000) {
            const message = `Already have a user with this ${Object.keys(err.keyValue)}.`
            err = new ErrorHandler(message, 400);
      }
      // Wrong JWT error
      if (err.name === "JsonWebTokenError") {
            const message = `Json Web Token is invalid, try again`;
            err = new ErrorHandler(message, 400);
      }
      // Wrong JWT expire error
      if (err.name === "TokenExpireError") {
            const message = `Json Web Token is Expired, try again`;
            err = new ErrorHandler(message, 400);
      }

      res.status(err.statusCode).json({
            success: false,
            message: err.message
      });
};