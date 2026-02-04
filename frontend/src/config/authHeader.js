import { auth } from "@/firebase/firebaseClient";

export const getAuthHeader = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Not authenticated");
  }

  const token = await user.getIdToken();

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
