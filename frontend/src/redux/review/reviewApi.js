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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reviews/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create review");
  }

  return res.json();
};
