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

export const getWishlistAPI = async (page = 1, limit = 12) => {
  console.log(
    "API CALL:",
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wishlist?page=${page}&limit=${limit}`
  );

  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wishlist?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return res.json(); // { success, wishlist }
};

export const addToWishlistAPI = async (productId) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wishlist/add`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ productId }),
    }
  );

  if (!res.ok) throw new Error("Failed to add to wishlist");

  return res.json(); 
};

export const removeFromWishlistAPI = async (productId) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wishlist/remove/${productId}`,
    {
      method: "DELETE",
      headers,
    }
  );

  if (!res.ok) throw new Error("Failed to remove from wishlist");

  return res.json(); // { isWishlisted: false }
};

export const moveWishlistToCartAPI = async (productId, size, quantity = 1) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wishlist/move-to-cart`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        productId,
        size,
        quantity,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to move item to cart");
  }

  return res.json();
};
