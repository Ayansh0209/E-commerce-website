'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeCartItem, updateCartItem } from "../../redux/cart/cartSlice";
import { useAuth } from "../../context/AuthContext";
import OrderSummary from '../components/cartpage/OrderSummary';

export default function CartPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { cart, loading: cartLoading } = useSelector(state => state.cart);

    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) {
            dispatch(fetchCart());
        }
    }, [loading, user]);
    const cartItems = cart?.cartItems || [];



    const updateQuantity = (cartItemId, newQty) => {
        if (newQty < 1) return;

        dispatch(
            updateCartItem({
                cartItemId,
                data: { quantity: newQty },
            })
        );
    };


    const removeItem = (cartItemId) => {
        dispatch(removeCartItem(cartItemId));
    };

    const totalMRP = cartItems.reduce(
        (sum, item) => sum + item.price,
        0
    );

    const totalDiscount = cartItems.reduce(
        (sum, item) => sum + (item.price - item.discountedPrice),
        0
    );

   // const convenienceFee = 99;

    const totalAmount = totalMRP - totalDiscount ;


    return (
        <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
                {cartItems.map(item => {
                    const product = item.product;
                    return (
                        <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4">

                            {/* Product Image */}
                            {/* <div className="w-24 h-32 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">Image</span>
                            </div> */}
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-24 h-32 object-cover rounded"
                            />


                            {/* Product Details */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">{product.brand}</p>

                                <div className="flex items-center gap-3 mb-3">
                                    <span className="font-bold text-lg">₹{item.discountedPrice}</span>
                                    <span className="text-gray-400 line-through text-sm">₹{item.price}</span>
                                    <span className="text-green-600 text-sm font-semibold">{product.discountPercent}% OFF</span>
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-gray-700">Size: <strong>{item.size}</strong></span>
                                    <div className="flex items-center gap-2 mt-3 text-sm">
                                        <span className="text-gray-700">Qty:</span>

                                        <select
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateQuantity(item._id, Number(e.target.value))
                                            }
                                            className="border rounded px-2 py-1 text-sm cursor-pointer"
                                        >
                                            {[1, 2, 3, 4, 5].map((qty) => (
                                                <option key={qty} value={qty}>
                                                    {qty}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 mt-2">7 Day return available</p>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={() => removeItem(item._id)}
                                className="text-gray-400 hover:text-red-500 text-xl self-start"
                            >
                                ✕
                            </button>
                        </div>
                    )
                })}

                {cartItems.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">Your cart is empty</p>
                    </div>
                )}


            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
                <div className="lg:col-span-1">
                    <OrderSummary
                        totalMRP={totalMRP}
                        discount={totalDiscount}
                        // convenienceFee={convenienceFee}
                        totalAmount={totalAmount}
                        showPlaceOrder
                        onPlaceOrder={() => {
                            if (!user) {
                                setShowAuth(true); // auth modal later
                                return;
                            }
                            router.push("/cart/address");
                        }}
                    />
                </div>
            )}



            {cartItems.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                    <button
                        onClick={() => router.push('/shop')}
                        className="bg-black text-white px-6 py-2 rounded"
                    >
                        Continue Shopping
                    </button>
                </div>
            )}


        </div>
    );
}