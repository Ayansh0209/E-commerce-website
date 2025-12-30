export const fetchProducts = async (params) => {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?${query}`);
  console.log("products",res);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
   const data = await res.json();
  console.log("PRODUCT DATA FROM API ", data);
return data;
  //return res.json();
};
export const fetchProductById = async (productId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/id/${productId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};
