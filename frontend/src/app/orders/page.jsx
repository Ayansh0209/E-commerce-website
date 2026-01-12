'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/redux/order/orderSlice";
import { useAuth } from "@/context/AuthContext";

 
export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.order);
 const { user, loading: authLoading } = useAuth();
  useEffect(() => {
    if (!authLoading && user) {
      dispatch(fetchOrders());
    }
  }, [dispatch, authLoading, user]);

  if (authLoading || loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-center mt-10">No orders yet</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {orders.map(order => (
        <div key={order._id} className="border rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">
              Order #{order._id.slice(-6)}
            </span>
            <span className="text-green-600 font-semibold">
              {order.orderStatus}
            </span>
          </div>

          {order.orderItems.map(item => (
            <div key={item._id} className="flex gap-4 mb-3">
              <img
                src={item.product.imageUrl}
                className="w-20 h-24 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.product.title}</p>
                <p className="text-sm text-gray-600">
                  Size: {item.size} · Qty: {item.quantity}
                </p>
                <p className="font-semibold">
                  ₹{item.discountedPrice}
                </p>
              </div>
            </div>
          ))}

          <div className="text-right font-bold">
            Total: ₹{order.totalDiscountedPrice}
          </div>
        </div>
      ))}
    </div>
  );
}
