// const admin = require("firebase-admin");

// let serviceAccount = require("../key.json");

// //initialize firebase db
// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	databaseURL: "https://ltracker-f226f.firebaseio.com/"
// });

module.exports = class DataInterface {
	constructor(db) {
		this.db = db;
		this.ref = db.ref();
	}
	// Create lighter
	addLighter(number, color, description, added_by) {
		let lighterData = {
			number: number,
			color: color,
			description: description,
			date_added: Date.now(),
			lost_by: "",
			added_by: added_by,
			current_owner: added_by
		};

		let lightersRef = this.ref.child("lighters");
		lightersRef.child(number).set(lighterData);

		this.createTransaction(added_by, number);

		let usersRef = this.ref.child("users");
		usersRef
			.child(added_by)
			.child("lighters_added")
			.transaction(function(lighters_added) {
				return (lighters_added || 0) + 1;
			});
	}

	// Create transaction for lighter
	createTransaction(given_to, number) {
		let lighterRef = this.ref.child("lighters").child(number);
		lighterRef.update({ current_owner: given_to });
		let ledger = lighterRef.child("ledger");
		let date = Date.now();
		ledger.child(date).set({
			given_to: given_to,
			date: date
		});
	}

	// Report lighter loss
	reportLighterLoss(number) {
		// Update user entry and increment loss
		let lighterRef = this.ref.child("lighters").child(number);
		let ledger = lighterRef.child("ledger");
		let usersRef = this.ref.child("users");
		ledger.on("value", function(snapshot) {
			let lost_by = snapshot.val();
			let largest_key = 0;
			for (var key in lost_by) {
				if (key > largest_key) {
					largest_key = key;
				}
			}
			lost_by = lost_by[largest_key].given_to;

			usersRef
				.child(lost_by)
				.child("lighters_lost")
				.transaction(function(lighters_lost) {
					return (lighters_lost || 0) + 1;
				});

			lighterRef.child("lost_by").set(lost_by);
		});
	}
	getCreditScore(user) {
		return new Promise((resolve, reject) => {
			let userRef = this.ref.child("users").child(user);
			userRef
				.on("value", function(snapshot) {
					let user = snapshot.val();
					resolve(2 + user.lighters_added - user.lighters_lost);
				})
				.catch(err => {
					resolve(0);
				});
		});
	}
	checkIfUserExists(user) {
		return new Promise(resolve => {
			let usersRef = this.ref.child("users").child(user);
			usersRef.once("value", function(snapshot) {
				resolve(snapshot.val() != null);
			});
		});
	}
	checkIfLighterExists(number) {
		return new Promise(resolve => {
			let lightersRef = this.ref.child("lighters").child(number);
			lightersRef.once("value", function(snapshot) {
				resolve(snapshot.val() != null);
			});
		});
	}
	createUser(username, passwordHash) {
		let usersRef = this.ref.child("users");
		usersRef.child(username).set({
			name: username,
			lighters_added: 0,
			lighters_lost: 0,
			passwordHash: passwordHash
		});
	}
	async getUserPasswordHash(username) {
		return new Promise(resolve => {
			let userRef = this.ref.child("users").child(username);
			userRef.on("value", function(snapshot) {
				let user = snapshot.val();
				resolve(user.passwordHash);
			});
		});
	}
};

// let dataProvider = new DataInterface(admin.database());

// Add a lighter
//

// dataProvider.addLighter(1, "red", "test", "Luka");
// dataProvider.addLighter(2, "blue", "test", "Sam");
// dataProvider.addLighter(3, "orange", "test", "Liam");
// dataProvider.addLighter(4, "white", "test", "Annie");

// Get a list of all lighters
//
// getAllLighters().then(res => {
// 	console.log(res);
// });

// Check if a lighter exists
//
// checkDoc("lighters/3").then(res => {
// 	console.log(res);
// });

// Report the loss of a lighter
//
// dataProvider.reportLighterLoss(4);

// dataProvider.createTransaction("Luka", 4);
// dataProvider.createTransaction("Sam", 4);
// dataProvider.createTransaction("Liam", 4);
// dataProvider.createTransaction("Luka", 2);
// dataProvider.createTransaction("Liam", 2);
// dataProvider.createTransaction("Annie", 2);
