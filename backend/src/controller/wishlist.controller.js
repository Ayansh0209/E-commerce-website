const wishlistService = require("../services/wishlist.service");


const addToWishlist = async (req, res) => {
    const user = req.user;
    const { productId } = req.body;

    try {
        const result = await wishlistService.addToWishlist(
            user._id,
            productId
        );

        return res.status(200).send({
            success: true,
            ...result
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error.message
        });
    }
};

const removeFromWishlist = async (req, res) => {
    const user = req.user;
    const { productId } = req.params;

    try {
        const result = await wishlistService.removeFromWishlist(
            user._id,
            productId
        );

        return res.status(200).send({
            success: true,
            ...result
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error.message
        });
    }
};


const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const data = await wishlistService.getWishlist(
      userId,
      page,
      limit
    );

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



const moveWishlistToCart = async (req, res) => {
    const user = req.user;
    const { productId, size, quantity } = req.body;

    try {
        const result = await wishlistService.moveWishlistToCart(
            user._id,
            productId,
            size,
            quantity
        );

        return res.status(200).send({
            success: true,
            ...result
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
   addToWishlist,removeFromWishlist,
    getWishlist,
    moveWishlistToCart
};
