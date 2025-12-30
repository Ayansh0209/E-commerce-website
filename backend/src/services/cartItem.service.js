const userService = require("../services/user.service.js")
const Cart = require("../models/cart.model.js")
const CartItem = require("../models/cartItem.model.js");
async function updateCartItem(userId, cartItemId, CartItemData) {
    try {
        const item = await findCartItemById(cartItemId);
        if (!item) {
            throw new Error("cart item not found : ", cartItemId);
        }
        const user = await userService.findUserById(item.userId);
        if (!user) {
            throw new Error("user not found : ", userId)

        }
        if (user._id.toString() === userId.toString()) {
            item.quantity = CartItemData.quantity,
                item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            await item.save();
            const cart = await Cart.findOne({ user: userId })
                .populate({
                    path: "cartItems",
                    populate: {
                        path: "product",
                        select: "title imageUrl price discountedPrice brand"
                    }
                });

            return cart;



            return cart
        } else {
            throw new Error("you cant update this cart item ")
        }

    }
    catch (error) {
        throw new Error(error.message);
    }
}

async function removeCartItem(userId, cartItemId) {

    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);
    if (user._id.toString() === cartItem.userId.toString()) {
        return await CartItem.findByIdAndDelete(cartItemId);
    }
    throw new Error("you cant delete this cart item ")


}
async function findCartItemById(cartItemId) {
    // const cartitem = await findCartItemById(cartItemId);
    const cartitem = await CartItem.findById(cartItemId).populate("product");
    if (cartitem) {
        return cartitem;
    }
    else {
        throw new Error("cart item not found with id:", cartItemId)
    }

}

module.exports = { updateCartItem, removeCartItem, findCartItemById }
