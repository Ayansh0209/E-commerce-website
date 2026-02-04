"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDashboard } from "@/redux/admin/adminDashboardSlice";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { stats, revenueChart, recentOrders, loading } =
    useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  if (loading) {
    return <div className="opacity-60">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="opacity-70 mt-1">
          Welcome back, Admin 👋 Here’s what’s happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Revenue" value={`₹${stats?.totalRevenue}`} />
        <StatCard title="Orders" value={stats?.totalOrders} />
        <StatCard title="Products" value={stats?.totalProducts} />
        <StatCard title="Customers" value={stats?.totalCustomers} />
        <StatCard title="Orders (24h)" value={stats?.ordersLast24h} />
      </div>

      {/* Revenue Graph */}
      <div className="rounded-xl bg-black/10 dark:bg-white/5 p-6">
        <h3 className="text-xl font-semibold mb-4">Revenue Trend</h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueChart}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#a855f7"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl bg-black/10 dark:bg-white/5 p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>

        <table className="w-full text-sm">
          <thead className="opacity-60 border-b border-white/10">
            <tr>
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders?.map((order) => (
              <tr key={order._id} className="border-b border-white/5">
                <td className="py-3">#{order._id.slice(-6)}</td>
                <td className="py-3">{order.email}</td>
                <td className="py-3">₹{order.amount}</td>
                <td
                  className={`py-3 font-medium ${
                    order.status === "PAID"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl p-6 bg-black/10 dark:bg-white/5">
      <p className="text-sm opacity-60">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
