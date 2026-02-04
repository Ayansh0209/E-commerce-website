"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  confirmOrder,
  cancelOrder,
} from "@/redux/admin/adminOrderSlice";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state) => state.adminOrders
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const router = useRouter();

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "text-blue-400";
      case "DELIVERED":
        return "text-green-400";
      case "CANCELLED":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Orders</h2>

      <div className="rounded-xl bg-black/10 dark:bg-white/5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 opacity-70">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  Loading orders...
                </td>
              </tr>
            )}

            {!loading && list.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 opacity-60">
                  No orders found
                </td>
              </tr>
            )}

            {list.map((order) => (
              <tr
                key={order._id}
                className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                onClick={() =>
                  router.push(`/Admin/orders/${order._id}`)
                }
              >

                <td className="p-4 font-medium">
                  #{order._id.slice(-6)}
                </td>
                <td className="p-4">
                  {order.user?.email || "Guest"}
                </td>
                <td className="p-4">
                  ₹{order.totalPrice}
                </td>
                <td
                  className={`p-4 font-medium ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </td>
                <td className="p-4 flex gap-3">
                  {order.orderStatus === "PLACED" && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(confirmOrder(order._id));
                        }}
                        className="text-green-400"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() =>
                          dispatch(cancelOrder(order._id))
                        }
                        className="text-red-400"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {error && (
          <div className="text-red-400 p-4">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}
