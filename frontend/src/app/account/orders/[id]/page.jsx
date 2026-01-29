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
            <div className="w-full">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
                    
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-20 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        const statusColors = {
            'PLACED': 'bg-orange-50 text-orange-700 border-orange-200',
            'CONFIRMED': 'bg-blue-50 text-blue-700 border-blue-200',
            'SHIPPED': 'bg-indigo-50 text-indigo-700 border-indigo-200',
            'OUT_FOR_DELIVERY': 'bg-purple-50 text-purple-700 border-purple-200',
            'DELIVERED': 'bg-green-50 text-green-700 border-green-200',
            'CANCELLED': 'bg-red-50 text-red-700 border-red-200'
        };
        return statusColors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
    };

    const isDelivered = order.orderStatus === 'DELIVERED';
    const hasMultipleItems = order.orderItems.length > 1;
    const firstItem = order.orderItems[0];

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
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
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.orderStatus)} self-start sm:self-auto`}>
                    {order.orderStatus.replace(/_/g, ' ')}
                </span>
            </div>

            {/* Order Items Preview - Top Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-6">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date</p>
                            <p className="font-semibold text-gray-900">
                                {new Date(order.createdAt || Date.now()).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Price</p>
                            <p className="font-bold text-gray-900 text-xl sm:text-2xl">₹{firstItem.discountedPrice}</p>
                        </div>
                    </div>

                    {/* First Item Display */}
                    <div className="flex gap-4 sm:gap-5 items-start">
                        <div className="w-20 h-24 sm:w-24 sm:h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                            <img
                                src={firstItem.product.imageUrl}
                                className="w-full h-full object-cover"
                                alt={firstItem.product.title}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                                {firstItem.product.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                {firstItem.size && (
                                    <span>Size: <span className="font-medium text-gray-900">{firstItem.size}</span></span>
                                )}
                                {firstItem.quantity > 1 && (
                                    <span>• Qty: <span className="font-medium text-gray-900">{firstItem.quantity}</span></span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delivery Timeline */}
            {order.shipment?.estimatedDelivery && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                {isDelivered ? 'Delivered' : 'Expected Delivery'}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
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
                        <div className="relative pl-6 sm:pl-8 mt-6">
                            <div className="absolute left-2 sm:left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
                            {order.shipment.events.slice().reverse().map((event, index) => (
                                <div key={index} className="relative mb-6 last:mb-0">
                                    <div className="absolute -left-[7px] sm:-left-[9px] top-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 border-2 border-white" />
                                    <div>
                                        <p className="font-medium text-xs sm:text-sm text-gray-900">
                                            {event.message || event.status}
                                        </p>
                                        {event.location && (
                                            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{event.location}</p>
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
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-4">
                            <p className="text-xs sm:text-sm text-blue-800">
                                Tracking will be available once your order is shipped.
                            </p>
                        </div>
                    )}

                    {/* Tracking Link */}
                    {order.shipment?.awb && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="text-sm">
                                    <p className="text-gray-600">Courier: <span className="font-medium text-gray-900">{order.shipment.courier}</span></p>
                                    <p className="text-gray-600 mt-1">AWB: <span className="font-medium text-gray-900">{order.shipment.awb}</span></p>
                                </div>
                                <a
                                    href={`https://shiprocket.co/tracking/${order.shipment.awb}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
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
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Rate this order</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-4">Help us improve by rating your purchase experience</p>
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 transition flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Price Breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Price Details</h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total MRP</span>
                        <span className="text-gray-900 font-medium">₹{order.totalPrice || order.totalDiscountedPrice}</span>
                    </div>
                    {order.discount > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Discount</span>
                            <span className="text-green-600 font-medium">-₹{order.discount}</span>
                        </div>
                    )}
                    {order.shippingCharge && order.shippingCharge > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping Charges</span>
                            <span className="text-gray-900 font-medium">₹{order.shippingCharge}</span>
                        </div>
                    )}
                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">Total Amount</span>
                        <span className="font-bold text-gray-900 text-lg sm:text-xl">₹{order.totalDiscountedPrice}</span>
                    </div>
                </div>
                {order.discount > 0 && (
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs sm:text-sm text-green-800 font-medium">You saved ₹{order.discount} on this order</p>
                    </div>
                )}
            </div>

            {/* Delivery Address */}
            {order.shippingAddress && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center text-sm sm:text-base">
                        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Delivery Address
                    </h3>
                    <div className="text-sm">
                        <p className="font-semibold text-gray-900">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
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

            {/* Order Items - ONLY SHOWN WHEN MULTIPLE ITEMS */}
            {hasMultipleItems && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                            Order Items ({order.orderItems.length})
                        </h3>
                        <p className="font-bold text-gray-900 text-lg sm:text-xl">₹{order.totalDiscountedPrice}</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {order.orderItems.map((item) => (
                            <div key={item._id} className="p-4 sm:p-6 flex gap-3 sm:gap-4 hover:bg-gray-50 transition">
                                <div className="w-20 h-24 sm:w-24 sm:h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                    <img
                                        src={item.product.imageUrl}
                                        className="w-full h-full object-cover"
                                        alt={item.product.title}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">{item.product.title}</h4>
                                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
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
                                    <div className="flex flex-wrap items-baseline gap-2">
                                        <span className="text-base sm:text-lg font-bold text-gray-900">₹{item.discountedPrice}</span>
                                        {item.price > item.discountedPrice && (
                                            <>
                                                <span className="text-xs sm:text-sm text-gray-400 line-through">₹{item.price}</span>
                                                <span className="text-xs sm:text-sm text-green-600 font-semibold">
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
            )}
        </div>
    );
}