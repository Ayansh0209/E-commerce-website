// middleware/requireAdmin.js
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    const firebaseUid = req.user.firebaseUid;

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Admin access only" });
    }

    req.admin = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
