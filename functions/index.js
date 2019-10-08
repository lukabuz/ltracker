const functions = require("firebase-functions");
const admin = require("firebase-admin");

let serviceAccount = require("../key.json");

//initialize firebase db
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

//import custom classes
var Lighter = require("./Objects/Lighter.js");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((request, response) => {});
