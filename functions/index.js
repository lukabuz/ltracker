const functions = require("firebase-functions");
const admin = require("firebase-admin");
const hash = require("object-hash");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const validator = require("html-request-validator");

const DataInterface = require("./data.js");

//initialize firebase db
admin.initializeApp();

isJsonString = str => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

authenticate = async (username, password, dataProvider) => {
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
	let errors = validator.validate(req.body, [
		{ variable: "username", variableText: "username", min: 0, max: 30 },
		{ variable: "password", variableText: "password", min: 6, max: 1000 }
	]);

	if (errors.length !== 0) {
		res.json({ status: "error", errors: errors });
	} else {
		let body = req.body;
		let auth = await authenticate(body.username, body.password, dataProvider);

		if (auth) {
			next();
		} else {
			res.json({
				status: "error",
				errors: ["Authentication unsuccessful"]
			});
		}
	}
};

parsingMiddleware = (req, res, next) => {
	if (isJsonString(req.body)) {
		req.body = JSON.parse(req.body);
	}
	next();
};

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(parsingMiddleware);

let dataProvider = new DataInterface(admin.database());

app.post("/logIn", async (req, res) => {
	let errors = validator.validate(req.body, [
		{ variable: "username", variableText: "username", min: 0, max: 30 },
		{ variable: "password", variableText: "password", min: 6, max: 1000 }
	]);

	if (errors.length !== 0) {
		res.json({ status: "error", errors: errors });
	}

	let body = req.body;
	let auth = await authenticate(body.username, body.password, dataProvider);

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
	let errors = validator.validate(req.body, [
		{ variable: "username", variableText: "username", min: 0, max: 30 },
		{ variable: "password", variableText: "password", min: 6, max: 1000 }
	]);

	if (errors.length !== 0) {
		res.json({ status: "error", errors: errors });
	}

	let body = req.body;
	let auth = await register(body.username, body.password, dataProvider);

	if (auth) {
		res.json({ status: "success" });
	} else {
		res.json({ status: "error", errors: ["user already exists"] });
	}
});

app.post("/createLighter", [authMiddleware], async (req, res) => {
	let errors = validator.validate(req.body, [
		{ variable: "number", variableText: "number", min: 0, max: 5000 },
		{ variable: "color", variableText: "color", min: 2, max: 10 },
		{ variable: "description", variableText: "description", min: 10 }
	]);

	if (errors.length !== 0) {
		res.json({ status: "error", errors: errors });
	}

	let body = req.body;
	let lighterExists = await dataProvider.checkIfLighterExists(body.number);

	if (lighterExists) {
		res.json({ status: "error", errors: ["Lighter already exists."] });
	}

	dataProvider.addLighter(
		body.number,
		body.color,
		body.description,
		body.username
	);

	res.json({ status: "success" });
});

app.post("/claimLighter", [authMiddleware], async (req, res) => {
	let errors = validator.validate(req.body, [
		{ variable: "number", variableText: "number", min: 0, max: 5000 }
	]);

	if (errors.length !== 0) {
		response.json({ status: "error", errors: errors });
	}

	let body = req.body;
	let lighterExists = await dataProvider.checkIfLighterExists(body.number);

	if (!lighterExists) {
		res.json({ status: "error", errors: ["No such lighter."] });
	}

	dataProvider.createTransaction(body.username, body.number);
	res.json({ status: "success" });
});

app.post("/reportLoss", [authMiddleware], async (req, res) => {
	let errors = validator.validate(req.body, [
		{ variable: "number", variableText: "number", min: 0, max: 5000 }
	]);

	if (errors.length !== 0) {
		response.json({ status: "error", errors: errors });
	}

	let body = req.body;
	let lighterExists = await dataProvider.checkIfLighterExists(body.number);

	if (!lighterExists) {
		res.json({ status: "error", errors: ["No such lighter."] });
	}

	dataProvider.reportLighterLoss(body.number);
	res.json({ status: "success" });
});

exports.widgets = functions.https.onRequest(app);
