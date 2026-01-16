const Rating = require("../models/rating.model.js");
const productService = require("../services/product.service.js");

async function createRating(reqData, user) {
  if (!reqData.productId) {
    throw new Error("productId is required");
  }

  if (!reqData.rating || reqData.rating < 1 || reqData.rating > 5) {
    throw new Error("rating must be between 1 and 5");
  }

  const product = await productService.findProductById(reqData.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  //   Check if user already rated this product
  const existingRating = await Rating.findOne({
    user: user._id,
    product: product._id,
  });

  if (existingRating) {
    //   Reject second attempt
    const error = new Error("You have already rated this product");
    error.statusCode = 409;
    throw error;
  }

  //   Create rating (first time only)
  const rating = new Rating({
    product: product._id,
    user: user._id,
    rating: reqData.rating,
    createdAt: new Date(),
  });

  return await rating.save();
}


// async function getProductRating(productId) {
//     return await Rating.find({ product: productId });
// }
async function getProductRating(productId) {
  const ratings = await Rating.find({ product: productId })
  .populate("user", "firstName lastName");


  const totalRatings = ratings.length;

  const avg =
    totalRatings === 0
      ? 0
      : ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

  const distribution = { 1:0, 2:0, 3:0, 4:0, 5:0 };
  ratings.forEach(r => distribution[r.rating]++);

  return {
    averageRating: Number(avg.toFixed(1)),
    totalRatings,
    distribution,
  };
}


module.exports = {
    createRating,
    getProductRating
}
