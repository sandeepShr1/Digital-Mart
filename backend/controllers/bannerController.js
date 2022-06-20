const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Banner = require("../model/bannerModel");
const ErrorHandlers = require("../utils/errorHandler.js");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorHandler.js");

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

// get a single banner -- admin
exports.getSingleBanner = catchAsyncErrors(async (req, res, next) => {
      const banner = await Banner.findById(req.params.id);
      if (!banner) {
            return next(new ErrorHandler("Banner not found", 404))
      }
      res.status(201).json({
            success: true,
            banner
      })
})

// Update a banner -only admin

exports.updateBanner = catchAsyncErrors(async (req, res, next) => {
      let banner = await Banner.findById(req.params.id);

      if (!banner) {
            return res.status(500).json({
                  success: false,
                  "message": "Banner not found!"
            })
      }

      if (req.body.images !== undefined) {
            let images = [];

            if (typeof req.body.images === "string") {
                  images.push(req.body.images);
            }
            else {
                  images = req.body.images;
            }
            if (images !== undefined) {
                  for (let i = 0; i < banner.images.length; i++) {
                        await cloudinary.v2.uploader.destroy(
                              banner.images[i].public_id
                        )
                  }
            }

            let imagesLink = [];

            for (let i = 0; i < images.length; i++) {
                  const result = await cloudinary.v2.uploader.upload(images[i], {
                        folder: "banners"
                  });
                  imagesLink.push({
                        public_id: result.public_id,
                        url: result.secure_url
                  })
            }
            req.body.images = imagesLink;
      }
      banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
      })

      res.status(200).json({
            success: true,
            banner
      })

});

//Delete a banner - admin

exports.deleteBanner = catchAsyncErrors(async (req, res, next) => {
      const banner = await Banner.findById(req.params.id);

      if (!banner) {
            return next(new ErrorHandler("Banner not found!"));
      }

      // Deleting banner images from cloudinary
      for (let i = 0; i < banner.images.length; i++) {
            await cloudinary.v2.uploader.destroy(
                  banner.images[i].public_id
            )
      }

      await banner.remove();
      res.status(200).json({
            success: true,
            message: "Banner removed successfully."
      })
})