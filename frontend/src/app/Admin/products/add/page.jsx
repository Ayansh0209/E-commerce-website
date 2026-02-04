"use client";

import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/admin/adminproductSlice";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;

    // size quantities
    const sQty = Number(f.sizeS.value || 0);
    const mQty = Number(f.sizeM.value || 0);
    const lQty = Number(f.sizeL.value || 0);

    const sizes = [
      { name: "S", quantity: sQty },
      { name: "M", quantity: mQty },
      { name: "L", quantity: lQty },
    ];

    const totalQuantity = sQty + mQty + lQty;

    const payload = {
      title: f.title.value,
      description: f.description.value,
      brand: f.brand.value,
      imageUrl: f.imageUrl.value,
      color: f.color.value,

      price: Number(f.price.value),
      discountedPrice: Number(f.discountedPrice.value),
      discountPercent: Number(f.discountPercent.value),

      sizes,                    // ✅ size-wise quantity
      quantity: totalQuantity,  // ✅ total quantity

      fit: f.fit.value,
      print: f.print.value,

      isBestSeller: f.isBestSeller.checked,
      isNewArrival: f.isNewArrival.checked,

      topLevelCategory: f.topLevelCategory.value,
      secondLevelCategory: f.secondLevelCategory.value,
    };

    console.log("📦 Final payload:", payload);

    await dispatch(addProduct(payload));
    router.push("/Admin/products");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <h2 className="text-3xl font-bold">Add Product</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/10 dark:bg-white/5 p-6 rounded-xl"
      >
        {/* Basic */}
        <input name="title" placeholder="Title" className="input" />
        <input name="brand" placeholder="Brand" className="input" />

        <textarea
          name="description"
          placeholder="Description"
          className="input md:col-span-2"
        />

        <input name="imageUrl" placeholder="Image URL" className="input" />
        <input name="color" placeholder="Color" className="input" />

        {/* Pricing */}
        <input name="price" type="number" placeholder="Price" className="input" />
        <input
          name="discountedPrice"
          type="number"
          placeholder="Discounted Price"
          className="input"
        />

        <input
          name="discountPercent"
          type="number"
          placeholder="Discount %"
          className="input"
        />

        {/* Size-wise stock */}
        <div>
          <label className="text-sm opacity-70">Size S Qty</label>
          <input name="sizeS" type="number" className="input" />
        </div>

        <div>
          <label className="text-sm opacity-70">Size M Qty</label>
          <input name="sizeM" type="number" className="input" />
        </div>

        <div>
          <label className="text-sm opacity-70">Size L Qty</label>
          <input name="sizeL" type="number" className="input" />
        </div>

        {/* Other */}
        <input name="fit" placeholder="Fit (Slim / Regular)" className="input" />
        <input name="print" placeholder="Print (Solid)" className="input" />

        <select name="topLevelCategory" className="input">
          <option>Men</option>
          <option>Women</option>
          <option>Unisex</option>
        </select>

        <input
          name="secondLevelCategory"
          placeholder="Second Category (T-Shirts)"
          className="input"
        />

        {/* Flags */}
        <label className="flex gap-2 items-center">
          <input type="checkbox" name="isBestSeller" />
          Best Seller
        </label>

        <label className="flex gap-2 items-center">
          <input type="checkbox" name="isNewArrival" />
          New Arrival
        </label>

        <button
          type="submit"
          className="md:col-span-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
