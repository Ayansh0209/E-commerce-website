import { getAuthHeader } from "@/config/authHeader";

const BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/products`;

export const getAll = async (params = {}) => {
  const headers = await getAuthHeader();
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${BASE}?${query}`, { headers });
  if (!res.ok) throw new Error("Fetch products failed");

  return res.json();
};

export const addOne = async (data) => {
  const headers = await getAuthHeader();

  const res = await fetch(BASE, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Create product failed");
  return res.json();
};

export const delOne = async (id) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) throw new Error("Delete product failed");
  return res.text();
};
export const updateOne = async (id, data) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/products/${id}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Update product failed");
  }

  return res.json();
};
