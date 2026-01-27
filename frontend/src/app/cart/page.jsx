'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeCartItem, updateCartItem } from "../../redux/cart/cartSlice";
import { useAuth } from "../../context/AuthContext";
import OrderSummary from '../components/cartpage/OrderSummary';
import { fetchUserAddresses } from "@/redux/address/addressSlice";


export default function CartPage() {

    const router = useRouter();
    const dispatch = useDispatch();
    const { cart, loading: cartLoading } = useSelector(state => state.cart);
    const [showPriceDrawer, setShowPriceDrawer] = useState(false);
    const [showPriceDetails, setShowPriceDetails] = useState(false);

    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) {
            dispatch(fetchCart());
        }
    }, [loading, user]);

    useEffect(() => {
        if (!loading && user) {
            dispatch(fetchUserAddresses());
        }
    }, [loading, user, dispatch]);

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

    const totalAmount = totalMRP - totalDiscount;


    const { addresses, selectedAddressId } = useSelector(
        (state) => state.address
    );

    const defaultAddress = addresses?.[0] || null;

    // Display-safe text
    const addressText = defaultAddress
        ? `${defaultAddress.firstName}, ${defaultAddress.zipCode}`
        : "Add delivery address";


    return (
        <div className="w-full">

            {/* ================= EMPTY CART ================= */}
            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
                    <button
                        onClick={() => router.push("/shop")}
                        className="bg-black text-white px-8 py-3 rounded"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8 pb-28 lg:pb-0">

                    {/* ================= CART ITEMS ================= */}
                    <div className="lg:col-span-2 space-y-4">

                        {cartItems.map((item) => {
                            const product = item.product;

                            return (
                                <div
                                    key={item._id}
                                    className="
                  bg-white border border-gray-200 rounded-lg p-3
                  flex items-start gap-3
                "
                                >
                                    {/* IMAGE */}
                                    <img
                                        src={product.imageUrl}
                                        alt={product.title}
                                        className="w-20 h-28 object-cover rounded flex-shrink-0"
                                    />

                                    {/* DETAILS */}
                                    <div className="flex-1 relative">

                                        {/* REMOVE */}
                                        <button
                                            onClick={() => removeItem(item._id)}
                                            className="absolute top-0 right-0 text-gray-400 hover:text-red-500 text-lg"
                                        >
                                            ✕
                                        </button>

                                        <h3 className="font-semibold text-sm sm:text-base leading-snug pr-6">
                                            {product.title}
                                        </h3>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {product.brand}
                                        </p>

                                        {/* PRICE */}
                                        <div className="flex items-center gap-2 mt-1 text-sm">
                                            <span className="font-bold">₹{item.discountedPrice}</span>
                                            <span className="text-gray-400 line-through text-xs">
                                                ₹{item.price}
                                            </span>
                                            <span className="text-green-600 text-xs font-semibold">
                                                {product.discountPercent}% OFF
                                            </span>
                                        </div>

                                        {/* SIZE + QTY */}
                                        <div className="flex items-center gap-3 text-xs mt-2">
                                            <span className="bg-gray-100 px-2 py-[1px] rounded">
                                                Size: <strong>{item.size}</strong>
                                            </span>


                                            <div className="flex items-center gap-1">
                                                <span>Qty:</span>
                                                <select
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateQuantity(item._id, Number(e.target.value))
                                                    }
                                                    className="border rounded px-1 py-[2px] text-xs"
                                                >
                                                    {[1, 2, 3, 4, 5].map((qty) => (
                                                        <option key={qty} value={qty}>
                                                            {qty}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <p className="text-[11px] text-gray-400 mt-1">
                                            7 Day return available
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ================= DESKTOP ORDER SUMMARY ================= */}
                    <div className="hidden lg:block space-y-4">

                        {/* DELIVERY ADDRESS (DESKTOP) */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start justify-between">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Delivering to</p>
                                <p className="font-semibold text-sm text-gray-900">
                                    {addressText}
                                </p>

                                {defaultAddress && (
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                        {defaultAddress.streetAddress}, {defaultAddress.city}
                                    </p>
                                )}

                            </div>

                            <button
                                onClick={() => router.push("/cart/address")}
                                className="text-sm font-semibold text-black"
                            >
                                CHANGE
                            </button>
                        </div>

                        {/* ORDER SUMMARY */}
                        <OrderSummary
                            totalMRP={totalMRP}
                            discount={totalDiscount}
                            totalAmount={totalAmount}
                            showPlaceOrder
                            onPlaceOrder={() => {
                                if (!user) {
                                    setShowAuth(true);
                                    return;
                                }
                                //  Address not selected
                                if (!defaultAddress) {
                                    router.push("/cart/address");
                                    return;
                                }


                                router.push("/cart/address");
                            }}

                        />
                    </div>

                </div>
            )}

            {/* ================= MOBILE PRICE DRAWER ================= */}
            {cartItems.length > 0 && (
                <div
                    className={`
      fixed bottom-[76px] left-0 right-0 z-40
      bg-white border-t border-gray-200
      transition-transform duration-300
      ${showPriceDrawer ? "translate-y-0" : "translate-y-full"}
      lg:hidden
    `}
                >
                    <div className="p-4 space-y-3 text-sm">

                        {/* DELIVERY ADDRESS */}

                        {/* PRICE BREAKUP */}
                        <div className="flex justify-between pt-2">
                            <span className="text-gray-600">Bag Total</span>
                            <span>₹{totalMRP}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Discount</span>
                            <span className="text-green-600">-₹{totalDiscount}</span>
                        </div>

                        <div className="border-t pt-3 flex justify-between font-semibold">
                            <span>Total Amount</span>
                            <span>₹{totalAmount}</span>
                        </div>

                    </div>
                </div>
            )}



            {/* ================= MOBILE STICKY CTA ================= */}
            {cartItems.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">

                    {/* ADDRESS BAR */}
                    <div className="px-4 py-2 border-b border-gray-200 flex items-start justify-between text-xs">
                        <div>
                            <p className="text-gray-500">Delivering to</p>
                            <p className="font-medium text-gray-800 line-clamp-1">
                                {addressText}
                            </p>
                        </div>

                        <button
                            onClick={() => router.push("/cart/address")}
                            className="text-black font-medium"
                        >
                            Change
                        </button>
                    </div>

                    {/* PRICE + CONTINUE */}
                    <div className="p-4 flex items-center justify-between">

                        {/* LEFT – PRICE */}
                        <button
                            onClick={() => setShowPriceDrawer(!showPriceDrawer)}
                            className="text-left"
                        >
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                View price details
                                <span
                                    className={`transition-transform ${showPriceDrawer ? "rotate-180" : ""
                                        }`}
                                >
                                    ▲
                                </span>
                            </p>
                            <p className="text-lg font-bold">₹{totalAmount}</p>
                        </button>

                        {/* RIGHT – CONTINUE */}
                        <button
                            onClick={() => {
                                if (!user) {
                                    setShowAuth(true);
                                    return;
                                }

                                if (!selectedAddressId) {
                                    router.push("/cart/address");
                                    return;
                                }

                                router.push("/cart/address");
                            }}

                            className="bg-black text-white px-6 py-3 rounded font-semibold"
                        >
                            Continue
                        </button>

                    </div>
                </div>
            )}

        </div>
    );

}