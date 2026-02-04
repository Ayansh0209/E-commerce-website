"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
    confirmOrder,
    cancelOrder,
} from "@/redux/admin/adminOrderSlice";
import { getAuthHeader } from "@/config/authHeader";

export default function OrderDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🔹 Fetch order by ID (admin view)
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const headers = await getAuthHeader();
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${id}`,
                    { headers }
                );

                if (!res.ok) throw new Error("Failed to fetch order");
                const data = await res.json();
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchOrder();
    }, [id]);

    const handleConfirm = async () => {
        setActionLoading(true);
        await dispatch(confirmOrder(id));
        router.refresh();
    };

    const handleCancel = async () => {
        if (!confirm("Cancel this order?")) return;
        setActionLoading(true);
        await dispatch(cancelOrder(id));
        router.refresh();
    };

    if (loading) {
        return (
            <div className="p-8 text-center opacity-70">
                Loading order details...
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="p-8 text-red-400">
                Failed to load order
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">
                        Order #{order._id.slice(-6)}
                    </h2>
                    <p className="opacity-60">
                        Created on{" "}
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>

                <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${order.orderStatus === "DELIVERED"
                        ? "bg-green-500/20 text-green-400"
                        : order.orderStatus === "CANCELLED"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                >
                    {order.orderStatus}
                </span>
            </div>

            {/* Customer + Address */}
            {/* Customer + Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Customer (Account Info) */}
                <div className="rounded-xl bg-black/10 dark:bg-white/5 p-6">
                    <h3 className="font-semibold mb-3">Customer</h3>

                    <p>
                        <span className="opacity-70">Email:</span>{" "}
                        <span className="font-medium">
                            {order.user?.email || "Guest"}
                        </span>
                    </p>

                    <p className="mt-1">
                        <span className="opacity-70">Account Mobile:</span>{" "}
                        <span className="font-medium">
                            {order.user?.mobile || "—"}
                        </span>
                    </p>
                </div>

                {/* Shipping Address */}
                <div className="rounded-xl bg-black/10 dark:bg-white/5 p-6">
                    <h3 className="font-semibold mb-3">Shipping Address</h3>

                    <p className="font-medium">
                        {order.shippingAddress?.firstName}{" "}
                        {order.shippingAddress?.lastName}
                    </p>

                    <p className="opacity-80">
                        {order.shippingAddress?.streetAddress}
                    </p>

                    <p className="opacity-80">
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.state} –{" "}
                        {order.shippingAddress?.zipCode}
                    </p>

                    <p className="mt-2">
                        <span className="font-medium">
                            {order.shippingAddress?.mobile}
                        </span>
                    </p>
                </div>

            </div>



            {/* Products */}
            <div className="rounded-xl bg-black/10 dark:bg-white/5 p-6">
                <h3 className="font-semibold mb-4">Products</h3>

                <div className="space-y-4">
                    {order.orderItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex gap-4 items-center border-b border-white/10 pb-4"
                        >
                            <img
                                src={item.product.imageUrl}
                                alt={item.product.title}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <p className="font-medium">
                                    {item.product.title}
                                </p>
                                <p className="text-sm opacity-70">
                                    Size: {item.size} • Qty: {item.quantity}
                                </p>
                            </div>
                            <div className="font-medium">
                                ₹{item.discountedPrice}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment */}
            <div className="rounded-xl bg-black/10 dark:bg-white/5 p-6">
                <h3 className="font-semibold mb-2">Payment</h3>
                <p>Total Items: {order.totalItem}</p>
                <p>Total Price: ₹{order.totalPrice}</p>
                <p>Discount: ₹{order.discount}</p>
                <p className="font-semibold">
                    Payable: ₹{order.totalDiscountedPrice}
                </p>
                <p className="opacity-70">
                    Payment Status:{" "}
                    {order.paymentDetails?.paymentStatus}
                </p>
            </div>

            {/* Actions */}
            {order.orderStatus === "PLACED" && (
                <div className="flex gap-4">
                    <button
                        onClick={handleConfirm}
                        disabled={actionLoading}
                        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg"
                    >
                        {actionLoading ? "Processing..." : "Confirm Order"}
                    </button>

                    <button
                        onClick={handleCancel}
                        disabled={actionLoading}
                        className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
                    >
                        Cancel Order
                    </button>
                </div>
            )}
        </div>
    );
}
