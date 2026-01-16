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
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading order details...</p>
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        const statusColors = {
            'PLACED': 'bg-orange-50 text-orange-700',
            'CONFIRMED': 'bg-blue-50 text-blue-700',
            'SHIPPED': 'bg-indigo-50 text-indigo-700',
            'OUT_FOR_DELIVERY': 'bg-purple-50 text-purple-700',
            'DELIVERED': 'bg-green-50 text-green-700',
            'CANCELLED': 'bg-red-50 text-red-700'
        };
        return statusColors[status] || 'bg-gray-50 text-gray-700';
    };

    const isDelivered = order.orderStatus === 'DELIVERED';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Order #{order._id.slice(-8)}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus.replace(/_/g, ' ')}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                
                {/* Order Items Preview - Top Section */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Date</p>
                                <p className="font-medium text-gray-900 mt-1">
                                    {new Date(order.createdAt || Date.now()).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Total</p>
                                <p className="font-semibold text-gray-900 text-lg mt-1">₹{order.totalDiscountedPrice}</p>
                            </div>
                        </div>

                        {/* First Item Display */}
                        <div className="flex gap-4 items-start">
                            <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                <img
                                    src={order.orderItems[0].product.imageUrl}
                                    className="w-full h-full object-cover"
                                    alt={order.orderItems[0].product.title}
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 mb-2">
                                    {order.orderItems[0].product.title}
                                </h3>
                                {order.orderItems[0].size && (
                                    <p className="text-sm text-gray-600">Size: {order.orderItems[0].size}</p>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                {/* Delivery Timeline */}
                {order.shipment?.estimatedDelivery && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">
                                    {isDelivered ? 'Delivered' : 'Expected Delivery'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {new Date(order.shipment.estimatedDelivery).toLocaleDateString('en-GB', {
                                        weekday: 'short',
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Tracking Events */}
                        {order.shipment?.events && order.shipment.events.length > 0 ? (
                            <div className="relative pl-8 mt-6">
                                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
                                {order.shipment.events.slice().reverse().map((event, index) => (
                                    <div key={index} className="relative mb-6 last:mb-0">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                                        <div>
                                            <p className="font-medium text-sm text-gray-900">
                                                {event.message || event.status}
                                            </p>
                                            {event.location && (
                                                <p className="text-sm text-gray-600 mt-0.5">{event.location}</p>
                                            )}
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(event.time).toLocaleString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                                <p className="text-sm text-blue-800">
                                    Tracking will be available once your order is shipped.
                                </p>
                            </div>
                        )}

                        {/* Tracking Link */}
                        {order.shipment?.awb && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Courier: <span className="font-medium text-gray-900">{order.shipment.courier}</span></p>
                                        <p className="text-sm text-gray-600 mt-1">AWB: <span className="font-medium text-gray-900">{order.shipment.awb}</span></p>
                                    </div>
                                    <a
                                        href={`https://shiprocket.co/tracking/${order.shipment.awb}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                                    >
                                        Track Package
                                        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Rate Order - Only if Delivered */}
                {isDelivered && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Rate this order</h3>
                                <p className="text-sm text-gray-600 mb-4">Help us improve by rating your purchase experience</p>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 transition flex items-center justify-center"
                                        >
                                            <svg className="w-5 h-5 text-gray-400 hover:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delivery Address */}
                {order.shippingAddress && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Delivery Address
                        </h3>
                        <div className="text-sm">
                            <p className="font-medium text-gray-900">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                            <p className="text-gray-600 mt-2">{order.shippingAddress.streetAddress}</p>
                            {order.shippingAddress.apartment && (
                                <p className="text-gray-600">{order.shippingAddress.apartment}</p>
                            )}
                            <p className="text-gray-600">
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                            </p>
                            <p className="text-gray-600 mt-2">Phone: <span className="font-medium">{order.shippingAddress.mobile}</span></p>
                        </div>
                    </div>
                )}

                {/* Price Breakdown */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Price Details</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Total MRP</span>
                            <span className="text-gray-900">₹{order.totalPrice || order.totalDiscountedPrice}</span>
                        </div>
                        {order.discount > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Discount</span>
                                <span className="text-green-600">-₹{order.discount}</span>
                            </div>
                        )}
                        {order.shippingCharge && order.shippingCharge > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping Charges</span>
                                <span className="text-gray-900">₹{order.shippingCharge}</span>
                            </div>
                        )}
                        <div className="border-t border-gray-200 pt-3 flex justify-between">
                            <span className="font-semibold text-gray-900">Total Amount</span>
                            <span className="font-semibold text-gray-900 text-lg">₹{order.totalDiscountedPrice}</span>
                        </div>
                    </div>
                    {order.discount > 0 && (
                        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-green-800">You saved ₹{order.discount} on this order</p>
                        </div>
                    )}
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">
                            Order Items ({order.orderItems.length})
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {order.orderItems.map((item, index) => (
                            <div key={item._id} className="p-6 flex gap-4 hover:bg-gray-50 transition">
                                <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                    <img
                                        src={item.product.imageUrl}
                                        className="w-full h-full object-cover"
                                        alt={item.product.title}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 mb-1">{item.product.title}</h4>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                        {item.size && (
                                            <span className="flex items-center">
                                                <span className="text-gray-500">Size:</span>
                                                <span className="ml-1 font-medium text-gray-900">{item.size}</span>
                                            </span>
                                        )}
                                        <span className="flex items-center">
                                            <span className="text-gray-500">Qty:</span>
                                            <span className="ml-1 font-medium text-gray-900">{item.quantity}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-semibold text-gray-900">₹{item.discountedPrice}</span>
                                        {item.price > item.discountedPrice && (
                                            <>
                                                <span className="text-sm text-gray-400 line-through">₹{item.price}</span>
                                                <span className="text-sm text-green-600 font-medium">
                                                    {Math.round(((item.price - item.discountedPrice) / item.price) * 100)}% off
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}