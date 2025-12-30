"use client";

import ProductGallery from "../../components/productPage/ProductGallery";
import ProductInfo from "../../components/productPage/ProductInfo";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchProductId, clearProduct } from "../../../redux/product/productSlice";
import { useEffect } from "react";
// ----------------------------------
// DYNAMIC PRODUCT DATA (dummy now)
// ----------------------------------
const products = {
  id: 1,
  brand: "Faltu Fashion",
  name: "Men Slim Fit Solid Shirt",
  price: 599,
  originalPrice: 1299,
  discount: 54,
  description:
    "Premium cotton slim fit shirt perfect for casual and formal wear.",

  // ⭐ REQUIRED FIELD
  rating: 4.3,

  ratingBreakdown: [
    { star: 5, percent: 60 },
    { star: 4, percent: 25 },
    { star: 3, percent: 10 },
    { star: 2, percent: 3 },
    { star: 1, percent: 2 },
  ],


  // ⭐ REQUIRED FIELD
  reviews: [
    {
      name: "Rohit Sharma",
      rating: 5,
      comment: "Amazing quality. Fits perfectly!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Aisha Khan",
      rating: 4,
      comment: "Good material. Slightly tight on shoulders.",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Vikram Rao",
      rating: 5,
      comment: "Great value for money!",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    },
  ],

  // PRODUCT IMAGES
  images: [
    "https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/w/0/g/xl-bkchx3-bk-brand-original-imagqfdgf3s6fefd.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/j/x/v/-original-imaghrnsfvbhrsny.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/d/d/y/-original-imagp8qe6mzhmydv.jpeg?q=70",
  ],

  // ⭐ REQUIRED FIELD (color variants)
  colors: [
    "https://rukminim1.flixcart.com/image/312/312/xif0q/shirt/0/1/n/-original-imaghrnsfvbhrsny.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/312/312/xif0q/shirt/w/0/g/xl-bkchx3-bk-brand-original-imagqfdgf3s6fefd.jpeg?q=70",
  ],

  // ⭐ REQUIRED FIELD
  sizes: ["S", "M", "L", "XL", "XXL"],

  // ⭐ REQUIRED FIELD
  details:
    "This slim fit shirt is made from premium cotton fabric, offering breathability and long-lasting comfort. Perfect for both casual and semi-formal occasions.",

  // ⭐ REQUIRED FIELD
  specs: [
    "Fabric: 100% Cotton",
    "Fit: Slim Fit",
    "Sleeves: Full Sleeves",
    "Collar: Spread Collar",
    "Pattern: Solid",
    "Occasion: Casual & Formal",
  ],

  // SIMILAR PRODUCTS
  similar: [
    {
      brand: "Roadster",
      detail: "Casual Cotton Shirt",
      price: 499,
      originalPrice: 899,
      image:
        "https://rukminim1.flixcart.com/image/612/612/ksdjma80/shirt/f/2/i/xl-men-solid-casual-shirt-refresh-original-imag5ymxgwqgx62k.jpeg?q=70",
    },
    {
      brand: "Arrow",
      detail: "Formal Slim Fit Shirt",
      price: 899,
      originalPrice: 2499,
      image:
        "https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/j/b/f/40-peshwnupy62747-peter-england-original-imagpzhh3kvah5ut.jpeg?q=70",
    },
    {
      brand: "V-Mart",
      detail: "Regular Fit Shirt",
      price: 349,
      originalPrice: 799,
      image:
        "https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/t/l/y/s-523299-v-mart-original-imagjyhuccmdw98h.jpeg?q=70",
    },
    {
      brand: "Van Heusen",
      detail: "Checkered Formal Shirt",
      price: 1099,
      originalPrice: 2799,
      image:
        "https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/l/j/u/40-vhsflcufm32037-van-heusen-original-imaggb9fhs7rfggd.jpeg?q=70",
    },
  ],

  // FREQUENTLY BOUGHT TOGETHER
  fbt: [
    {
      brand: "Roadster",
      detail: "Casual Cotton Shirt",
      price: 499,
      originalPrice: 899,
      image:
        "https://rukminim1.flixcart.com/image/612/612/ksdjma80/shirt/f/2/i/xl-men-solid-casual-shirt-refresh-original-imag5ymxgwqgx62k.jpeg?q=70",
    },
    {
      brand: "Arrow",
      detail: "Formal Slim Fit Shirt",
      price: 899,
      originalPrice: 2499,
      image:
        "https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/j/b/f/40-peshwnupy62747-peter-england-original-imagpzhh3kvah5ut.jpeg?q=70",
    },
    {
      brand: "V-Mart",
      detail: "Regular Fit Shirt",
      price: 349,
      originalPrice: 799,
      image:
        "https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/t/l/y/s-523299-v-mart-original-imagjyhuccmdw98h.jpeg?q=70",
    },
    {
      brand: "Van Heusen",
      detail: "Checkered Formal Shirt",
      price: 1099,
      originalPrice: 2799,
      image:
        "https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/l/j/u/40-vhsflcufm32037-van-heusen-original-imaggb9fhs7rfggd.jpeg?q=70",
    },
  ],
};


export default function ProductPage() {
  const { id } = useParams()
  const dispatch = useDispatch();
  const { currentProduct, detailLoading } = useSelector(state => state.product);

  useEffect(() => {
    if (id) dispatch(fetchProductId(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [id,dispatch]);

  if (detailLoading || !currentProduct) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const product = {
  ...currentProduct,

  
  images: currentProduct.imageUrl ? [currentProduct.imageUrl] : [],

  // IMPORTANT: normalize sizes safely
  // Handles: null, undefined, empty array
  sizes: Array.isArray(currentProduct.sizes)
    ? currentProduct.sizes
    : [],

  reviews: currentProduct.reviews ?? [],

  // UI-only fallback (keep for now)
  rating: currentProduct.rating ?? 4.2,

  // Description used in Product Details accordion
  details: currentProduct.description ?? "No description available",
};




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
        <h2 className="text-2xl font-bold mt-16 mb-4">Frequently Bought Together</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.fbt.map((item, i) => (
            <ProductCard key={i} product={item} />
          ))}
        </div>


        {/* ---------------- Similar Products ---------------- */}
        <h2 className="text-2xl font-bold mt-16 mb-4">Similar Products</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.similar.map((item, i) => (
            <ProductCard key={i} product={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
