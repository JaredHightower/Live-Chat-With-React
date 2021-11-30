const functions = require('firebase-functions');
const admin = require('firebase-admin');

// The Firebase Admin SDK to access Firestore.
admin.initializeApp();

exports.onUserStatusChanged = require("./triggers/onUserStatusChanged")
exports.onCleverbotMessage = require("./triggers/onCleverbotMessage")
exports.helloWorld = require("./routes/helloWorld")