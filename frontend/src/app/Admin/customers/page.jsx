"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminCustomers } from "@/redux/admin/adminCustomerSlice";

export default function CustomersPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(
    (state) => state.adminCustomers
  );

  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminCustomers());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Customers</h2>

      <div className="rounded-xl bg-black/10 dark:bg-white/5">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 opacity-70">
            <tr>
              <th className="p-4 text-left">Email</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Total Spent</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>
            {list.map((c) => (
              <>
                <tr
                  key={c._id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="p-4 font-medium">{c.email}</td>
                  <td className="p-4 text-center">
                    {c.ordersCount}
                  </td>
                  <td className="p-4 text-center">
                    ₹{c.totalSpent || 0}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() =>
                        setOpenId(openId === c._id ? null : c._id)
                      }
                      className="text-purple-400"
                    >
                      {openId === c._id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {openId === c._id && (
                  <tr className="bg-black/20">
                    <td colSpan="4" className="p-6">
                      <div className="space-y-4 text-sm">
                        <p>
                          <strong>Mobile:</strong>{" "}
                          {c.mobile || "-"}
                        </p>

                        <div>
                          <strong>Addresses:</strong>
                          {c.addresses.map((a) => (
                            <p key={a._id} className="opacity-70">
                              {a.streetAddress}, {a.city},{" "}
                              {a.state} – {a.zipCode}
                            </p>
                          ))}
                        </div>

                        <div>
                          <strong>Orders:</strong>
                          {c.orders.map((o) => (
                            <p key={o._id} className="opacity-70">
                              #{o._id.slice(-6)} • ₹{o.total} •{" "}
                              {o.status}
                            </p>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {loading && (
          <p className="p-6 text-center opacity-60">
            Loading customers…
          </p>
        )}
      </div>
    </div>
  );
}
