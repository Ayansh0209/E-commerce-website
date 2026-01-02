export default function OrderSummary({
  totalMRP = 0,
  discount = 0,
  //convenienceFee = 0,
  totalAmount = 0,
  showPlaceOrder = false,
  onPlaceOrder,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-28">
      <h2 className="text-lg font-bold mb-6 text-gray-800 uppercase">
        Order Summary
      </h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total MRP</span>
          <span className="font-semibold">₹{totalMRP.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount on MRP</span>
          <span className="text-green-600 font-semibold">
            -₹{discount.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-600">Coupon Discount</span>
          <button className="text-pink-600 text-xs font-semibold hover:underline">
            Apply Coupon
          </button>
        </div>

        {/* <div className="flex justify-between text-sm">
          <span className="text-gray-600">Convenience Fee</span>
          <span className="font-semibold">+₹{convenienceFee}</span>
        </div> */}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-base font-bold">
          <span>Total Amount</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {showPlaceOrder && (
        <button
          onClick={onPlaceOrder}
          className="w-full mt-6 bg-black text-white py-3 rounded font-semibold hover:bg-gray-800"
        >
          Continue
        </button>
      )}
    </div>
  );
}
