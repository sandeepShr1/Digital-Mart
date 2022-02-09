const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// create product only admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

// get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search().filter().pagination(resultPerPage);

    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    })
});

// update a product -only admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            "message": "product not found"
        })
    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
});

// delete a product -- admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    await product.remove();

    res.status(200).json({
        success: true,
        message: "product removed successfully"
    })

})


// get a single product 

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })

});

// create a new reviews or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);

        });
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    })
});

// Get all reviews fo single product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });

});

// Delete a review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.body.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
    }

    const reviews = product.reviews.filter(rev => rev.id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }
    )

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });

});