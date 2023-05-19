// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
//   Chau Chan Bang(s3975015)
//   Chau Chan Thien(s3975010)
//   Ophelie Manon Tran(s3968993)
//   Nguyen Dang Thanh Trung(s3978674)
//   Han Yeeun(s3912055)
// Acknowledgement: Acknowledge the resources that you use here.;
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

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
