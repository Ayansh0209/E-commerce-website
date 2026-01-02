export const fetchProductRatings = async (productId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ratings/product/${productId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ratings");
  }

  return res.json();
};

export const createRatingAPI = async (data, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ratings/create`,
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
    throw new Error("Failed to create rating");
  }

  return res.json();
};
