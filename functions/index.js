const functions = require("firebase-functions");
const admin = require("firebase-admin");
const validator = require("html-request-validator");
const hash = require("object-hash");
const cors = require("cors")({ origin: true });

const DataInterface = require("./data.js");

//initialize firebase db
admin.initializeApp();

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

let dataProvider = new DataInterface(admin.database());

exports.logIn = functions.https.onRequest(async (request, response) => {
	cors(request, response, () => {

	
	let errors = validator.validate(request.body, [
		{ variable: "username", variableText: "username", min: 0, max: 30 },
		{ variable: "password", variableText: "password", min: 6, max: 1000 }
	]);

	if (errors.length !== 0) {
		response.json({ status: "error", errors: errors });
	}

	let auth = await authenticate(
		request.body.username,
		request.body.password,
		dataProvider
	);

	if (auth) {
		response.json({ status: "success" });
	} else {
		response.json({ status: "error", errors: ["Authentication unsuccessful"] });
	}
});
});

exports.createUser = functions.https.onRequest(async (request, response) => {
	cors(request, response, () => {
	let errors = validator.validate(request.body, [
		{ variable: "username", variableText: "username", min: 0, max: 30 },
		{ variable: "password", variableText: "password", min: 6, max: 1000 }
	]);

	if (errors.length !== 0) {
		response.json({ status: "error", errors: errors });
	}

	let auth = await register(
		request.body.username,
		request.body.password,
		dataProvider
	);

	if (auth) {
		response.json({ status: "success" });
	} else {
		response.json({ status: "error", errors: ["user already exists"] });
	}
});
});

exports.createLighter = functions.https.onRequest(async (request, response) => {
	cors(request, response, () => {
	let errors = validator.validate(request.body, [
		{ variable: "number", variableText: "number", min: 0, max: 5000 },
		{ variable: "color", variableText: "color", min: 2, max: 10 },
		{ variable: "description", variableText: "description", min: 10 },
		{ variable: "username", variableText: "username", min: 0, max: 30 },
		{ variable: "password", variableText: "password", min: 6, max: 1000 }
	]);

	if (errors.length !== 0) {
		response.json({ status: "error", errors: errors });
	}

	let lighterExists = await dataProvider.checkIfLighterExists(
		request.body.number
	);

	if (lighterExists) {
		response.json({ status: "error", errors: ["Lighter already exists."] });
	}

	let auth = await authenticate(
		request.body.username,
		request.body.password,
		dataProvider
	);

	if (auth) {
		dataProvider.addLighter(
			request.body.number,
			request.body.color,
			request.body.description,
			request.body.username
		);
		response.json({ status: "success" });
	} else {
		response.json({ status: "error", errors: ["Authentication unsuccessful"] });
	}
});
});

exports.claimLighter = functions.https.onRequest(async (request, response) => {
	cors(request, response, () => {
	let errors = validator.validate(request.body, [
		{ variable: "number", variableText: "number", min: 0, max: 5000 },
		{ variable: "username", variableText: "username", min: 0, max: 30 },
		{ variable: "password", variableText: "password", min: 6, max: 1000 }
	]);

	if (errors.length !== 0) {
		response.json({ status: "error", errors: errors });
	}

	let lighterExists = await dataProvider.checkIfLighterExists(
		request.body.number
	);

	if (!lighterExists) {
		response.json({ status: "error", errors: ["No such lighter."] });
	}

	let auth = await authenticate(
		request.body.username,
		request.body.password,
		dataProvider
	);

	if (auth) {
		dataProvider.createTransaction(request.body.username, request.body.number);
		response.json({ status: "success" });
	} else {
		response.json({ status: "error", errors: ["Authentication unsuccessful"] });
	}
});
});

exports.reportLoss = functions.https.onRequest(async (request, response) => {
	cors(request, response, () => {
	let errors = validator.validate(request.body, [
		{ variable: "number", variableText: "number", min: 0, max: 5000 },
		{ variable: "username", variableText: "username", min: 0, max: 30 },
		{ variable: "password", variableText: "password", min: 6, max: 1000 }
	]);

	if (errors.length !== 0) {
		response.json({ status: "error", errors: errors });
	}

	let lighterExists = await dataProvider.checkIfLighterExists(
		request.body.number
	);

	if (!lighterExists) {
		response.json({ status: "error", errors: ["No such lighter."] });
	}

	let auth = await authenticate(
		request.body.username,
		request.body.password,
		dataProvider
	);

	if (auth) {
		dataProvider.reportLighterLoss(request.body.number);
		response.json({ status: "success" });
	} else {
		response.json({ status: "error", errors: ["Authentication unsuccessful"] });
	}
});
});
