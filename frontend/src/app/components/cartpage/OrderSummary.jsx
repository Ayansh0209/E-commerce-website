export default function OrderSummary({
  totalMRP = 0,
  discount = 0,
  totalAmount = 0,
  showPlaceOrder = false,
  onPlaceOrder,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 sticky top-28">
      <h2 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-gray-800 uppercase">
        Order Summary
      </h2>

      <div className="space-y-2 sm:space-y-3 mb-4">
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Total MRP</span>
          <span className="font-semibold">₹{totalMRP.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Discount on MRP</span>
          <span className="text-green-600 font-semibold">
            -₹{discount.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="text-gray-600">Coupon Discount</span>
          <button className="text-pink-600 text-[11px] sm:text-xs font-semibold hover:underline">
            Apply Coupon
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3 sm:pt-4">
        <div className="flex justify-between text-sm sm:text-base font-bold">
          <span>Total Amount</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {showPlaceOrder && (
        <button
          onClick={onPlaceOrder}
          className="w-full mt-4 sm:mt-6 bg-black text-white py-2.5 sm:py-3 rounded font-semibold text-sm sm:text-base hover:bg-gray-800"
        >
          Continue
        </button>
      )}
    </div>
  );
}
