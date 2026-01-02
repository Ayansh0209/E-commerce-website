const Rating = require("../models/rating.model.js");
const productService = require("../services/product.service.js");

async function createRating(req, user) {
    const product = await productService.findProductById(req.productId);

    const rating = new Rating({
        product: product._id,
        user: user._id,
        rating: req.rating,
        createdAt: new Date()
    })

    return await rating.save();
}

// async function getProductRating(productId) {
//     return await Rating.find({ product: productId });
// }
async function getProductRating(productId) {
  const ratings = await Rating.find({ product: productId });

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
