'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderSummary from './OrderSummary';
export default function AddressPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(1);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Ayansh Singh',
      isHome: true,
      street: 'JAYPEE INSTITUTE OF INFORMATION TECHNOLOGY, Pinnacle Tower 2',
      area: 'Pinnacle Tower-2, a 13 a, A13 A, Industrial Area, Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201309',
      mobile: '7294947567',
      isDefault: true
    },
    {
      id: 2,
      name: 'Aayans',
      isHome: true,
      street: 'bd complex, suzuki showroom',
      area: 'Hazaribagh H.O',
      city: 'Hazaribagh',
      state: 'Jharkhand',
      pincode: '825301',
      mobile: '6205784593',
      isDefault: false
    },
    {
      id: 3,
      name: 'Ayansh Singh',
      isHome: true,
      street: 'Nishant Suzuki showroom, barkagaon road',
      area: 'Hazaribagh H.O',
      city: 'Hazaribagh',
      state: 'Jharkhand',
      pincode: '825301',
      mobile: '8986189869',
      isDefault: false
    }
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAddress = {
      id: addresses.length + 1,
      name: `${formData.firstName} ${formData.lastName}`,
      isHome: true,
      street: formData.address,
      area: '',
      city: formData.city,
      state: formData.state,
      pincode: formData.zip,
      mobile: formData.phoneNumber,
      isDefault: false
    };

    setAddresses([...addresses, newAddress]);
    setShowModal(false);

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: ''
    });
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const totalMRP = 2297.00;
  const discount = 1601;
  const convenienceFee = 50;
  const totalAmount = 2347.00;

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left: Address Selection */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg">

            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Select Delivery Address</h2>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 border-2 border-black text-black font-semibold rounded hover:bg-black hover:text-white transition-colors"
              >
                ADD NEW ADDRESS
              </button>
            </div>

            {/* Default Address Section */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                Default Address
              </h3>

              {addresses.filter(addr => addr.isDefault).map(address => (
                <div key={address.id} className="border-2 border-gray-300 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === address.id}
                        onChange={() => setSelectedAddress(address.id)}
                        className="mt-1 w-5 h-5 accent-black"
                      />

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-gray-900">{address.name}</span>
                          {address.isHome && (
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                              HOME
                            </span>
                          )}
                        </div>

                        <p className="text-gray-700 text-sm mb-1">{address.street}</p>
                        {address.area && <p className="text-gray-700 text-sm mb-1">{address.area}</p>}
                        <p className="text-gray-700 text-sm mb-3">
                          {address.city}, {address.state} - {address.pincode}
                        </p>

                        <p className="text-gray-700 text-sm mb-3">
                          Mobile: <strong>{address.mobile}</strong>
                        </p>

                        <p className="text-sm text-gray-600">• Cash on Delivery available</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 ml-9">
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded hover:border-gray-400 transition-colors">
                      REMOVE
                    </button>
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded hover:border-gray-400 transition-colors">
                      EDIT
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Other Addresses Section */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                Other Address
              </h3>

              <div className="space-y-4">
                {addresses.filter(addr => !addr.isDefault).map(address => (
                  <div key={address.id} className="border-2 border-gray-300 rounded-lg p-5 hover:border-gray-400 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === address.id}
                          onChange={() => setSelectedAddress(address.id)}
                          className="mt-1 w-5 h-5 accent-black"
                        />

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-gray-900">{address.name}</span>
                            {address.isHome && (
                              <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                                HOME
                              </span>
                            )}
                          </div>

                          <p className="text-gray-700 text-sm mb-1">{address.street}</p>
                          {address.area && <p className="text-gray-700 text-sm mb-1">{address.area}</p>}
                          <p className="text-gray-700 text-sm mb-3">
                            {address.city}, {address.state} - {address.pincode}
                          </p>

                          <p className="text-gray-700 text-sm">
                            Mobile: <strong>{address.mobile}</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4 ml-9">
                      <button
                        onClick={() => removeAddress(address.id)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded hover:border-gray-400 transition-colors"
                      >
                        REMOVE
                      </button>
                      <button className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded hover:border-gray-400 transition-colors">
                        EDIT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => router.push('/cart/payment')}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Continue Payment
              </button>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary
            totalMRP={totalMRP}
            discount={totalDiscount}
            convenienceFee={convenienceFee}
            totalAmount={totalAmount}
            showPlaceOrder
            onPlaceOrder={() => {
              if (!user) {
                setShowAuth(true); // auth modal later
                return;
              }
              router.push("/cart/address");
            }}
          />
        </div>


      </div>

      {/* Modal for Adding New Address */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                  onClick={() => setShowModal(false)}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}