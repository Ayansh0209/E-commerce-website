const mongoose = require("mongoose");
const User = require("../models/user.model");
const { addCartItem } = require("./cart.service");
const Product = require("../models/product.model");
async function addToWishlist(userId, productId) {
    if (!productId) {
        throw new Error("Product ID is required");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const exists = user.wishlist.some(
        (id) => id.toString() === productId
    );

    if (!exists) {
        user.wishlist.push(productId);
        await user.save();
    }

    return {
        isWishlisted: true,
        wishlistCount: user.wishlist.length
    };
}
async function removeFromWishlist(userId, productId) {
    if (!productId) {
        throw new Error("Product ID is required");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId
    );

    await user.save();

    return {
        isWishlisted: false,
        wishlistCount: user.wishlist.length
    };
}




async function getWishlist(userId, page = 1, limit = 12) {
  const user = await User.findById(userId).select("wishlist");
  if (!user) {
    throw new Error("User not found");
  }

  const totalCount = user.wishlist.length;
  const skip = (page - 1) * limit;

  const wishlistIds = user.wishlist.slice(skip, skip + limit);

  const wishlistObjectIds = wishlistIds.map(id =>
    new mongoose.Types.ObjectId(id)
  );

  const products = await Product.find({
    _id: { $in: wishlistObjectIds },
  });
console.log("PAGE:", page, "LIMIT:", limit);
console.log("WISHLIST IDS:", wishlistIds.length);

  // preserve order
  const orderedProducts = wishlistIds
    .map(id => products.find(p => p._id.equals(id)))
    .filter(Boolean);

  return {
    wishlist: orderedProducts,
    hasMore: skip + limit < totalCount,
    totalCount,
    page,
  };
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
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    moveWishlistToCart
};
