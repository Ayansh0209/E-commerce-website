const Cart = require("../models/cart.model.js")
const CartItem = require("../models/cartItem.model.js")

const Product = require("../models/product.model.js")
async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;

    } catch (error) {
        throw new Error(error.message);

    }
}

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await createCart(userId);
        }

        const cartItems = await CartItem.find({ cart: cart._id }).populate("product");
        cart.cartItems = cartItems;

        let totalPrice = 0;
        let TotalDiscountedPrice = 0;
        let totalItem = 0;

        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            TotalDiscountedPrice += cartItem.discountedPrice;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.totalDiscountedPrice = TotalDiscountedPrice;
        cart.discounts = totalPrice - TotalDiscountedPrice;
        return cart
    } catch (error) {
        throw new Error(error.message);
    }
}

async function addCartItem(userId, req) {
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await createCart(userId);
        }
        const product = await Product.findById(req.productId);

        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId, size: req.size, });
        if (isPresent) {
            isPresent.quantity += req.quantity || 1;
            await isPresent.save();

            return {
                success: true,
                message: "Item already in cart, quantity increased",
            };
        }

        if (!isPresent) {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1, // req.quantity
                size: req.size,
                price: product.price,
                discountedPrice: product.discountedPrice,
                userId
            })
            const createdCartItem = await cartItem.save();
            // cart.cartItems.push(createdCartItem);
            if (!cart.cartItems) cart.cartItems = [];
            cart.cartItems.push(createdCartItem);

            await cart.save();
            return {
                success: true,
                message: "Item added to cart",
            };


        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function clearUserCart(userId) {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return;

  await CartItem.deleteMany({ cart: cart._id });
  cart.cartItems = [];
  cart.totalPrice = 0;
  cart.totalItem = 0;
  cart.discounts = 0;

  await cart.save();
}


module.exports = { createCart, findUserCart, addCartItem ,clearUserCart}