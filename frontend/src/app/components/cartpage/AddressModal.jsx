'use client';

export default function AddressModal({
  show,
  onClose,
  onSubmit,
  formData,
  onChange,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Add New Address
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={onSubmit} className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={onChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="First Name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={onChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Last Name"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Street Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChange}
                required
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black resize-none"
                placeholder="House No., Building Name, Street"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="City"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State / Province *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={onChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="State"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Zip / Postal Code *
              </label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={onChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Zip Code"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="10-digit mobile number"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Add Address
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
