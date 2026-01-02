const ratingService = require("../services/rating.service.js")

const createRating = async (req, res) => {

    const user = req.user;
    try {
        const rating = await ratingService.createRating(req.body, user);
        return res.status(200).send(rating);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


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