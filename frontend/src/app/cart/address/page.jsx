// app/cart/address/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/AuthContext";
import AddressModal from '@/app/components/cartpage/AddressModal';
import AddressList from '@/app/components/cartpage/AddressList';
import OrderSummary from '@/app/components/cartpage/OrderSummary';
import { fetchCart } from '@/redux/cart/cartSlice';
import {
  fetchUserAddresses,
  addAddress,
  deleteAddress, updateAddress
} from "@/redux/address/addressSlice";

import { createOrder } from '@/redux/order/orderSlice';
import { createPayment, finalizePayment } from "@/redux/payment/paymentSlice";

// import { useCheckout } from "../../cart/layout.jsx";


export default function AddressPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  // const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { addresses, loading } = useSelector(
    state => state.address
  );

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

  // useEffect(() => {
  //   if (addresses.length && !selectedAddress) {
  //     setSelectedAddress(addresses[0]._id);
  //   }
  // }, [addresses, selectedAddress]);

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
      if (editingAddressId) {
        // 🔁 UPDATE ADDRESS
        await dispatch(
          updateAddress({
            addressId: editingAddressId,
            addressData: addressPayload,
          })
        ).unwrap();
      } else {
        // ➕ ADD ADDRESS
        await dispatch(addAddress(addressPayload)).unwrap();
      }

      // Reset modal + form
      setShowModal(false);
      setEditingAddressId(null);

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
        key: "rzp_test_Ry8zIcTyXIvFja",
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


  const addressList = addresses || [];

  const removeAddress = (id) => {
    dispatch(deleteAddress(id));
  };

  const handleEditAddress = (address) => {
    setEditingAddressId(address._id); // 👈 KEY LINE

    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.streetAddress,
      city: address.city,
      state: address.state,
      zip: address.zipCode,
      phoneNumber: address.mobile,
    });

    setShowModal(true);
  };

const handleSelectAddress = (addressId) => {
  // just store locally for UI + Continue button
  setSelectedAddress(addressId);
};

useEffect(() => {
  if (!selectedAddress && addresses.length > 0) {
    setSelectedAddress(addresses[0]._id);
  }
}, [addresses, selectedAddress]);


  return (
    <div className="max-w-7xl mx-auto sm:px-4  sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* LEFT — ADDRESS SECTION */}
       <AddressList
  addresses={addressList}
  selectedAddress={selectedAddress}
  onSelectAddress={handleSelectAddress}
  onRemoveAddress={removeAddress}
  onEditAddress={handleEditAddress}
  onAddNewAddress={() => {
    setEditingAddressId(null);
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: ''
    });
    setShowModal(true);
  }}
/>




        {/* RIGHT — ORDER SUMMARY */}
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

      {/* ADDRESS MODAL */}
      <AddressModal
        show={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );

}
