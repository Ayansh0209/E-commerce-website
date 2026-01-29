'use client';

import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchOrders } from "@/redux/order/orderSlice";
import { useAuth } from "@/context/AuthContext";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { orders, loading } = useSelector(state => state.order);
  const { user, loading: authLoading } = useAuth();
  
  // Pagination state
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (!authLoading && user) {
      dispatch(fetchOrders());
    }
  }, [dispatch, authLoading, user]);

  // Update displayed orders when orders change or page changes
  useEffect(() => {
    if (orders.length > 0) {
      const startIndex = 0;
      const endIndex = page * ITEMS_PER_PAGE;
      const newDisplayedOrders = orders.slice(startIndex, endIndex);
      setDisplayedOrders(newDisplayedOrders);
      setHasMore(endIndex < orders.length);
    }
  }, [orders, page]);

  // Infinite scroll observer
  const lastOrderRef = useCallback((node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  const handleCardClick = (orderId) => {
    router.push(`/account/orders/${orderId}`);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'PLACED': 'text-orange-600',
      'CONFIRMED': 'text-blue-600',
      'SHIPPED': 'text-indigo-600',
      'DELIVERED': 'text-green-600',
      'CANCELLED': 'text-red-600'
    };
    return statusColors[status] || 'text-gray-600';
  };

  const getStatusBgColor = (status) => {
    const statusBgColors = {
      'PLACED': 'bg-orange-50',
      'CONFIRMED': 'bg-blue-50',
      'SHIPPED': 'bg-indigo-50',
      'DELIVERED': 'bg-green-50',
      'CANCELLED': 'bg-red-50'
    };
    return statusBgColors[status] || 'bg-gray-50';
  };

  const getStatusIcon = (status) => {
    if (status === 'DELIVERED') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    } else if (status === 'SHIPPED') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    } else if (status === 'PLACED') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return null;
  };

  if (authLoading || (loading && displayedOrders.length === 0)) {
    return (
      <div className="w-full">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
          
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex gap-4">
                <div className="w-24 h-28 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="w-full">
        <div className="text-center py-12 sm:py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full mb-6">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-sm sm:text-base text-gray-500 mb-6">Start shopping to see your orders here</p>
          
          <button 
            onClick={() => router.push('/shop')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-sm text-gray-500">Track and manage your orders</p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {displayedOrders.map((order, index) => {
          const firstItem = order.orderItems[0];
          const isLastOrder = index === displayedOrders.length - 1;

          return (
            <div
              key={order._id}
              ref={isLastOrder ? lastOrderRef : null}
              onClick={() => handleCardClick(order._id)}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer hover:border-gray-300"
            >
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-24 h-32 sm:h-28 shrink-0 bg-gray-100 rounded-lg overflow-hidden group">
                    <img
                      src={firstItem.product.imageUrl}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={firstItem.product.title}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 hover:text-black line-clamp-2">
                          {firstItem.product.title}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          {/* Size - Check if available in backend */}
                          {firstItem.size && (
                            <span>Size: <span className="font-medium text-gray-900">{firstItem.size}</span></span>
                          )}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="shrink-0">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)} ${getStatusBgColor(order.orderStatus)}`}>
                          {getStatusIcon(order.orderStatus)}
                          {order.orderStatus}
                        </div>
                      </div>
                    </div>

                    {/* Additional Items */}
                    {order.orderItems.length > 1 && (
                      <p className="text-sm text-gray-600 mb-3">
                        +{order.orderItems.length - 1} more item{order.orderItems.length - 1 > 1 ? 's' : ''}
                      </p>
                    )}

                    {/* Delivery Date */}
                    <div className="text-sm mb-4">
                      {order.orderStatus === 'DELIVERED' && order.deliveredDate ? (
                        <p className="text-gray-600">
                          Delivered on <span className="font-medium text-gray-900">
                            {new Date(order.deliveredDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </p>
                      ) : order.shipment?.estimatedDelivery ? (
                        <p className="text-gray-600">
                          Expected by <span className="font-medium text-gray-900">
                            {new Date(order.shipment.estimatedDelivery).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </p>
                      ) : (
                        <p className="text-gray-600">
                          Ordered on <span className="font-medium text-gray-900">
                            {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {order.orderStatus === 'DELIVERED' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add rating functionality here if available in backend
                            console.log('Rate Product clicked - Connect to backend');
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          Rate Product
                        </button>
                      )}

                      {(order.orderStatus === 'SHIPPED' || order.orderStatus === 'CONFIRMED') && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/account/orders/${order._id}`);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-900 rounded-lg text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Loading indicator for infinite scroll */}
      {hasMore && !loading && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            Loading more orders...
          </div>
        </div>
      )}

      {/* Order Count Footer */}
      <div className="text-center py-4 text-sm text-gray-500">
        Showing {displayedOrders.length} of {orders.length} order{orders.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}