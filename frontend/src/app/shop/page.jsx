"use client";
import { useEffect, useState } from "react";
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-600">
        Home
        {categoryValue && (
          <>
            {" "} &gt{" "}
            <span className="text-black font-medium">
              {categoryValue}
            </span>
          </>
        )}
        {searchQuery && (
          <>
            {" "} &gt{" "}
            <span className="text-black font-medium">
              Search results for "{searchQuery}"
            </span>
          </>
        )}
      </div>

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 mb-4">

        {/* MOBILE + TABLET */}
        <div className="flex justify-between items-center lg:hidden text-sm">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="
    flex items-center gap-2
    px-4 py-2
    border border-gray-900
    rounded-full
    text-sm font-medium
    text-gray-900
    hover:bg-gray-900 hover:text-white
    transition
  "
          >
            Filters
          </button>


          <p className="text-gray-600">
            products {start}-{end}
          </p>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:flex justify-between items-center">
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
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-2 flex gap-4 items-start min-h-screen">


        {/* SIDEBAR — DESKTOP ONLY */}
        <div className="hidden lg:block w-64 shrink-0 sticky top-24">
          <div className="max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">

            <ShopSidebar
              isMobile={false}
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
          </div>
        </div>

        {/* PRODUCTS */}
        <main className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}

            {hasMore && (
              <div ref={ref} className="col-span-full h-10" />
            )}
          </div>

          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER SIDEBAR */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Sidebar */}
          <div
            className="
        absolute left-0 top-0 h-full
        w-[78%] sm:w-[70%] md:w-[60%] max-w-sm
        bg-white shadow-xl
        overflow-y-auto scrollbar-hide
      "
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-base">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            {/* PRICE SORT */}
            <div className="px-4 py-4 border-b border-gray-200">
              <h4 className="font-semibold mb-3 text-left">Price</h4>

              <div className="flex flex-col gap-2">
                <button
                  className={`sort-btn text-left w-full ${sortValue === "price_low" ? "active" : ""
                    }`}
                  onClick={() => handleRadioFilter("sort", "price_low")}
                >
                  Low → High
                </button>

                <button
                  className={`sort-btn text-left w-full ${sortValue === "price_high" ? "active" : ""
                    }`}
                  onClick={() => handleRadioFilter("sort", "price_high")}
                >
                  High → Low
                </button>
              </div>
            </div>

            {/* FILTERS */}
            <div className="px-4 py-4">
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
            </div>
          </div>
        </div>
      )}

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
