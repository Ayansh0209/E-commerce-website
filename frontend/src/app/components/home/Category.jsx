'use client'
import { useRouter } from "next/navigation";
export default function Category() {
  const categories = [
    { image: "//xtremexmartialarts.com/cdn/shop/files/product_2.png?v=1766834995&width=800",title:"T-shirt" },
    { image: "//xtremexmartialarts.com/cdn/shop/files/ov_tshirt_1.png?v=1767077161&width=800" ,title:"Gym Wear"},
    { image: "https://xtremexmartialarts.com/cdn/shop/files/joggers_1_2.png?v=1767077157&width=800", title: "TROUSERS" },
    { image: "https://xtremexmartialarts.com/cdn/shop/files/product_6.png?v=1766835001&width=800", title: "Polos" },
  ];
  const router = useRouter();
  const handleClick = (category) => {
    router.push(`/shop?category=${category}&source=home`);
  };
  return (
    <section className="py-6 bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-8">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 px-4 md:px-10">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(cat.title)}
            className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:scale-[1.03] transition-transform duration-300"
          >
            <img
              src={cat.image}
              onClick={() => handleClick(cat.title)}
              alt={cat.title}
              className="w-full h-110 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              {cat.label && (
                <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded mb-2 w-fit">
                  {cat.label}
                </span>
              )}
              <h2 className="text-black text-lg md:text-xl font-semibold">
                {cat.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
