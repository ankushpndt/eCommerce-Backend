const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required:true
  },
  name: {
    type: String,
  },
  review: {
    type: String,
    required:true
  },
  rating:{
    type:Number
  },
}, { timestamps: true })
const Review = mongoose.model("review", reviewSchema)
module.exports = { Review }