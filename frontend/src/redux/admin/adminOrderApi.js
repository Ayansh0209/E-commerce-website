import { getAuthHeader } from "@/config/authHeader";

const BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/orders`;

export const getAllOrders = async () => {
  const headers = await getAuthHeader();

  const res = await fetch(BASE, { headers });
  if (!res.ok) throw new Error("Failed to fetch orders");

  return res.json();
};

export const confirmOrder = async (orderId) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${BASE}/${orderId}/confirmed`, {
    method: "PUT",
    headers,
  });

  if (!res.ok) throw new Error("Failed to confirm order");
  return res.json();
};

export const cancelOrder = async (orderId) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${BASE}/${orderId}/cancel`, {
    method: "PUT",
    headers,
  });

  if (!res.ok) throw new Error("Failed to cancel order");
  return res.json();
};
