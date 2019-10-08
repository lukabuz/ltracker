var admin = require("firebase-admin");
var serviceAccount = require("../key.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://ltracker-f226f.firebaseio.com"
});

const db = admin.firestore();

setDoc = (docRef, data) => {
	docRef = db.doc(docRef);

	let setData = docRef.set(data);
};

getDoc = async docRef => {
	return new Promise(resolve => {
		docRef = db.doc(docRef);
		let getDoc = docRef
			.get()
			.then(doc => {
				if (!doc.exists) {
					console.log("No such document!");
				} else {
					resolve(doc.data());
				}
			})
			.catch(err => {
				console.log("Error getting document", err);
			});
	});
};

addLighter = (number, color, description, added_by) => {
	let lighterData = {
		number: number,
		color: color,
		description: description,
		date_added: Date.now(),
		lost_by: null,
		added_by: db.doc("users/" + added_by)
	};

	setDoc("lighters/" + number, lighterData);

	createTransaction(added_by, number);

	let userRef = db.doc("users/" + added_by);

	let updateUser = userRef.update({
		lighters_added: admin.firestore.FieldValue.increment(1)
	});
};

createTransaction = (given_to, lighter_number) => {
	let docRef = db.collection("lighters/" + lighter_number + "/ledger").doc();
	let setTransaction = docRef.set({
		given_to: db.doc("users/" + given_to),
		date: Date.now()
	});
};

// Add a lighter
//
// addLighter(3, "guava", "test", "Luka");

// Get a lighter
// getDoc("lighters/" + 3).then(res => {
// 	console.log(res);
// });
