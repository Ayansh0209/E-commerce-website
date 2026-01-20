"use client";
import {  useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import ProductCard from "../components/ProductCard/ProductCard";
import ShopSidebar from "../components/productPage/ShopSiderbar";
import Footer from "../components/Footer";
import { fetchProduct } from "@/redux/product/productSlice";
import { useInView } from "react-intersection-observer";

import { useDispatch, useSelector } from "react-redux";

export default function ShopPage() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const source = searchParams.get("source");

 

  const shouldShowCategoryFilter = source !== "home";

  const handleFilterChange = (section, value) => {
    const params = new URLSearchParams(searchParams.toString());

    const current = params.get(section)
      ? params.get(section).split(",").filter(Boolean)
      : [];

    let updated;

    if (current.includes(value)) {
      updated = current.filter((v) => v !== value);
    } else {
      updated = [...current, value];
    }

    if (updated.length === 0) {
      params.delete(section);
    } else {
      params.set(section, updated.join(","));
    }


    router.push(`?${params.toString()}`, { scroll: false });
  };
  const handleRadioFilter = (section, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(section, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };


  const { products, loading, error } = useSelector(
    (state) => state.product
  );

  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const sortValue = searchParams.get("sort");
  //const pageNumber = Number(searchParams.get("page") || 1);
  const stock = searchParams.get("stock");
  const isBestSeller = searchParams.get("isBestSeller");
  const isNewArrival = searchParams.get("isNewArrival");
  const fitValue = searchParams.get("fit");
  const printValue = searchParams.get("print");
  const categoryValue = searchParams.get("category");
  const searchQuery = searchParams.get("query");

 useEffect(() => {
  setPage(1);
  setHasMore(true);
  setAllProducts([]);
}, [searchParams]);

 useEffect(() => {
  if (inView && hasMore && !loading && allProducts.length > 0) {
    setPage((prev) => prev + 1);
  }
}, [inView, hasMore, loading]);

  useEffect(() => {
    const reqData = {};

    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      reqData.search = searchQuery;
    }
    const categoryValue = searchParams.get("category");

    if (categoryValue) {
      reqData.category = categoryValue;
    }

    if (isBestSeller) reqData.isBestSeller = true;
    if (isNewArrival) reqData.isNewArrival = true;

    // colors
    if (colorValue) {
      reqData.color = colorValue;
    }

    // sizes
    if (sizeValue) {
      reqData.sizes = sizeValue;
    }
    if (fitValue) {
      reqData.fit = fitValue;
    }

    // print 
    if (printValue) {
      reqData.print = printValue;
    }
    // price
    if (priceValue) {
      const [minPrice, maxPrice] = priceValue.split("-").map(Number);
      reqData.minPrice = minPrice;
      reqData.maxPrice = maxPrice;
    }

    // sort
    reqData.sort = sortValue || "price_low";

    if (stock) {
      reqData.stock = stock;
    }
    // pagination (backend expects 1-based)
    // reqData.pageNumber = pageNumber;
    // reqData.pageSize = 15;

    // dispatch(fetchProduct(reqData));
    reqData.pageNumber = page;
    reqData.pageSize = 15;

    dispatch(fetchProduct(reqData));

  }, [
    searchParams,
    colorValue,
    sizeValue,
    fitValue,
    printValue,
    priceValue,
    sortValue,
   page,
    stock,
    isBestSeller,
    isNewArrival,
    dispatch,
  ]);

  useEffect(() => {
  if (!products?.content) return;

  setAllProducts((prev) =>
    page === 1 ? products.content : [...prev, ...products.content]
  );

  if (page >= products.totalPages) {
    setHasMore(false);
  }
}, [products]);



  const selectedCategories = searchParams.get("category")?.split(",") || [];
  const selectedColors = searchParams.get("color")?.split(",") || [];
  const selectedPrice = searchParams.get("price") || "";


  const pageSize = 15;
  // const start = (pageNumber - 1) * pageSize + 1;
  // const end = Math.min(
  //   start + products?.content?.length - 1,
  //   products?.totalPages * pageSize
  // );
const start = allProducts.length > 0 ? 1 : 0;
const end = allProducts.length;

  return (
    <div className="w-full min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600">
        Home
        {categoryValue && (
          <>
            {" "} &gt;{" "}
            <span className="text-black font-medium">
              {categoryValue}
            </span>
          </>
        )}
        {searchQuery && (
          <>
            {" "} &gt;{" "}
            <span className="text-black font-medium">
              Search results for "{searchQuery}"
            </span>
          </>
        )}
      </div>


      {/* Top Header: Product Count + Sorting */}
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center mb-6">
        <p className="text-gray-700">
          Showing {start}-{end} products
        </p>


        <div className="flex gap-4 items-center text-sm">
          <span className="text-gray-500">Sort by:</span>

          <button
            className={`sort-btn ${sortValue === "price_high" ? "active" : ""}`}
            onClick={() => handleRadioFilter("sort", "price_high")}
          >
            High to Low
          </button>

          <button
            className={`sort-btn ${sortValue === "price_low" ? "active" : ""}`}
            onClick={() => handleRadioFilter("sort", "price_low")}
          >
            Low to High
          </button>

          {/* Enable ONLY if backend supports rating */}
          {/* 
  <button
    className={`sort-btn ${sortValue === "rating" ? "active" : ""}`}
    onClick={() => handleRadioFilter("sort", "rating")}
  >
    Customer Rating
  </button>
  */}
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 flex gap-10">
        <ShopSidebar
          showCategoryFilter={shouldShowCategoryFilter}
          selectedCategories={selectedCategories}
          selectedColors={selectedColors}
          selectedPrice={selectedPrice}
          selectedSizes={searchParams.get("size")?.split(",") || []}
          selectedFits={searchParams.get("fit")?.split(",") || []}
          selectedPrints={searchParams.get("print")?.split(",") || []}
          onCategoryChange={(value) => handleFilterChange("category", value)}
          onColorChange={(value) => handleFilterChange("color", value)}
          onSizeChange={(value) => handleFilterChange("size", value)}
          onFitChange={(value) => handleFilterChange("fit", value)}
          onPrintChange={(value) => handleFilterChange("print", value)}
          onPriceChange={(value) => handleRadioFilter("price", value)}
        />

        {/* -------------------- Product Grid -------------------- */}
       <main className="flex-1">
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">
    {allProducts.map((p, index) => (
      <ProductCard key={p._id || index} product={p} />
    ))}

    {/* 👇 Sentinel MUST be last grid item */}
    {hasMore && (
      <div ref={ref} className="col-span-full h-10" />
    )}
  </div>

  {loading && (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-64 bg-gray-200 animate-pulse rounded" />
      ))}
    </div>
  )}
</main>

        {/* <div ref={ref} className="h-10" /> */}


      </div>
      <Footer />
    </div>
  );
}

/* ---- Sorting Button Style ---- */
export const sortBtnStyles = `
  .sort-btn {
    padding: 6px 10px;
    border-radius: 8px;
    transition: 0.2s;
    color: #6b7280;
  }
  .sort-btn:hover {
    background: #f3f3f3;
  }
  .sort-btn.active {
    font-weight: 600;
    color: black;
  }
`;
