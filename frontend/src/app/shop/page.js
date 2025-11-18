"use client";

import { useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import mens_shirt from "../data/mens_shirt.json"

import ShopSidebar from "../components/productPage/ShopSiderbar";
import Footer from "../components/Footer";
export default function ShopPage() {
 
  return (
    <div className="w-full min-h-screen bg-white">
    
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600">
        Home &gt; <span className="text-black font-medium">Sweatshirt</span>
      </div>

      {/* Top Header: Product Count + Sorting */}
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center mb-6">
        <p className="text-gray-700">
          Showing 1–10 products of <span className="font-semibold">100</span> products
        </p>

        <div className="flex gap-4 items-center text-sm">
          <span className="text-gray-500">Sort by:</span>
          <button className="sort-btn active">Popularity</button>
          <button className="sort-btn">What's New</button>
          <button className="sort-btn">High to Low</button>
          <button className="sort-btn">Low to High</button>
          <button className="sort-btn">Customer Rating</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex gap-10">
       <ShopSidebar/>

        {/* -------------------- Product Grid -------------------- */}
        <main className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">
            {mens_shirt.map((p, index) => (
                <ProductCard key={index} product={p} />
              ))}
          </div>
        </main>
      </div>
      <Footer/>
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
