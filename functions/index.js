const functions = require("firebase-functions");
const admin = require("firebase-admin");

let serviceAccount = require("../key.json");

//initialize firebase db
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

exports.helloWorld = functions.https.onRequest((request, response) => {});
