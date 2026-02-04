"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { fetchProductId } from "@/redux/product/productSlice";
import { updateProduct } from "@/redux/admin/adminproductSlice";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentProduct, loading } = useSelector(
    (state) => state.product
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    brand: "",
    color: "",
    fit: "",
    print: "",
    price: 0,
    discountedPrice: 0,
    imageUrl: "",
    sizes: [],
    topLevelCategory: "",
    secondLevelCategory: "",
    isBestSeller: false,
    isNewArrival: false,
  });

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    if (id) dispatch(fetchProductId(id));
  }, [id, dispatch]);

  /* ---------------- PREFILL ---------------- */
  useEffect(() => {
    if (!currentProduct) return;

    setForm({
      title: currentProduct.title || "",
      description: currentProduct.description || "",
      brand: currentProduct.brand || "",
      color: currentProduct.color || "",
      fit: currentProduct.fit || "",
      print: currentProduct.print || "",
      price: currentProduct.price || 0,
      discountedPrice: currentProduct.discountedPrice || 0,
      imageUrl: currentProduct.imageUrl || "",
      sizes: currentProduct.sizes || [],
      topLevelCategory:
        currentProduct.category?.parentCategory?.name || "",
      secondLevelCategory:
        currentProduct.category?.name || "",
      isBestSeller: currentProduct.isBestSeller || false,
      isNewArrival: currentProduct.isNewArrival || false,
    });
  }, [currentProduct]);

  /* ---------------- HELPERS ---------------- */
  const discountPercent = useMemo(() => {
    if (!form.price || !form.discountedPrice) return 0;
    return Math.round(
      ((form.price - form.discountedPrice) / form.price) * 100
    );
  }, [form.price, form.discountedPrice]);

  const totalQuantity = useMemo(() => {
    return form.sizes.reduce(
      (sum, s) => sum + Number(s.quantity || 0),
      0
    );
  }, [form.sizes]);

  /* ---------------- INVENTORY HANDLERS ---------------- */
  const addSize = () => {
    setForm((p) => ({
      ...p,
      sizes: [...p.sizes, { name: "", quantity: 0 }],
    }));
  };

  const updateSize = (index, key, value) => {
    const updated = [...form.sizes];
    updated[index][key] =
      key === "quantity" ? Number(value) : value;
    setForm({ ...form, sizes: updated });
  };

  const removeSize = (index) => {
    const updated = [...form.sizes];
    updated.splice(index, 1);
    setForm({ ...form, sizes: updated });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      updateProduct({
        id,
        data: {
          ...form,
          quantity: totalQuantity,
          discountPercent,
        },
      })
    ).unwrap();

    router.push("/Admin/products");
  };

  if (loading || !currentProduct) {
    return (
      <div className="p-6 text-center opacity-70">
        Loading product...
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-8">
      <h2 className="text-3xl font-bold">Edit Product</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-xl bg-black/10 dark:bg-white/5 p-6"
      >
        {/* MEDIA */}
        <section>
          <h3 className="font-semibold mb-3">Media</h3>
          <img
            src={form.imageUrl}
            className="w-32 h-32 rounded-lg object-cover mb-3"
          />
          <input
            value={form.imageUrl}
            onChange={(e) =>
              setForm({ ...form, imageUrl: e.target.value })
            }
            placeholder="Image URL"
            className="w-full p-3 rounded-lg bg-transparent border border-white/10"
          />
        </section>

        {/* BASIC INFO */}
        <section className="grid grid-cols-2 gap-4">
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="Title"
            className="p-3 rounded-lg bg-transparent border border-white/10 col-span-2"
          />
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Description"
            rows={3}
            className="p-3 rounded-lg bg-transparent border border-white/10 col-span-2"
          />
          <input
            value={form.brand}
            onChange={(e) =>
              setForm({ ...form, brand: e.target.value })
            }
            placeholder="Brand"
            className="p-3 rounded-lg bg-transparent border border-white/10"
          />
          <input
            value={form.color}
            onChange={(e) =>
              setForm({ ...form, color: e.target.value })
            }
            placeholder="Color"
            className="p-3 rounded-lg bg-transparent border border-white/10"
          />
          <input
            value={form.fit}
            onChange={(e) =>
              setForm({ ...form, fit: e.target.value })
            }
            placeholder="Fit (Slim / Regular)"
            className="p-3 rounded-lg bg-transparent border border-white/10"
          />
          <input
            value={form.print}
            onChange={(e) =>
              setForm({ ...form, print: e.target.value })
            }
            placeholder="Print (Solid / Graphic)"
            className="p-3 rounded-lg bg-transparent border border-white/10"
          />
        </section>

        {/* PRICING */}
        <section className="grid grid-cols-3 gap-4">
          <input
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            placeholder="Price"
            className="p-3 rounded-lg bg-transparent border border-white/10"
          />
          <input
            type="number"
            value={form.discountedPrice}
            onChange={(e) =>
              setForm({
                ...form,
                discountedPrice: Number(e.target.value),
              })
            }
            placeholder="Discounted Price"
            className="p-3 rounded-lg bg-transparent border border-white/10"
          />
          <input
            value={`${discountPercent}%`}
            disabled
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          />
        </section>

        {/* INVENTORY */}
        <section>
          <h3 className="font-semibold mb-3">Inventory</h3>

          {form.sizes.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-3 gap-3 mb-2"
            >
              <input
                value={s.name}
                onChange={(e) =>
                  updateSize(i, "name", e.target.value)
                }
                placeholder="Size"
                className="p-2 rounded bg-transparent border border-white/10"
              />
              <input
                type="number"
                value={s.quantity}
                onChange={(e) =>
                  updateSize(i, "quantity", e.target.value)
                }
                placeholder="Qty"
                className="p-2 rounded bg-transparent border border-white/10"
              />
              <button
                type="button"
                onClick={() => removeSize(i)}
                className="text-red-400"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSize}
            className="text-purple-400 mt-2"
          >
            + Add Size
          </button>

          <div className="mt-3 opacity-70">
            Total Quantity: <b>{totalQuantity}</b>
          </div>
        </section>

        {/* FLAGS */}
        <section className="flex gap-6">
          <label>
            <input
              type="checkbox"
              checked={form.isBestSeller}
              onChange={(e) =>
                setForm({
                  ...form,
                  isBestSeller: e.target.checked,
                })
              }
            />{" "}
            Best Seller
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.isNewArrival}
              onChange={(e) =>
                setForm({
                  ...form,
                  isNewArrival: e.target.checked,
                })
              }
            />{" "}
            New Arrival
          </label>
        </section>

        {/* META */}
        <section className="text-sm opacity-60">
          <p>Product ID: {currentProduct._id}</p>
          <p>Created: {new Date(currentProduct.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(currentProduct.updatedAt).toLocaleString()}</p>
        </section>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
          Update Product
        </button>
      </form>
    </div>
  );
}
