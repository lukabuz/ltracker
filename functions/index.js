const functions = require("firebase-functions");
const admin = require("firebase-admin");
const hash = require("object-hash");
const cors = require("cors");
const express = require("express");

const DataInterface = require("./data.js");

//initialize firebase db
admin.initializeApp();

authenticate = async (username, password, dataProvider) => {
	console.log("AUTHENTICATE : " + username + " - " + password);
	return new Promise(async resolve => {
		let userExists = await dataProvider.checkIfUserExists(username);
		if (!userExists) {
			resolve(false);
		} else {
			let userHash = await dataProvider.getUserPasswordHash(username);
			let authenticated = hash(password) == userHash;
			resolve(authenticated);
		}
	});
};

register = async (username, password, dataProvider) => {
	return new Promise(async resolve => {
		let userExists = await dataProvider.checkIfUserExists(username);
		if (userExists) {
			resolve(false);
		} else {
			dataProvider.createUser(username, hash(password));
			resolve(true);
		}
	});
};

authMiddleware = async (req, res, next) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(422).json({ errors: result.array() });
	}

	let auth = await authenticate(
		req.body.username,
		req.body.password,
		dataProvider
	);

	if (auth) {
		next();
	} else {
		res.json({
			status: "error",
			errors: ["Authentication unsuccessful"]
		});
	}
};

const app = express();

app.use(cors({ origin: true }));

let dataProvider = new DataInterface(admin.database());

app.post("/test", async (req, res) => {
	res.json({ hello: "hello", body: req.body });
	res.json({ hello: "hello", body: req.body });
});

app.post("/logIn", async (req, res) => {
	console.log(
		"Main Function : " + req.body.username + " - " + req.body.password
	);
	let auth = await authenticate(
		req.body.username,
		req.body.password,
		dataProvider
	);

	if (auth) {
		res.json({ status: "success" });
	} else {
		res.json({
			status: "error",
			errors: ["Authentication unsuccessful"]
		});
	}
});

app.post("/createUser", async (req, res) => {
	let auth = await register(req.body.username, req.body.password, dataProvider);

	if (auth) {
		res.json({ status: "success" });
	} else {
		res.json({ status: "error", errors: ["user already exists"] });
	}
});

app.post("/createLighter", [authMiddleware], async (req, res) => {
	let lighterExists = await dataProvider.checkIfLighterExists(req.body.number);

	if (lighterExists) {
		res.json({ status: "error", errors: ["Lighter already exists."] });
	}

	dataProvider.addLighter(
		req.body.number,
		req.body.color,
		req.body.description,
		req.body.username
	);

	res.json({ status: "success" });
});

app.post("/claimLighter", [authMiddleware], async (req, res) => {
	let lighterExists = await dataProvider.checkIfLighterExists(req.body.number);

	if (!lighterExists) {
		res.json({ status: "error", errors: ["No such lighter."] });
	}

	dataProvider.createTransaction(req.body.username, req.body.number);
	res.json({ status: "success" });
});

app.post("/reportLoss", [authMiddleware], async (req, res) => {
	let lighterExists = await dataProvider.checkIfLighterExists(req.body.number);

	if (!lighterExists) {
		res.json({ status: "error", errors: ["No such lighter."] });
	}

	dataProvider.reportLighterLoss(req.body.number);
	res.json({ status: "success" });
});

exports.widgets = functions.https.onRequest(app);
