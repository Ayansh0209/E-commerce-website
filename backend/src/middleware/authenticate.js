// const jwtProvider = require("../config/jwtProvider.js")
// const userService = require("../services/user.service.js")

// const authenticate = async (req, res, next) => {
//     // Bearer token.....
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) {
//             return res.status(404).send({ error: "token not found..." })
//         }

//         const userId = jwtProvider.getUserIdFromToken(token);
//         const user = await userService.findUserById(userId);
//         req.user = user;
//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }
//     next();
// }

// module.exports = authenticate

const admin = require("../config/firebase");
const userService = require("../services/user.service");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token id",token)
    if (!token) {
      return res.status(401).send({ error: "Token missing" });
    }

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // decodedToken.uid = firebase user id
    let user = await userService.findByFirebaseUid(decodedToken.uid);

    if (!user) {
      // Auto-create user in MongoDB
      user = await userService.createUserFromFirebase(decodedToken);
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Invalid or expired token" });
  }
};

module.exports = authenticate;
