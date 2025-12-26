'use client'
import { useRouter } from "next/navigation";
export default function Category() {
  const categories = [
    { image: "/images/steal-look.jpg", title: "T-Shirts", label: "" },
    { image: "/images/oversized-tees.jpg", title: "Gym Wear" },
    { image: "/images/trousers.jpg", title: "TROUSERS" },
    { image: "/images/sweatshirts.jpg", title: "Polos" },
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
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-5">
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
