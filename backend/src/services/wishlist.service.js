const User = require("../models/user.model");
const { addCartItem } = require("./cart.service");

async function toggleWishlist(userId, productId) {
    if (!productId) {
        throw new Error("Product ID is required");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const exists = user.wishlist.includes(productId);

    if (exists) {
        user.wishlist = user.wishlist.filter(
            (id) => id.toString() !== productId
        );
    } else {
        user.wishlist.push(productId);
    }

    await user.save();

    return {
        isWishlisted: !exists,
        wishlistCount: user.wishlist.length
    };
}


async function getWishlist(userId) {
    const user = await User.findById(userId)
        .populate("wishlist");

    if (!user) {
        throw new Error("User not found");
    }

    return user.wishlist;
}


async function moveWishlistToCart(userId, productId, size, quantity = 1) {
    if (!productId) {
        throw new Error("Product ID is required");
    }

    // 1️ Add to cart (reuse existing cart logic)
    await addCartItem(userId, {
        productId,
        size,
        quantity
    });

    //  Remove from wishlist
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId
    );

    await user.save();

    return {
        message: "Moved to bag successfully"
    };
}

module.exports = {
    toggleWishlist,
    getWishlist,
    moveWishlistToCart
};
