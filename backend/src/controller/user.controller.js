const userService = require("../services/user.service.js");

const getUserProfile = async (req, res) => {
    try {
        // User already attached by Firebase authenticate middleware
        if (!req.user) {
            return res.status(401).send({ error: "Unauthorized" });
        }

        return res.status(200).send(req.user);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { getUserProfile, getAllUsers };
