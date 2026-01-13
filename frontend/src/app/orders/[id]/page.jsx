'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "@/redux/order/orderSlice";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order, loading } = useSelector(state => state.order);

    useEffect(() => {
        if (id) {
            dispatch(fetchOrderById(id));
        }
    }, [dispatch, id]);

    if (loading || !order) {
        return <p className="text-center mt-10">Loading order details...</p>;
    }

    // 🔹 Order status steps (hard-coded here)
    const steps = [
        { key: "PLACED", label: "Order Placed" },
        { key: "SHIPPED", label: "Shipped" },
        { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
        { key: "DELIVERED", label: "Delivered" },
    ];

    const currentStepIndex = steps.findIndex(
        step => step.key === order.orderStatus
    );

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-xl font-semibold">
                    Order #{order._id.slice(-6)}
                </h1>
                <p className="text-sm text-gray-600">
                    Status: <span className="font-semibold">{order.orderStatus}</span>
                </p>
            </div>

            {/* ORDER TIMELINE */}
            
            <div className="border rounded-lg p-6">
                <div className="relative flex justify-between items-center">
                    {/* Base line */}
                    <div className="absolute top-2 left-0 right-0 h-1 bg-gray-300" />

                    {/* Active line */}
                    <div
                        className="absolute top-2 left-0 h-1 bg-green-600"
                        style={{
                            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`
                        }}
                    />

                    {steps.map((step, index) => (
                        <div key={step.key} className="relative z-10 text-center flex-1">
                            <div
                                className={`w-4 h-4 mx-auto rounded-full ${index <= currentStepIndex ? "bg-green-600" : "bg-gray-300"
                                    }`}
                            />
                            <p className="text-xs mt-2">{step.label}</p>
                        </div>
                    ))}
                </div>
            </div>


            {/* ITEMS */}
            <div className="border rounded-lg p-4 space-y-4">
                {order.orderItems.map(item => (
                    <div key={item._id} className="flex gap-4">
                        <img
                            src={item.product.imageUrl}
                            className="w-20 h-24 object-cover rounded"
                            alt={item.product.title}
                        />
                        <div>
                            <p className="font-medium">{item.product.title}</p>
                            <p className="text-sm text-gray-600">
                                Size: {item.size} · Qty: {item.quantity}
                            </p>
                            <p className="font-semibold">₹{item.discountedPrice}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* SHIPPING DETAILS */}
            {order.shipment?.awb && (
                <div className="border rounded-lg p-4">
                    <p className="font-semibold mb-2">Shipping Details</p>
                    <p>Courier: {order.shipment.courier}</p>
                    <p>AWB: {order.shipment.awb}</p>
                    <p>Status: {order.shipment.status}</p>

                    <a
                        href={`https://shiprocket.co/tracking/${order.shipment.awb}`}
                        target="_blank"
                        className="text-blue-600 text-sm underline mt-2 inline-block"
                    >
                        Track on courier website
                    </a>
                </div>
            )}

            {/* TOTAL */}
            <div className="text-right font-bold text-lg">
                Total: ₹{order.totalDiscountedPrice}
            </div>
        </div>
    );
}
