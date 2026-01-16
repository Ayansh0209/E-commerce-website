const ratingService = require("../services/rating.service.js")

const createRating = async (req, res) => {
  try {
    const rating = await ratingService.createRating(req.body, req.user);
    return res.status(201).send(rating);
  } catch (error) {
    if (error.statusCode === 409) {
      return res.status(409).send({ message: error.message });
    }
    console.error("CREATE RATING ERROR:", error);
    return res.status(500).send({ message: "Failed to create rating" });
  }
};


const getAllRating= async (req, res) => {

    const productId = req.params.productId;
    try {
        const ratings = await ratingService.getProductRating(productId);
        return res.status(200).send(ratings);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { createRating, getAllRating }