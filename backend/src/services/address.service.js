const Address = require("../models/address.model");
const User = require("../models/user.model");



async function addAddress(userId, addressData) {
  const existingCount = await Address.countDocuments({ user: userId });
  
  const address = new Address({
    ...addressData,
    user: userId,
   isDefault: existingCount === 0,
  });

  const savedAddress = await address.save();

  await User.findByIdAndUpdate(userId, {
    $push: { address: savedAddress._id }
  });

  return savedAddress;
}

async function getUserAddresses(userId) {
  return await Address.find({ user: userId })
    .sort({ isDefault: -1, updatedAt: -1 })
    .lean();
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

async function setDefaultAddress(userId, addressId) {
  // remove default from all
  await Address.updateMany(
    { user: userId },
    { $set: { isDefault: false } }
  );

  // set new default
  await Address.findOneAndUpdate(
    { _id: addressId, user: userId },
    { isDefault: true }
  );
}


module.exports = {
  addAddress,
  getUserAddresses,
  deleteAddress,
  updateAddress,
  setDefaultAddress
};