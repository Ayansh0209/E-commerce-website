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

// ----------------------------------
// DYNAMIC PRODUCT DATA (dummy now)
// ----------------------------------


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
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ---------------- MAIN SECTION ---------------- */}
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:sticky lg:top-24 h-fit">
            <ProductGallery images={product.images} />
          </div>
          <ProductInfo product={product} />
        </div>


        {/* ---------------- Frequently Bought Together ---------------- */}
        <h2 className="text-2xl font-bold mt-16 mb-4">
          Frequently Bought Together
        </h2>

        {fbt.length === 0 ? (
          <p className="text-gray-500">No suggestions available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {fbt.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}



        {/* ---------------- Similar Products ---------------- */}
        <h2 className="text-2xl font-bold mt-16 mb-4">
          Similar Products
        </h2>

        {similarProducts.length === 0 ? (
          <p className="text-gray-500">No similar products</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
