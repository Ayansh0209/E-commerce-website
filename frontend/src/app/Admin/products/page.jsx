"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "@/redux/product/productSlice";
import { deleteProduct } from "@/redux/admin/adminproductSlice";

export default function ProductsPage() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.product
  );

  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const [refetching, setRefetching] = useState(false);

  const pageSize = 10;

  const productList = Array.isArray(products?.content)
    ? products.content
    : [];

  const totalPages = products?.totalPages || 1;

  useEffect(() => {
    dispatch(fetchProduct({ pageNumber: page, pageSize }));
  }, [dispatch, page]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      setDeletingId(id);
      await dispatch(deleteProduct(id)).unwrap();

      setRefetching(true);
      await dispatch(fetchProduct({ pageNumber: page, pageSize }));
    } catch {
      alert("Failed to delete product");
    } finally {
      setDeletingId(null);
      setRefetching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Products</h2>
          <p className="opacity-70">Manage all your products</p>
        </div>

        <Link
          href="/Admin/products/add"
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-black/10 dark:bg-white/5">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 opacity-70">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {(loading || refetching) && (
              <tr>
                <td colSpan="7" className="p-6 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full" />
                    <span className="opacity-70">
                      {refetching ? "Refreshing..." : "Loading..."}
                    </span>
                  </div>
                </td>
              </tr>
            )}

            {!loading && productList.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 opacity-60">
                  No products found
                </td>
              </tr>
            )}

            {productList.map((product) => (
              <tr key={product._id}>
                <td className="p-4">
                  <img
                    src={product.imageUrl}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                </td>
                <td className="p-4 font-medium">{product.title}</td>
                <td className="p-4">{product.category?.name}</td>
                <td className="p-4">
                  ₹{product.discountedPrice || product.price}
                </td>
                <td className="p-4">{product.quantity}</td>
                <td className="p-4">
                  {product.quantity > 0 ? (
                    <span className="text-green-400">In Stock</span>
                  ) : (
                    <span className="text-red-400">Out of Stock</span>
                  )}
                </td>
                <td className="p-4 flex gap-3">
                  <Link
                    href={`/Admin/products/edit/${product._id}`}
                    className="text-blue-400"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    className={
                      deletingId === product._id
                        ? "text-gray-400"
                        : "text-red-400"
                    }
                  >
                    {deletingId === product._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 p-4">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-lg ${
                    page === p
                      ? "bg-purple-600 text-white"
                      : "bg-white/10"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        )}

        {error && (
          <div className="text-red-400 p-4">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}
