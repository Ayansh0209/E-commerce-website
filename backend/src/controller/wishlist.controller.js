const wishlistService = require("../services/wishlist.service");


const toggleWishlist = async (req, res) => {
    const user = req.user;
    const { productId } = req.body;

    try {
        const result = await wishlistService.toggleWishlist(
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
    const user = req.user;

    try {
        const wishlist = await wishlistService.getWishlist(user._id);

        return res.status(200).send({
            success: true,
            wishlist
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error.message
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
    toggleWishlist,
    getWishlist,
    moveWishlistToCart
};
