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

// GET all addresses of logged-in user
export const fetchUserAddressesAPI = async () => {
  const headers = await getAuthHeader();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses/user`, {
    method: "GET",
    headers
  });

  if (!res.ok) {
    throw new Error("Failed to fetch addresses");
  }

  return res.json();
};

// ADD new address
export const addAddressAPI = async (addressData) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses/`, {
    method: "POST",
    headers,
    body: JSON.stringify(addressData)
  });

  if (!res.ok) {
    throw new Error("Failed to add address");
  }

  return res.json();
};

// UPDATE address
export const updateAddressAPI = async ({ addressId, addressData }) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses/${addressId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(addressData)
  });

  if (!res.ok) {
    throw new Error("Failed to update address");
  }

  return res.json();
};

// DELETE address
export const deleteAddressAPI = async (addressId) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses/${addressId}`, {
    method: "DELETE",
    headers
  });

  if (!res.ok) {
    throw new Error("Failed to delete address");
  }

  return addressId;
};
