const Address = require("../models/address.model");
const User = require("../models/user.model");



async function addAddress(userId, addressData) {
  const address = new Address({
    ...addressData,
    user: userId
  });

  const savedAddress = await address.save();

  await User.findByIdAndUpdate(userId, {
    $push: { address: savedAddress._id }
  });

  return savedAddress;
}

async function getUserAddresses(userId) {
  return await Address.find({ user: userId }).lean();
}

async function deleteAddress(addressId, userId) {
  await Address.findOneAndDelete({
    _id: addressId,
    user: userId
  });
}

async function updateAddress(addressId, userId, updateData) {
  const updatedAddress = await Address.findOneAndUpdate(
    { _id: addressId, user: userId },
    updateData,
    { new: true }
  );

  if (!updatedAddress) {
    throw new Error("Address not found or not authorized");
  }

  return updatedAddress;
}

module.exports = {
  addAddress,
  getUserAddresses,
  deleteAddress,
  updateAddress
};