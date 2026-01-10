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

export const getCartAPI = async () => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
    { headers }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }

  return res.json();
};

export const addItemToCartAPI = async (data) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/add`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to add item to cart");
  }

  return res.json();
};



export const removeCartItemAPI = async (cartItemId) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart_items/${cartItemId}`,
    {
      method: "DELETE",
      headers,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to remove cart item");
  }

  return res.json();
};

export const updateCartItemAPI = async (cartItemId, data) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart_items/${cartItemId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to update cart item");
  }

  return res.json();
};