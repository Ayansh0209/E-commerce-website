"use client";

import ProductGallery from "../../components/productPage/ProductGallery";
import ProductInfo from "../../components/productPage/ProductInfo";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchProductId, clearProduct } from "../../../redux/product/productSlice";
import { useEffect } from "react";
import { fetchProduct } from "../../../redux/product/productSlice";



export default function ProductPage() {
  const { id } = useParams()
  const dispatch = useDispatch();
  const { currentProduct, products, detailLoading } = useSelector(state => state.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductId(id))
      dispatch(fetchProduct({ limit: 20 }));
    };

    return () => {
      dispatch(clearProduct());
    };
  }, [id, dispatch]);

  if (detailLoading || !currentProduct) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const product = {
    ...currentProduct,


    images: currentProduct.imageUrl ? [currentProduct.imageUrl] : [],

    sizes: Array.isArray(currentProduct.sizes)
      ? currentProduct.sizes
      : [],
    // Description used in Product Details accordion
    details: currentProduct.description ?? "No description available",
  };
  //Normalize products safely (NO Redux change)
const productList = Array.isArray(products)
  ? products
  : products?.content || products?.products || [];
const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};


  const similarProducts = shuffleArray(
  productList.filter(
    (p) =>
      p._id !== currentProduct._id &&
      p.category?._id === currentProduct.category?._id
  )
).slice(0, 4);


 const frequentlyBoughtTogether = shuffleArray(
  productList.filter(
    (p) =>
      p._id !== currentProduct._id &&
      p.brand === currentProduct.brand
  )
).slice(0, 4);

// 🔁 Fallback if brand match not enough
const fbt =
  frequentlyBoughtTogether.length >= 2
    ? frequentlyBoughtTogether
    : shuffleArray(
        productList.filter((p) => p._id !== currentProduct._id)
      ).slice(0, 4);


  return (
  <div>
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">

      {/* ---------------- MAIN SECTION ---------------- */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        
        {/* PRODUCT GALLERY */}
        <div className="lg:sticky lg:top-24 h-fit">
          <ProductGallery images={product.images} />
        </div>

        {/* PRODUCT INFO */}
        <ProductInfo product={product} />
      </div>

      {/* ---------------- Frequently Bought Together ---------------- */}
    {/* ---------------- Frequently Bought Together ---------------- */}
<h2 className="text-xl sm:text-2xl font-bold mt-14 mb-4">
  Frequently Bought Together
</h2>

{fbt.length === 0 ? (
  <p className="text-gray-500">No suggestions available</p>
) : (
  <>
    {/* MOBILE / TABLET — horizontal scroll */}
    <div className="lg:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
      <div className="flex gap-3">
        {fbt.map((item) => (
          <div key={item._id} className="min-w-[46%] max-w-[46%]">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>

    {/* DESKTOP — grid */}
    <div className="hidden lg:grid grid-cols-4 gap-6">
      {fbt.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  </>
)}


      {/* ---------------- Similar Products ---------------- */}
      {/* ---------------- Similar Products ---------------- */}
<h2 className="text-xl sm:text-2xl font-bold mt-14 mb-4">
  Similar Products
</h2>

{similarProducts.length === 0 ? (
  <p className="text-gray-500">No similar products</p>
) : (
  <>
    {/* MOBILE / TABLET — horizontal scroll */}
    <div className="lg:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
      <div className="flex gap-3">
        {similarProducts.map((item) => (
          <div key={item._id} className="min-w-[46%] max-w-[46%]">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>

    {/* DESKTOP — grid */}
    <div className="hidden lg:grid grid-cols-4 gap-6">
      {similarProducts.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  </>
)}


    </div>

    <Footer />
  </div>
);
}