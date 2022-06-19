const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
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

      buttonText: {
            type: String,
            required: [true, "Please enter category"]
      },
      product: {
            type: String,
            required: [true, "Please enter product"]
      },
      desc: {
            type: String,
            required: [true, "Please enter description"]
      },
      smallText: {
            type: String,
            required: [true, "Please small text"]
      },
      midText: {
            type: String,
            required: [true, "Please mid text"]
      },

      largeText1: {
            type: String,
            required: [true, "Please enter large text 1"]
      },

      largeText2: {
            type: String,
            required: [true, "Please enter large text 2"]
      },
      discount: {
            type: Number,
            default: 0
      },
      // saleTime
})

module.exports = mongoose.model("Banner", bannerSchema);