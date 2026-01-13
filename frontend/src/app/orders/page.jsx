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

  if (authLoading || loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-center mt-10">No orders yet</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {orders.map(order => {
        const firstItem = order.orderItems[0];

        return (
          <div
            key={order._id}
            onClick={() => router.push(`/orders/${order._id}`)}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-sm">
                Order #{order._id.slice(-6)}
              </span>
              <span className={`text-sm font-semibold ${
                order.orderStatus === "DELIVERED"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}>
                {order.orderStatus}
              </span>
            </div>

            <div className="flex gap-4">
              <img
                src={firstItem.product.imageUrl}
                className="w-20 h-24 object-cover rounded"
                alt={firstItem.product.title}
              />

              <div className="flex-1">
                <p className="font-medium">{firstItem.product.title}</p>

                {order.orderItems.length > 1 && (
                  <p className="text-sm text-gray-500">
                    + {order.orderItems.length - 1} more item(s)
                  </p>
                )}

                <p className="mt-1 font-semibold">
                  ₹{order.totalDiscountedPrice}
                </p>

                {order.shipment?.estimatedDelivery && (
                  <p className="text-sm text-gray-600">
                    Delivery by{" "}
                    {new Date(order.shipment.estimatedDelivery).toDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
