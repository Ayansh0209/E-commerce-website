'use client'
import { useRouter } from "next/navigation";
export default function ProductCard({product}) {
  // console.log("img:", product.image);
  // const product = {
  //   image: "https://rukminim1.flixcart.com/image/612/612/k4d27ww0/shirt/q/w/t/l-el024-el-senor-original-imafnadnjp5pq6tg.jpeg?q=70",
  //   brand: "Faltu Fashion",
  //   detail: "Oversized Black tee",
  //   price: 799,
  //   originalPrice: 1299,
  //   discount: "40% OFF",
  // };
const router = useRouter();
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-transform hover:scale-[1.02]  cursor-pointer"
    onClick={()=> router.push(`/productdetail/${product._id}`)}
    >
      {/* Image container */}
      <div className="relative w-full h-[395px] bg-gray-100">
        <img
        
          src={product.imageUrl}
          alt={product.brand}
          className="w-full h-full object-cover "
        />
        {product.discountPercent && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="px-4 py-3 flex flex-col items-start">
        <h3 className="text-base font-medium text-gray-800 truncate">
          {product.brand}
        </h3>
        <h5 className="text-xs text-gray-600 line-clamp-1">{product.title}</h5>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-semibold text-black">
            ₹{product.discountedPrice}
          </span>
          {product.price && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
