"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createRatingAPI } from "@/redux/rating/ratingApi";
import { createReviewAPI } from "@/redux/review/reviewApi";
import { useAuth } from "@/context/AuthContext";

export default function RateProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
const [status, setStatus] = useState("form"); 
const [countdown, setCountdown] = useState(2);

  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async () => {
    if (!rating) {
      alert("Please select rating");
      return;
    }

    try {
      setSubmitting(true);

      // 1️⃣ Create rating (mandatory)
      await createRatingAPI({
        productId: id,
        rating,
      });

      // 2️⃣ Create review (optional)
      if (review.trim()) {
        await createReviewAPI({
          productId: id,
          review,
        });
      }

      router.push(`/productdetail/${id}`);
    }  catch (err) {
  if (err.status === 409) {
    setStatus("alreadyRated");

    let timer = 2;
    setCountdown(timer);

    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);

      if (timer === 0) {
        clearInterval(interval);
        router.push(`/productdetail/${id}`);
      }
    }, 1000);
  } else {
    setStatus("error");
  }
}

  };

 return (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    {status === "form" && (
      <div className="max-w-md w-full">
        <h1 className="text-xl font-bold mb-4">Rate this product</h1>

        {/* Stars */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Optional review */}
        <textarea
          placeholder="Write a review (optional)"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border rounded p-3 mb-4"
          rows={4}
        />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-black text-white py-3 rounded disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    )}

    {status === "alreadyRated" && (
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">
          You have already reviewed this product.
        </h2>
        <p className="text-gray-500">
          You will be redirected back in
        </p>
        <p className="text-3xl font-bold mt-2">{countdown}</p>
      </div>
    )}

    {status === "error" && (
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">
          Something went wrong
        </h2>
        <button
          onClick={() => setStatus("form")}
          className="mt-4 text-blue-600"
        >
          Try again
        </button>
      </div>
    )}
  </div>
);
}