// src/redux/order/orderApi.js
import { auth } from "@/firebase/firebaseClient";

const getAuthHeader = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// CREATE ORDER
export const createOrderAPI = async (addressId) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({addressId:addressId}),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create order");
  }
  return res.json();
};

// GET ORDER BY ID
export const getOrderByIdAPI = async (orderId) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${orderId}`,
    { headers }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }

  return res.json();
};
