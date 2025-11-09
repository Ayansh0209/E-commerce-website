export default function Category() {
  const categories = [
    { image: "/images/steal-look.jpg", title: "Steal The Look. Not The Bank.", label: "NEW ARRIVAL" },
    { image: "/images/oversized-tees.jpg", title: "OVERSIZED TEES" },
    { image: "/images/trousers.jpg", title: "TROUSERS" },
    { image: "/images/sweatshirts.jpg", title: "SWEAT SHIRTS" },
    { image: "/images/solid-colors.jpg", title: "SOLID COLORS" },
    { image: "/images/sale.jpg", title: "Faltu Fashion SALE IS LIVE", label: "PRICE DROP" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-8">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-10">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:scale-[1.03] transition-transform duration-300"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-100 object-cover"
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
