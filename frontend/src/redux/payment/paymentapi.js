import { auth } from "@/firebase/firebaseClient";

export const getAuthHeader = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Not authenticated");
  }

  const token = await user.getIdToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createPaymentAPI = async (orderId) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments/create-order/${orderId}`,
    {
      method: "POST",
      headers
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create payment");
  }
  return res.json(); // must return payment_link_url
};

export const updateOrderInfo = async (reqData) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        payment_id: reqData.paymentId,
        order_id: reqData.orderId,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Payment update failed");
  }

  return res.json();
};

