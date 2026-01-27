'use client'
import { useRouter } from "next/navigation";

export default function Category() {
  const categories = [
    { image: "//xtremexmartialarts.com/cdn/shop/files/product_2.png?v=1766834995&width=800", title: "T-Shirts" },
    { image: "//xtremexmartialarts.com/cdn/shop/files/ov_tshirt_1.png?v=1767077161&width=800", title: "Gym Wear" },
    { image: "https://xtremexmartialarts.com/cdn/shop/files/joggers_1_2.png?v=1767077157&width=800", title: "Trousers" },
    { image: "https://xtremexmartialarts.com/cdn/shop/files/product_6.png?v=1766835001&width=800", title: "Polos" },
  ];

  const router = useRouter();
  
  const handleClick = (category) => {
    router.push(`/shop?category=${category}&source=home`);
  };

  return (
  <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
  <div
    className="
      w-full mx-auto
      px-2            /* phones */
      sm:px-4         /* large phones */
      md:px-4         /* tablets */
      lg:px-4        /* laptops */
      xl:px-4        /* large screens */
    "
  >

        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-gray-900">
          Shop by Category
        </h2>

        <div
  className="
    grid grid-cols-2
    gap-1          /* phones */
    sm:gap-2       /* large phones */
    md:gap-3       /* tablets */
    lg:gap-3       /* desktop */
  "
>

          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(cat.title)}
             className="
  relative
  rounded-md sm:rounded-lg lg:rounded-xl
  overflow-hidden
  cursor-pointer
  bg-gray-200
  shadow-sm
  transition-all duration-300
  lg:hover:shadow-lg
  lg:hover:scale-[1.02]
  active:scale-[0.99]
"

            >
              {/* Image Container with fixed aspect ratio */}
              <div
  className="
    relative w-full
    aspect-[4/3]      /* phones */
    sm:aspect-[3/2]   /* large phones */
    lg:aspect-[16/9]  /* desktop */
    bg-gray-200
  "
>

                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
             <div
  className="
    absolute inset-0
    flex flex-col justify-end
    p-2            /* phones */
    sm:p-3         /* large phones */
    md:p-4         /* tablets */
    lg:p-6         /* desktop */
  "
>

                {cat.label && (
                  <span className="bg-white text-black text-[10px] sm:text-xs font-bold px-2 py-1 rounded mb-2 w-fit">
                    {cat.label}
                  </span>
                )}
                <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold drop-shadow-lg">
                  {cat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}