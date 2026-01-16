const reviewService = require("../services/review.js")

const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body, req.user);
    return res.status(201).send(review);
  } catch (error) {
    if (error.statusCode === 409) {
      return res.status(409).send({ message: error.message });
    }
    console.error("CREATE REVIEW ERROR:", error);
    return res.status(500).send({ message: "Failed to create review" });
  }
};


const getAllReview = async (req, res) => {

    const productId = req.params.productId;
    try {
        const reviews = await reviewService.getAllReview(productId);
        return res.status(201).send(reviews);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { createReview, getAllReview }