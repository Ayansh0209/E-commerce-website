const admin = require("firebase-admin");
const serviceAccount = require("./faltu-fashion-secret.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
