const Review = require("../models/review.model.js");
const User = require("../models/user.model.js");
const productService = require("../services/product.service.js");

async function createReview(reqData, user) {
  if (!reqData.productId) {
    throw new Error("productId is required");
  }

  const product = await productService.findProductById(reqData.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  //  Prevent duplicate review
  const existingReview = await Review.findOne({
    user: user._id,
    product: product._id,
  });

  if (existingReview) {
    const error = new Error("You have already reviewed this product");
    error.statusCode = 409;
    throw error;
  }

  //  Review is optional
  if (!reqData.review || !reqData.review.trim()) {
    return null; // rating-only flow
  }

  const review = new Review({
    user: user._id,
    product: product._id,
    review: reqData.review.trim(),
    createdAt: new Date(),
  });

  const savedReview = await review.save();

  await User.findByIdAndUpdate(user._id, {
    $push: { reviews: savedReview._id },
  });

  return savedReview;
}


async function getAllReview(productId) {
    return await Review.find({ product: productId })
        .populate("user", "firstName lastName");
}


module.exports = {
    createReview, getAllReview
}
