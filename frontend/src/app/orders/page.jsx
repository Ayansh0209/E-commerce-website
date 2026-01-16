'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchOrders } from "@/redux/order/orderSlice";
import { useAuth } from "@/context/AuthContext";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { orders, loading } = useSelector(state => state.order);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      dispatch(fetchOrders());
    }
  }, [dispatch, authLoading, user]);

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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="mt-6 text-2xl font-medium text-gray-900">No orders yet</h3>
            <p className="mt-2 text-gray-500">Start shopping to see your orders here</p>
            <button 
              onClick={() => router.push('/shop')}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage your orders</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {orders.map(order => {
            const firstItem = order.orderItems[0];

            return (
              <div
                key={order._id}
                onClick={() => router.push(`/orders/${order._id}`)}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              >
                {/* Order Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-8">
                   
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                      <p className="font-medium text-gray-900 mt-0.5">
                        {new Date(order.createdAt || Date.now()).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                      <p className="font-semibold text-gray-900 mt-0.5">₹{order.totalDiscountedPrice}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)} bg-opacity-10`}
                      style={{ backgroundColor: order.orderStatus === 'PLACED' ? '#fff7ed' : order.orderStatus === 'DELIVERED' ? '#f0fdf4' : '#eff6ff' }}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-5">
                  <div className="flex gap-5">
                    <div className="relative w-24 h-28 shrink-0 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={firstItem.product.imageUrl}
                        className="w-full h-full object-cover"
                        alt={firstItem.product.title}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-900 truncate">
                        {firstItem.product.title}
                      </h3>
                      
                      {firstItem.size && (
                        <p className="text-sm text-gray-500 mt-1">Size: {firstItem.size}</p>
                      )}
                      
                      {order.orderItems.length > 1 && (
                        <p className="text-sm text-gray-600 mt-2">
                          + {order.orderItems.length - 1} more item{order.orderItems.length - 1 > 1 ? 's' : ''}
                        </p>
                      )}

                      {order.shipment?.estimatedDelivery && (
                        <div className="mt-3 flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Expected delivery: {new Date(order.shipment.estimatedDelivery).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}