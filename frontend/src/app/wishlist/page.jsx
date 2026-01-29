'use client';

import { useEffect, useState, useRef, useCallback } from "react";
import WishlistCard from "../components/whislist/WhishlistCard";
// import { auth } from "@/firebase/firebaseClient";
// import { onAuthStateChanged } from "firebase/auth";
import { getWishlistAPI } from "@/redux/wishlist/wishlistApi";
import { useAuth } from "@/context/AuthContext";

const PAGE_SIZE = 12;

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
const { user, loading: authLoading, openAuthModal } = useAuth();

  const [totalCount, setTotalCount] = useState(0);

  const observerRef = useRef(null);
  const isFetchingRef = useRef(false);

  // ================= FETCH (now useCallback) =================
  const fetchWishlist = useCallback(async (pageNumber) => {
    console.log("FETCHING PAGE:", pageNumber);
    if (isFetchingRef.current) {
      console.log("Already fetching, skipping...");
      return;
    }

    isFetchingRef.current = true;
    pageNumber === 1 ? setLoading(true) : setLoadingMore(true);

    try {
      const data = await getWishlistAPI(pageNumber, PAGE_SIZE);
      console.log("FETCHED DATA:", data);

      setWishlist(prev =>
        pageNumber === 1
          ? data.wishlist
          : [...prev, ...data.wishlist]
      );

      setHasMore(data.hasMore);
      setTotalCount(data.totalCount);
      setPage(pageNumber);
    } catch (err) {
      console.error("Wishlist fetch failed", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, []);

  // ================= AUTO PREFETCH =================
  useEffect(() => {
    if (
    
      hasMore &&
      !loading &&
      !loadingMore &&
      wishlist.length > 0 &&
      document.body.scrollHeight <= window.innerHeight
    ) {
      console.log("AUTO PREFETCH NEXT PAGE");
      fetchWishlist(page + 1);
    }
  }, [wishlist,  hasMore, loading, loadingMore, page, fetchWishlist]);

  // ================= AUTH =================
  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setAuthReady(true);
  //       fetchWishlist(1);
  //     } else {
  //       setLoading(false);
  //       setAuthReady(false);
  //     }
  //   });
  //   return () => unsub();
  // }, [fetchWishlist]);

  useEffect(() => {
  if (!authLoading && !user) {
    openAuthModal();
  }

  if (!authLoading && user) {
    fetchWishlist(1);
  }
}, [user, authLoading, openAuthModal, fetchWishlist]);

  // ================= INTERSECTION OBSERVER =================
  useEffect(() => {
    if (!observerRef.current || !hasMore || loading || loadingMore) {
      console.log("Observer not ready:", { 
        hasRef: !!observerRef.current, 
        hasMore, 
        loading, 
        loadingMore 
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("Observer entry:", entry.isIntersecting);
        if (entry.isIntersecting && !isFetchingRef.current) {
          console.log("OBSERVER TRIGGERED - Loading page:", page + 1);
          fetchWishlist(page + 1);
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      }
    );

    observer.observe(observerRef.current);
    console.log("Observer attached to sentinel");
    
    return () => {
      console.log("Observer disconnected");
      observer.disconnect();
    };
  }, [page, hasMore, loading, loadingMore, fetchWishlist]);

  // ================= UI STATES =================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading your wishlist…
      </div>
    );
  }
if (authLoading || !user) return null;

  // if (!authReady) {
  //   return (
  //     <div className="flex justify-center items-center h-[60vh] text-gray-600">
  //       Please login to view your wishlist ❤️
  //     </div>
  //   );
  // }

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
        <p className="text-lg font-medium">Your wishlist is empty ❤️</p>
      </div>
    );
  }

  // ================= RENDER =================
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-xl font-semibold">My Wishlist</h1>
        <span className="text-gray-500">({totalCount})</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <WishlistCard
            key={product._id}
            product={product}
            onUpdate={() => fetchWishlist(1)}
          />
        ))}
      </div>

      {/* Sentinel */}
      {hasMore && (
        <div
          ref={observerRef}
          className="h-24 flex items-center justify-center mt-8"
        >
          {loadingMore ? (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="h-4 w-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
              Loading more…
            </div>
          ) : (
            <div className="text-gray-400 text-sm">Scroll for more</div>
          )}
        </div>
      )}
    </div>
  );
}