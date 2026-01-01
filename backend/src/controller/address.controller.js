const addressService = require("../services/address.service")
const addAddress = async (req, res) => {
  try {
    const address = await addressService.addAddress(
      req.user._id,
      req.body
    );
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const addresses = await addressService.getUserAddresses(req.user._id);
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateAddress = async (req, res) => {
  try {
    const updatedAddress = await addressService.updateAddress(
      req.params.id,
      req.user._id,
      req.body
    );
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    await addressService.deleteAddress(req.params.id, req.user._id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress
};