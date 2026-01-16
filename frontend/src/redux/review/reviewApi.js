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

export const fetchProductReviews = async (productId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reviews/product/${productId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
};

export const createReviewAPI = async (data, token) => {
  const headers = await getAuthHeader();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reviews/create`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create review");
  }

  return res.json();
};
