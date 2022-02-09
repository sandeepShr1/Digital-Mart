const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter price"],
        maxLength: [8, "Price cannot exceed 8 character."]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter category"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema); 