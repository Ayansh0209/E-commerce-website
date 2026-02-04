import { getAuthHeader } from "@/config/authHeader";

const BASE =
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/dashboard`;

export const fetchDashboard = async () => {
  const headers = await getAuthHeader();

  const res = await fetch(BASE, { headers });
  if (!res.ok) throw new Error("Failed to fetch dashboard");

  return res.json();
};


export const getAdminCustomers = async () => {
  const headers = await getAuthHeader();
  const res = await fetch(BASE + "/customers", { headers });
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
};
