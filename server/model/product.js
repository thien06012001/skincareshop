const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description:
  {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  applicationMode: {
    type: String,
    required: [true, "Please enter your product application mode!"],
  },
  ingredients: {
    type: String,
    required: [true, "Please enter your product ingredients!"],
  }
  ,
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  price: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  // stock: {
  //   type: Number,
  //   required: [true, "Please enter your product stock!"],
  // },
  image:
  {
    type: String,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  // sold_out: {
  //   type: Number,
  //   default: 0,
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
