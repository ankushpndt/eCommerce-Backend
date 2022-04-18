const router = require('express').Router()
const { Review } = require("../models/review.model")

const isReviewAlreadyGiven = async (userId,productId) => {

  let review = await Review.find({ userId })
  const result = review.find((item) => String(item.userId) === String(userId) && String(item.productId)===String(productId))
  if (result) {
    return true
  }
  else {
    return false
  }
}

//get review
router.get("/get/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const getAllReview = await Review.find({ userId })

    res.status(200).json({ success: true, message: "Reviews fetched successfully", getAllReview })
  }
  catch (err) {
    res.status(400).json({ success: false, message: "No review found for the current user", errMessage: err.message })
  }
})

//add review
router.post("/add", async (req, res) => {
  const { userId,productId } = req.body
  const checkReview = await isReviewAlreadyGiven(userId,productId)
  try {
    if (checkReview) {
      res.status(400).json({ success: false, message: "Review already given!" })
    }
    else {
      const newReview = new Review(req.body)
      const savedReview = await newReview.save()
      const allReviews = await Review.find()
      res.status(200).json({ success: true, message: "Review added successfully", allReviews })
    }

  }
  catch (err) {
    console.log(err)
    res.status(400).json({ success: false, message: "Error occurred while saving new review", errMessage: err.message })
  }
})

//delete review
router.delete("/delete/:reviewId", async (req, res) => {
  const { reviewId } = req.params
  try {
    const deletedReview = await Review.findByIdAndDelete({ _id: reviewId })
    res.status(200).json({ success: true, message: "Review deleted successfully", deletedReview })
  }
  catch (err) {
    res.status(400).json({ success: false, message: "Error occurred while deleting the review", errMessage: err.message })
  }
})

module.exports = router