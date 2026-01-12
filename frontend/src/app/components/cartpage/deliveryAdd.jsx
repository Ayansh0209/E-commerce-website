'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from '@/redux/order/orderSlice';
import { getOrderByIdAPI } from '@/redux/order/orderApi';
import { useAuth } from "../../../context/AuthContext";
import { finalizePayment } from "@/redux/payment/paymentSlice";

import { createPayment } from "@/redux/payment/paymentSlice";
import OrderSummary from './OrderSummary';
import { fetchCart } from '@/redux/cart/cartSlice';
import {
  fetchUserAddresses,
  addAddress,
  deleteAddress
} from "@/redux/address/addressSlice";

// import { useCheckout } from "../../cart/layout.jsx";


export default function AddressPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { addresses, loading } = useSelector(state => state.address);
  const { user, loading: authLoad } = useAuth();
  // const { setPaymentActive, setCompleted } = useCheckout();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (!authLoad && user) {
      dispatch(fetchUserAddresses());
    }
  }, [dispatch, user, authLoad]);

  useEffect(() => {
    if (addresses.length && !selectedAddress) {
      setSelectedAddress(addresses[0]._id);
    }
  }, [addresses, selectedAddress]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const addressPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      streetAddress: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zip,
      mobile: formData.phoneNumber
    };

    try {

      await dispatch(addAddress(addressPayload)).unwrap();
      setShowModal(false);



      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: ''
      });

    } catch (err) {
      console.error("Failed to save address", err);
    }
  };


  const { cart, loading: cartLoad } = useSelector(state => state.cart);
  useEffect(() => {
    if (!authLoad && user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user, authLoad]);



  const handleContinuePayment = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    try {
      // Create Order (DB)
      const order = await dispatch(createOrder(selectedAddress)).unwrap();

      // Create Razorpay Order (backend)
      const payment = await dispatch(createPayment(order._id)).unwrap();
      //setPaymentActive(true);
      //  Safety check
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      // Open Razorpay Checkout
      const options = {
        //key:process.env.RAZORPAY_KEY_ID,
        key:"rzp_test_Ry8zIcTyXIvFja",
        amount: payment.amount,
        currency: payment.currency,
        name: "Faltu Fashion",
        description: "Order Payment",
        order_id: payment.razorpayOrderId,

        prefill: {
          name: payment.user?.name || "",
          email: payment.user?.email || "",
          contact: payment.user?.contact || ""
        },

        theme: {
          color: "#ec4899"
        },

        handler: function (response) {
          dispatch(
            finalizePayment({
              paymentId: response.razorpay_payment_id,
              orderId: order._id,
            })
          );

          router.push("/orders");
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed. Please try again.");
    }
  };



  const defaultAddress = addresses.length ? addresses[0] : null;
  const otherAddresses = addresses.length > 1 ? addresses.slice(1) : [];

  const removeAddress = (id) => {
    dispatch(deleteAddress(id));
  };


  return (
    <>
      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN — ADDRESS */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg">

            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Select Delivery Address
              </h2>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 border-2 border-black text-black font-semibold rounded hover:bg-black hover:text-white transition-colors"
              >
                ADD NEW ADDRESS
              </button>
            </div>

            {/* DEFAULT ADDRESS */}
            {defaultAddress && (
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                  Default Address
                </h3>

                <div className="border-2 border-black rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === defaultAddress._id}
                      onChange={() => setSelectedAddress(defaultAddress._id)}
                      className="mt-1 w-5 h-5 accent-black"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-900">
                          {defaultAddress.firstName} {defaultAddress.lastName}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                          HOME
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm mb-1">
                        {defaultAddress.streetAddress}
                      </p>
                      <p className="text-gray-700 text-sm mb-3">
                        {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.zipCode}
                      </p>

                      <p className="text-gray-700 text-sm mb-3">
                        Mobile: <strong>{defaultAddress.mobile}</strong>
                      </p>

                      <p className="text-sm text-gray-600">
                        • Cash on Delivery available
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 ml-9">
                    <button
                      onClick={() => removeAddress(defaultAddress._id)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded"
                    >
                      REMOVE
                    </button>
                    <button
                      onClick={() => handleEditAddress(defaultAddress)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded"
                    >
                      EDIT
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* OTHER ADDRESSES */}
            {otherAddresses.length > 0 && (
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                  Other Address
                </h3>

                <div className="space-y-4">
                  {otherAddresses.map(address => (
                    <div
                      key={address._id}
                      className="border-2 border-gray-300 rounded-lg p-5 hover:border-gray-400 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === address._id}
                          onChange={() => setSelectedAddress(address._id)}
                          className="mt-1 w-5 h-5 accent-black"
                        />

                        <div className="flex-1">
                          <p className="font-bold text-gray-900 mb-2">
                            {address.firstName} {address.lastName}
                          </p>

                          <p className="text-gray-700 text-sm mb-1">
                            {address.streetAddress}
                          </p>
                          <p className="text-gray-700 text-sm mb-3">
                            {address.city}, {address.state} - {address.zipCode}
                          </p>

                          <p className="text-gray-700 text-sm">
                            Mobile: <strong>{address.mobile}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4 ml-9">
                        <button
                          onClick={() => removeAddress(address._id)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded"
                        >
                          REMOVE
                        </button>
                        <button
                          onClick={() => handleEditAddress(address)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded"
                        >
                          EDIT
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT COLUMN — ORDER SUMMARY */}
        <div className="lg:col-span-1">



          {cart && (
            <OrderSummary
              totalMRP={cart.totalPrice}
              discount={cart.discounts}
              totalAmount={cart.totalPrice - cart.discounts}
              showAction
              showPlaceOrder
              onPlaceOrder={handleContinuePayment}
            />
          )}


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