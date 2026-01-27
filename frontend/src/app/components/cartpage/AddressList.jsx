'use client';

export default function AddressList({
  addresses = [],
  selectedAddress,
  onSelectAddress,
  onRemoveAddress,
  onEditAddress,
  onAddNewAddress,
}) {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white border border-gray-200 rounded-lg">

        {/* HEADER */}
        <div className="px-2 py-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base sm:text-xl font-bold text-gray-800">
            Select Delivery Address
          </h2>
          <button
            onClick={onAddNewAddress}
            className="
              px-3 py-2 sm:px-4
              border-2 border-black
              text-xs sm:text-sm
              font-semibold rounded
              hover:bg-black hover:text-white transition-colors
            "
          >
            ADD NEW
          </button>
        </div>

        {/* ADDRESS LIST */}
        <div className="px-2 py-3 sm:p-6 space-y-3 sm:space-y-4">
          {addresses.map((address) => {
            const isSelected = selectedAddress === address._id;

            return (
              <div
                key={address._id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectAddress?.(address._id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onSelectAddress?.(address._id);
                  }
                }}
                className={`
                  cursor-pointer rounded-lg transition-all
                  p-3 sm:p-5
                  ${isSelected
                    ? "border-2 border-black bg-gray-50"
                    : "border border-gray-300 hover:border-gray-400"}
                `}
              >
                <div className="flex items-start gap-3 sm:gap-4">

                  {/* RADIO */}
                  <input
                    type="radio"
                    name="address"
                    checked={isSelected}
                    onChange={() => onSelectAddress?.(address._id)}
                    className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-black"
                  />

                  {/* CONTENT */}
                  <div className="flex-1">

                    {/* NAME + MOBILE ICONS */}
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {address.firstName} {address.lastName}
                      </p>

                      {/* MOBILE ACTION ICONS */}
                      <div className="flex items-center gap-3 sm:hidden">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditAddress(address);
                          }}
                          className="text-gray-400 hover:text-black"
                          aria-label="Edit address"
                        >
                          ✎
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveAddress(address._id);
                          }}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove address"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* ADDRESS */}
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">
                      {address.streetAddress}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {address.city}, {address.state} - {address.zipCode}
                    </p>

                    {/* MOBILE */}
                    <p className="text-gray-700 text-xs sm:text-sm mt-1">
                      Mobile: <strong>{address.mobile}</strong>
                    </p>

                    {/* COD INFO */}
                    {isSelected && (
                      <p className="text-[11px] sm:text-sm text-gray-600 mt-1">
                        • Cash on Delivery available
                      </p>
                    )}
                  </div>
                </div>

                {/* DESKTOP / TABLET ACTION BUTTONS */}
                <div className="hidden sm:flex gap-3 mt-4 ml-9">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveAddress(address._id);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded"
                  >
                    REMOVE
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditAddress(address);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded"
                  >
                    EDIT
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
