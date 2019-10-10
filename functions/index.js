const functions = require("firebase-functions");
const admin = require("firebase-admin");
const validator = require("html-request-validator");
const hash = require("object-hash");

let serviceAccount = require("../key.json");
const DataInterface = require("./data.js");

//initialize firebase db
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://ltracker-f226f.firebaseio.com/"
});

class Auth {
	constructor(username, password, dataProvider) {
		this.username = username;
		this.dataProvider = dataProvider;
		this.password = password;
		this.authenticated = false;
		this.checkIfUserExists(username);
	}
	async checkIfUserExists(username) {
		this.userExists = await dataProvider.checkIfUserExists(username);
	}
	register() {
		let hash = this.createHash(this.password);
		this.dataProvider.createUser(this.username, hash);
	}
	async authenticate() {
		return new Promise(async resolve => {
			let userHash = await dataProvider.getUserPasswordHash(this.username);
			let authenticated = this.compareHash(this.password, userHash);
			this.authenticated = authenticated;
			resolve(authenticated);
		});
	}
	createHash(password) {
		return hash(password);
	}
	compareHash(password, hashToCompare) {
		return hash(password) == hashToCompare;
	}
}

let dataProvider = new DataInterface(admin.database());

exports.logIn = functions.https.onRequest(async (request, response) => {
	let errors = validator.validate(request.body, [
		{ variable: "username", variableText: "username", min: 0, max: 30 },
		{ variable: "password", variableText: "password", min: 6, max: 1000 }
	]);

	if (errors.length !== 0) {
		response.json({ status: "error", errors: errors });
	}

	let auth = new Auth(
		request.body.username,
		request.body.password,
		dataProvider
	);

	if (auth.userExists) {
		let authenticated = await auth.login();
		if (authenticated) {
			response.json({ status: "success" });
		} else {
			response.json({
				status: "error",
				errors: ["Wrong Password."]
			});
		}
	} else {
		response.json({
			status: "error",
			errors: ["User does not exist."]
		});
	}
});

exports.createUser = functions.https.onRequest((request, response) => {
	let errors = validator.validate(request.body, [
		{ variable: "username", variableText: "username", min: 0, max: 30 },
		{ variable: "password", variableText: "password", min: 6, max: 1000 }
	]);

	if (errors.length !== 0) {
		response.json({ status: "error", errors: errors });
	}

	let auth = new Auth(
		request.body.username,
		request.body.password,
		dataProvider
	);

	auth.register();

	response.json({ status: "success" });
});

exports.createLighter = functions.https.onRequest((request, response) => {
	let errors = validator.validate(request.body, [
		{ variable: "number", variableText: "number", min: 0, max: 5000 },
		{ variable: "color", variableText: "color", min: 2, max: 10 },
		{ variable: "description", variableText: "description", min: 10, max: 50 },
		{ variable: "added_by", variableText: "user", min: 0, max: 999 }
	]);

	if (errors.length !== 0) {
		response.json({ status: "error", errors: errors });
	}

	dataProvider.addLighter(
		request.body.number,
		request.body.color,
		request.body.description,
		request.body.added_by
	);

	response.json({ status: "success" });
});
