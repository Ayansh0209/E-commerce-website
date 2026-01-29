"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";

import AddressList from "@/app/components/cartpage/AddressList";
import AddressModal from "@/app/components/cartpage/AddressModal";

import {
  fetchUserAddresses,
  addAddress,
  deleteAddress,
  updateAddress,
} from "@/redux/address/addressSlice";

export default function AccountAddressesPage() {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useAuth();

  const { addresses, loading } = useSelector((state) => state.address);

  const [showModal, setShowModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
  });

  // Fetch addresses
  useEffect(() => {
    if (!authLoading && user) {
      dispatch(fetchUserAddresses());
    }
  }, [dispatch, user, authLoading]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      mobile: formData.phoneNumber,
    };

    try {
      if (editingAddressId) {
        await dispatch(
          updateAddress({
            addressId: editingAddressId,
            addressData: addressPayload,
          })
        ).unwrap();
      } else {
        await dispatch(addAddress(addressPayload)).unwrap();
      }

      setShowModal(false);
      setEditingAddressId(null);
      resetForm();
    } catch (err) {
      console.error("Failed to save address", err);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phoneNumber: "",
    });
  };

  const handleEditAddress = (address) => {
    setEditingAddressId(address._id);
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

  const removeAddress = (id) => {
    dispatch(deleteAddress(id));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Saved Addresses</h1>

      <div className="max-w-3xl">
        <AddressList
          addresses={addresses || []}
          mode="manage"              // 👈 IMPORTANT
          onRemoveAddress={removeAddress}
          onEditAddress={handleEditAddress}
          onAddNewAddress={() => {
            resetForm();
            setEditingAddressId(null);
            setShowModal(true);
          }}
        />
      </div>

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
