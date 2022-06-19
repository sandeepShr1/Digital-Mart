const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Banner = require("../model/bannerModel");
const ErrorHandlers = require("../utils/errorHandler.js");
const cloudinary = require("cloudinary")

// create banner only by admin

exports.createBanner = catchAsyncErrors(async (req, res, next) => {
      // images 
      let images = [];
      if (typeof req.body.images === "string") {
            images.push(req.body.images);
      }
      else {
            images = req.body.images;
      }

      let imagesLink = [];

      for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                  folder: "banner"
            });
            imagesLink.push({
                  public_id: result.public_id,
                  url: result.secure_url,
            })
      }


      req.body.images = imagesLink;
      req.body.user = req.user.id;
      const banner = await Banner.create(req.body);

      res.status(201).json({
            success: true,
            banner
      })
})

// get banner
exports.getBanner = catchAsyncErrors(async (req, res, next) => {
      const banners = await Banner.find();
      res.status(201).json({
            success: true,
            banners
      })
})