import { auth } from "@/firebase/firebaseClient";
import { getAuth } from "firebase/auth";

const getAuthHeader = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const fetchProductRatings = async (productId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ratings/product/${productId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ratings");
  }

  return res.json();
};

export const createRatingAPI = async (data) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ratings/create`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }
  );

  const responseData = await res.json();

  if (!res.ok) {
    // 🔥 pass backend message forward
    const error = new Error(responseData.message || "Failed to create rating");
    error.status = res.status;
    throw error;
  }

  return responseData;
};

